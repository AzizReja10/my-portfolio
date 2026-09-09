import { NextResponse } from 'next/server';

const CACHE_TTL = 3600;

const LEVEL_MAP = {
    0: 'NONE',
    1: 'FIRST_QUARTILE',
    2: 'SECOND_QUARTILE',
    3: 'THIRD_QUARTILE',
    4: 'FOURTH_QUARTILE'
};

function formatDaysToWeeks(days, totalContributions) {
    const sorted = [...days].sort((a, b) => new Date(a.date) - new Date(b.date));
    const weeks = [];
    let currentWeek = { contributionDays: [] };

    for (const day of sorted) {
        currentWeek.contributionDays.push({
            contributionCount: day.count ?? 0,
            contributionLevel: typeof day.level === 'string' ? day.level : (LEVEL_MAP[day.level] || 'NONE'),
            date: day.date
        });

        const d = new Date(day.date);
        // Sunday is 0, Saturday is 6; close week on Saturday
        if (d.getUTCDay() === 6) {
            weeks.push(currentWeek);
            currentWeek = { contributionDays: [] };
        }
    }

    if (currentWeek.contributionDays.length > 0) {
        weeks.push(currentWeek);
    }

    const total = typeof totalContributions === 'number'
        ? totalContributions
        : sorted.reduce((sum, d) => sum + (d.count || 0), 0);

    return {
        totalContributions: total,
        weeks
    };
}

async function fetchFromGithubGraphQL(username, token) {
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json',
            'User-Agent': 'portfolio-app'
        },
        body: JSON.stringify({
            query: `query {
                user(login: "${username}") {
                    contributionsCollection {
                        contributionCalendar {
                            totalContributions
                            weeks {
                                contributionDays {
                                    contributionCount
                                    contributionLevel
                                    date
                                }
                            }
                        }
                    }
                }
            }`
        }),
        next: {
            revalidate: CACHE_TTL,
            tags: [`github-contributions-${username}`]
        }
    });

    if (!response.ok) {
        throw new Error(`GitHub GraphQL API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar || !calendar.weeks) {
        throw new Error('Invalid response from GitHub GraphQL API');
    }
    return calendar;
}

async function fetchFromCommunityApi(username) {
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        },
        next: {
            revalidate: CACHE_TTL,
            tags: [`github-contributions-${username}`]
        }
    });

    if (!response.ok) {
        throw new Error(`Community contributions API responded with status: ${response.status}`);
    }

    const data = await response.json();
    if (!data || !Array.isArray(data.contributions)) {
        throw new Error('Invalid response structure from community contributions API');
    }

    const all = [...data.contributions].sort((a, b) => new Date(a.date) - new Date(b.date));
    const todayStr = new Date().toISOString().split('T')[0];
    const filtered = all.filter(item => item.date <= todayStr);

    const lastItem = filtered[filtered.length - 1];
    const lastDate = new Date(lastItem.date);
    const dayOfWeek = lastDate.getUTCDay();
    const daysNeeded = (52 * 7) + (dayOfWeek + 1);
    const sliceDays = filtered.slice(-daysNeeded);

    return formatDaysToWeeks(sliceDays);
}

async function fetchFromGithubScrape(username) {
    const response = await fetch(`https://github.com/users/${username}/contributions`, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        next: {
            revalidate: CACHE_TTL,
            tags: [`github-contributions-${username}`]
        }
    });

    if (!response.ok) {
        throw new Error(`GitHub public contributions page responded with status: ${response.status}`);
    }

    const html = await response.text();
    const totalMatch = html.match(/([0-9,]+)\s+contributions\s+in/i);
    const totalContributions = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ''), 10) : 0;

    const tooltipMap = new Map();
    const tooltipMatches = html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g);
    for (const match of tooltipMatches) {
        const id = match[1];
        const text = match[2].trim();
        const countMatch = text.match(/^([0-9,]+)\s+contribution/i);
        const count = countMatch ? parseInt(countMatch[1].replace(/,/g, ''), 10) : 0;
        tooltipMap.set(id, count);
    }

    const days = [];
    const tdMatches = html.matchAll(/<td(?:\s+[^>]*?)?\s+id="([^"]+)"(?:\s+[^>]*?)?\s+data-date="([^"]+)"(?:\s+[^>]*?)?\s+data-level="([^"]+)"(?:\s+[^>]*?)?>/g);
    for (const match of tdMatches) {
        const id = match[1];
        const date = match[2];
        const level = parseInt(match[3], 10) || 0;
        const count = tooltipMap.get(id) || (level > 0 ? 1 : 0);
        days.push({ date, level, count });
    }

    if (days.length === 0) {
        const altMatches = html.matchAll(/<td(?:\s+[^>]*?)?\s+data-date="([^"]+)"(?:\s+[^>]*?)?\s+data-level="([^"]+)"(?:\s+[^>]*?)?>/g);
        for (const match of altMatches) {
            const date = match[1];
            const level = parseInt(match[2], 10) || 0;
            days.push({ date, level, count: level > 0 ? 1 : 0 });
        }
    }

    if (days.length === 0) {
        throw new Error('Could not parse contribution days from GitHub HTML');
    }

    return formatDaysToWeeks(days, totalContributions);
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');
        if (!username) {
            return NextResponse.json({ error: 'username is required' }, { status: 400 });
        }

        let calendar = null;
        const token = process.env.GITHUB_TOKEN;

        // 1. Try official GitHub GraphQL API if token is provided
        if (token) {
            try {
                calendar = await fetchFromGithubGraphQL(username, token);
            } catch (err) {
                console.warn('GitHub GraphQL API failed, attempting fallback:', err.message);
            }
        }

        // 2. Fallback to public community contributions API (no token required)
        if (!calendar) {
            try {
                calendar = await fetchFromCommunityApi(username);
            } catch (err) {
                console.warn('Community contributions API failed, attempting direct scrape fallback:', err.message);
            }
        }

        // 3. Fallback to direct public scrape from github.com (no token required)
        if (!calendar) {
            try {
                calendar = await fetchFromGithubScrape(username);
            } catch (err) {
                console.error('All contribution retrieval methods failed:', err.message);
            }
        }

        if (!calendar) {
            return NextResponse.json({ error: 'Failed to fetch contributions' }, { status: 500 });
        }

        return NextResponse.json(calendar, {
            headers: {
                'Cache-Control': `public, max-age=${CACHE_TTL}, stale-while-revalidate=${CACHE_TTL * 24}`
            }
        });
    } catch (error) {
        console.error('GitHub contributions API error:', error);
        return NextResponse.json({ error: 'Failed to fetch contributions' }, { status: 500 });
    }
}
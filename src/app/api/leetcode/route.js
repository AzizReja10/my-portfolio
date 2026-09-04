import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Pre-computed fallback data from AzizReja's profile to guarantee high availability
const FALLBACK_PROFILE = {
    username: "AzizReja",
    ranking: 212569,
    stats: {
        totalSolved: 497,
        totalQuestions: 4042,
        easySolved: 120,
        easyTotal: 962,
        mediumSolved: 310,
        mediumTotal: 2109,
        hardSolved: 67,
        hardTotal: 971,
    },
    contest: {
        rating: 1718,
        globalRanking: 109730,
        attendedContestsCount: 12,
        topPercentage: 12.69
    },
    badges: [
        {
            id: "10413959",
            displayName: "100 Days Badge 2026",
            icon: "https://assets.leetcode.com/static_assets/others/100_1080_1080.png"
        },
        {
            id: "9884470",
            displayName: "50 Days Badge 2026",
            icon: "https://assets.leetcode.com/static_assets/others/50_1080_1080.png"
        },
        {
            id: "8631653",
            displayName: "50 Days Badge 2025",
            icon: "https://assets.leetcode.com/static_assets/others/lg2550.png"
        },
        {
            id: "10233972",
            displayName: "Top Interview 150",
            icon: "https://assets.leetcode.com/static_assets/others/Top_100_Liked-1.png"
        }
    ]
};

function formatSubmissionWeeks(calendarMap) {
    const now = new Date();
    const endOfToday = new Date(now);
    endOfToday.setHours(23, 59, 59, 999);

    const oneYearAgo = new Date(now);
    oneYearAgo.setDate(oneYearAgo.getDate() - 365);
    oneYearAgo.setHours(0, 0, 0, 0);

    let totalSubmissionsLastYear = 0;
    let activeDays = 0;

    const startDate = new Date(oneYearAgo);
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Start on Sunday
    startDate.setHours(0, 0, 0, 0);

    const daysMap = {};
    for (const [tsStr, count] of Object.entries(calendarMap)) {
        const d = new Date(Number(tsStr) * 1000);
        const dateKey = d.toISOString().split('T')[0];
        daysMap[dateKey] = (daysMap[dateKey] || 0) + count;
    }

    const weeks = [];
    let curr = new Date(startDate);
    let currentWeek = [];

    while (curr <= endOfToday || currentWeek.length > 0) {
        const dateKey = curr.toISOString().split('T')[0];
        const count = daysMap[dateKey] || 0;

        if (curr >= oneYearAgo && curr <= endOfToday) {
            if (count > 0) activeDays++;
            totalSubmissionsLastYear += count;
        }

        let level = 'NONE';
        if (count >= 10) level = 'FOURTH_QUARTILE';
        else if (count >= 6) level = 'THIRD_QUARTILE';
        else if (count >= 3) level = 'SECOND_QUARTILE';
        else if (count >= 1) level = 'FIRST_QUARTILE';

        currentWeek.push({
            date: dateKey,
            count,
            level
        });

        if (currentWeek.length === 7) {
            weeks.push({ days: currentWeek });
            currentWeek = [];
        }

        curr.setDate(curr.getDate() + 1);
        if (curr > endOfToday && currentWeek.length === 0) break;
    }

    if (currentWeek.length > 0) {
        while (currentWeek.length < 7) {
            const dateKey = curr.toISOString().split('T')[0];
            currentWeek.push({ date: dateKey, count: 0, level: 'NONE' });
            curr.setDate(curr.getDate() + 1);
        }
        weeks.push({ days: currentWeek });
    }

    // Calculate max streak & current streak
    let maxStreak = 0;
    let currStreak = 0;
    let tempStreak = 0;
    let scanDate = new Date(oneYearAgo);

    while (scanDate <= endOfToday) {
        const key = scanDate.toISOString().split('T')[0];
        if (daysMap[key] > 0) {
            tempStreak++;
            if (tempStreak > maxStreak) maxStreak = tempStreak;
        } else {
            tempStreak = 0;
        }
        scanDate.setDate(scanDate.getDate() + 1);
    }

    // Current streak (counting backwards from today or yesterday)
    let backDate = new Date(now);
    while (true) {
        const key = backDate.toISOString().split('T')[0];
        if (daysMap[key] > 0) {
            currStreak++;
            backDate.setDate(backDate.getDate() - 1);
        } else if (backDate.toDateString() === now.toDateString()) {
            backDate.setDate(backDate.getDate() - 1);
        } else {
            break;
        }
    }

    return {
        totalSubmissionsPastYear: totalSubmissionsLastYear,
        totalActiveDays: activeDays,
        maxStreak,
        currentStreak: currStreak,
        weeks
    };
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username') || 'AzizReja';

        const response = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            },
            body: JSON.stringify({
                query: `
                    query getUserFull($username: String!) {
                        allQuestionsCount {
                            difficulty
                            count
                        }
                        matchedUser(username: $username) {
                            username
                            profile {
                                ranking
                            }
                            submitStatsGlobal {
                                acSubmissionNum {
                                    difficulty
                                    count
                                    submissions
                                }
                            }
                            submissionCalendar
                            badges {
                                id
                                displayName
                                icon
                                creationDate
                            }
                        }
                        userContestRanking(username: $username) {
                            attendedContestsCount
                            rating
                            globalRanking
                            topPercentage
                        }
                    }
                `,
                variables: { username }
            })
        });

        if (!response.ok) {
            throw new Error(`LeetCode responded with status ${response.status}`);
        }

        const data = await response.json();
        const matchedUser = data?.data?.matchedUser;

        if (!matchedUser) {
            throw new Error('LeetCode user data not found');
        }

        const allQuestions = data?.data?.allQuestionsCount || [];
        const contest = data?.data?.userContestRanking;
        const acStats = matchedUser.submitStatsGlobal?.acSubmissionNum || [];

        const getSolvedCount = (diff) => {
            const item = acStats.find(s => s.difficulty.toLowerCase() === diff.toLowerCase());
            return item ? item.count : 0;
        };

        const getTotalCount = (diff) => {
            const item = allQuestions.find(q => q.difficulty.toLowerCase() === diff.toLowerCase());
            return item ? item.count : 0;
        };

        const calendarMap = JSON.parse(matchedUser.submissionCalendar || '{}');
        const submissionData = formatSubmissionWeeks(calendarMap);

        const result = {
            username: matchedUser.username,
            ranking: matchedUser.profile?.ranking || 0,
            stats: {
                totalSolved: getSolvedCount('all'),
                totalQuestions: getTotalCount('all') || 4042,
                easySolved: getSolvedCount('easy'),
                easyTotal: getTotalCount('easy') || 962,
                mediumSolved: getSolvedCount('medium'),
                mediumTotal: getTotalCount('medium') || 2109,
                hardSolved: getSolvedCount('hard'),
                hardTotal: getTotalCount('hard') || 971,
            },
            contest: contest ? {
                rating: Math.round(contest.rating || 0),
                globalRanking: contest.globalRanking || 0,
                attendedContestsCount: contest.attendedContestsCount || 0,
                topPercentage: contest.topPercentage || 0,
            } : FALLBACK_PROFILE.contest,
            badges: matchedUser.badges || FALLBACK_PROFILE.badges,
            submission: submissionData
        };

        return NextResponse.json(result, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
            }
        });
    } catch (error) {
        console.error('LeetCode API route error, using fallback:', error);
        
        const fallbackResult = {
            ...FALLBACK_PROFILE,
            submission: {
                totalSubmissionsPastYear: 1126,
                totalActiveDays: 219,
                maxStreak: 51,
                currentStreak: 5,
                weeks: []
            }
        };

        return NextResponse.json(fallbackResult, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
            }
        });
    }
}

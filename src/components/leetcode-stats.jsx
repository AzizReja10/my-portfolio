'use client';

import React, { useState, useEffect } from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { SiLeetcode } from "react-icons/si";
import { Trophy, Flame, Calendar, Award, ExternalLink } from "lucide-react";

const levelColors = {
    NONE: "bg-muted/60 dark:bg-muted/25 border border-border/20",
    FIRST_QUARTILE: "bg-emerald-200 dark:bg-emerald-950/90 text-foreground border border-emerald-300/30",
    SECOND_QUARTILE: "bg-emerald-400 dark:bg-emerald-700 text-foreground",
    THIRD_QUARTILE: "bg-emerald-500 dark:bg-emerald-500 text-foreground",
    FOURTH_QUARTILE: "bg-emerald-600 dark:bg-emerald-400 text-foreground shadow-[0_0_8px_rgba(16,185,129,0.3)]",
};

const MIN_CELL = 10;
const CELL_GAP = 3;

export default function LeetcodeStats({ username = 'AzizReja' }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = () => {
            fetch(`/api/leetcode?username=${username}&t=${Date.now()}`, { cache: 'no-store' })
                .then(res => {
                    if (!res.ok) throw new Error('Failed to fetch LeetCode data');
                    return res.json();
                })
                .then(resData => {
                    setData(resData);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('LeetCode fetch error:', err);
                    setLoading(false);
                });
        };

        fetchData();

        // Auto-refresh when you switch back to this tab (e.g. after solving on LeetCode)
        const onFocus = () => fetchData();
        window.addEventListener('focus', onFocus);

        // Periodic refresh every 60 seconds
        const interval = setInterval(fetchData, 60000);

        return () => {
            window.removeEventListener('focus', onFocus);
            clearInterval(interval);
        };
    }, [username]);

    if (loading) {
        return (
            <div className="flex w-full flex-col gap-4 font-sans animate-pulse">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="h-28 rounded-xl bg-muted/30" />
                    <div className="h-28 rounded-xl bg-muted/30" />
                    <div className="h-28 rounded-xl bg-muted/30" />
                </div>
                <div className="h-[90px] w-full rounded-xl bg-muted/20" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex w-full items-center justify-between py-4 text-xs text-muted-foreground">
                <span>LeetCode statistics temporarily unavailable.</span>
                <a
                    href={`https://leetcode.com/u/${username}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline font-medium flex items-center gap-1"
                >
                    View LeetCode Profile →
                </a>
            </div>
        );
    }

    const { stats, contest, badges = [], submission = {} } = data;
    const { weeks = [], totalSubmissionsPastYear = 1125, totalActiveDays = 219, maxStreak = 51 } = submission;

    // Calculate months for calendar
    const minGridWidth = weeks.length * (MIN_CELL + CELL_GAP);
    const months = [];
    if (weeks.length > 0 && weeks[0]?.days?.length > 0) {
        let lastMonth = new Date(weeks[0].days[0].date).toLocaleString('default', { month: 'short' });
        let lastMonthWeeks = 0;

        weeks.forEach((week) => {
            const firstDay = week.days[0]?.date;
            if (!firstDay) return;
            const month = new Date(firstDay).toLocaleString('default', { month: 'short' });

            if (month !== lastMonth) {
                months.push({ label: lastMonth, weeks: lastMonthWeeks });
                lastMonth = month;
                lastMonthWeeks = 0;
            }
            lastMonthWeeks += 1;
        });

        if (lastMonthWeeks > 0) {
            months.push({ label: lastMonth, weeks: lastMonthWeeks });
        }
    }

    // Calculations for progress ring
    const totalSolved = stats?.totalSolved || 0;
    const totalQuestions = stats?.totalQuestions || 4042;
    const solvedPercentage = Math.min(100, Math.round((totalSolved / totalQuestions) * 100));

    const radius = 38;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (circumference * solvedPercentage) / 100;

    return (
        <div className="flex w-full flex-col gap-5 font-sans">
            {/* Top Cards: Solved, Contest, Badges & Consistency */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                
                {/* Solved Problems Breakdown */}
                <div className="sm:col-span-7 flex flex-col justify-between p-4 rounded-xl bg-background/50 border border-border/50 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground flex items-center gap-1.5">
                            <SiLeetcode className="size-3.5 text-[#FFA116]" />
                            Problems Solved
                        </span>
                        {data.ranking ? (
                            <span className="text-[11px] text-muted-foreground/70 font-mono">
                                Rank #{data.ranking.toLocaleString()}
                            </span>
                        ) : null}
                    </div>

                    <div className="flex items-center gap-5 my-auto">
                        {/* Circular Progress Indicator */}
                        <div className="relative flex items-center justify-center shrink-0 w-22 h-22">
                            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 96 96">
                                <circle
                                    cx="48"
                                    cy="48"
                                    r={radius}
                                    className="text-muted/30 stroke-current"
                                    strokeWidth="7"
                                    fill="transparent"
                                />
                                <circle
                                    cx="48"
                                    cy="48"
                                    r={radius}
                                    className="text-[#FFA116] stroke-current transition-all duration-1000 ease-out"
                                    strokeWidth="7"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                    fill="transparent"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center justify-center text-center">
                                <span className="text-xl font-bold font-mono tracking-tight text-foreground leading-none">
                                    {totalSolved}
                                </span>
                                <span className="text-[10px] text-muted-foreground mt-0.5">
                                    /{totalQuestions}
                                </span>
                            </div>
                        </div>

                        {/* Breakdown bars */}
                        <div className="flex flex-col gap-2 flex-1 min-w-0">
                            {/* Easy */}
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-emerald-500 dark:text-emerald-400 font-medium">Easy</span>
                                    <span className="font-mono text-muted-foreground text-[11px]">
                                        <strong className="text-foreground">{stats?.easySolved}</strong>/{stats?.easyTotal}
                                    </span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-muted/40 overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                                        style={{ width: `${(stats?.easySolved / (stats?.easyTotal || 1)) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Medium */}
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-amber-500 dark:text-amber-400 font-medium">Medium</span>
                                    <span className="font-mono text-muted-foreground text-[11px]">
                                        <strong className="text-foreground">{stats?.mediumSolved}</strong>/{stats?.mediumTotal}
                                    </span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-muted/40 overflow-hidden">
                                    <div
                                        className="h-full bg-amber-500 rounded-full transition-all duration-700"
                                        style={{ width: `${(stats?.mediumSolved / (stats?.mediumTotal || 1)) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Hard */}
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-rose-500 dark:text-rose-400 font-medium">Hard</span>
                                    <span className="font-mono text-muted-foreground text-[11px]">
                                        <strong className="text-foreground">{stats?.hardSolved}</strong>/{stats?.hardTotal}
                                    </span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-muted/40 overflow-hidden">
                                    <div
                                        className="h-full bg-rose-500 rounded-full transition-all duration-700"
                                        style={{ width: `${(stats?.hardSolved / (stats?.hardTotal || 1)) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contest Rating & Badges */}
                <div className="sm:col-span-5 flex flex-col justify-between p-4 rounded-xl bg-background/50 border border-border/50 backdrop-blur-sm">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground flex items-center gap-1.5">
                                <Trophy className="size-3.5 text-amber-500" />
                                Contest Rating
                            </span>
                            {contest?.topPercentage ? (
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                    Top {contest.topPercentage}%
                                </span>
                            ) : null}
                        </div>

                        <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-2xl font-bold font-mono tracking-tight text-foreground">
                                {contest?.rating ? contest.rating.toLocaleString() : '1,718'}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                · {contest?.attendedContestsCount || 12} Contests
                            </span>
                        </div>

                        <div className="mt-1 text-xs text-muted-foreground/80 font-mono">
                            Global Rank: <span className="text-foreground font-medium">#{contest?.globalRanking ? contest.globalRanking.toLocaleString() : '109,730'}</span>
                        </div>
                    </div>

                    {/* Badges showcase */}
                    {badges.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border/40">
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium flex items-center gap-1">
                                    <Award className="size-3 text-emerald-500" />
                                    Badges ({badges.length})
                                </span>
                                <span className="text-[10px] text-muted-foreground/60">
                                    {badges[0]?.displayName}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                {badges.slice(0, 4).map((badge) => (
                                    <Tooltip key={badge.id || badge.displayName}>
                                        <TooltipTrigger asChild>
                                            <div className="group relative flex h-9 w-9 items-center justify-center rounded-lg bg-muted/40 p-1 border border-border/40 hover:border-[#FFA116]/50 hover:bg-muted/80 transition-all cursor-pointer">
                                                <img
                                                    src={badge.icon}
                                                    alt={badge.displayName}
                                                    className="h-full w-full object-contain transition-transform group-hover:scale-115"
                                                />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" sideOffset={6} className="text-xs">
                                            <p className="font-semibold">{badge.displayName}</p>
                                            {badge.creationDate && (
                                                <p className="text-[10px] text-muted-foreground">Earned {badge.creationDate}</p>
                                            )}
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Submission Heatmap Section */}
            <div className="p-4 rounded-xl bg-background/50 border border-border/50 backdrop-blur-sm">
                {/* Header row: Total submissions, active days, max streak */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-border/40">
                    <div>
                        <span className="text-sm font-semibold text-foreground">
                            {totalSubmissionsPastYear.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground ml-1.5">
                            submissions in the past one year
                        </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="size-3.5 text-muted-foreground" />
                            <span>Total active days:</span>
                            <strong className="text-foreground">{totalActiveDays}</strong>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Flame className="size-3.5 text-orange-500" />
                            <span>Max streak:</span>
                            <strong className="text-foreground">{maxStreak}</strong>
                        </div>
                    </div>
                </div>

                {/* The Heatmap Grid */}
                {weeks.length > 0 ? (
                    <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        <div style={{ minWidth: `${minGridWidth}px` }}>
                            {/* Months label row */}
                            <div className="flex w-full">
                                {months.map((m, i) => (
                                    <span
                                        key={i}
                                        className="text-[10px] text-muted-foreground/80 overflow-hidden font-mono"
                                        style={{ width: `${(m.weeks / weeks.length) * 100}%` }}
                                    >
                                        {m.label}
                                    </span>
                                ))}
                            </div>

                            {/* 53 Weeks x 7 Days Columns */}
                            <div className="flex w-full gap-[3px] mt-1.5">
                                {weeks.map((week, weekIndex) => (
                                    <div key={weekIndex} className="flex flex-1 flex-col gap-[3px]">
                                        {week.days.map((day, dayIndex) => (
                                            <Tooltip key={dayIndex}>
                                                <TooltipTrigger asChild>
                                                    <div
                                                        className={`aspect-square w-full rounded-[2px] cursor-pointer transition-transform duration-150 hover:scale-130 ${levelColors[day.level] || levelColors.NONE}`}
                                                    />
                                                </TooltipTrigger>
                                                <TooltipContent side="top" sideOffset={4} className="px-2 py-1.5 text-xs">
                                                    <strong className="font-medium">
                                                        {day.count === 0 ? 'No submissions' : `${day.count} submission${day.count > 1 ? 's' : ''}`}
                                                    </strong>{' '}
                                                    on {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </TooltipContent>
                                            </Tooltip>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-4 text-center text-xs text-muted-foreground">
                        Submission calendar loading...
                    </div>
                )}

                {/* Footer Legend & Profile Link */}
                <div className="flex items-center justify-between mt-3 pt-2 text-[11px] text-muted-foreground font-mono">
                    <a
                        href={`https://leetcode.com/u/${username}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <span>leetcode.com/u/{username}</span>
                        <ExternalLink className="size-3" />
                    </a>

                    <div className="flex items-center gap-1.5">
                        <span>Less</span>
                        <div className="flex gap-[3px]">
                            {Object.values(levelColors).map((color, i) => (
                                <div key={i} className={`h-[10px] w-[10px] rounded-[2px] ${color}`} />
                            ))}
                        </div>
                        <span>More</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

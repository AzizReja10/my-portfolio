'use client';

import React, { useState, useEffect, useRef } from 'react'
import { RotateCcw } from "lucide-react"

const levelColors = {
    NONE: "bg-muted/60 dark:bg-muted/30 border border-border/20",
    FIRST_QUARTILE: "bg-emerald-200 dark:bg-emerald-950 text-foreground",
    SECOND_QUARTILE: "bg-emerald-400 dark:bg-emerald-700 text-foreground",
    THIRD_QUARTILE: "bg-emerald-500 dark:bg-emerald-500 text-foreground",
    FOURTH_QUARTILE: "bg-emerald-600 dark:bg-emerald-400 text-foreground",
}

const MIN_CELL = 10
const CELL_GAP = 3

export default function GithubCalendar({ username }) {
    const [calendarData, setCalendarData] = useState(null)
    const [hasError, setHasError] = useState(false)
    const calendarRef = useRef(null)
    const gridContainerRef = useRef(null)
    const [hoveredDay, setHoveredDay] = useState(null)

    const handleReplay = () => {
        if (!calendarRef.current) return
        calendarRef.current.classList.remove('heatmap-animate')
        void calendarRef.current.offsetWidth
        calendarRef.current.classList.add('heatmap-animate')
    }

    useEffect(() => {
        const el = calendarRef.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        el.classList.add('heatmap-animate')
                    })
                    observer.disconnect()
                }
            },
            { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [calendarData])

    useEffect(() => {
        fetch(`/api/github-contributions?username=${username}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch contributions');
                return res.json();
            })
            .then(data => {
                if (data && data.weeks) {
                    setCalendarData(data);
                } else {
                    setHasError(true);
                }
            })
            .catch(err => {
                console.error('GitHub calendar error:', err);
                setHasError(true);
            });
    }, [username]);

    if (hasError) {
        return (
            <div className="flex w-full items-center justify-between py-3 text-xs text-muted-foreground">
                <span>Contributions graph temporarily unavailable.</span>
                <a 
                    href={`https://github.com/${username}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline font-medium flex items-center gap-1"
                >
                    View commits on GitHub →
                </a>
            </div>
        )
    }

    if (!calendarData) {
        return (
            <div className="flex w-full flex-col gap-3 font-sans animate-pulse">
                <div className="h-4 w-full" />
                <div className="h-[72px] w-full rounded bg-muted/30" />
                <div className="h-4 w-full" />
            </div>
        )
    }

    const weeks = calendarData.weeks || []
    const total = calendarData.totalContributions || 0
    const firstMonth = new Date(weeks[0].contributionDays[0].date).toLocaleString('default', { month: 'short' })
    const minGridWidth = weeks.length * (MIN_CELL + CELL_GAP)

    const months = []
    let lastMonth = firstMonth
    let lastMonthWeeks = 0

    weeks.forEach((week) => {
        const firstDay = week.contributionDays[0].date
        const month = new Date(firstDay).toLocaleString('default', { month: 'short' })

        if (month !== lastMonth) {
            months.push({ label: lastMonth, weeks: lastMonthWeeks })
            lastMonth = month
            lastMonthWeeks = 0
        }

        lastMonthWeeks += 1
    });

    if (lastMonthWeeks > 0) {
        months.push({ label: lastMonth, weeks: lastMonthWeeks })
    }

    let initialGapWeeks = 0
    let endingGapWeeks = 0

    if (months.length > 12) {
        const first = months[0]
        const last = months[months.length - 1]

        if (first.weeks < last.weeks) {
            months.shift()
            initialGapWeeks = first.weeks
        } else {
            months.pop()
            endingGapWeeks = last.weeks
        }
    }

    return (
        <div 
            ref={calendarRef}
            className="flex w-full flex-col gap-3 font-sans"
        >
            <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div ref={gridContainerRef} className="relative" style={{ minWidth: `${minGridWidth}px` }}>
                    {/* Floating single high-performance tooltip */}
                    {hoveredDay && (
                        <div
                            className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-full mb-2 px-2.5 py-1.5 rounded-md bg-foreground text-background text-xs whitespace-nowrap shadow-lg animate-in fade-in-0 zoom-in-95 duration-75"
                            style={{ left: `${hoveredDay.x}px`, top: `${hoveredDay.y - 6}px` }}
                        >
                            <strong className="font-medium">{hoveredDay.count}</strong> contributions on {hoveredDay.date}
                            <div className="absolute left-1/2 -translate-x-1/2 top-full size-1.5 -mt-0.5 rotate-45 bg-foreground" />
                        </div>
                    )}

                    <div className="flex w-full">
                        {initialGapWeeks > 0 && (
                            <span style={{ width: `${(initialGapWeeks / weeks.length) * 100}%` }} />
                        )}
                        {months.map((m, i) => (
                            <span
                                key={i}
                                className="text-[11px] text-muted-foreground overflow-hidden"
                                style={{ width: `${(m.weeks / weeks.length) * 100}%` }}
                            >
                                {m.label}
                            </span>
                        ))}
                        {endingGapWeeks > 0 && (
                            <span style={{ width: `${(endingGapWeeks / weeks.length) * 100}%` }} />
                        )}
                    </div>

                    <div className="flex w-full gap-[3px] mt-1">
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex flex-1 flex-col gap-[3px]">
                                {week.contributionDays.map((day, dayIndex) => (
                                    <div 
                                        key={dayIndex}
                                        onMouseEnter={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            const containerRect = gridContainerRef.current?.getBoundingClientRect();
                                            if (containerRect) {
                                                setHoveredDay({
                                                    count: day.contributionCount,
                                                    date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                                                    x: rect.left - containerRect.left + rect.width / 2,
                                                    y: rect.top - containerRect.top,
                                                });
                                            }
                                        }}
                                        onMouseLeave={() => setHoveredDay(null)}
                                        className={`heatmap-cell aspect-square w-full rounded-[2px] cursor-pointer ${levelColors[day.contributionLevel]}`} 
                                        style={{ '--delay': `${(weekIndex * 7 + ((week.contributionDays.length - 1) - dayIndex)) * 3.5}ms` }}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2">
                    <span>
                        <strong className="font-semibold text-foreground">{total}</strong> contributions last year
                    </span>
                    <button
                        type="button"
                        onClick={handleReplay}
                        title="Replay animation"
                        className="p-1 rounded-md text-muted-foreground/60 hover:text-foreground hover:bg-muted/40 transition-colors cursor-pointer"
                    >
                        <RotateCcw className="size-3" />
                    </button>
                </div>
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
    )
}
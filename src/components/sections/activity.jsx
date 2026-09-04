"use client";

import React from 'react'
import { motion } from 'motion/react'
import GithubCalendar from '@/components/github-calendar'
import LeetcodeStats from '@/components/leetcode-stats'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { FaJava } from "react-icons/fa6";
import {
    SiSpringboot,
    SiPython,
    SiFastapi,
    SiApachekafka,
    SiReact,
    SiPostgresql,
    SiMongodb,
    SiDocker,
    SiTypescript,
    SiJavascript,
    SiTailwindcss,
    SiGit,
    SiPostman,
    SiLangchain,
    SiLanggraph,
} from "react-icons/si";

const techStack = [
    { name: "Spring Boot", Icon: SiSpringboot, color: "#6DB33F" },
    { name: "Python", Icon: SiPython, color: "#3776AB" },
    { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
    { name: "Kafka", Icon: SiApachekafka, color: "#E05242" },
    { name: "React", Icon: SiReact, color: "#61DAFB" },
    { name: "Java", Icon: FaJava, color: "#EA2D2E" },
    { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
    { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
    { name: "Docker", Icon: SiDocker, color: "#2496ED" },
    { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
    { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
    { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Git", Icon: SiGit, color: "#F05032" },
    { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
    { name: "LangChain", Icon: SiLangchain, className: "text-[#1C3C3C] dark:text-[#2CD8A6]" },
    { name: "LangGraph", Icon: SiLanggraph, color: "#0284C7" },
]

const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            staggerChildren: 0.04,
            delayChildren: 0.15
        }
    }
};

const iconVariants = {
    hidden: { opacity: 0, scale: 0.7, y: 10 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring", stiffness: 350, damping: 20 }
    }
};

export default function Activity() {
    return (
        <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="mt-12 sm:mt-16 space-y-10"
        >
            {/* GitHub Commits & Activity */}
            <div>
                <div className="flex items-center justify-between mb-3.5">
                    <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                        GitHub Activity
                    </h2>
                    <a
                        href="https://github.com/AzizReja10"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-muted-foreground/70 hover:text-foreground transition-colors"
                    >
                        @AzizReja10
                    </a>
                </div>

                <div className="rounded-2xl p-4 sm:p-5 bg-card/60 border border-border/60 backdrop-blur-sm shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2)]">
                    <GithubCalendar username="AzizReja10" />
                </div>
            </div>

            {/* LeetCode Submissions & Activity */}
            <div>
                <div className="flex items-center justify-between mb-3.5">
                    <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                        LeetCode Activity
                    </h2>
                    <a
                        href="https://leetcode.com/u/AzizReja/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-muted-foreground/70 hover:text-foreground transition-colors"
                    >
                        @AzizReja
                    </a>
                </div>

                <div className="rounded-2xl p-4 sm:p-5 bg-card/60 border border-border/60 backdrop-blur-sm shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2)]">
                    <LeetcodeStats username="AzizReja" />
                </div>
            </div>

            {/* Tech Stack */}
            <div>
                <div className="flex items-center justify-between mb-3.5">
                    <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                        Tech Stack
                    </h2>
                    <span className="text-[11px] text-muted-foreground/60">
                        16 tools & frameworks
                    </span>
                </div>

                <div className="rounded-2xl p-4 sm:p-5 bg-card/60 border border-border/60 backdrop-blur-sm shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2)]">
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4 justify-items-center">
                        {techStack.map((tech) => {
                            const IconComponent = tech.Icon;
                            return (
                                <Tooltip key={tech.name}>
                                    <TooltipTrigger asChild>
                                        <motion.div
                                            variants={iconVariants}
                                            whileHover={{ 
                                                scale: 1.25, 
                                                y: -4,
                                                filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.15))"
                                            }}
                                            whileTap={{ scale: 0.92 }}
                                            transition={{ type: "spring", stiffness: 450, damping: 17 }}
                                            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-muted/40 hover:bg-muted/80 border border-border/40 hover:border-border transition-colors cursor-pointer"
                                            aria-label={tech.name}
                                        >
                                            <IconComponent
                                                className={`h-5 w-5 sm:h-6 sm:w-6 transition-transform ${tech.className || ''}`}
                                                style={tech.color ? { color: tech.color } : undefined}
                                            />
                                        </motion.div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" sideOffset={8} className="font-medium text-xs">
                                        {tech.name}
                                    </TooltipContent>
                                </Tooltip>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.section>
    )
}
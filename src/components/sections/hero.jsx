"use client";

import React from 'react'
import { motion } from 'motion/react'
import { Code2, MapPin, Mail, Clock, Globe, User2, FileText } from 'lucide-react'
import { SiGithub, SiLeetcode } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import RelativeTime from '../relative-time'
import { Button } from '../ui/button';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
    }
};

export default function Hero() {
    return (
        <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
        >
            {/* Header: Avatar, Name & Status */}
            <motion.div variants={itemVariants} className="md:mb-8 mb-6 flex flex-row items-start gap-4">
                <motion.div
                    whileHover={{ scale: 1.06, rotate: 2 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="relative shrink-0 group cursor-pointer"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-300"></div>
                    <img
                        alt="Aziz"
                        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-border/80 shadow-sm shrink-0"
                        src="/quby.png"
                    />
                </motion.div>

                <div className="flex flex-col md:gap-1 gap-0.5 flex-1">
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-col sm:flex-row">
                        <h1 className="text-2xl font-inter sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                            Aziz Reja
                        </h1>
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[11px] font-medium font-inter">Available for work</span>
                        </motion.div>
                    </div>
                    <p className="text-muted-foreground text-sm sm:text-base font-normal">
                        Full-Stack Developer
                    </p>
                </div>
            </motion.div>

            {/* Info Grid */}
            <motion.div variants={itemVariants} className="mb-6 md:mb-8">
                <div className="grid grid-cols-1 gap-2.5 sm:gap-3 md:grid-cols-2 p-3 sm:p-4 rounded-2xl bg-card/60 border border-border/60 backdrop-blur-sm shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2)]">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2.5 group">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 bg-muted/60 text-muted-foreground group-hover:text-foreground group-hover:border-border transition-colors">
                                <Code2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                            </span>
                            <span className="text-xs text-muted-foreground group-hover:text-foreground md:text-[13px] transition-colors">
                                Full-Stack & Backend Developer
                            </span>
                        </div>

                        <div className="flex items-center gap-2.5 group">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 bg-muted/60 text-muted-foreground group-hover:text-foreground group-hover:border-border transition-colors">
                                <MapPin className="w-3.5 h-3.5" strokeWidth={1.75} />
                            </span>
                            <span className="text-xs text-muted-foreground group-hover:text-foreground md:text-[13px] transition-colors">
                                Kolkata, West Bengal
                            </span>
                        </div>

                        <div className="flex items-center gap-2.5 group">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 bg-muted/60 text-muted-foreground group-hover:text-foreground group-hover:border-border transition-colors">
                                <Mail className="w-3.5 h-3.5" strokeWidth={1.75} />
                            </span>
                            <a
                                href="mailto:rejaaziz686@gmail.com"
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors hover:underline md:text-[13px]"
                            >
                                rejaaziz686@gmail.com
                            </a>
                        </div>
                    </div>

                    <div className="space-y-2 border-t sm:border-t-0 sm:border-l border-border/40 pt-2 sm:pt-0 sm:pl-3">
                        <div className="flex items-center gap-2.5 group">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 bg-muted/60 text-muted-foreground group-hover:text-foreground group-hover:border-border transition-colors">
                                <Clock className="w-3.5 h-3.5" strokeWidth={1.75} />
                            </span>
                            <div className="text-xs text-muted-foreground group-hover:text-foreground md:text-[13px] transition-colors">
                                <RelativeTime />
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5 group">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 bg-muted/60 text-muted-foreground group-hover:text-foreground group-hover:border-border transition-colors">
                                <Globe className="w-3.5 h-3.5" strokeWidth={1.75} />
                            </span>
                            <a
                                href="https://github.com/AzizReja10"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors hover:underline md:text-[13px]"
                            >
                                github.com/AzizReja10
                            </a>
                        </div>

                        <div className="flex items-center gap-2.5 group">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 bg-muted/60 text-muted-foreground group-hover:text-foreground group-hover:border-border transition-colors">
                                <User2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                            </span>
                            <span className="text-xs text-muted-foreground group-hover:text-foreground md:text-[13px] transition-colors">
                                he/him
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* CTA Buttons & Social Icons */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                        <Button size="sm" asChild className="h-9 gap-2 shadow-sm font-medium">
                            <a href="https://drive.google.com/file/d/1UiNbj0DvE-Q_258MC7pacM_tXZUIKAQI/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                                <FileText className="h-4 w-4" strokeWidth={1.75} />
                                <span className="text-[13px]">Resume</span>
                            </a>
                        </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                        <Button variant="outline" size="sm" asChild className="h-9 gap-2 border-border/70 hover:bg-muted/80 shadow-xs font-medium">
                            <a href="#contact">
                                <Mail className="h-4 w-4" strokeWidth={1.75} />
                                <span className="text-[13px]">Contact</span>
                            </a>
                        </Button>
                    </motion.div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <div className="mx-1 hidden h-5 w-px bg-border/60 sm:block" />

                    <motion.div whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.94 }}>
                        <Button variant="outline" size="icon" asChild className="h-9 w-9 border-border/70 hover:border-border shadow-xs">
                            <a href="https://www.linkedin.com/in/aziz-reja-8b916a33a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FaLinkedin className="h-4 w-4" />
                            </a>
                        </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.94 }}>
                        <Button variant="outline" size="icon" asChild className="h-9 w-9 border-border/70 hover:border-border shadow-xs">
                            <a href="https://leetcode.com/u/AzizReja/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                                <SiLeetcode className="h-4 w-4" />
                            </a>
                        </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.94 }}>
                        <Button variant="outline" size="icon" asChild className="h-9 w-9 border-border/70 hover:border-border shadow-xs">
                            <a href="https://github.com/AzizReja10" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <SiGithub className="h-4 w-4" />
                            </a>
                        </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.94 }}>
                        <Button variant="outline" size="icon" asChild className="h-9 w-9 border-border/70 hover:border-border shadow-xs">
                            <a href="mailto:rejaaziz686@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
                                <Mail className="h-4 w-4" strokeWidth={1.75} />
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </motion.section>
    )
}

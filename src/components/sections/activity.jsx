import React from 'react'
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

export default function Activity() {
    return (
        <section className="mt-12 sm:mt-14">
            <div>
                <h2 className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">Tech Stack</h2>
                <div className="flex flex-wrap items-center gap-3.5 sm:gap-4.5">
                    {techStack.map((tech) => {
                        const IconComponent = tech.Icon;
                        return (
                            <Tooltip key={tech.name}>
                                <TooltipTrigger asChild>
                                    <div
                                        className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110"
                                        aria-label={tech.name}
                                    >
                                        <IconComponent
                                            className={`h-6 w-6 sm:h-7 sm:w-7 transition-colors ${tech.className || ''}`}
                                            style={tech.color ? { color: tech.color } : undefined}
                                        />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" sideOffset={6}>
                                    {tech.name}
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
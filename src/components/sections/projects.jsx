"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Globe, ExternalLink } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { SHOWCASE_DATA } from "@/lib/showcase";

export default function Projects() {
  const projects =
    SHOWCASE_DATA.find((item) => item.category === "projects")?.items.slice(
      0,
      4
    ) || [];

  return (
    <section className="mt-16 sm:mt-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
          Featured Projects
        </h2>
        {projects.length >= 4 && (
          <a
            href="/showcase/projects"
            className="group flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            View all
            <ExternalLink className="size-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {projects.map((project, idx) => (
          <motion.article
            key={project.title || idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
            whileHover={{ y: -5 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 font-geist backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]"
          >
            {/* Project Image */}
            <div className="relative h-42 w-full shrink-0 overflow-hidden bg-muted/40 sm:h-48">
              <img
                src={project.image}
                alt={`${project.title} project preview`}
                loading={idx < 2 ? "eager" : "lazy"}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Project Content */}
            <div className="flex flex-1 flex-col p-4 sm:p-5">
              {/* Title + Links */}
              <div className="mb-2.5 flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-foreground tracking-tight">
                  {project.title}
                </h3>

                <div className="flex shrink-0 items-center gap-2">
                  {/* GitHub */}
                  {project.github && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} on GitHub`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
                        >
                          <FiGithub className="size-4" />
                        </a>
                      </TooltipTrigger>

                      <TooltipContent side="top" sideOffset={6}>
                        GitHub
                      </TooltipContent>
                    </Tooltip>
                  )}

                  {/* Live Project */}
                  {project.link && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} live`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
                        >
                          <Globe className="size-4" />
                        </a>
                      </TooltipTrigger>

                      <TooltipContent side="top" sideOffset={6}>
                        Live Demo
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="mb-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              {/* Technologies */}
              {project.tech?.length > 0 && (
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
                  {project.tech.map((tech, techIndex) => (
                    <Tooltip key={`${tech.name}-${techIndex}`}>
                      <TooltipTrigger asChild>
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted/40 p-1 transition-transform hover:scale-115">
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            loading="lazy"
                            className={`h-4 w-4 object-contain ${
                              tech.invertDark ? "dark:invert" : ""
                            }`}
                          />
                        </div>
                      </TooltipTrigger>

                      <TooltipContent side="top" sideOffset={6}>
                        {tech.name}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
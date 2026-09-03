import React from "react";
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
    <section className="mt-20">
      <h2 className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
        Featured Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project, idx) => (
          <article
            key={project.title || idx}
            className="group flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card/70 font-geist transition-all duration-200 ease-out hover:border-border hover:bg-accent/50"
          >
            {/* Project Image */}
            <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-t-xl bg-muted/50 sm:h-50">
              <img
                src={project.image}
                alt={`${project.title} project preview`}
                loading={idx < 2 ? "eager" : "lazy"}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Project Content */}
            <div className="flex flex-1 flex-col px-4 py-4 sm:px-6 sm:py-5">
              {/* Title + Links */}
              <div className="mb-3 flex items-start justify-between gap-4">
                <h3 className="text-base font-medium text-foreground sm:text-lg">
                  {project.title}
                </h3>

                <div className="flex shrink-0 items-center gap-3">
                  {/* GitHub */}
                  {project.github && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} on GitHub`}
                          className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                        >
                          <FiGithub className="size-5" />
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
                          className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                        >
                          <Globe className="size-5" />
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
              <p className="mb-6 text-sm leading-relaxed text-foreground/70">
                {project.description}
              </p>

              {/* Technologies */}
              {project.tech?.length > 0 && (
                <div className="mt-auto flex flex-wrap items-center gap-3">
                  {project.tech.map((tech, techIndex) => (
                    <Tooltip key={`${tech.name}-${techIndex}`}>
                      <TooltipTrigger asChild>
                        <div className="flex h-6 w-6 items-center justify-center">
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            loading="lazy"
                            className={`h-6 w-6 object-contain transition-transform duration-150 ease-out hover:scale-110 ${
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
          </article>
        ))}
      </div>

      {/* View All Projects */}
      {projects.length >= 4 && (
        <div className="mt-6 flex justify-end">
          <a
            href="/showcase/projects"
            className="group flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all projects
            <ExternalLink className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      )}
    </section>
  );
}
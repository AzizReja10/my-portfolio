import React from 'react'

export default function Experience() {
    const experiences = [
        
    ]

    if (experiences.length === 0) return null;

    return (
        <section className="mt-16 sm:mt-20">
            <h2 className="mb-4 text-xs uppercase tracking-widest text-muted-foreground font-medium">Experience</h2>
            <div className="flex flex-col gap-4">
                {experiences.map((exp, idx) => (
                    <div key={idx} className="group py-5 px-6 rounded-xl bg-card/70 border border-border/50 hover:border-border hover:bg-accent/50 transition-all duration-200">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-lg bg-transparent border border-border flex items-center justify-center overflow-hidden">
                                {exp.logo ? (
                                    <img src={exp.logo} alt={`${exp.company} logo`} className="w-full h-full object-contain" />
                                ) : (
                                    <div className="w-full h-full bg-muted"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start sm:items-center gap-2 flex-col sm:flex-row flex-wrap">
                                    <h3 className="text-sm sm:text-base font-medium text-foreground">{exp.title}</h3>
                                </div>
                                <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm flex-wrap">
                                    <span className="font-medium text-foreground/70">{exp.company}</span>
                                    <span className="text-muted-foreground/50">•</span>
                                    <span className="text-muted-foreground/60">{exp.location}</span>
                                </div>
                            </div>
                            <span className="text-[10px] sm:text-xs text-muted-foreground/60 whitespace-nowrap shrink-0">{exp.date}</span>
                        </div>
                        {exp.description && (
                            <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed mb-3">
                                {exp.description}
                            </p>
                        )}
                        {exp.bullets && exp.bullets.length > 0 && (
                            <ul className="space-y-1.5">
                                {exp.bullets.map((bullet, bIdx) => (
                                    <li key={bIdx} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                                        <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-muted-foreground/50 shrink-0"></span>
                                        <span className="leading-relaxed">{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

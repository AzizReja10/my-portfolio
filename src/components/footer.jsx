import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa6'
import { MdOutlineEmail } from 'react-icons/md'
import { FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const socialLinks = [
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/aziz-reja-8b916a33a/",
        icon: <FaLinkedin className="w-4 h-4" />
    },
    {
        label: "LeetCode",
        href: "https://leetcode.com/u/AzizReja/",
        icon: <SiLeetcode className="w-4 h-4" />
    },
    {
        label: "Email",
        href: "mailto:rejaaziz686@gmail.com",
        icon: <MdOutlineEmail className="w-4 h-4" />
    },
    {
        label: "GitHub",
        href: "https://github.com/AzizReja10",
        icon: <FaGithub className="w-4 h-4" />
    }
]

const navLinks = [
    { label: "About", href: "/about" },
    { label: "Showcase", href: "/showcase" },
]

export default function Footer() {
    return (
        <footer className="border-t border-border/40 w-full max-w-3xl mx-auto">
            <div className="px-4 py-5 sm:py-7">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
                        <p className="text-xs text-muted-foreground/60">
                            © {new Date().getFullYear()} Aziz Reja.
                        </p>
                        <div className="hidden md:block w-px h-4 bg-border/50"></div>
                        <div className="flex items-center gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors duration-200"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {socialLinks.map((social) => (
                            <a
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground/70 hover:text-foreground transition-colors duration-200"
                                key={social.label}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

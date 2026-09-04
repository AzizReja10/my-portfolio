"use client";

import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import ThemeToggle from './theme-toggle'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from './ui/button';
import { HiMenu } from "react-icons/hi";
import { HyperText } from "@/components/ui/hyper-text"

const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/showcase", label: "Showcase" },
]
import NavLinks from './nav-links';

export default function Navbar() {
    return (
        <motion.header 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className='h-16 fixed left-0 top-0 w-full backdrop-blur-md bg-background/80 border-b border-border/50 z-100 transition-colors'
        >
            <nav className='w-full max-w-3xl mx-auto px-6 flex items-center h-full'>
                <Link className="text-sm font-medium tracking-tight flex items-center" href="/">
                    <span className="text-muted-foreground">~/</span>
                    <HyperText className={"text-sm"}>azizreja</HyperText>
                </Link>

                <div className="flex items-center gap-2 ml-auto">
                    <div className="hidden md:flex items-center gap-6 pr-3">
                        <NavLinks links={links} />
                    </div>

                    <ThemeToggle />

                    <div className="md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="icon">
                                    <HiMenu className="size-6" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-36 z-101">
                                {links.map(({ href, label }) => (
                                    <DropdownMenuItem key={href} asChild>
                                        <Link href={href} className="w-full cursor-pointer">
                                            {label}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </nav>
        </motion.header>
    )
}

const NavLink = ({ href, children }) => {
    return (
        <Link className="relative text-sm transition-colors after:content-[''] after:absolute after:w-0 after:-bottom-0.5 after:left-0 after:h-px after:bg-current after:transition-all hover:after:w-full text-muted-foreground hover:text-primary" href={href}>
            {children}
        </Link>
    )
}

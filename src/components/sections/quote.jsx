'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { IoMdQuote } from "react-icons/io";

export default function Quote() {
    const [quote, setQuote] = useState({
        text: "A journey of a thousand miles begins with a single step, but the right direction matters most.",
        author: "Lao Tzu"
    });

    useEffect(() => {
        fetch('/api/quote')
            .then(res => {
                if (!res.ok) throw new Error('API unavailable');
                return res.json();
            })
            .then(data => {
                if (data && data.quote) {
                    setQuote({
                        text: data.quote,
                        author: data.author
                    });
                }
            })
            .catch(() => {});
    }, []);

    return (
        <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-16 sm:mt-20"
        >
            <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-card/60 border border-border/60 backdrop-blur-sm shadow-xs">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted/60 text-muted-foreground shrink-0 border border-border/40">
                    <IoMdQuote className="size-4" />
                </span>
                <div className="pt-0.5">
                    <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed italic">"{quote.text}"</p>
                    <p className="text-[11px] text-muted-foreground/70 mt-1 font-medium">— {quote.author}</p>
                </div>
            </div>
        </motion.section>
    )
}

'use client'
import { useEffect } from 'react'

export default function ScrollToHash() {
    useEffect(() => {
        const scrollToEl = (el) => {
            if (!el) return
            if (window.__lenis) {
                window.__lenis.scrollTo(el, { offset: -80 })
            } else {
                el.scrollIntoView({ behavior: 'smooth' })
            }
        }

        const hash = window.location.hash
        if (hash) {
            setTimeout(() => {
                const el = document.getElementById(hash.slice(1))
                scrollToEl(el)
            }, 100)
        }

        const handleClick = (e) => {
            const anchor = e.target.closest('a[href^="#"]')
            if (!anchor) return
            const hash = anchor.getAttribute('href').slice(1)
            const el = document.getElementById(hash)
            if (el) {
                e.preventDefault()
                scrollToEl(el)
            }
        }

        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [])

    return null
}
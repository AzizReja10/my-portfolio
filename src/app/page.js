import React from 'react'
import Hero from '@/components/sections/hero'
import Experience from '@/components/sections/experience'
import Projects from '@/components/sections/projects'
import Contact from '@/components/sections/contact'
import Quote from '@/components/sections/quote'
import Activity from '@/components/sections/activity'

export default function Index() {
  return (
    <main className='relative px-6 pb-16 pt-32 sm:pt-36 w-full max-w-3xl mx-auto'>
      {/* Ambient background glows */}
      <div 
        className='pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[450px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-indigo-500/10 dark:from-emerald-500/15 dark:via-cyan-500/10 dark:to-indigo-500/15 blur-3xl rounded-full -z-10' 
        aria-hidden="true"
      />
      <div 
        className='pointer-events-none fixed top-[40%] right-[-10%] w-[450px] h-[350px] bg-gradient-to-br from-violet-500/10 to-pink-500/5 dark:from-purple-500/10 dark:to-blue-500/10 blur-3xl rounded-full -z-10' 
        aria-hidden="true"
      />

      <Hero />
      <Activity />
      <Experience />
      <Projects />
      <Contact />
      <Quote />
    </main>
  )
}

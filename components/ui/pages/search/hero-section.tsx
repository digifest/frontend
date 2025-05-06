'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BookAnimation from '@/components/animations/book-animation'
import SectionReveal from '@/components/animations/section-reveal'

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Apply theme on client mount
    const themeManager = () => {
      const userPref = localStorage.getItem('theme')
      if (
        userPref === 'dark' ||
        (!userPref && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    themeManager()
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[600px]"></div> // Prevent layout shift
  }
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50 via-green-50 to-white py-20">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-52 items-center">
          <SectionReveal direction="right">
            <div className="space-y-6">
              <h1 className="text-2xl md:text-5xl lg:text-[50px] font-bold tracking-tight md:leading-20">
                Your Academic Resources <br /> in One Place
              </h1>
              <p className="text-[15px] text-muted-foreground max-w-md">
                Access course materials, past questions, and lecture notes for
                all your academic needs.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal direction="left" delay={0.2}>
            <div className="h-[400px] relative">
              <BookAnimation />
            </div>
          </SectionReveal>
        </div>
      </div>

      {/* Background decorative elements */}
      <motion.div
        className="absolute -top-24 -right-24 w-96 h-96 bg-green-200 rounded-full opacity-50 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
        }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-green-200  rounded-full opacity-50 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
          delay: 1,
        }}
      />
    </section>
  )
}

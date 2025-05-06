'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, FileText } from 'lucide-react'

export default function QuickAccessAnimation() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const items = [
    { icon: Clock, text: 'Introduction to Computer Science' },
    { icon: Clock, text: 'Final Examination 2023' },
    { icon: Clock, text: 'Advanced Database Systems' },
    { icon: FileText, text: 'Organic Chemistry Lab Manual' },
    { icon: FileText, text: 'Microeconomics Midterm' },
    { icon: FileText, text: 'Digital Signal Processing' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((current) => (current + 1) % items.length)
          return 0
        }
        return prev + 0.5 // Slower progress for smoother animation
      })
    }, 50)

    return () => clearInterval(interval)
  }, [items.length])

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const Icon = item.icon
        const isActive = index === activeIndex

        return (
          <motion.div
            key={index}
            className={`flex items-center gap-2 py-2 px-3 rounded-md relative ${
              isActive ? 'bg-gray-100 dark:bg-gray-800' : ''
            }`}
            animate={{
              borderColor: isActive
                ? 'rgba(59, 130, 246, 0.5)'
                : 'rgba(0, 0, 0, 0)',
              scale: isActive ? 1.02 : 1, // Subtle scale effect for active item
              boxShadow: isActive
                ? '0 2px 8px rgba(0, 0, 0, 0.05)'
                : '0 0 0 rgba(0, 0, 0, 0)',
            }}
            transition={{
              duration: 0.8, // Slower transition
              ease: 'easeInOut',
            }}
            style={{
              borderWidth: '1px',
              borderStyle: 'solid',
            }}
          >
            <Icon
              className={`h-4 w-4 ${
                isActive ? 'text-blue-500' : 'text-gray-400'
              }`}
            />
            <span
              className={`text-sm truncate ${isActive ? 'font-medium' : ''}`}
            >
              {item.text}
            </span>

            {isActive && (
              <>
                {/* Pulsing highlight effect */}
                <div className="absolute inset-0 rounded-md bg-blue-500/5 pointer-events-none pulse-animation" />

                {/* Progress bar */}
                <div
                  className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

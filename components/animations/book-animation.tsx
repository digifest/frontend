'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function BookAnimation() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = 5
  const bookRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initial delay before starting the animation
    const initialTimer = setTimeout(() => {
      setIsOpen(true)

      // Start page flipping after book is opened
      const pageFlipInterval = setInterval(() => {
        setCurrentPage((prev) => {
          const nextPage = (prev + 1) % totalPages
          // If we've gone through all pages, close and reopen the book
          if (nextPage === 0) {
            setIsOpen(false)
            setTimeout(() => setIsOpen(true), 1500)
          }
          return nextPage
        })
      }, 3000) // Flip page every 3 seconds for smoother experience

      return () => clearInterval(pageFlipInterval)
    }, 1500)

    return () => clearTimeout(initialTimer)
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        ref={bookRef}
        className="relative w-[300px] h-[400px] book-perspective"
      >
        {/* Book */}
        <motion.div
          className="absolute inset-0 origin-left book-preserve-3d"
          animate={{
            rotateY: isOpen ? -180 : 0,
          }}
          transition={{
            duration: 2,
            type: 'spring',
            stiffness: 30,
            damping: 20,
          }}
        >
          {/* Front cover (green) */}
          <div className="absolute inset-0  bg-gradient-to-r from-primary to-primary/90 rounded-md shadow-xl border border-primary/700 flex items-center justify-center book-backface-hidden">
            <div className="text-white text-center p-6">
              <h3 className="text-2xl font-bold mb-2">DigiFEst</h3>
              <p className="text-sm opacity-80">Your Academic Resources</p>
            </div>
          </div>

          {/* Back of front cover */}
          <div
            className="absolute inset-0 bg-white dark:bg-gray-200 border-r border-gray-200 rounded-md book-backface-hidden"
            style={{
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="absolute inset-0 p-6">
              <div className="h-6 w-32 bg-gray-200 dark:bg-gray-300 rounded mb-4"></div>
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-3 bg-gray-200 dark:bg-gray-300 rounded"
                    style={{ width: `${Math.random() * 40 + 60}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pages */}
        <AnimatePresence>
          {isOpen &&
            Array.from({ length: totalPages }).map((_, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 bg-white dark:bg-gray-100 rounded-r-md shadow-md book-preserve-3d"
                style={{
                  transformOrigin: 'left center',
                  zIndex: totalPages - index,
                }}
                initial={{ rotateY: 0 }}
                animate={{
                  rotateY: index <= currentPage ? -180 : 0,
                }}
                transition={{
                  duration: 1.8, // Slower for smoother animation
                  type: 'spring',
                  stiffness: 30, // Lower stiffness for smoother motion
                  damping: 20, // Higher damping for less oscillation
                }}
              >
                {/* Front of page (right side when book is open) */}
                <div className="absolute inset-0 p-6 book-backface-hidden">
                  <div className="h-6 w-32 bg-gray-200 dark:bg-gray-300 rounded mb-4"></div>
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-3 bg-gray-200 dark:bg-gray-300 rounded"
                        style={{ width: `${Math.random() * 40 + 60}%` }}
                      ></div>
                    ))}
                  </div>
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    Page {index * 2 + 1}
                  </div>
                </div>

                {/* Back of page (left side when book is open) */}
                <div
                  className="absolute inset-0 p-6 book-backface-hidden"
                  style={{
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="h-6 w-32 bg-gray-200 dark:bg-gray-300 rounded mb-4"></div>
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-3 bg-gray-200 dark:bg-gray-300 rounded"
                        style={{ width: `${Math.random() * 40 + 60}%` }}
                      ></div>
                    ))}
                  </div>
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    Page {index * 2 + 2}
                  </div>
                </div>

                {/* Page turning shadow effect */}
                {index === currentPage && (
                  <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none rounded-r-md page-turn-shadow book-backface-hidden" />
                )}
              </motion.div>
            ))}
        </AnimatePresence>

        {/* Back cover */}
        <div
          className="absolute inset-0  bg-gradient-to-r from-primary to-primary/90 rounded-md shadow-xl border border-primary/700 book-preserve-3d book-backface-hidden"
          style={{
            zIndex: 0,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center opacity-80">
              <Image
                src="/svgs/logo.svg"
                width={100}
                height={50}
                alt="logo"
                className="dark:invert"
              />
            </div>
          </div>
        </div>

        {/* Book spine */}
        <div className="absolute left-0 top-0 bottom-0 w-[20px] bg-primary/800 rounded-l-md z-40"></div>

        {/* Book shadow */}
        <motion.div
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[80%] h-[20px] bg-black/20 rounded-full blur-md"
          style={{ zIndex: -1 }}
          animate={{
            width: isOpen ? '70%' : '80%',
            opacity: isOpen ? 0.7 : 0.2,
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  )
}

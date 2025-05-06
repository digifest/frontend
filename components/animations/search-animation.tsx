'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

export default function SearchAnimation() {
  const [searchPhase, setSearchPhase] = useState(0)
  const [typingText, setTypingText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const searchTerms = [
    'Computer Science notes',
    'Engineering past papers',
    'Biology lecture slides',
    'Mathematics 2024',
    'Physics 2023/2024 Past Question',
  ]

  const [currentTermIndex, setCurrentTermIndex] = useState(0)
  const currentTerm = searchTerms[currentTermIndex]

  // More natural typing animation
  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isDeleting) {
      if (typingText.length === 0) {
        setIsDeleting(false)
        setCurrentTermIndex((prev) => (prev + 1) % searchTerms.length)
        timeout = setTimeout(() => {}, 500) // Pause before typing next term
      } else {
        timeout = setTimeout(() => {
          setTypingText(typingText.slice(0, -1))
        }, 30) // Faster deletion
      }
    } else {
      if (typingText.length === currentTerm.length) {
        setShowResults(true)
        timeout = setTimeout(() => {
          setIsDeleting(true)
          setShowResults(false)
        }, 2000) // Pause before deleting
      } else {
        timeout = setTimeout(() => {
          setTypingText(currentTerm.slice(0, typingText.length + 1))
        }, 100) // Slower typing
      }
    }

    return () => clearTimeout(timeout)
  }, [
    typingText,
    isDeleting,
    currentTerm,
    currentTermIndex,
    searchTerms.length,
  ])

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-gray-400 h-5 w-5" />
        <div className="w-full h-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 pl-10 pr-4 flex items-center">
          <motion.div
            className="text-gray-800 dark:text-gray-200"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
          >
            {typingText}
          </motion.div>
          <motion.div
            className="h-5 w-0.5 bg-gray-800 dark:bg-gray-200 ml-0.5"
            animate={{
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>

      {/* Search results animation */}
      <motion.div
        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 shadow-lg overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: showResults ? 'auto' : 0,
          opacity: showResults ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <div className="p-2 space-y-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4, ease: 'easeOut' }}
            >
              <Search className="h-4 w-4 text-gray-400" />
              <span>
                {typingText} {i === 0 ? '' : i === 1 ? 'course' : 'pdf'}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

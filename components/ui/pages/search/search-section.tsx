'use client'

import React from 'react'

import { useState, useRef } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import SectionReveal from '@/components/animations/section-reveal'
import { motion } from 'framer-motion'
import { getColleges } from '@/lib/services/academics.service'
import { getDepartmentsForCollege } from '@/lib/services/academics.service'
import { College } from '@/lib/types'
import { Department } from '@/lib/types'

const levels = ['100 Level', '200 Level', '300 Level', '400 Level', '500 Level']
const semesters = ['First Semester', 'Second Semester']

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [level, setLevel] = useState('')
  const [semester, setSemester] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Animation for the search placeholder
  const searchPlaceholders = [
    'Search for Computer Science notes...',
    'Find Engineering past papers...',
    'Look up Biology lecture slides...',
    'Search for Mathematics formulas...',
    'Find Physics lab manuals...',
  ]
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [colleges, setColleges] = useState<College[]>([])
  const [college, setCollege] = useState('')
  const [loadingColleges, setLoadingColleges] = useState(false)
  const [departments, setDepartments] = useState<Department[]>([])
  const [department, setDepartment] = useState('')
  const [loadingDepartment, setLoadingDepartment] = useState(false)
  // Change placeholder text every 3 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  React.useEffect(() => {
    setLoadingColleges(true)
    getColleges()
      .then((data) => {
        if (data) setColleges(data)
      })
      .finally(() => setLoadingColleges(false))
  }, [])
  React.useEffect(() => {
    if (!college) {
      setDepartments([])
      setDepartment('')
      return
    }
    setLoadingDepartment(true)
    getDepartmentsForCollege(college)
      .then((data) => {
        if (data) setDepartments(data)
      })
      .finally(() => setLoadingDepartment(false))
  }, [college])
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      searchQuery,
      colleges,
      department,
      level,
      semester,
    })
    // Implement search functionality
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setCollege('')
    setDepartment('')
    setLevel('')
    setSemester('')
  }

  return (
    <section className="py-16 bg-white ">
      <div className="container">
        <SectionReveal>
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Find study materials for your courses
            </h2>
            <p className="text-muted-foreground text-lg">
              Search through thousands of documents, past questions, and course
              materials
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <form onSubmit={handleSearch} className="space-y-6 max-w-5xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-10 h-12"
                placeholder={searchPlaceholders[placeholderIndex]}
              />

              {/* Animated cursor when empty and not focused */}
              {!searchQuery && !isSearchFocused && (
                <motion.div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-0.5 bg-gray-400"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                />
              )}

              {/* Search suggestions */}
              {isSearchFocused && searchQuery.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 top-full left-0 right-0 mt-1 bg-white  rounded-md border shadow-lg"
                >
                  <div className="p-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => {
                          setSearchQuery(`${searchQuery} suggestion ${i}`)
                          searchInputRef.current?.focus()
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Search className="h-4 w-4 text-gray-400" />
                          <span>
                            {searchQuery} suggestion {i}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Select
                value={college}
                onValueChange={setCollege}
                disabled={loadingColleges}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select College" />
                </SelectTrigger>
                <SelectContent>
                  {colleges.map((item) => (
                    <SelectItem key={item._id} value={item.name}>
                      {item.name} ({item.acronym})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={department}
                onValueChange={setDepartment}
                disabled={loadingDepartment}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((item) => (
                    <SelectItem key={item._id} value={item._id}>
                      {item.name} ({item.acronym})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                type="submit"
                size="lg"
                className="px-8 bg-[#34d7a1] hover:bg-blue-700"
              >
                Search Documents
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </form>
        </SectionReveal>
      </div>
    </section>
  )
}

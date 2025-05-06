"use client"

import { useState } from "react"
import { Grid, List, FileText, BookOpen, FileQuestion, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"
import SectionReveal from "@/components/animations/section-reveal"
import DocumentCard from "@/components/ui/pages/search/document-card"
import { mockDocuments } from "@/lib/data/mock-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import QuickAccessAnimation from "@/components/animations/quick-access-animation"

export default function DocumentsSection() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <section id="documents" className="py-12 bg-white dark:bg-gray-950">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with Quick Access and Categories */}
          <div className="w-full md:w-96  shrink-0 bg-[#F3F4F6] px-4 py-6 rounded-xl dark:bg-gray-800 overflow-hidden">
            <div className="space-y-8">
              {/* Quick Access Section */}
              <div>
                <h3 className="font-medium text-lg mb-4">Quick Access</h3>

                <div className="space-y-1">
                  <h4 className="text-sm font-medium mb-2">Recently Viewed</h4>
                  <QuickAccessAnimation />
                </div>
              </div>

              {/* Categories Section */}
              <div>
                <h3 className="font-medium text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                      <FileQuestion className="h-4 w-4 text-purple-500" />
                      <span className="group-hover:text-blue-600 transition-colors">
                        Past Questions
                      </span>
                    </div>
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                      156
                    </span>
                  </div>
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-500" />
                      <span className="group-hover:text-blue-600 transition-colors">
                        Lecture Notes
                      </span>
                    </div>
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                      89
                    </span>
                  </div>
                </div>
              </div>

              {/* Academic Years Section */}
              <div>
                <h3 className="font-medium text-lg mb-4">Academic Years</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between group">
                    <span className="group-hover:text-blue-600 transition-colors">
                      2023/2024
                    </span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                      87
                    </span>
                  </div>
                  <div className="flex items-center justify-between group">
                    <span className="group-hover:text-blue-600 transition-colors">
                      2022/2023
                    </span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                      76
                    </span>
                  </div>
                  <div className="flex items-center justify-between group">
                    <span className="group-hover:text-blue-600 transition-colors">
                      2021/2022
                    </span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                      71
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <SectionReveal>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold tracking-tight">
                      Available Documents
                    </h2>
                    <span className="text-sm text-muted-foreground bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                      {mockDocuments.length} documents found
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex border rounded-md">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('grid')}
                      className="rounded-r-none h-9 w-9"
                    >
                      <Grid className="h-4 w-4" />
                      <span className="sr-only">Grid view</span>
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none h-9 w-9"
                    >
                      <List className="h-4 w-4" />
                      <span className="sr-only">List view</span>
                    </Button>
                  </div>

                  <Select defaultValue="recent">
                    <SelectTrigger className="w-[160px] h-9">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="a-z">A-Z</SelectItem>
                      <SelectItem value="z-a">Z-A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SectionReveal>

            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'
                  : 'space-y-4'
              }
            >
              {mockDocuments.map((doc, index) => (
                <SectionReveal key={doc.id} delay={index * 0.1}>
                  <DocumentCard document={doc} viewMode={viewMode} />
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

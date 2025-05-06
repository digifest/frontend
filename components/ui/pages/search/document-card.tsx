"use client"

import { useState } from "react"
import { FileText, Download, Calendar, FileIcon, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Document } from "@/lib/types/types"
import DownloadAnimation from "@/components/animations/download-animation"
import { toast } from "sonner"

interface DocumentCardProps {
  document: Document
  viewMode?: "grid" | "list"
}

export default function DocumentCard({ document, viewMode = "grid" }: DocumentCardProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)
  }

  const handleDownloadComplete = () => {
    toast.success("Download Complete", {
      description: `${document.title} has been downloaded successfully.`,
      duration: 4000,
    })
    setIsDownloading(false)
  }

  // Get the appropriate icon based on document type
  const getIcon = () => {
    switch (document.type) {
      case "course":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "past":
        return <FileIcon className="h-5 w-5 text-yellow-500" />
      case "lecture":
        return <FileText className="h-5 w-5 text-green-500" />
      default:
        return <FileText className="h-5 w-5 text-blue-500" />
    }
  }

  // Get the badge color based on document type
  const getBadgeClass = () => {
    switch (document.type) {
      case "past":
        return "bg-yellow-100 text-yellow-800 dark:bg-purple-900 dark:text-purple-300"
      case "lecture":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    }
  }

  // Get the badge text based on document type
  const getBadgeText = () => {
    switch (document.type) {
      case "past":
        return "Past Question"
      case "lecture":
        return "Lecture Notes"
      default:
        return "Document"
    }
  }

  if (viewMode === "list") {
    return (
      <>
        <div className=" bg-[#F3F4F6] flex items-center border rounded-lg p-4  dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hover-lift">
          <div className="mr-4">{getIcon()}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className={getBadgeClass()}>
                {getBadgeText()}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> {document.date}
              </span>
            </div>
            <h3 className="font-medium truncate">{document.title}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <span>{document.courseCode}</span>
              <span>{document.department}</span>
              <span>{document.level}</span>
            </div>
          </div>
          <div className="ml-4 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {document.fileSize}
            </span>
            <Button
              size="sm"
              variant="outline"
              className="gap-1 animate-smooth-transition hover:scale-105 active:scale-95"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>

        <DownloadAnimation
          isOpen={isDownloading}
          onClose={() => setIsDownloading(false)}
          fileName={document.title}
          onDownloadComplete={handleDownloadComplete}
        />
      </>
    )
  }

  return (
    <>
      <Card className="h-full flex flex-col overflow-hidden  bg-[#F3F4F6] hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 hover-lift">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              {getIcon()}
              <Badge variant="secondary" className={getBadgeClass()}>
                {getBadgeText()}
              </Badge>
            </div>
          </div>
          <CardTitle className="text-lg">{document.title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-2 flex-grow">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Course Code:</span>
              <span className="font-medium">{document.courseCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Department:</span>
              <span>{document.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Level:</span>
              <span>{document.level}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Semester:</span>
              <span>{document.semester}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground mt-2">
              <Calendar className="h-3.5 w-3.5" />
              <span className="text-xs">{document.date}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {document.fileSize}
            </span>
            <Button
              className="gap-2 animate-smooth-transition hover:scale-105 active:scale-95"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" /> Download
            </Button>
          </div>
        </CardFooter>
      </Card>

      <DownloadAnimation
        isOpen={isDownloading}
        onClose={() => setIsDownloading(false)}
        fileName={document.title}
        onDownloadComplete={handleDownloadComplete}
      />
    </>
  )
}

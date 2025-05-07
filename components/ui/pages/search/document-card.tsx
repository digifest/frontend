'use client';

import { useState } from 'react';
import { FileText, Download, Calendar, FileIcon, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import DownloadAnimation from '@/components/animations/download-animation';
import { toast } from 'sonner';
import { Document } from '@/lib/types';
import { DocType } from '@/lib/enums';
import { format } from 'date-fns';
import { useModal } from '@/lib/contexts/modal-context';
import { usePersistedDocumentStore } from '@/lib/store/documents.store';
import { formatBytes } from '@/lib/utils';

interface DocumentCardProps {
  document: Document;
  viewMode?: 'grid' | 'list';
}

export default function DocumentCard({
  document,
  viewMode = 'grid',
}: DocumentCardProps) {
  const { showModal } = useModal();
  const { updateDownloadedDocuments } = usePersistedDocumentStore();

  const handleDownload = () => {
    showModal(
      <DownloadAnimation
        onClose={(msg) => toast.error(msg ?? 'File download cancelled')}
        onDownloadComplete={() => (
          toast.success('Download Complete'),
          updateDownloadedDocuments?.(document)
        )}
        document={document}
      />
    );
  };

  // Get the appropriate icon based on document type
  const getIcon = () => {
    switch (document.document_type) {
      case DocType.past_question:
        return <FileText className="h-5 w-5 text-blue-500" />;
      case DocType.lecture_note:
        return <FileText className="h-5 w-5 text-green-500" />;
      default:
        return <FileText className="h-5 w-5 text-blue-500" />;
    }
  };

  // Get the badge color based on document type
  const getBadgeClass = () => {
    switch (document.document_type) {
      case DocType.lecture_note:
        return 'bg-green-100 text-green-800 ';
      case DocType.past_question:
        return 'bg-blue-100 text-blue-800 ';
    }
  };

  // Get the badge text based on document type
  const getBadgeText = () => {
    switch (document.document_type) {
      case DocType.past_question:
        return 'Past Question';
      case DocType.lecture_note:
        return 'Lecture Notes';
      default:
        return 'Document';
    }
  };

  if (viewMode === 'list') {
    return (
      <>
        <div className=" bg-[#F3F4F6] flex items-center border rounded-lg p-4  0 hover:bg-gray-100  transition-colors hover-lift">
          <div className="mr-4">{getIcon()}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className={getBadgeClass()}>
                {getBadgeText()}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />{' '}
                {format(document.createdAt, 'MMM d, yyyy')}
              </span>
            </div>
            <h3 className="font-medium truncate">{document.name}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              {/* <span>{document.course_code}</span> */}
              <span>{document.department.name}</span>
              <span>{document.course?.level} Level</span>
            </div>
          </div>
          <div className="ml-4 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {formatBytes(document.byte_size)}
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
      </>
    );
  }

  return (
    <>
      <Card className="h-full flex flex-col overflow-hidden  bg-[#F3F4F6] hover:border-primary/20  transition-all duration-300 hover-lift">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              {getIcon()}
              <Badge variant="secondary" className={getBadgeClass()}>
                {getBadgeText()}
              </Badge>
            </div>
          </div>
          <CardTitle className="text-lg">{document.name}</CardTitle>
        </CardHeader>
        <CardContent className="pb-2 flex-grow">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Course Code:</span>
              {/* <span className="font-medium">{document.courseCode}</span> */}
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Department:</span>
              <span>{document.department.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Level:</span>
              <span>{document.course?.level} Level</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Semester:</span>
              <span>
                {document.course?.semester_index == 1
                  ? '1st Semester'
                  : '2nd Semester'}
              </span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground mt-2">
              <Calendar className="h-3.5 w-3.5" />
              <span className="text-xs">
                {format(document.createdAt, 'MMM d, yyyy')}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {formatBytes(document.byte_size)}
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
    </>
  );
}

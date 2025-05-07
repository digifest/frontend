'use client';

import { useState } from 'react';
import {
  Grid,
  List,
  FileText,
  BookOpen,
  FileQuestion,
  FileSpreadsheet,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionReveal from '@/components/animations/section-reveal';
import DocumentCard from '@/components/ui/pages/search/document-card';
import { mockDocuments } from '@/lib/data/mock-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import QuickAccessAnimation from '@/components/animations/quick-access-animation';
import DocumentShimmer from './document-shimmer';
import { useQuery } from '@tanstack/react-query';
import {
  useDocumentStore,
  usePersistedDocumentStore,
} from '@/lib/store/documents.store';
import { getDocuments } from '@/lib/services/document.service';
import { DocType, Sort } from '@/lib/enums';

export default function DocumentsSection() {
  const { query, updateSpeficQueryAttr } = useDocumentStore();
  const { downloaded_documents } = usePersistedDocumentStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { isLoading, data } = useQuery({
    queryKey: ['documents', query],
    queryFn: () => getDocuments(query!),
  });

  return (
    <section id="documents" className="py-12 bg-white ">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with Quick Access and Categories */}
          <div className="w-full md:w-96  shrink-0 bg-[#F3F4F6] px-4 py-6 rounded-xl  overflow-hidden">
            <div className="space-y-8">
              {/* Quick Access Section */}
              {downloaded_documents && downloaded_documents.length ? (
                <div>
                  <h3 className="font-medium text-lg mb-4">Quick Access</h3>

                  <div className="space-y-1">
                    <h4 className="text-sm font-medium mb-2">
                      Recently Downloaded
                    </h4>
                    <QuickAccessAnimation />
                  </div>
                </div>
              ) : (
                <></>
              )}

              {/* Categories Section */}
              <div>
                <h3 className="font-medium text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                  {data?.meta?.metrics?.categories?.map((cat, index) => (
                    <div
                      className="flex items-center justify-between group"
                      key={index}
                    >
                      <div className="flex items-center gap-2">
                        {cat.category === DocType.past_question ? (
                          <FileQuestion className="h-4 w-4 text-purple-500" />
                        ) : (
                          <FileText className="h-4 w-4 text-green-500" />
                        )}
                        <span className="group-hover:text-blue-600 transition-colors">
                          {cat.category === DocType.lecture_note
                            ? 'Lecture Notes'
                            : 'Past Questions'}
                        </span>
                      </div>
                      <span className="text-xs bg-gray-100  px-2 py-0.5 rounded-full">
                        {cat.total}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academic Years Section */}
              <div>
                <h3 className="font-medium text-lg mb-4">Academic Years</h3>
                <div className="space-y-2">
                  {data?.meta?.metrics?.document_by_levels?.map((dbl, idex) => (
                    <div
                      className="flex items-center justify-between group"
                      key={idex}
                    >
                      <p className="group-hover:text-blue-600 transition-colors text-sm">
                        {dbl.level} Level
                      </p>
                      <span className="text-xs bg-gray-100  px-2 py-0.5 rounded-full">
                        {dbl.total}
                      </span>
                    </div>
                  ))}
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
                    <span className="text-sm text-muted-foreground bg-green-100  px-2 py-0.5 rounded-full">
                      {data?.meta?.count ?? 0} documents found
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

                  <Select
                    defaultValue={Sort.most_recent}
                    onValueChange={(v) => updateSpeficQueryAttr?.('sort', v)}
                    value={query?.sort}
                  >
                    <SelectTrigger className="w-[160px] h-9">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Sort.most_recent}>
                        Most Recent
                      </SelectItem>
                      <SelectItem value={Sort.oldest_first}>
                        Oldest First
                      </SelectItem>
                      <SelectItem value={Sort.a_z}>A-Z</SelectItem>
                      <SelectItem value={Sort.z_a}>Z-A</SelectItem>
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
              {isLoading
                ? new Array(10)
                    .fill(null)
                    .map((_, index) => (
                      <DocumentShimmer viewMode={viewMode} key={index} />
                    ))
                : data?.data?.map((doc) => (
                    <DocumentCard document={doc} key={doc._id} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useEffect } from 'react';

import { useState, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Button from '@/components/common/button';
import SectionReveal from '@/components/animations/section-reveal';
import { motion } from 'framer-motion';
import { getAllDepartments } from '@/lib/services/academics.service';
import { SearchDocuments } from '@/lib/types';
import { useApiQuery } from '@/lib/hooks/useQuery';
import { useDocumentStore } from '@/lib/store/documents.store';
import { useQuery } from '@tanstack/react-query';
import SelectDepartment from '@/components/common/select-fields/select-department';
import SelectLevel from '@/components/common/select-fields/select-level';
import SelectSemester from '@/components/common/select-fields/select-semester';
import { DocType } from '@/lib/enums';
import SelectDocType from '@/components/common/select-fields/select-doc-type';
import { useSearchParams } from '@/lib/hooks/useSearchParams';

const semestersIndex: (1 | 2)[] = [1, 2];

export default function SearchSection() {
  const { updateQuery, updateSpeficQueryAttr } = useDocumentStore();
  const { searchParams, setParam } = useSearchParams();

  const { query, changeQuery, reset } = useApiQuery<SearchDocuments>({
    defaultValues: {
      search: searchParams.get('search') ?? '',
    },
  });

  const { data: departments, isLoading: departmentsLoading } = useQuery({
    queryKey: ['departments'],
    queryFn: getAllDepartments,
  });

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [levels, setLevels] = useState<number[]>([]);

  // Animation for the search placeholder
  const searchPlaceholders = [
    'Search for Computer Science notes...',
    'Find Engineering past papers...',
    'Look up Biology lecture slides...',
    'Search for Mathematics formulas...',
    'Find Physics lab manuals...',
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Change placeholder text every 3 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleClearFilters = () => (
    reset(), updateQuery?.({}), setParam('search', undefined!)
  );
  const handleSearch = () => (
    updateQuery?.(query), setParam('search', query.search!)
  );

  useEffect(() => {
    let newLevels: number[] = [];
    if (query.department) {
      new Array(query.department.level_count).fill(null).forEach((_, index) => {
        newLevels.push((index + 1) * 100);
      });

      if (query.level && !newLevels.includes(query.level)) {
        changeQuery('level', undefined);
      }
    } else {
      newLevels = [100, 200, 300, 400, 500, 600];
    }

    setLevels(newLevels);
  }, [query.department]);

  useEffect(() => {
    if (searchParams.get('search')) {
      updateSpeficQueryAttr?.(
        'search',
        searchParams.get('search') ?? undefined
      );
    }
  }, []);

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
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                ref={searchInputRef}
                type="text"
                value={query.search}
                onChange={(e) => changeQuery('search', e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-10 h-12"
                placeholder={searchPlaceholders[placeholderIndex]}
              />

              {/* Animated cursor when empty and not focused */}
              {!query.search && !isSearchFocused && (
                <motion.div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-0.5 bg-gray-400"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <SelectDepartment
                data={departments ?? []}
                loading={departmentsLoading}
                selected={query.department}
                placeholder="Select Department"
                onSelect={(department) => changeQuery('department', department)}
              />

              <SelectLevel
                data={levels}
                onSelect={(level) => changeQuery('level', level)}
                selected={query.level}
                loading={false}
                placeholder="Select Level"
              />

              <SelectSemester
                data={semestersIndex}
                onSelect={(sm) => changeQuery('semester_index', sm)}
                selected={query.semester_index as 1 | 2}
                placeholder="Select Semester"
                loading={false}
              />

              <SelectDocType
                data={Object.values(DocType)}
                onSelect={(document_type) =>
                  changeQuery('document_type', document_type)
                }
                selected={query.document_type}
                placeholder="Select Document Type"
                loading={false}
              />
            </div>

            <div className="flex flex-row gap-4 justify-center md:max-w-[400px] mx-auto">
              <Button
                type="button"
                variant="filled"
                size="small"
                fullWidth
                onClick={handleSearch}
              >
                Search
              </Button>
              <Button
                type="button"
                variant="outline"
                size="small"
                fullWidth
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

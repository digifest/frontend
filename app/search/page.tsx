import { Suspense } from 'react'
import Navbar from '@/components/layout/navbar'
import HeroSection from '@/components/ui/pages/search/hero-section'
import SearchSection from '@/components/ui/pages/search/search-section'
import DocumentsSection from '@/components/ui/pages/search/document-section'
import { Skeleton } from '@/components/ui/skeleton'

export default function HomePage() {
  return (
    <>
      <Navbar  />
      <main className="min-h-screen dark:bg-gray-950">
        <HeroSection />
        <SearchSection />
        <Suspense fallback={<DocumentsSkeleton />}>
          <DocumentsSection />
        </Suspense>
      </main>
    </>
  )
}

function DocumentsSkeleton() {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
      </div>
    </div>
  )
}

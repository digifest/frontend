'use client';


import { Suspense } from 'react';
import Navbar from '@/components/layout/navbar';
import HeroSection from '@/components/ui/pages/search/hero-section';
import SearchSection from '@/components/ui/pages/search/search-section';
import DocumentsSection from '@/components/ui/pages/search/document-section';
import { Skeleton } from '@/components/ui/skeleton';
import { ThemeProvider } from 'next-themes';

export default function HomePage() {
	return (
		<ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
			{/* your app */}
			<>
				<Navbar />
				<main className="min-h-screen ">
					<HeroSection />
					<Suspense>
						<SearchSection />
					</Suspense>
					<Suspense fallback={<DocumentsSkeleton />}>
						<DocumentsSection />
					</Suspense>
				</main>
			</>
		</ThemeProvider>
	);
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
	);
}

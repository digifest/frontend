'use client';
import SearchSection from './search-section';
import { Suspense } from 'react';
import DocumentsSection from './document-section';
import { Skeleton } from '../../skeleton';

const DocumentPage = () => {
	return (
		<section>
			<SearchSection />
			<Suspense fallback={<DocumentsSkeleton />}>
				<DocumentsSection />
			</Suspense>
		</section>
	);
};

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
export default DocumentPage;

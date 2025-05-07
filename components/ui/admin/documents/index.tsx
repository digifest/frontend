'use client';
import SearchSection from './search-section';
import { Suspense } from 'react';
import DocumentsSection from './document-section';
import { DocumentsSkeleton } from '@/app/search/page';

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
export default DocumentPage;

'use client';
import SearchSection from '../../pages/search/search-section';
import { Suspense } from 'react';
import DocumentsSection from '../../pages/search/document-section';
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

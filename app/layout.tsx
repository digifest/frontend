import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/lib/providers/providers';
import { sora } from '@/lib/utils/fonts';

export const metadata: Metadata = {
	title: {
		default: 'Digifest',
		template: 'Digifest | %s',
	},
	description: 'FUNAAB Lecture notes & Past Questions curated for you!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${sora.className} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}

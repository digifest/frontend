import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/lib/providers/providers';
import { Manrope, Sora } from 'next/font/google';

export const manrope = Manrope({
	subsets: ['latin'],
	display: 'swap',
});

export const sora = Sora({
	subsets: ['latin'],
	display: 'swap',
});

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

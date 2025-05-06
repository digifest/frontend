import type { Metadata } from 'next';
import { sora } from '@/lib/utils/fonts';
import './globals.css';
import Providers from '@/lib/providers/providers';

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

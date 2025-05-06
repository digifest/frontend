import Hero from '@/components/ui/pages/home/hero';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'FUNAAB Lecture notes & past questions curated just for you!',
};

const Page = () => (
  <main>
    <Hero />
  </main>
);

export default Page;

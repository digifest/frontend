import Hero from "@/app/(public)/(home)/_components/hero";
import HowItWorks from "./_components/how-it-works";
import FeaturedCategories from "./_components/featured-materials";
import SearchSection from "./_components/search-section";
import TopDownloads from "./_components/top-downloads";
import Testimonials from "./_components/testimonials";
import CallToAction from "./_components/cta";
import WhyUsePlatform from "./_components/why-use";

const Page = () => (
  <main>
    <Hero />
    <HowItWorks />
    <WhyUsePlatform />
    <FeaturedCategories />
    <SearchSection />
    <TopDownloads />
    <Testimonials />
    <CallToAction />
  </main>
);

export default Page;

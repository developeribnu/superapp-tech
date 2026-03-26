import type { Metadata } from "next";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturedGrid } from "@/components/landing/featured-grid";
import { ModelShowcase } from "@/components/landing/model-showcase";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedGrid />
      <ModelShowcase />
    </>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompt Library",
  description: "Browse 200+ curated prompt templates for various use cases.",
  openGraph: {
    title: "Prompt Library",
    description: "Browse 200+ curated prompt templates for various use cases",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Library",
    description: "Browse 200+ curated prompt templates for various use cases",
  },
};

export default function PromptsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

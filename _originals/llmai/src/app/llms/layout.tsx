import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LLM Explorer",
  description: "Browse and compare 20+ large language models. Filter by provider, capability, pricing, and more.",
  openGraph: {
    title: "LLM Explorer",
    description: "Browse and compare 20+ large language models",
  },
  twitter: {
    card: "summary_large_image",
    title: "LLM Explorer",
    description: "Browse and compare 20+ large language models",
  },
};

export default function LLMLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

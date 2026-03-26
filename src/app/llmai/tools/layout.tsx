import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools Directory",
  description: "Discover the best AI-powered tools and platforms.",
  openGraph: {
    title: "AI Tools Directory",
    description: "Discover the best AI-powered tools and platforms",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools Directory",
    description: "Discover the best AI-powered tools and platforms",
  },
};

export default function ToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

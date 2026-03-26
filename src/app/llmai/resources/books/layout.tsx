import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books Library",
  description: "Browse recommended books on AI and machine learning.",
  openGraph: {
    title: "Books Library",
    description: "Browse recommended books on AI and machine learning",
  },
  twitter: {
    card: "summary_large_image",
    title: "Books Library",
    description: "Browse recommended books on AI and machine learning",
  },
};

export default function BooksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

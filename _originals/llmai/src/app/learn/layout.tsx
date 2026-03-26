import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knowledge Library",
  description: "Read articles and guides to master AI orchestration.",
  openGraph: {
    title: "Knowledge Library",
    description: "Read articles and guides to master AI orchestration",
  },
  twitter: {
    card: "summary_large_image",
    title: "Knowledge Library",
    description: "Read articles and guides to master AI orchestration",
  },
};

export default function LearnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collaboration Patterns",
  description: "Explore multi-LLM collaboration patterns and orchestration strategies.",
  openGraph: {
    title: "Collaboration Patterns",
    description: "Explore multi-LLM collaboration patterns and orchestration strategies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Collaboration Patterns",
    description: "Explore multi-LLM collaboration patterns and orchestration strategies",
  },
};

export default function CollaborateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

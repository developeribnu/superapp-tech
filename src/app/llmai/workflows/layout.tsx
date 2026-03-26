import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workflow Guides",
  description: "Step-by-step automation guides for AI workflows.",
  openGraph: {
    title: "Workflow Guides",
    description: "Step-by-step automation guides for AI workflows",
  },
  twitter: {
    card: "summary_large_image",
    title: "Workflow Guides",
    description: "Step-by-step automation guides for AI workflows",
  },
};

export default function WorkflowsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

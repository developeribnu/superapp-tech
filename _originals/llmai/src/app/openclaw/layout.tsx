import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenClaw Framework",
  description: "Explore the OpenClaw framework for AI orchestration.",
  openGraph: {
    title: "OpenClaw Framework",
    description: "Explore the OpenClaw framework for AI orchestration",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw Framework",
    description: "Explore the OpenClaw framework for AI orchestration",
  },
};

export default function OpenClawLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Benchmark Dashboard",
  description: "Compare model performance across standardized benchmarks. View leaderboards and performance metrics.",
  openGraph: {
    title: "Benchmark Dashboard",
    description: "Compare model performance across standardized benchmarks",
  },
  twitter: {
    card: "summary_large_image",
    title: "Benchmark Dashboard",
    description: "Compare model performance across standardized benchmarks",
  },
};

export default function BenchmarksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

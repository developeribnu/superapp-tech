import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Models",
  description: "Side-by-side comparison of large language models. Compare up to 4 models at once.",
  openGraph: {
    title: "Compare Models",
    description: "Side-by-side comparison of large language models",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Models",
    description: "Side-by-side comparison of large language models",
  },
};

export default function CompareLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

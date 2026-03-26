import { Metadata } from "next";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "./constants";

export function generateSEOMetadata({
  title,
  description,
  path = "",
  image = "/og/default.png",
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} \u2014 The Internet's Home for Everything LLM`;
  const fullDescription = description || SITE_DESCRIPTION;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description: fullDescription,
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}${image}`, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [`${SITE_URL}${image}`],
    },
    alternates: { canonical: url },
  };
}

import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/site";

/**
 * Only list published, content-complete URLs.
 * Planned routes from the Local SEO plan stay out until they ship with real content.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

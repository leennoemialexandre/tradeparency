import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/about", "/resume", "/contact", ...projects.map((p) => `/work/${p.slug}`)];
  return pages.map((path) => ({ url: `${site.url}${path}` }));
}

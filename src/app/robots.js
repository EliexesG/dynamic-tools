const baseURL = process.env.URL_BASE;

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The contact endpoint is POST-only (no crawlable content).
      disallow: ["/api/"],
    },
    sitemap: `${baseURL}/sitemap.xml`,
  };
}

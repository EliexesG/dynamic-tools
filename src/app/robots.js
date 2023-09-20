const baseURL = process.env.URL_BASE;

export default function robots() {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: `${baseURL}/sitemap.xml`,
    }
  }
/** Site origin for metadata, sitemap, and JSON-LD. */
export function siteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const SITE_NAME = "Nabhi";
export const SITE_TAGLINE = "Before intelligence comes understanding";
export const SITE_DESCRIPTION =
  "Nabhi is where complexity becomes clarity. We understand so deeply that the right technology becomes obvious.";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: siteUrl(),
    description: SITE_DESCRIPTION,
    email: "hello@nabhi.com",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl(),
    description: SITE_DESCRIPTION,
  };
}

export function creativeWorkJsonLd(project: {
  slug: string;
  name: string;
  oneLiner: string;
  meta: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.oneLiner,
    url: `${siteUrl()}/work/${project.slug}`,
    genre: project.meta,
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
      url: siteUrl(),
    },
  };
}

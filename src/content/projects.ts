export type Project = {
  slug: string;
  name: string;
  meta: string;
  oneLiner: string;
  problemStated: string;
  problemActual: string;
  understanding: string;
  built: string;
  /** NEVER invent a metric — leave empty until a real outcome is supplied. */
  changed: string;
  images: { src: string; alt: string }[];
  placeholder: boolean;
};

/**
 * Homepage one-liners only for now.
 * Case-study fields are empty on purpose — fill from real briefs, never invent.
 */
export const PROJECTS: Project[] = [
  {
    slug: "second-brain",
    name: "Second Brain",
    meta: "Knowledge · Flagship product",
    oneLiner:
      "A lifetime of scattered notes became something you can hold a conversation with.",
    problemStated: "",
    problemActual: "",
    understanding: "",
    built: "",
    changed: "",
    images: [],
    placeholder: true,
  },
  {
    slug: "tighthug",
    name: "TightHug",
    meta: "Consumer product",
    oneLiner:
      "A product people reach for on their worst days — so nothing in it was allowed to feel clever.",
    problemStated: "",
    problemActual: "",
    understanding: "",
    built: "",
    changed: "",
    images: [],
    placeholder: true,
  },
  {
    slug: "prestalux-monaco",
    name: "PrestaLux Monaco",
    meta: "Luxury · E-commerce",
    oneLiner:
      "Restraint as a commercial strategy: fewer decisions on screen, more confidence at checkout.",
    problemStated: "",
    problemActual: "",
    understanding: "",
    built: "",
    changed: "",
    images: [],
    placeholder: true,
  },
  {
    slug: "parcelhorse",
    name: "ParcelHorse",
    meta: "Logistics",
    oneLiner: "Movement is complicated. Knowing where your parcel is shouldn't be.",
    problemStated: "",
    problemActual: "",
    understanding: "",
    built: "",
    changed: "",
    images: [],
    placeholder: true,
  },
  {
    slug: "bharatmart",
    name: "BharatMart",
    meta: "Commerce · Marketplace",
    oneLiner:
      "Built for buyers on slow connections and small screens, which turned out to make it better for everyone.",
    problemStated: "",
    problemActual: "",
    understanding: "",
    built: "",
    changed: "",
    images: [],
    placeholder: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project | undefined {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index < 0 || index >= PROJECTS.length - 1) return undefined;
  return PROJECTS[index + 1];
}

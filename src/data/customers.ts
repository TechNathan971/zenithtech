export type CustomerLogo = {
  name: string;
  title: string;
  slug: string;
  className: string;
};

// Fictional companies, styled as plain text wordmarks.
export const heroLogos: CustomerLogo[] = [
  {
    name: "HALCYON",
    title: "Halcyon",
    slug: "halcyon",
    className: "font-light tracking-[0.25em]",
  },
  {
    name: "quillbase",
    title: "Quillbase",
    slug: "quillbase",
    className: "font-semibold tracking-tight",
  },
  {
    name: "Northloop",
    title: "Northloop",
    slug: "northloop",
    className: "font-bold italic tracking-tight",
  },
  {
    name: "MARLOWE",
    title: "Marlowe",
    slug: "marlowe",
    className: "font-extrabold tracking-widest",
  },
  {
    name: "tidewave",
    title: "Tidewave",
    slug: "tidewave",
    className: "font-medium tracking-tighter",
  },
  {
    name: "Gridline",
    title: "Gridline",
    slug: "gridline",
    className: "font-semibold tracking-wide",
  },
];

export const customerHref = (slug: string) => `/customers/${slug}`;

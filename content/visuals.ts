export interface VisualImage { src: string; caption?: string }

export interface VisualItem {
  slug: string;
  title: string;
  year: string;
  cover?: string;
  aspectRatio?: string;
  images: VisualImage[];
  tags?: string[];
  blurb?: string;
}

export const visuals: VisualItem[] = [
  {
    slug: "etro-how-to-arnica-preview",
    title: "ETRO: How to Arnica",
    year: "2026",
    cover: "/etro preview.mp4",
    aspectRatio: "16 / 9",
    images: [
      {
        src: "/etro preview.mp4",
        caption: "A satirical manual for reckless luxury.",
      },
    ],
    tags: ["Brand Concept", "Editorial Design"],
  },
  {
    slug: "taara-brand-identity",
    title: "Taara Brand Identity",
    year: "2026",
    cover: "/taara assets/taara-brand-identity.png",
    aspectRatio: "16 / 9",
    images: [
      {
        src: "/taara assets/taara-brand-identity.png",
        caption: "Brand identity for the Taara chai ritual system.",
      },
    ],
    tags: ["Brand Identity", "Product Design"],
  },
  {
    slug: "unplugged-preview",
    title: "Unplugged",
    year: "2026",
    cover: "/unplugged preview.png",
    aspectRatio: "3534 / 2907",
    images: [
      {
        src: "/unplugged preview.png",
        caption: "Unplugged project preview.",
      },
    ],
    tags: ["Visual Design"],
  },
  {
    slug: "untitled-5",
    title: "Untitled (5)",
    year: "2026",
    cover: "/visual work/Untitled (5).png",
    aspectRatio: "1756 / 4712",
    images: [{ src: "/visual work/Untitled (5).png" }],
    tags: ["Visual Work"],
  },
  {
    slug: "issey",
    title: "Issey",
    year: "2026",
    cover: "/visual work/issey.png",
    aspectRatio: "792 / 1224",
    images: [{ src: "/visual work/issey.png" }],
    tags: ["Visual Work"],
  },
  {
    slug: "experimental",
    title: "Experimental",
    year: "2026",
    cover: "/visual work/experimental.png",
    aspectRatio: "3171 / 2093",
    images: [{ src: "/visual work/experimental.png" }],
    tags: ["Visual Work"],
  },
  {
    slug: "tabloid-1",
    title: "Tabloid - 1",
    year: "2026",
    cover: "/visual work/Tabloid - 1.png",
    aspectRatio: "1188 / 1836",
    images: [{ src: "/visual work/Tabloid - 1.png" }],
    tags: ["Visual Work"],
  },
  {
    slug: "tabloid-1-variant",
    title: "Tabloid - 1 Variant",
    year: "2026",
    cover: "/visual work/Tabloid - 1 (1).png",
    aspectRatio: "2376 / 3672",
    images: [{ src: "/visual work/Tabloid - 1 (1).png" }],
    tags: ["Visual Work"],
  },
  {
    slug: "img-7841",
    title: "IMG 7841",
    year: "2026",
    cover: "/visual work/IMG_7841.PNG",
    aspectRatio: "1234 / 1913",
    images: [{ src: "/visual work/IMG_7841.PNG" }],
    tags: ["Visual Work"],
  },
  {
    slug: "img-7850",
    title: "IMG 7850",
    year: "2026",
    cover: "/visual work/IMG_7850.PNG",
    aspectRatio: "1237 / 1921",
    images: [{ src: "/visual work/IMG_7850.PNG" }],
    tags: ["Visual Work"],
  },
  {
    slug: "img-7851",
    title: "IMG 7851",
    year: "2026",
    cover: "/visual work/IMG_7851.PNG",
    aspectRatio: "1229 / 1582",
    images: [{ src: "/visual work/IMG_7851.PNG" }],
    tags: ["Visual Work"],
  },
  {
    slug: "img-7852",
    title: "IMG 7852",
    year: "2026",
    cover: "/visual work/IMG_7852.PNG",
    aspectRatio: "1231 / 1579",
    images: [{ src: "/visual work/IMG_7852.PNG" }],
    tags: ["Visual Work"],
  },
  {
    slug: "img-8525",
    title: "IMG 8525",
    year: "2026",
    cover: "/visual work/IMG_8525.JPG",
    aspectRatio: "792 / 1224",
    images: [{ src: "/visual work/IMG_8525.JPG" }],
    tags: ["Visual Work"],
  },
];

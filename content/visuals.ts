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
    title: "Unplugged Brand Identity",
    year: "2026",
    cover: "/unplugged preview.png",
    aspectRatio: "3534 / 2907",
    images: [
      {
        src: "/unplugged preview.png",
        caption: "Brand identity for Unplugged.",
      },
    ],
    tags: ["Brand Identity", "Visual Design"],
  },
  {
    slug: "untitled-5",
    title: "24 Hours of My Life",
    year: "2026",
    cover: "/visual work/Untitled (5).png",
    aspectRatio: "1756 / 4712",
    images: [
      {
        src: "/visual work/Untitled (5).png",
        caption: "A visual record of 24 hours of my life.",
      },
    ],
    tags: ["Information Design", "Visual Work"],
  },
  {
    slug: "issey",
    title: "Pleats Please Concept Poster",
    year: "2026",
    cover: "/visual work/issey.png",
    aspectRatio: "792 / 1224",
    images: [
      {
        src: "/visual work/issey.png",
        caption: "Concept poster for Issey Miyake Pleats Please.",
      },
    ],
    tags: ["Poster Design", "Visual Work"],
  },
  {
    slug: "experimental",
    title: "Paris Transit Experimental Visualization",
    year: "2026",
    cover: "/visual work/experimental.png",
    aspectRatio: "3171 / 2093",
    images: [
      {
        src: "/visual work/experimental.png",
        caption: "An experimental visualization of Paris transit.",
      },
    ],
    tags: ["Data Visualization", "Visual Work"],
  },
  {
    slug: "tabloid-1",
    title: "What's in My Bag",
    year: "2026",
    cover: "/visual work/Tabloid - 1.png",
    aspectRatio: "1188 / 1836",
    images: [
      {
        src: "/visual work/Tabloid - 1.png",
        caption: "A visual inventory of what's in my bag.",
      },
    ],
    tags: ["Editorial Design", "Visual Work"],
  },
  {
    slug: "tabloid-1-variant",
    title: "Northanger Abbey Quote Poster",
    year: "2026",
    cover: "/visual work/Tabloid - 1 (1).png",
    aspectRatio: "2376 / 3672",
    images: [
      {
        src: "/visual work/Tabloid - 1 (1).png",
        caption: "A Jane Austen Northanger Abbey quote poster.",
      },
    ],
    tags: ["Poster Design", "Typography"],
  },
  {
    slug: "img-7841",
    title: "Bodoni Typeface Poster",
    year: "2022",
    cover: "/visual work/IMG_7841.PNG",
    aspectRatio: "1234 / 1913",
    images: [{ src: "/visual work/IMG_7841.PNG", caption: "A poster exploring the Bodoni typeface." }],
    tags: ["Typography", "Poster Design"],
  },
  {
    slug: "img-7850",
    title: "Social Justice Poster",
    year: "2021",
    cover: "/visual work/IMG_7850.PNG",
    aspectRatio: "1237 / 1921",
    images: [
      {
        src: "/visual work/IMG_7850.PNG",
        caption: "A social justice poster made for a computer art class.",
      },
    ],
    tags: ["Poster Design", "Computer Art"],
  },
  {
    slug: "img-7851",
    title: "Negative Space Poster",
    year: "2021",
    cover: "/visual work/IMG_7851.PNG",
    aspectRatio: "1229 / 1582",
    images: [{ src: "/visual work/IMG_7851.PNG", caption: "A poster study in negative space." }],
    tags: ["Poster Design", "Computer Art"],
  },
  {
    slug: "img-7852",
    title: "Crime and Punishment Book Cover Redesign",
    year: "2022",
    cover: "/visual work/IMG_7852.PNG",
    aspectRatio: "1231 / 1579",
    images: [
      {
        src: "/visual work/IMG_7852.PNG",
        caption: "A redesigned book cover for Crime and Punishment.",
      },
    ],
    tags: ["Book Cover Design", "Typography"],
  },
  {
    slug: "img-8525",
    title: "Pharrell: In My Mind Concept Merch Design",
    year: "2025",
    cover: "/visual work/IMG_8525.JPG",
    aspectRatio: "792 / 1224",
    images: [
      {
        src: "/visual work/IMG_8525.JPG",
        caption: "Concept merchandise design inspired by Pharrell's In My Mind.",
      },
    ],
    tags: ["Merch Design", "Visual Work"],
  },
  {
    slug: "allen-iverson-video-game-concept",
    title: "Allen Iverson Video Game Design Concept",
    year: "2025",
    cover: "/visual work/iverson.jpg",
    aspectRatio: "3299 / 2168",
    images: [
      {
        src: "/visual work/iverson.jpg",
        caption: "A video game design concept centered on Allen Iverson.",
      },
    ],
    tags: ["Game Design", "Visual Design"],
  },
];

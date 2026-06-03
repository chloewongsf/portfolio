export type ProjectTag = "Design" | "Data" | "Creative Tech" | "Research";

export interface Project {
  slug: string;
  title: string;
  year: number;
  role: string;
  tools: string[];
  tags: ProjectTag[];
  summary: string;
  featured?: boolean;
  sections: {
    title: string;
    content: string;
  }[];
  outcomes: {
    metric: string;
    value: string;
  }[];
}

export const projects: Project[] = [
  {
    slug: "data-visualization-platform",
    title: "Lorem Ipsum Dolor",
    year: 2024,
    role: "Lead Designer & Developer",
    tools: ["React", "D3.js", "TypeScript", "Figma"],
    tags: ["Data", "Design", "Creative Tech"],
    summary:
      "An interactive platform for exploring complex datasets through custom visualizations and real-time filtering.",
    featured: true,
    sections: [
      {
        title: "Sit Amet",
        content:
          "This project emerged from the need to make complex data accessible to non-technical stakeholders. The challenge was creating an interface that felt intuitive while maintaining the depth required for serious data analysis.",
      },
      {
        title: "Consectetur",
        content:
          "We started with extensive user research, mapping out the mental models of our target users. The design process involved rapid prototyping of different visualization patterns, testing which ones resonated most with users.",
      },
      {
        title: "Adipiscing",
        content:
          "Built with React and D3.js, the platform uses a modular component architecture. Each visualization type is a self-contained module that can be composed into larger dashboards. Performance was critical, so we implemented virtual scrolling and lazy loading for large datasets.",
      },
    ],
    outcomes: [
      { metric: "User Engagement", value: "+45%" },
      { metric: "Time to Insight", value: "-60%" },
      { metric: "User Satisfaction", value: "4.8/5" },
    ],
  },
  {
    slug: "generative-art-installation",
    title: "Elit Sed Do",
    year: 2024,
    role: "Creative Technologist",
    tools: ["p5.js", "WebGL", "TouchDesigner", "Arduino"],
    tags: ["Creative Tech", "Design"],
    summary:
      "An interactive installation that responds to audience movement, generating real-time visual patterns projected onto a large-scale surface.",
    featured: true,
    sections: [
      {
        title: "Eiusmod",
        content:
          "The installation explores the relationship between human presence and algorithmic generation. As visitors move through the space, their motion data feeds into a generative system that creates evolving visual patterns.",
      },
      {
        title: "Tempor",
        content:
          "Real-time processing of motion data required careful optimization. We used WebGL shaders for performance-critical rendering and built a custom pipeline between motion sensors and the generative system.",
      },
      {
        title: "Incididunt",
        content:
          "The installation was featured at three gallery exhibitions and engaged over 2,000 visitors. The interactive nature created moments of discovery and connection between participants.",
      },
    ],
    outcomes: [
      { metric: "Exhibition Visitors", value: "2,000+" },
      { metric: "Interaction Time", value: "8.5 min avg" },
      { metric: "Media Coverage", value: "12 articles" },
    ],
  },
  {
    slug: "design-system-research",
    title: "Ut Labore",
    year: 2023,
    role: "Design Researcher",
    tools: ["Figma", "Notion", "Miro"],
    tags: ["Research", "Design"],
    summary:
      "A comprehensive study on how design systems evolve in fast-growing startups, with actionable insights for scaling design operations.",
    featured: false,
    sections: [
      {
        title: "Dolore",
        content:
          "How do design systems adapt as organizations scale from 10 to 100+ designers? We interviewed 15 design leaders at companies ranging from Series A to IPO.",
      },
      {
        title: "Magna",
        content:
          "The most successful design systems balance consistency with flexibility. Teams that enforced strict adherence early struggled with adoption, while those that allowed more variation had trouble maintaining coherence at scale.",
      },
      {
        title: "Aliqua",
        content:
          "The research resulted in a framework for evaluating design system maturity and a set of recommendations for different stages of organizational growth.",
      },
    ],
    outcomes: [
      { metric: "Interviews Conducted", value: "15" },
      { metric: "Framework Adoption", value: "8 companies" },
      { metric: "Publication Views", value: "12K+" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByTag(tag: ProjectTag): Project[] {
  return projects.filter((p) => p.tags.includes(tag));
}

export function getAllTags(): ProjectTag[] {
  const tagSet = new Set<ProjectTag>();
  projects.forEach((p) => p.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet);
}

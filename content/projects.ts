import type { Scene } from "@/components/case-study-scroll";
export type { Scene };

export interface Persona {
  name: string;
  description: string;
  painPoint: string;
}

export interface CaseStudySection {
  label: string;
  paragraphs: string[];
  items?: string[]; // numbered list items
  keyPoints?: { label: string; text: string }[]; // bold-label bullet points
  table?: { headers: string[]; rows: string[][] }; // two-column method/rationale table
  images?: { src: string; caption?: string; maxWidth?: string }[]; // inline images for this section
  videos?: { src: string; caption?: string }[]; // inline looping videos for this section
}

export interface Project {
  slug: string;
  title: string;
  year: string;
  featured?: boolean;
  tags: string[];
  roles: string[];
  tools: string[];
  blurb: string;
  overview: string;
  highlights: string[];
  links: { label: string; href: string }[];
  projectType: "personal" | "professional";
  // Extended case study fields
  platform?: string;
  personas?: Persona[];
  images?: { src: string; caption?: string }[]; // project-level visual gallery
  sections?: CaseStudySection[];
  windowStyle?: "editorial" | "chroma";
  scenes?: Scene[];
  bgColors?: string[];
}

export const projects: Project[] = [
  {
    slug: "outward",
    projectType: "personal",
    featured: true,
    title: "Outward",
    year: "2026",
    tags: ["Creative Code", "Web App", "AI Design"],
    roles: ["Sole Developer & Designer"],
    tools: ["Next.js", "Gemini API", "Vercel"],
    blurb: "A daily activity tool designed to interrupt the bed-rotting cycle through personalized AI nudges.",
    platform: "Web Application (Vercel)",
    overview:
      "Lately, it feels like our generation is caught in a loop of \"bed-rotting,\" or that sedentary escapism fueled by algorithmic addiction and digital fatigue. But the real issue is the loss of conscious agency. Scrolling through a feed doesn't leave room for us to be intentional beings. I built this project to act as a catalyst for consciousness — designed to help us re-engage with the small, intentional acts that make us human, whether that's listening to a full album without distraction, reading a new chapter of the book you've been putting off, or stepping outside. Instead of an infinite loop of content designed to keep you staring at a screen, Outward gives you a series of meaningful things to do each day.",
    highlights: [],
    links: [
      { label: "outwwward.vercel.app", href: "https://outwwward.vercel.app" },
    ],
    sections: [
      {
        label: "Approach",
        paragraphs: [],
        keyPoints: [
          {
            label: "Personalized Agency",
            text: "I connected Gemini API to the platform to generate higher quality, personalized suggestions. Instead of a generic list, the AI analyzes a user's profile to suggest a task that is just challenging enough to be rewarding, helping them break the cycle of passive consumption.",
          },
          {
            label: "Beating Decision Paralysis",
            text: "One of the biggest barriers to being intentional is the sheer number of choices we face. By curating just one daily suggestion per activity category, this project removes choice fatigue and creates space for the user to exercise their power of agency.",
          },
          {
            label: "A Digital Window",
            text: "As a subtle way to ground the user in reality, the interface background mirrors the sky outside. This real-time gradient shift acts as a way to sync your internal clock back with the world.",
          },
          {
            label: "The Process",
            text: "This project started with research into the \"attention economy\" and the psychological impact of digital overstimulation. I focused on \"first-step logic,\" which is the idea that a small, external nudge can be the bridge between passive scrolling and active living. The current version is a functional MVP deployed on Vercel, built to be a quiet, minimalist tool that helps users reclaim their time.",
          },
        ],
      },
      {
        label: "What I Learned",
        paragraphs: [],
        items: [
          "This project reinforced the principle that the most impactful tools are often the ones you need yourself. By building an intervention for my own struggles with motivation and digital fatigue, I was able to move past theoretical design and create with a level of empathy and authenticity that only comes from firsthand experience.",
          "In a field where success is usually measured by \"time-on-app\" or \"stickiness,\" I learned how to prioritize a user's life over their screen time. This project was a study in designing an interface as a launchpad rather than a destination — where the success of the UX is defined by the moment the user feels empowered to stop the scrolling and step away.",
          "I gained a deeper understanding of the ethical responsibility of the designer. While standard UX is often used to feed addictive, passive loops, I explored how to use those same technical tools to achieve the opposite: to break the \"auto-pilot\" cycle and encourage users to exercise their conscious power of choice.",
        ],
      },
    ],
  },
  {
    slug: "chroma-akinator",
    projectType: "personal",
    featured: true,
    title: "Chroma-Akinator",
    year: "2026",
    tags: ["Creative Code", "Web App", "AI Design"],
    roles: ["Sole Developer & Designer"],
    tools: ["Next.js", "Tailwind CSS", "JavaScript"],
    blurb: "A mood-guessing web application built on a visual decision tree.",
    platform: "Web Application (Vercel)",
    windowStyle: "chroma",
    overview:
      "Developed as a complementary project to an assignment for my AI for Design and Business class, Chroma-Akinator is an interactive experience that utilizes a binary decision tree to identify complex human emotions. The project explores how digital interfaces can mirror internal states through adaptive UI and color theory, transforming conditional logic into an evocative, responsive atmosphere. By navigating a series of prompts, the user triggers real-time state changes that transition the interface into a color profile reflecting their identified emotional state.",
    highlights: [],
    links: [
      { label: "chroma-akinator.vercel.app", href: "https://chroma-akinator.vercel.app" },
    ],
    sections: [
      {
        label: "Approach",
        paragraphs: [],
        keyPoints: [
          {
            label: "Binary Decision Tree",
            text: "Implemented a structural logic foundation where binary user inputs determine the path through a decision tree to narrow down an emotional outcome.",
          },
          {
            label: "Dynamic State UI",
            text: "Implemented a system where the interface's background hex codes and typography styles are tied directly to the logic outcomes, ensuring a seamless transition between various \"moods.\"",
          },
          {
            label: "Minimalist Aesthetic",
            text: "Focused on a \"clean-to-evocative\" design language, using generous whitespace and smooth CSS transitions to maintain a calm, intentional user experience despite the underlying technical complexity.",
          },
          {
            label: "Rapid Deployment",
            text: "Built using Next.js and Tailwind CSS, and deployed via Vercel to demonstrate a fast move from a conceptual logic tree to a functional, high-performance web tool.",
          },
        ],
      },
      {
        label: "Next Steps",
        paragraphs: [
          "Evolve the solid-color transitions into generative, moving gradients that use a secondary layer of logic to reflect the \"intensity\" of the user's emotion.",
          "Refine the underlying logic gates to accommodate a more nuanced psychological taxonomy, moving from simple branches to a more sophisticated, accurate guessing engine.",
        ],
      },
    ],
  },
  {
    slug: "her-and-i",
    projectType: "personal",
    featured: true,
    title: "her & i",
    year: "2026",
    tags: ["Marketing Campaign", "Interactive Experience", "AI Storytelling"],
    roles: ["Designer & Developer"],
    tools: ["React", "Next.js", "CSS", "Vercel"],
    blurb: "A speculative marketing campaign for Her.",
    platform: "Web Campaign / Interactive Experience",
    overview:
      "her & i is an interactive marketing campaign inspired by Spike Jonze's Her that reimagines the film's emotional premise as a public, participatory web experience. Rather than promoting the movie through traditional trailers or posters alone, the campaign invites users into a correspondence with OS1, where private thoughts can become anonymous and personalized letters in a shared archive.",
    highlights: [],
    links: [
      { label: "her-and-i.vercel.app", href: "https://her-and-i.vercel.app" },
    ],
    sections: [
      {
        label: "Friction",
        paragraphs: [
          "Most movie marketing treats audiences as viewers rather than participants. It asks people to watch, share, or buy, but rarely lets them inhabit the emotional world of the film.",
          "For Her, this felt limiting because above all, the film is about intimacy, memory, loneliness, attachment, and the comfort of being understood by something nonhuman.",
        ],
      },
      {
        label: "Objective",
        paragraphs: [
          "To design a campaign that lets users emotionally enter the world of Her through interaction.",
          "Instead of simply advertising OS1, her & i makes OS1 feel present. The user begins a small private exchange, receives a written response, and can choose whether to keep it or leave it behind in a public anonymous archive.",
        ],
      },
      {
        label: "Campaign Design",
        paragraphs: [
          "The campaign is structured around the idea of private correspondence becoming public memory.",
          "Posters placed throughout the city would invite users to start a correspondence with OS1. After scanning, users enter a quiet web experience where they respond to a few reflective prompts. OS1 then generates a personal letter to the user based on the exchange.",
          "The letter can be personalized through details like color and font, downloaded as a PDF, saved privately, or published anonymously. Over time, the archive becomes the campaign itself: a growing collection of private exchanges left behind by strangers.",
        ],
      },
      {
        label: "Execution",
        paragraphs: [
          "I designed and developed the website as a speculative campaign experience. The interface uses minimal navigation, soft language, and an archive-like structure to reflect the emotional tone of Her.",
          "The goal was to make the interaction feel intimate and slightly uncanny, as if the user were not using a chatbot, but briefly corresponding with a system that knows how to write back. I was inspired by The Unsent Project.",
          "The project combines brand strategy, interaction design, and AI-assisted storytelling to create a campaign resonant with the film's world.",
        ],
      },
      {
        label: "Reflection & Takeaways",
        paragraphs: [
          "This project pushed me to think about how emotional expression can exist within digital interfaces without feeling forced or overly sentimental. Since Her already deals with intimacy and loneliness in a heavily technological society, I wanted the experience to feel subtle and believable rather than like a generic chatbot.",
          "A large part of the process involved refining the tone of the AI responses. I found that small observations and indirect language often felt more emotionally real than direct vulnerability. The challenge was making OS1 feel intimate without making it feel manipulative or too comforting.",
          "The biggest takeaway was that emotional design often depends on restraint. The project worked best when the interaction felt personal and slightly ambiguous, rather than overly responsive or dramatic.",
        ],
      },
    ],
  },
  {
    slug: "etro-how-to-arnica",
    projectType: "personal",
    featured: true,
    title: "ETRO: How to Arnica",
    year: "2026",
    tags: ["Creative Direction", "Editorial Design", "Brand Concept"],
    roles: [
      "Concept",
      "Creative Direction",
      "Photography",
      "Styling",
      "Editorial Design",
    ],
    tools: ["Canon 800D", "Adobe InDesign", "Photoshop", "Illustrator"],
    blurb: "A satirical manual for reckless luxury.",
    platform: "Printed Publication / Brand Concept",
    overview:
      "Developed for my Creative Direction & Styling class at Parsons Paris, this how-to guide is a conceptual brand project for Etro that proposes a return to the brand's heritage of textile intelligence. In a leather goods market defined by preciousness and fragility, this project repositions Arnica, Etro's resin-coated jacquard fabric, as a material built for real life. The central idea is simple: the bag is not something you protect. It is the thing that protects you.",
    highlights: [],
    links: [],
    sections: [
      {
        label: "Brand",
        paragraphs: [],
        images: [
          {
            src: "/etro logo.jpg",
            caption: "Etro",
            maxWidth: "220px",
          },
        ],
      },
      {
        label: "Friction",
        paragraphs: [
          "Luxury bags often create a kind of anxiety. They ask to be protected from rain, dirt, scratches, surfaces, and daily use. For Etro, this felt like a missed opportunity. The brand's strongest point of difference is in its history of resilient, expressive textiles.",
        ],
      },
      {
        label: "Objective",
        paragraphs: [
          "To reframe Arnica as more than a leather alternative. The project positions it as a superior material system: waterproof, scratch-resistant, and emotionally freeing.",
          "Rather than selling durability as a technical feature, I wanted to sell the feeling it creates: the freedom to move through a messy environment without constantly worrying about the object you're carrying.",
        ],
      },
      {
        label: "Concept",
        paragraphs: [
          "The creative direction is inspired by Jane Birkin's approach to luxury. The project imagines a wearer who treats beautiful things as lived-in tools. Arnica becomes a material that allows the user to stay luxurious without being careful all the time.",
          "This concept came from my own experience with sensory overstimulation and contamination anxiety. A delicate calfskin bag can become a mental burden in a crowded, rainy city. Arnica flips that relationship: instead of protecting the bag from the environment, the bag protects the wearer's sense of ease.",
        ],
        images: [
          {
            src: "/etro mood board.png",
            caption: "Etro Arnica mood board",
          },
          {
            src: "https://wwd.com/wp-content/uploads/2023/07/jane-birkin-straw-bag.jpg",
            caption: "Jane Birkin with her basket bag",
          },
        ],
      },
      {
        label: "Execution",
        paragraphs: [
          "The final outcome is a handmade tactical publication: part fashion editorial, part field report, part satirical care guide.",
          "I created a maximalist book wrapped in ornate textile and held together with industrial gold clips. Inside, dense layouts, clashing imagery, looseleaf inserts, and how-to slips mirror the overstimulation of city life and Etro's visual world.",
          "The inserts act as the physical Arnica Resilience Protocol. They parody luxury care labels by telling the user to do the opposite: get it wet, place it down, use it as a pillow, carry it through the mess.",
          "The photoshoot with Asha was treated as a field test rather than a traditional fashion shoot. I photographed her in Paris using direct flash and motion blur to capture movement, recklessness, and ease.",
        ],
        videos: [
          {
            src: "/etro preview.mp4",
            caption: "How to Arnica publication preview",
          },
        ],
      },
      {
        label: "Reflection / Takeaways",
        paragraphs: [
          "This project helped me think about durability as both a material and emotional experience. Arnica's value is not only that it resists water, scratches, and damage, but that it reduces the mental labor of owning luxury.",
          "The biggest takeaway was that material innovation can create emotional freedom. With Arnica, Etro has the opportunity to offer a version of luxury that feels less precious, more protective, and more alive.",
        ],
      },
    ],
  },
  {
    slug: "it-starts-earlier",
    projectType: "personal",
    featured: true,
    title: "It Starts Earlier",
    year: "2026",
    tags: ["Creative Code", "UX Design", "Web App"],
    roles: ["Sole Developer & Designer"],
    tools: ["HTML5", "CSS3", "JavaScript"],
    blurb: "A reverse-engineering tool for punctuality.",
    platform: "Web Application (Vercel)",
    overview:
      "It Starts Earlier is a reverse-engineering tool for punctuality that I created as a personal project! While traditional scheduling focuses on the event itself, this application prioritizes the preparation, or the \"buffer\" time that dictates actual arrival. By taking into account user-defined preparation blocks from a hard deadline, the system helps the user calculate the exact moment a sequence must begin to remain on schedule.",
    highlights: [],
    windowStyle: "editorial",
    links: [
      { label: "it-starts-earlier.vercel.app", href: "https://it-starts-earlier.vercel.app" },
    ],
    personas: [
      {
        name: "tom hanks",
        description: "a student or professional with back-to-back digital commitments",
        painPoint:
          "they forget that real, physical world transitions (e.g., walking to the metro) don't happen at the speed of a zoom link.",
      },
      {
        name: "jennifer garner",
        description: "someone whose \"getting ready\" process is non-negotiable",
        painPoint:
          "they often sacrifice their routine (coffee, outfit) because they under-calculated the time needed, leading to a stressful morning.",
      },
      {
        name: "bruce lee",
        description: "someone who is chronically 30 mins early due to risk over-calculation",
        painPoint:
          "wasted time sitting in lobbies or platforms due to a lack of trust in their own schedule.",
      },
    ],
    sections: [
      {
        label: "Friction",
        paragraphs: [
          "Digital calendars treat time as though it were a series of isolated, back-to-back blocks. They account for the event, but ignore the transition. This creates a mental load of constantly reverse-calculating transit, dressing, eating, and \"buffer\" time.",
        ],
      },
      {
        label: "Objective",
        paragraphs: [
          "To design a \"reverse timeline\" utility that shifts the user's focus from the arrival time to the initiation time. By visualizing the invisible preparation steps, this helps to transform \"being on time\" from a guessing game into a structural sequence.",
        ],
      },
      {
        label: "Personnel & Behavioral Design",
        paragraphs: [
          "This was built to address three specific behavioral archetypes identified during the research phase, as can be seen above.",
          "Tom — uses this product as a hard boundary, thus forcing him to acknowledge the transit gap required between a screen and a classroom.",
          "Jennifer — uses this product as a protective tool, helping to make sure that her rituals aren't sacrificed to poor time estimation.",
          "Bruce — uses this product as validation; it gives him the statistical confidence to stay home until the precise moment they actually need to leave.",
        ],
      },
      {
        label: "Execution",
        paragraphs: [
          "Built with HTML, CSS, and Vanilla JavaScript, I developed a system where users plan backward from the destination, rather than planning forward from the present. By inputting a hard deadline and subtracting modular blocks of preparation, the resulting \"start time\" becomes the only metric the user needs to follow.",
          "The minimalistic design is a direct response to digital overstimulation.",
        ],
      },
    ],
  },
  {
    slug: "personal-flight-telemetry",
    projectType: "personal",
    title: "Personal Flight Telemetry",
    year: "2026",
    tags: ["Data Viz", "Personal Informatics", "Web App"],
    roles: ["Sole Developer & Designer"],
    tools: ["Lovable", "JavaScript"],
    blurb: "An interactive telemetry system for personal travel history.",
    platform: "Web Application",
    overview:
      "Developed as a rapid-prototype for an Information Visualization course at Parsons Paris, this application serves as an interactive telemetry system for personal travel history. The project explores the intersection of personal data and geographical storytelling, transforming a fragmented dataset of flights into a functional, user-centric dashboard. By prioritizing clean interface logic over data exhaustiveness, the site provides a streamlined way to navigate and visualize global movement.",
    highlights: [],
    links: [],
    sections: [
      {
        label: "Approach",
        paragraphs: [],
        keyPoints: [
          {
            label: "Agile Prototyping",
            text: "Utilized Lovable to transition from a raw flight dataset to a live, deployed environment within a single assignment cycle.",
          },
          {
            label: "Telemetry Aesthetic",
            text: "Implemented a high-contrast, technical UI inspired by aviation telemetry to ensure flight paths and data overlays are the primary focal point.",
          },
          {
            label: "Logic-Driven UI",
            text: "Prioritized the functional deployment of the core \"Flight Map\" system, demonstrating an ability to quickly stand up a data-driven interface to solve a specific visualization brief.",
          },
        ],
      },
      {
        label: "Next Steps",
        paragraphs: [
          "Expand the dataset to include a comprehensive historical record while integrating a proprietary \"landing rating\" system—currently tracked for the most recent 30+ flights—to layer subjective experience over objective flight paths.",
          "Implement responsive mapping logic to ensure the telemetry dashboard scales fluidly across all device breakpoints.",
        ],
      },
    ],
  },
  {
    slug: "ucsf-sis-portal",
    projectType: "professional",
    title: "UCSF: Student Information Systems Portal",
    year: "2024",
    tags: ["UX Design", "Data Research", "Enterprise"],
    roles: ["Data Science & UI/UX Design Intern"],
    tools: ["Figma", "SQL", "Python"],
    blurb: "Redesigning a legacy institutional reporting portal to reduce analyst friction and improve information architecture.",
    platform: "Internal Enterprise Tool (UCSF)",
    overview:
      "During my time as an intern at UCSF, I worked on the redesign of the internal SIS Reports Portal, a centralized dashboard system used by staff and administrators to access critical institutional data. The project focused on transforming a high-friction legacy interface into a streamlined, user-centric environment. By focusing on front-end usability and information architecture, I helped reduce the cognitive load required for analysts to navigate complex datasets and retrieve operational insights.",
    highlights: [],
    links: [],
    sections: [
      {
        label: "Note",
        paragraphs: [
          "Due to the proprietary nature of UCSF's internal data systems, visual assets for this project are restricted. This case study focuses on the Enterprise UX strategy and the architectural improvements made to the institutional reporting workflow.",
        ],
      },
      {
        label: "Approach",
        paragraphs: [],
        keyPoints: [
          {
            label: "User-Centered Audit",
            text: "Collaborated with internal stakeholders to identify workflow friction points, specifically targeting navigation bottlenecks and inconsistent filtering logic within the reporting interface.",
          },
          {
            label: "Information Architecture Redesign",
            text: "Assisted in the structural reorganization of the portal's report hierarchy, moving from a deeply nested menu system to a flatter, task-oriented navigation model to improve report findability.",
          },
          {
            label: "Interface Standardization",
            text: "Developed and implemented consistent layout templates and styling patterns to ensure a predictable user experience across diverse reporting modules.",
          },
          {
            label: "Visual Hierarchy Optimization",
            text: "Refined the portal's front-end presentation by clarifying labeling, improving section spacing, and emphasizing primary actions to accelerate data scanning and decision-making speeds.",
          },
        ],
      },
      {
        label: "Takeaways",
        paragraphs: [],
        items: [
          "Learned how to balance aesthetic minimalism with the high-density data requirements of enterprise users, ensuring that visual clarity never compromises functional depth.",
          "Developed the ability to translate technical feedback from data analysts and administrative staff into actionable design requirements, bridging the gap between user needs and technical constraints.",
          "Gained a deep understanding of how individual UI changes impact a larger institutional ecosystem, prioritizing scalability and consistency across a multi-modular platform.",
        ],
      },
    ],
  },
  {
    slug: "genentech-gene-expression",
    projectType: "professional",
    title: "Genentech: Gene Expression Dashboard",
    year: "2025",
    tags: ["Data Viz", "Research", "Bioinformatics"],
    roles: ["Sole Developer & Designer"],
    tools: ["Python", "Pandas", "Plotly", "Dash"],
    blurb: "An interactive dashboard for analyzing differential gene expression across colorectal cancer cell lines.",
    platform: "Research Tool",
    overview:
      "Working directly with a researcher at Genentech, I developed an interactive dashboard to streamline the analysis of colorectal cancer cell lines. The project was driven by the need to automate the manual comparison of fragmented genomic datasets. I translated specific research requirements into a functional tool, focusing on reducing analysis time and increasing the accuracy of cross-model gene identification.",
    highlights: [],
    links: [],
    sections: [
      {
        label: "Approach",
        paragraphs: [],
        keyPoints: [
          {
            label: "Multi-Dimensional Data Parsing",
            text: "Engineered a pipeline to ingest and clean multi-sheet genomic data, translating raw gene IDs, log2FoldChange, and p-values into structured dataframes for comparative analysis.",
          },
          {
            label: "Direction-Aware Overlap Logic",
            text: "Implemented a computational system to detect gene intersections across all three cell lines, specifically filtering for \"directional consistency\" (genes regulated in the same direction, up or down, across models).",
          },
          {
            label: "Dual-Metric Visualization",
            text: "Designed interactive Volcano Plots and Heatmaps that visualize both statistical significance (-log10 padj) and effect size (log2FoldChange) simultaneously, providing a dual-lens view of biological impact.",
          },
          {
            label: "Dynamic Research UX",
            text: "Integrated adjustable threshold filters and real-time top-N ranking, allowing scientists to experiment with statistical cutoffs and export presentation-ready results instantly.",
          },
        ],
      },
      {
        label: "Next Steps",
        paragraphs: [
          "Generalize the ingestion engine to support any RNA-seq dataset beyond the initial colorectal cancer study.",
          "Optimize the complex data-grid and heatmap layouts for tablet use, facilitating mobile data review in a laboratory environment.",
        ],
      },
    ],
  },
  {
    slug: "nlp-narrative-analysis",
    projectType: "professional",
    title: "Berkeley Social Welfare: NLP Narrative Analysis",
    year: "2024-2025",
    tags: ["Data Research", "NLP", "Policy"],
    roles: ["Research Assistant"],
    tools: ["Python", "scikit-learn", "Pandas", "TF-IDF"],
    blurb: "A computational pipeline to surface social-work advocacy narratives from 41,827 federal public comments.",
    platform: "Research Pipeline",
    overview:
      "Serving as a Research Assistant to Dr. Angela Perone, I developed a computational pipeline to analyze 41,827 public comments submitted to the Centers for Medicare and Medicaid Services (CMS). The research addressed a critical gap in federal policy: while a 2022 National Academies report recommended increasing nursing home staffing to include full-time social workers, a subsequent 2023 CMS rule omitted this requirement. I used NLP to isolate social-work-specific advocacy and distinguish between standardized templates and original content, surfacing 154 unique narratives that advocate for systemic reform in long-term care.",
    highlights: [],
    links: [],
    sections: [
      {
        label: "Approach",
        paragraphs: [],
        keyPoints: [
          {
            label: "Computational Filtering",
            text: "Engineered a Python-based pipeline to filter the 41k+ record corpus into a high-relevance subset of 4,118 comments using automated text normalization and keyword-based noise reduction.",
          },
          {
            label: "Vectorized Similarity Mapping",
            text: "Applied TF-IDF vectorization and Cosine Similarity to quantify the relationship between individual comments and official advocacy templates, establishing a 0.8 threshold to isolate original qualitative data.",
          },
          {
            label: "Algorithmic Discovery",
            text: "Identified undocumented template variations through similarity scoring, clarifying how advocacy instructions influenced public participation patterns.",
          },
          {
            label: "Thematic Synthesis",
            text: "Classified original content into a three-layer hierarchy (Themes, Codes, and Concepts), synthesizing over 150 personal anecdotes into structured policy insights regarding staffing ratios and burnout.",
          },
        ],
      },
      {
        label: "Methods & Rationale",
        paragraphs: [],
        table: {
          headers: ["Technique", "Rationale"],
          rows: [
            [
              "TF-IDF + Cosine Similarity",
              "Chosen over NLTK tokenization to robustly handle nuanced textual matches and scale across the 41k corpus with clear, objective similarity scores.",
            ],
            [
              "Automated Normalization",
              "Crucial for standardizing whitespace and casing variations across thousands of entries that would otherwise impede accurate text analysis.",
            ],
            [
              "Manual Thematic Analysis",
              "Conducted on the high-similarity subset to capture deep qualitative insights (like emotional storytelling) that automated clustering often misses.",
            ],
          ],
        },
      },
      {
        label: "Next Steps",
        paragraphs: [
          "Generalize the pipeline to track public sentiment across multiple federal rulemaking cycles.",
        ],
      },
    ],
  },
  {
    slug: "unplugged",
    projectType: "personal",
    title: "#unplugged",
    year: "2026",
    tags: ["Service Design", "Behavioral Design", "Research"],
    roles: ["Designer & Researcher"],
    tools: ["Research and Development", "Service Design", "Physical Prototyping"],
    blurb: "A tactile service design intervention that replaces the phone at the dinner table with prompt cards designed to reclaim presence.",
    platform: "Physical / Service Design",
    overview:
      "This project began as my Parsons Paris Research and Development Methods final project, and eventually turned into a personal and passionate investigation into the \"default companion.\" Growing up in the Bay Area and studying Data Science at Berkeley, I've seen how deeply we are heading toward an AI-mediated society. I realized that my habit of incorporating electronics into family dinners started as early as the 3rd grade; despite my mother's advice, I haven't truly peeled away from that behavior since. Instead of a \"phone ban,\" which feels like punishment, we designed a system of prompt cards that capitalize on the natural lulls of a meal.",
    highlights: [],
    links: [],
    sections: [
      {
        label: "Approach",
        paragraphs: [],
        keyPoints: [
          {
            label: "Behavioral Trigger Mapping",
            text: "Based on \"Fly on the Wall\" research at local cafés, we identified the specific \"gap moments\" — like waiting for an order or the check — where users instinctively reach for their phones. We designed the system to intervene during these specific windows of overstimulation or boredom.",
          },
          {
            label: "Solo vs. Group Interaction Logic",
            text: "We developed two distinct modes of engagement. For solo diners, the prompts focus on \"spatial observation\" (e.g., \"What's the loudest sound in the room right now?\") and personal reflection. For groups, the prompts facilitate \"anytime connect\" and \"anytime create\" moments in an attempt to shift the focus from parallel scrolling to shared presence.",
          },
          {
            label: "Inter-Table Logic",
            text: "To move beyond the individual table, I designed an asynchronous exchange system. Guests can contribute permanent prompts to the deck or leave \"seat-specific\" letters for future diners. By facilitating these stranger-to-stranger interactions — including an option for the restaurant to mail back responses — the project transforms the physical space into an evolving community archive.",
          },
        ],
      },
      {
        label: "The Process",
        paragraphs: [
          "While the prompt cards were the initial touchpoint, the project was conceptualized to include a wider range of analog interventions.",
        ],
        keyPoints: [
          {
            label: "Multisensory Programming",
            text: "We explored the inclusion of coloring books for people of all ages and tactile interactive menus to provide varied levels of engagement depending on the diner's mood.",
          },
          {
            label: "Community-Led Media",
            text: "We came up with an idea of a seasonal #unplugged magazine that would partner with local cafés and writers, turning the brand into a platform for community storytelling and local culture.",
          },
          {
            label: "Event Programming",
            text: "To tackle digital fatigue at the source, we conceptualized offline events, such as \"Singles Nights,\" specifically designed to replace dating apps with real-world, food-centered social interaction.",
          },
        ],
      },
      {
        label: "What I Learned",
        paragraphs: [
          "P.S. The name of our project, #unplugged, is an intentional irony; using a hashtag, a symbol of digital categorization, to title a project about reclaiming physical agency.",
        ],
        items: [
          "The best tools solve a problem you experience yourself. Designing for someone who struggles with their own screen time allows for an empathetic solution rather than a judgmental one.",
          "I learned that UX doesn't always have to happen on a screen or within the tech industry. Designing for the human hand and the dining table requires the same logical structure as a digital platform, but with the goal of encouraging users to critically engage with their lives rather than an interface.",
          "In an industry focused on \"seamless\" experiences, I discovered that intentional friction is necessary for consciousness. By requiring a tactile interaction with a card, we give the user a moment to reclaim their agency from the algorithm.",
        ],
      },
      {
        label: "Brand Identity",
        paragraphs: [
          "The visual language of #unplugged was designed to feel warm and analog — deliberately avoiding the clean, digital aesthetic of the tech products it pushes back against.",
        ],
        images: [
          { src: "/rd methods/brand kit.png" },
        ],
      },
    ],
  },
  {
    slug: "taara",
    projectType: "personal",
    title: "Taara: Chai Ritual System",
    year: "2025",
    tags: ["Product Design", "Material Innovation", "Service Design"],
    roles: ["Designer"],
    tools: ["Product Design", "Material Innovation", "Service Design"],
    blurb: "A chai ritual system designed around the belief that ritual shouldn't have to disappear just because modern life is fast.",
    platform: "Modular Physical Product System",
    overview:
      "We live in a culture that has optimized almost everything for speed. Whether I'm running to Pret in the morning with 5 minutes to spare in Paris or at Berkeley buying a drink from Peet's at the Golden Bear Cafe every day, the experience is the same: a grab-and-go transaction where the preparation is hidden. For my final project for Design, Development, and Production at Parsons Paris, I created Taara, a chai ritual system designed around the belief that ritual shouldn't have to disappear just because modern life is fast. It's ultimately an intervention for \"commute culture\" and the internalized pressure to be constantly efficient. The project is a \"one ritual, two ways\" ecosystem designed to be a long-term lifestyle piece rather than a trend-driven object.",
    highlights: [],
    links: [],
    sections: [
      {
        label: "The System",
        paragraphs: [],
        keyPoints: [
          {
            label: "The Ritual Pod Tumbler",
            text: "The system is centered on an insulated lifestyle tumbler with a specialized detachable base compartment. This base serves as a storage vault for \"ritual pods\" which are pre-portioned, high-quality powders consisting of spices, tea, and milk respectively. To brew, the user must manually add the powders into hot water in their traditional sequence. This physical requirement helps to disrupt the \"efficiency at all costs\" mindset for even just a moment amidst contemporary life that revolves around efficiency.",
          },
          {
            label: "At-Home & On-the-Go",
            text: "The system is designed to be complementary. The at-home components, such as refillable countertop tins and bulk pouches, cater to slower mornings, while the pod system compresses that same ritual for movement. The ritual is abbreviated for the commute but designed in a way that ensures it won't be erased.",
          },
        ],
      },
      {
        label: "Business & Ethics",
        paragraphs: [
          "Taara uses a \"Starter Kit + Refill\" model, positioning the hardware as a meaningful, long-term investment. It is also very giftable! A central part of the project was the ethics of cultural context. Chai originated in South Asia as something communal and domestic; my goal is to ensure that it won't become a micro-trend to be rebranded for a Western wellness audience. I focused on transparently sourcing Assam and Darjeeling teas and specific spices to ensure the brand's integrity is grounded in the quality and origin of the ingredients themselves.",
        ],
      },
      {
        label: "What I Learned",
        paragraphs: [],
        items: [
          "This project forced me to look at my own habits. I realized how often I choose a transaction over a ritual, like buying drinks I don't even remember tasting. Building Taara for my final project was a way to design a \"speed bump\" into my day.",
          "Sustainability is structural. If someone keeps a product for five years because they love the ritual it provides, that is a better outcome than a perfectly recyclable product they replace every season.",
          "As a designer, I am a steward of the rituals I engage with. There is a distinction between adapting a ritual for a busy person and stripping it of its context, and this project is an attempt to achieve accessibility without sacrificing history.",
        ],
      },
    ],
  },
];

# Creative Technologist Portfolio

A production-ready, interaction-driven portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Interactive Design**: Magnetic buttons, scroll-linked animations, layout transitions
- **Command Menu**: Press `⌘K` (or `Ctrl+K`) to quickly navigate
- **Theme Toggle**: Light/dark mode with smooth transitions
- **Reduced Motion**: Respects `prefers-reduced-motion` and provides UI toggle
- **Accessible**: Keyboard navigation, focus rings, ARIA labels
- **Performance**: Optimized animations, lazy loading, minimal dependencies

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Custom theme provider (light/dark mode)
- cmdk (command menu)
- lucide-react (icons)

## Getting Started

### Install Dependencies

```bash
npm install framer-motion cmdk lucide-react clsx tailwind-merge @radix-ui/react-slot
```

Note: Some dependencies may already be installed. This command will add any missing ones.

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
/app
  /about          # About page
  /contact        # Contact page
  /playground     # Interactive experiments
  /projects       # Project detail pages
  /work           # Project index with filters
  layout.tsx      # Root layout with theme provider
  page.tsx        # Home page

/components
  /ui             # Reusable UI components (Button, Card, Tag)
  command-menu.tsx    # ⌘K command menu
  navigation.tsx      # Main navigation
  project-card.tsx    # Project card component
  theme-toggle.tsx    # Theme switcher

/data
  projects.ts     # Project data (add your projects here)

/lib
  /hooks          # Custom hooks (useMagnetic, useReducedMotion)
  motion.ts       # Motion tokens and constants
  utils.ts        # Utility functions
```

## Adding New Projects

Projects are defined in `/data/projects.ts`. To add a new project:

1. Open `/data/projects.ts`
2. Add a new project object to the `projects` array:

```typescript
{
  slug: "my-project",
  title: "My Project",
  year: 2024,
  role: "Designer & Developer",
  tools: ["React", "TypeScript", "Figma"],
  tags: ["Design", "Creative Tech"],
  summary: "A brief description of the project.",
  featured: true, // Set to true to show on homepage
  sections: [
    {
      title: "Overview",
      content: "Detailed content about the project..."
    },
    // Add more sections as needed
  ],
  outcomes: [
    { metric: "User Engagement", value: "+45%" },
    // Add more metrics
  ],
}
```

3. The project will automatically appear on `/work` and can be accessed at `/projects/my-project`

## Customization

### Typography

Fonts are configured in `/app/layout.tsx`:
- **Sans-serif (UI)**: Inter
- **Serif (Headlines)**: Playfair Display

To change fonts, update the imports and variables in `layout.tsx`.

### Colors

Colors are managed through CSS variables in `/app/globals.css`. The theme system uses:
- `--background`: Background color
- `--foreground`: Text color

### Motion Tokens

Animation timing and easing are defined in `/lib/motion.ts`. Adjust these values to change the feel of animations across the site.

## Interaction Design Notes

### Magnetic Buttons
- Uses spring physics to create natural, responsive hover effects
- Respects reduced motion preferences
- Applied to primary CTAs and interactive elements

### Layout Animations
- Project cards use Framer Motion's layout animations for smooth transitions
- Staggered reveals on scroll create a sense of progression

### Scroll-Linked Effects
- Project detail pages include a progress indicator at the top
- Section reveals are triggered by viewport intersection
- Header opacity fades as you scroll

### Command Menu
- Provides quick navigation without leaving keyboard
- Includes theme toggle for accessibility
- Smooth animations with backdrop blur

### Reduced Motion
- All animations respect `prefers-reduced-motion`
- Additional UI toggle available in command menu
- Fallbacks ensure content remains accessible

## Performance Considerations

- Images should use Next.js `Image` component (add when you have assets)
- Animations are GPU-accelerated where possible
- Lazy loading for below-the-fold content
- Minimal JavaScript bundle size

## Accessibility

- Semantic HTML throughout
- Keyboard navigation support
- Focus indicators on all interactive elements
- ARIA labels where needed
- Color contrast meets WCAG AA standards

## License

This project is open source and available for personal use.

# Quick Start Guide

## Installation

1. Install dependencies:
```bash
npm install framer-motion cmdk lucide-react clsx tailwind-merge @radix-ui/react-slot
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Key Features to Test

1. **Command Menu**: Press `⌘K` (Mac) or `Ctrl+K` (Windows) to open
2. **Theme Toggle**: Click the moon/sun icon in the navigation
3. **Magnetic Buttons**: Hover over the "View Work" button on the homepage
4. **Project Filters**: Go to `/work` and click tag filters
5. **Scroll Animations**: Scroll through any page to see reveal animations

## Adding Your First Project

1. Open `/data/projects.ts`
2. Copy an existing project object
3. Update the fields with your project information
4. Set `featured: true` to show it on the homepage
5. Save and refresh - your project will appear automatically!

## Customization Checklist

- [ ] Update email in `/app/contact/page.tsx`
- [ ] Add social links in `/app/contact/page.tsx`
- [ ] Replace placeholder projects in `/data/projects.ts`
- [ ] Update site metadata in `/app/layout.tsx`
- [ ] Customize colors in `/app/globals.css` (if needed)
- [ ] Add your own images (use Next.js `Image` component)

## Project Structure Overview

```
app/
  ├── page.tsx              # Homepage
  ├── work/page.tsx          # Project index
  ├── projects/[slug]/       # Project detail pages
  ├── about/page.tsx         # About page
  ├── playground/page.tsx    # Interactive experiments
  └── contact/page.tsx       # Contact page

components/
  ├── ui/                    # Reusable UI components
  ├── navigation.tsx         # Main nav
  ├── command-menu.tsx       # ⌘K menu
  └── project-card.tsx       # Project card

data/
  └── projects.ts            # All project data

lib/
  ├── hooks/                 # Custom React hooks
  ├── motion.ts              # Animation tokens
  └── utils.ts               # Utilities
```

## Next Steps

1. Add your projects to `/data/projects.ts`
2. Customize the content on each page
3. Add images using Next.js `Image` component
4. Deploy to Vercel (or your preferred platform)

For detailed information, see `README.md` and `DESIGN_NOTES.md`.

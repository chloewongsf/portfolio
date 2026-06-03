# Interaction Design Notes

This document explains the interaction design decisions and patterns used throughout the portfolio.

## Core Interaction Patterns

### 1. Magnetic Buttons
**Implementation**: Custom `useMagnetic` hook using Framer Motion's spring physics
**Rationale**: Creates a sense of responsiveness and playfulness without being distracting. The magnetic effect is subtle (15px max distance) and respects reduced motion preferences.
**Usage**: Applied to primary CTAs and key interactive elements like the "View Work" button on the homepage.

### 2. Layout Animations
**Implementation**: Framer Motion's layout animations on project cards
**Rationale**: Smooth transitions when filtering projects create a polished feel. Cards maintain their position context during filter changes.
**Usage**: Project cards in the `/work` page use layout animations when tags are filtered.

### 3. Scroll-Linked Reveals
**Implementation**: `whileInView` animations with viewport detection
**Rationale**: Content reveals as you scroll create a sense of progression and keep users engaged. Staggered delays (0.1s per item) create a cascading effect.
**Usage**: Project cards, sections on project detail pages, and content blocks throughout.

### 4. Progress Indicator
**Implementation**: `useScroll` hook with `scrollYProgress` transformed to scale
**Rationale**: Visual feedback on scroll position helps users understand their progress through long-form content.
**Usage**: Top progress bar on project detail pages.

### 5. Command Menu (⌘K)
**Implementation**: `cmdk` library with custom styling
**Rationale**: Power users can navigate quickly without mouse. Also serves as a discoverability mechanism for site features.
**Usage**: Press `⌘K` (Mac) or `Ctrl+K` (Windows/Linux) from any page.

## Motion Tokens

All animations use consistent timing and easing defined in `/lib/motion.ts`:

- **Fast**: 0.2s - Micro-interactions (hover states)
- **Base**: 0.3s - Standard transitions
- **Slow**: 0.5s - Page transitions, major state changes
- **Slower**: 0.8s - Background animations, ambient effects

**Easing**: Custom cubic-bezier curves for natural motion:
- Default: `[0.4, 0, 0.2, 1]` - Smooth, professional
- Spring: `[0.34, 1.56, 0.64, 1]` - Bouncy, playful (used sparingly)

## Accessibility Considerations

### Reduced Motion
- All animations check `prefers-reduced-motion` via `useReducedMotion` hook
- When reduced motion is detected, animations are disabled or simplified
- Additional UI toggle in command menu for user control

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus rings are visible and consistent
- Tab order follows visual hierarchy

### Performance
- Animations use `transform` and `opacity` (GPU-accelerated)
- Viewport detection prevents animating off-screen elements
- Layout animations only when necessary (filter changes)

## Visual Hierarchy Through Motion

1. **Primary Actions**: Magnetic effect + scale on hover
2. **Secondary Actions**: Subtle lift (y: -4px) on hover
3. **Content Reveals**: Fade + slide up from bottom
4. **State Changes**: Smooth color/opacity transitions

## Playground Experiments

The `/playground` page demonstrates three interaction patterns:
1. **Magnetic Card**: Spring physics following cursor
2. **Spring Animation**: Natural bounce on interaction
3. **Gradient Spotlight**: Radial gradient following cursor

These serve as proofs of concept for interaction capabilities.

## Future Enhancements

Potential additions (not implemented):
- Scroll-triggered sound effects (optional, user-controlled)
- Parallax effects on hero sections
- Particle systems for background ambiance
- Gesture-based navigation on touch devices

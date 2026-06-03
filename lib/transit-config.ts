// Transit system configuration — tall scroll layout

export type TransitLineId = "core" | "creative" | "visual" | "data";

export interface TransitLine {
  id: TransitLineId;
  label: string;
  href: string;
  color: string;
  /** Station Y position in SVG viewBox (0–10000 for tall layout) */
  stationY: number;
  /** Path ID for train movement */
  pathId: string;
  /** Progress along path (0-1) where station is located */
  pathProgress: number;
}

export const TRANSIT_LINES: TransitLine[] = [
  {
    id: "core",
    label: "core projects",
    href: "/core-projects",
    color: "#d63384",
    stationY: 1500,
    pathId: "core-line",
    pathProgress: 0.35
  },
  {
    id: "creative",
    label: "creative technology",
    href: "/creative-technology",
    color: "#f39c12",
    stationY: 2500,
    pathId: "creative-line",
    pathProgress: 0.45
  },
  {
    id: "visual",
    label: "visual & graphic",
    href: "/visual-graphic",
    color: "#8b8680",
    stationY: 5500,
    pathId: "visual-line",
    pathProgress: 0.5
  },
  {
    id: "data",
    label: "data & research",
    href: "/data-research",
    color: "#c8bfae",
    stationY: 6800,
    pathId: "data-line",
    pathProgress: 0.55
  },
];

export const TRANSIT_COLORS = {
  background: "#c5c0b5",
  node: "#ffffff",
  text: "#5d544d",
  signBg: "rgba(244, 242, 232, 0.92)",
  signBorder: "rgba(0, 0, 0, 0.12)",
  trainFill: "#ffffff",
  trainStroke: "#5d544d",
} as const;

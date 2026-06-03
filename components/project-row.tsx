import Link from "next/link";
import { Tag } from "./tag";

interface ProjectRowProps {
  slug: string;
  title: string;
  year: string;
  tags: string[];
  blurb: string;
}

export function ProjectRow({ slug, title, year, tags, blurb }: ProjectRowProps) {
  return (
    <Link
      href={`/work/${slug}`}
      className="block p-4 transition-all"
      style={{
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="text-lg font-medium" style={{ color: "var(--fg)" }}>
          {title}
        </h3>
        <span className="text-sm" style={{ color: "var(--muted)" }}>
          {year}
        </span>
      </div>
      <p className="text-sm mb-3" style={{ color: "var(--muted)" }}>
        {blurb}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Link>
  );
}

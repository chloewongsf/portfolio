"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motion";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: motionTokens.duration.base,
        delay: index * 0.05,
        ease: motionTokens.easing.out,
      }}
      layout
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block"
        aria-label={`View ${project.title}`}
      >
        <motion.div
          className="relative border-b border-foreground/8 bg-transparent pb-5 transition-colors duration-300 hover:border-foreground/15"
          whileHover={{ opacity: 0.9 }}
          transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.inspect }}
        >
          <div className="flex items-start justify-start gap-4">
            <div className="flex-1 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <h3 className="text-lg font-semibold text-left leading-tight">{project.title}</h3>
                <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
              </div>
              <p className="text-xs text-foreground/60 text-left leading-relaxed">{project.summary}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <div className="flex items-center gap-3 text-[10px] text-foreground/45 pt-1">
                <span>{project.year}</span>
                <span>•</span>
                <span>{project.role}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

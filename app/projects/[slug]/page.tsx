"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getProjectBySlug } from "@/data/projects";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import { Spread } from "@/components/spread";
import { motionTokens } from "@/lib/motion";
import type { Project } from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectContent project={project} />;
}

function ProjectContent({ project }: { project: Project }) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Split sections into pairs for spreads
  const sectionPairs: typeof project.sections[] = [];
  for (let i = 0; i < project.sections.length; i += 2) {
    sectionPairs.push(project.sections.slice(i, i + 2));
  }

  return (
    <>
      {/* Progress Indicator */}
      <motion.div
        className="fixed top-16 left-0 right-0 h-1 bg-foreground/10 z-40"
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
      />

      {/* Header Spread */}
      <Spread
        left={
          <div className="flex h-full flex-col justify-start space-y-4 pt-4">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: motionTokens.duration.base, ease: motionTokens.easing.out as [number, number, number, number] }}
              className="flex flex-wrap gap-2"
            >
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: motionTokens.duration.base, delay: 0.05, ease: motionTokens.easing.out as [number, number, number, number] }}
              className="text-3xl font-serif font-bold text-left md:text-4xl mt-3"
            >
              {project.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: motionTokens.duration.base, delay: 0.1, ease: motionTokens.easing.out as [number, number, number, number] }}
              className="mt-3"
            >
              <Button asChild variant="ghost" size="sm">
                <Link href="/work">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Work
                </Link>
              </Button>
            </motion.div>
          </div>
        }
        right={
          <div className="flex h-full flex-col justify-start space-y-3 pt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: motionTokens.duration.base, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 text-xs text-foreground/60 text-left"
            >
              <span>{project.year}</span>
              <span>•</span>
              <span>{project.role}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: motionTokens.duration.base, delay: 0.25 }}
              className="text-xs text-foreground/60 text-left"
            >
              {project.tools.join(", ")}
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: motionTokens.duration.base, delay: 0.3 }}
              className="text-sm text-foreground/70 text-left leading-relaxed"
            >
              {project.summary}
            </motion.p>
          </div>
        }
      />

      {/* Section Spreads */}
      {sectionPairs.map((pair, pairIndex) => (
        <Spread
          key={pairIndex}
          left={
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: motionTokens.duration.base,
                delay: 0.05,
                ease: motionTokens.easing.out as [number, number, number, number],
              }}
              className="space-y-2.5 pt-2"
            >
              {pair[0] && (
                <>
                  <h2 className="text-lg font-serif font-semibold text-left">
                    {pair[0].title}
                  </h2>
                  <p className="text-xs leading-relaxed text-foreground/75 text-left whitespace-pre-line">
                    {pair[0].content}
                  </p>
                </>
              )}
            </motion.div>
          }
          right={
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: motionTokens.duration.base,
                delay: 0.08,
                ease: motionTokens.easing.out as [number, number, number, number],
              }}
              className="space-y-2.5 pt-2"
            >
              {pair[1] ? (
                <>
                  <h2 className="text-lg font-serif font-semibold text-left">
                    {pair[1].title}
                  </h2>
                  <p className="text-xs leading-relaxed text-foreground/75 text-left whitespace-pre-line">
                    {pair[1].content}
                  </p>
                </>
              ) : (
                <div />
              )}
            </motion.div>
          }
        />
      ))}

      {/* Outcomes Spread */}
      <Spread
        left={
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: motionTokens.duration.base, ease: motionTokens.easing.out as [number, number, number, number] }}
            className="flex h-full flex-col justify-start pt-2"
          >
            <h2 className="text-lg font-serif font-semibold text-left">Quis Nostrud</h2>
          </motion.div>
        }
        right={
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: motionTokens.duration.base, delay: 0.05, ease: motionTokens.easing.out as [number, number, number, number] }}
            className="flex h-full flex-col justify-start pt-2"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {project.outcomes.map((outcome, index) => (
                <div key={index} className="space-y-1 text-left">
                  <div className="text-xs text-foreground/60">{outcome.metric}</div>
                  <div className="text-xl font-semibold">{outcome.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        }
      />
    </>
  );
}

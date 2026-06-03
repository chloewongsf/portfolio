"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <motion.div
      className={cn(
        "border border-foreground/10 bg-transparent p-4 transition-colors",
        hover && "hover:border-foreground/20",
        className
      )}
      whileHover={hover ? { y: -1 } : undefined}
      transition={{ duration: motionTokens.duration.base }}
      style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}
    >
      {children}
    </motion.div>
  );
}

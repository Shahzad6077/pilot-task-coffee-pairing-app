"use client";

import { motion } from "motion/react";
import type { Alternative } from "@/app/page";

interface AlternativeCardProps {
  alternative: Alternative;
  index: number;
}

const tagColors: Record<string, string> = {
  Contrast: "bg-amber-100 text-amber-800",
  Comfort: "bg-rose-100 text-rose-800",
  Bright: "bg-sky-100 text-sky-800",
  Earthy: "bg-emerald-100 text-emerald-800",
  Classic: "bg-stone-200 text-stone-800",
  Indulgent: "bg-purple-100 text-purple-800",
};

export function AlternativeCard({ alternative, index }: AlternativeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
      className="flex-shrink-0 w-56 bg-card border border-border/50 rounded-xl p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            tagColors[alternative.tag] || "bg-muted text-muted-foreground"
          }`}
        >
          {alternative.tag}
        </span>
      </div>

      <h4 className="font-serif text-lg text-foreground mb-2">
        {alternative.name}
      </h4>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {alternative.reason}
      </p>
    </motion.div>
  );
}

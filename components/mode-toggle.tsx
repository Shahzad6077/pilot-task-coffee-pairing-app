"use client";

import { motion } from "motion/react";

interface ModeToggleProps {
  mode: "believer" | "explorer";
  onModeChange: (mode: "believer" | "explorer") => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="relative flex items-center bg-muted rounded-full p-1 px-0.5">
      <motion.div
        className="absolute h-[calc(100%-8px)] bg-card rounded-full shadow-sm"
        initial={false}
        animate={{
          x: mode === "believer" ? 4 : "calc(100% + 4px)",
          width: mode === "believer" ? "calc(50% - 4px)" : "calc(50% - 4px)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      <button
        onClick={() => onModeChange("believer")}
        className={`cursor-pointer relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
          mode === "believer" ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        Believer
      </button>

      <button
        onClick={() => onModeChange("explorer")}
        className={`cursor-pointer relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
          mode === "explorer" ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        Explorer
      </button>
    </div>
  );
}

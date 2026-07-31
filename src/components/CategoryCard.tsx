"use client";

import { motion } from "motion/react";
import { CATEGORY_META } from "@/lib/animals";
import { fadeUp, springPop } from "@/lib/motion";
import type { AnimalCategory } from "@/lib/types";

type CategoryCardProps = {
  category: AnimalCategory;
  onSelect: (category: AnimalCategory) => void;
  index?: number;
};

export function CategoryCard({ category, onSelect, index = 0 }: CategoryCardProps) {
  const meta = CATEGORY_META[category];

  return (
    <motion.button
      type="button"
      variants={fadeUp}
      custom={index}
      transition={{ ...springPop, delay: index * 0.08 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.97, y: 2 }}
      onClick={() => onSelect(category)}
      className="glass-panel flex w-full items-center gap-5 px-6 py-6 text-left text-cream"
    >
      <motion.span
        className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl text-6xl shadow-lg"
        style={{
          background: `linear-gradient(145deg, ${meta.accent} 0%, ${meta.color} 100%)`,
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.2 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {meta.emoji}
      </motion.span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {meta.label}
        </p>
        <p className="mt-1 text-base text-cream/65">Tap to start discovering</p>
      </div>
      <span className="text-3xl text-sun/80">›</span>
    </motion.button>
  );
}

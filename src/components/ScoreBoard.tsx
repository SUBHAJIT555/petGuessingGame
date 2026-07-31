"use client";

import { motion } from "motion/react";
import { CATEGORY_META } from "@/lib/animals";
import type { AnimalCategory } from "@/lib/types";

type ScoreBoardProps = {
  category: AnimalCategory;
  score: number;
  correctPicks: number;
  lives: number;
  maxLives?: number;
  totalCorrect?: number;
};

export function ScoreBoard({
  category,
  score,
  correctPicks,
  lives,
  maxLives = 3,
  totalCorrect = 20,
}: ScoreBoardProps) {
  const meta = CATEGORY_META[category];

  return (
    <motion.header
      className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-cream/10 bg-forest-deep/55 px-4 py-3 backdrop-blur-md"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream/10 text-3xl">
          {meta.emoji}
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/55">
            Category
          </p>
          <p className="font-display text-xl font-bold tracking-tight">
            {meta.shortLabel}
          </p>
        </div>
      </div>

      <div className="text-center">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-cream/55">
          Lives
        </p>
        <div className="flex items-center justify-center gap-1.5" aria-label={`${lives} of ${maxLives} lives`}>
          {Array.from({ length: maxLives }, (_, i) => {
            const filled = i < lives;
            return (
              <motion.span
                key={`${lives}-${i}`}
                initial={filled ? { scale: 1 } : { scale: 0.6, opacity: 0.4 }}
                animate={{
                  scale: filled ? 1 : 0.85,
                  opacity: filled ? 1 : 0.28,
                }}
                transition={{ type: "spring", stiffness: 420, damping: 22 }}
                className={`text-2xl leading-none ${filled ? "text-danger" : "text-cream"}`}
                aria-hidden
              >
                {filled ? "♥" : "♡"}
              </motion.span>
            );
          })}
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/55">
          Found
        </p>
        <motion.p
          key={correctPicks}
          initial={{ scale: 1.2, color: "#f2c94c" }}
          animate={{ scale: 1, color: "#f7f1e3" }}
          className="font-display text-2xl font-bold"
        >
          {correctPicks}
          <span className="text-cream/50"> / {totalCorrect}</span>
        </motion.p>
      </div>

      <motion.div
        key={score}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        className="score-pill px-5 py-2"
      >
        <p className="text-[0.65rem] font-bold uppercase tracking-wider opacity-60">
          Score
        </p>
        <p className="font-display text-3xl font-extrabold leading-none">{score}</p>
      </motion.div>
    </motion.header>
  );
}

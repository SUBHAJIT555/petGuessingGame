"use client";

import { motion } from "motion/react";
import type { GridCard } from "@/lib/types";

type AnimalCardProps = {
  card: GridCard;
  onReveal: (id: string) => void;
  disabled?: boolean;
  index?: number;
};

export function AnimalCard({
  card,
  onReveal,
  disabled,
  index = 0,
}: AnimalCardProps) {
  const showFront = card.revealed;

  return (
    <motion.button
      type="button"
      disabled={disabled || showFront}
      onClick={() => onReveal(card.id)}
      className="relative aspect-square w-full"
      style={{ perspective: 900 }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.02 * index,
        type: "spring",
        stiffness: 380,
        damping: 22,
      }}
      whileTap={showFront ? undefined : { scale: 0.92 }}
      aria-label={showFront ? card.animal.name : "Hidden animal card"}
    >
      <motion.div
        className="relative h-full w-full"
        initial={false}
        animate={{ rotateY: showFront ? 180 : 0 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="paw-card absolute inset-0 flex items-center justify-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-3xl opacity-90 sm:text-4xl md:text-5xl">🐾</span>
        </div>
        <div
          className={`animal-face absolute inset-0 flex flex-col items-center justify-center gap-0.5 ${
            card.isCorrect || card.transformed
              ? "ring-[3px] ring-success"
              : "ring-[3px] ring-danger"
          }`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <span className="text-3xl sm:text-4xl md:text-5xl">{card.animal.emoji}</span>
          <span className="px-0.5 text-center text-[0.6rem] font-bold leading-tight sm:text-[0.7rem]">
            {card.animal.name}
          </span>
          <span className="text-base sm:text-lg">
            {card.isCorrect || card.transformed ? "✔" : "✖"}
          </span>
        </div>
      </motion.div>
    </motion.button>
  );
}

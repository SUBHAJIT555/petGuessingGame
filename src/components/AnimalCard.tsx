"use client";

import { motion } from "motion/react";
import { getAnimalPortrait } from "@/lib/animals";
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
  const isGood = card.isCorrect || card.transformed;
  const frameSrc = isGood ? "/game/frame-correct.webp" : "/game/frame-wrong.webp";
  const portraitSrc = getAnimalPortrait(card.animal);

  return (
    <motion.button
      type="button"
      disabled={disabled || showFront}
      onClick={() => onReveal(card.id)}
      className="game-tile"
      style={{ perspective: 900 }}
      initial={{ opacity: 0, scale: 0.82 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.015 * index,
        type: "spring",
        stiffness: 400,
        damping: 24,
      }}
      whileTap={showFront ? undefined : { scale: 0.94 }}
      aria-label={showFront ? card.animal.name : "Hidden animal card"}
    >
      <motion.div
        className="game-tile-inner"
        initial={false}
        animate={{ rotateY: showFront ? 180 : 0 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="game-tile-face game-tile-back">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/game/tile-mystery.webp"
            alt=""
            className="game-tile-art"
            draggable={false}
          />
        </div>

        <div className="game-tile-face game-tile-front">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={frameSrc}
            alt=""
            className="game-tile-frame"
            draggable={false}
          />
          <div className="game-tile-portrait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={portraitSrc}
              alt={card.animal.name}
              className="game-tile-animal"
              draggable={false}
            />
          </div>
        </div>
      </motion.div>
    </motion.button>
  );
}

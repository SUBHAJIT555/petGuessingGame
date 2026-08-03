"use client";

import { motion } from "motion/react";
import { CORRECT_CARDS } from "@/lib/types";

type ScoreBoardProps = {
  score: number;
  correctPicks: number;
  totalCorrect?: number;
};

export function ScoreBoard({
  score,
  correctPicks,
  totalCorrect = CORRECT_CARDS,
}: ScoreBoardProps) {
  return (
    <motion.div
      className="game-scoreboard"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/game/scoreboard.webp"
        alt=""
        className="game-scoreboard-img"
        draggable={false}
      />

      <motion.span
        key={`picks-${correctPicks}`}
        className="game-scoreboard-value game-scoreboard-picks"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
      >
        {correctPicks}
        <span className="game-scoreboard-den">/{totalCorrect}</span>
      </motion.span>

      <motion.span
        key={`score-${score}`}
        className="game-scoreboard-value game-scoreboard-score"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
      >
        {score}
      </motion.span>
    </motion.div>
  );
}

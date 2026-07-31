"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { AnimalCard } from "@/components/AnimalCard";
import { ConfettiOverlay } from "@/components/ConfettiOverlay";
import { ScoreBoard } from "@/components/ScoreBoard";
import { ScreenShell } from "@/components/ScreenShell";
import { useGame } from "@/context/GameContext";

export default function GamePage() {
  const router = useRouter();
  const { category, cards, score, correctPicks, status, revealCard } = useGame();

  useEffect(() => {
    if (!category) router.replace("/category");
  }, [category, router]);

  useEffect(() => {
    if (status === "gameover" || status === "perfect") {
      const timer = setTimeout(() => router.push("/results"), 1700);
      return () => clearTimeout(timer);
    }
  }, [status, router]);

  if (!category) return null;

  const locked = status !== "playing";

  return (
    <ScreenShell className="pt-4!">
      <ConfettiOverlay active={status === "perfect"} />
      <ScoreBoard
        category={category}
        score={score}
        correctPicks={correctPicks}
      />

      <AnimatePresence>
        {(status === "gameover" || status === "perfect") && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-[38%] z-40 flex justify-center px-6"
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
          >
            <div
              className={`rounded-2xl px-10 py-5 text-center font-display text-4xl font-extrabold tracking-tight shadow-2xl ${
                status === "perfect" ? "score-pill" : "bg-danger text-white"
              }`}
            >
              {status === "perfect" ? "PERFECT!" : "GAME OVER"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid flex-1 grid-cols-5 content-center gap-2 sm:gap-3">
        {cards.map((card, index) => (
          <AnimalCard
            key={card.id}
            card={card}
            index={index}
            onReveal={revealCard}
            disabled={locked}
          />
        ))}
      </div>

      <motion.p
        className="mt-3 text-center text-sm text-cream/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Tap to reveal · One wrong animal ends the game
      </motion.p>
    </ScreenShell>
  );
}

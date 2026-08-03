"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { AnimalCard } from "@/components/AnimalCard";
import { ConfettiOverlay } from "@/components/ConfettiOverlay";
import { ScoreBoard } from "@/components/ScoreBoard";
import { useGame } from "@/context/GameContext";
import { usePageTransition } from "@/context/PageTransitionContext";
import { CATEGORY_META } from "@/lib/animals";

export default function GamePage() {
  const router = useRouter();
  const { navigate } = usePageTransition();
  const {
    category,
    cards,
    score,
    correctPicks,
    lives,
    maxLives,
    status,
    revealCard,
  } = useGame();

  useEffect(() => {
    if (!category) router.replace("/category");
  }, [category, router]);

  useEffect(() => {
    if (status === "gameover" || status === "perfect") {
      const timer = setTimeout(() => {
        void navigate("/results");
      }, 1700);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  if (!category) return null;

  const locked = status !== "playing";
  const meta = CATEGORY_META[category];

  return (
    <main className="game-stage">
      <Image
        src="/game/background.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="game-stage-bg"
      />

      <ConfettiOverlay active={status === "perfect"} />

      <div className="game-stage-ui">
        <motion.div
          className="game-logo-wrap"
          initial={{ opacity: 0, y: -12, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/home/logo.webp"
            alt="iFT"
            width={280}
            height={280}
            priority
            className="game-logo"
          />
        </motion.div>

        <motion.div
          className="game-title-wrap"
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={meta.titleSrc}
            alt={meta.label}
            width={1024}
            height={573}
            priority
            className="game-title"
          />
        </motion.div>

        <motion.div
          className="game-lives"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
          aria-label={`${lives} of ${maxLives} lives left`}
        >
          <span className="game-lives-label">Life Left-</span>
          <div className="game-lives-dots">
            {Array.from({ length: maxLives }, (_, i) => {
              const filled = i < lives;
              return (
                <span
                  key={i}
                  className={`game-life-dot ${filled ? "is-filled" : "is-hollow"}`}
                  aria-hidden
                />
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence>
          {(status === "gameover" || status === "perfect") && (
            <motion.div
              className="game-status-banner"
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
            >
              <div
                className={`game-status-pill ${
                  status === "perfect" ? "is-perfect" : "is-over"
                }`}
              >
                {status === "perfect" ? "PERFECT!" : "GAME OVER"}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="game-grid-wrap"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="game-grid">
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
        </motion.div>

        <ScoreBoard score={score} correctPicks={correctPicks} />
      </div>
    </main>
  );
}

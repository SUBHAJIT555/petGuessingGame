"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { AnimalCard } from "@/components/AnimalCard";
import { ConfettiOverlay } from "@/components/ConfettiOverlay";
import { ScoreBoard } from "@/components/ScoreBoard";
import { useGame } from "@/context/GameContext";
import { usePageTransition } from "@/context/PageTransitionContext";
import { CATEGORY_META } from "@/lib/animals";
import { MAX_LIVES } from "@/lib/types";
import { playSound } from "@/lib/sounds";

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
    hintIds,
    revealHint,
    finishHinting,
    revealCard,
    dismissIntro,
  } = useGame();
  const prevLivesRef = useRef(lives);
  const [losingIndex, setLosingIndex] = useState<number | null>(null);
  const hintRunRef = useRef(false);

  useEffect(() => {
    if (!category) router.replace("/category");
  }, [category, router]);

  // After page opens: show full grid, then flip 2 example tiles one by one
  useEffect(() => {
    if (status !== "hinting" || hintIds.length === 0) return;
    if (hintRunRef.current) return;
    hintRunRef.current = true;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const START_DELAY_MS = 900;
    const BETWEEN_FLIP_MS = 520;
    const AFTER_LAST_MS = 380;

    hintIds.forEach((id, i) => {
      timers.push(
        setTimeout(() => {
          revealHint(id);
        }, START_DELAY_MS + i * BETWEEN_FLIP_MS),
      );
    });

    timers.push(
      setTimeout(
        () => {
          finishHinting();
        },
        START_DELAY_MS + hintIds.length * BETWEEN_FLIP_MS + AFTER_LAST_MS,
      ),
    );

    return () => {
      timers.forEach(clearTimeout);
      hintRunRef.current = false;
    };
  }, [status, hintIds, revealHint, finishHinting]);

  useEffect(() => {
    if (status === "gameover" || status === "perfect") {
      const timer = setTimeout(() => {
        void navigate("/results");
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  useEffect(() => {
    const prev = prevLivesRef.current;
    if (lives < prev) {
      setLosingIndex(lives);
      const timer = setTimeout(() => setLosingIndex(null), 650);
      prevLivesRef.current = lives;
      return () => clearTimeout(timer);
    }
    prevLivesRef.current = lives;
  }, [lives]);

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
            src="/home/brand-logo.webp"
            alt="IFT Animal Health"
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
          {Array.from({ length: maxLives }, (_, i) => {
            const filled = i < lives;
            const losing = losingIndex === i;
            return (
              <span
                key={i}
                className={`game-life-heart ${
                  losing ? "is-losing" : filled ? "is-filled" : "is-hollow"
                }`}
                aria-hidden
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  className="game-life-heart-svg"
                  fill="currentColor"
                >
                  <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                </svg>
              </span>
            );
          })}
        </motion.div>

        <AnimatePresence>
          {status === "intro" && (
            <motion.div
              className="game-intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <motion.div
                className="game-intro-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="game-intro-title"
                initial={{ opacity: 0, y: 28, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <p className="game-intro-eyebrow">Look at the open blocks</p>
                <h2 id="game-intro-title" className="game-intro-title">
                  These are the correct blocks
                </h2>
                <p className="game-intro-copy">
                  Find all {meta.label} within {MAX_LIVES} lives to win!
                </p>
                <button
                  type="button"
                  className="game-intro-btn"
                  onClick={() => {
                    playSound("buttonClick");
                    dismissIntro();
                  }}
                >
                  Let&apos;s Play
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(status === "gameover" || status === "perfect") && (
            <motion.div
              className="game-status-banner"
              initial={{ opacity: 0, scale: 0.55, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 280, damping: 16 }}
            >
              <div
                className={`game-status-pill ${
                  status === "perfect" ? "is-perfect" : "is-over"
                }`}
              >
                <span className="game-status-text">
                  {status === "perfect" ? "PERFECT!" : "GAME OVER"}
                </span>
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

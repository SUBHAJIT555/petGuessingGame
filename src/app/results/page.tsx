"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { ConfettiOverlay } from "@/components/ConfettiOverlay";
import { useGame } from "@/context/GameContext";
import { usePageTransition } from "@/context/PageTransitionContext";
import { playSound } from "@/lib/sounds";
import { CORRECT_CARDS, MAX_SCORE } from "@/lib/types";

type Phase = "summary" | "thanks";

export default function ResultsPage() {
  const router = useRouter();
  const { navigate } = usePageTransition();
  const { result, resetGame } = useGame();
  const [phase, setPhase] = useState<Phase>("summary");

  useEffect(() => {
    if (!result) router.replace("/");
  }, [result, router]);

  if (!result) return null;

  const isPerfect = result.status === "perfect" || result.score >= MAX_SCORE;
  const totalCorrect = result.totalCorrectPossible || CORRECT_CARDS;

  return (
    <main className="results-stage">
      <Image
        src="/results/background.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="results-stage-bg"
      />

      <ConfettiOverlay active={isPerfect && phase === "summary"} />

      <div className="results-stage-ui">
        <motion.div
          className="results-logo-wrap"
          initial={{ opacity: 0, y: -12, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45 }}
        >
          <Image
            src="/home/brand-logo.webp"
            alt="IFT Animal Health"
            width={280}
            height={280}
            priority
            className="results-logo"
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {phase === "thanks" ? (
            <motion.div
              key="thanks"
              className="results-thanks"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="results-thanks-plaque-wrap"
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.08, duration: 0.5 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/results/thanks-plaque.webp"
                  alt="Thank You! Thank you for taking part in the Animal Discovery Challenge. We hope you enjoyed exploring, discovering, and learning with us. Have a wonderful day, and we look forward to seeing you again!"
                  className="results-thanks-plaque"
                  draggable={false}
                />
              </motion.div>

              <motion.button
                type="button"
                className="results-thanks-btn"
                onClick={() => {
                  playSound("buttonClick");
                  resetGame();
                  void navigate("/");
                }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.45 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Back to Home"
              >
                <motion.span
                  className="results-thanks-btn-inner"
                  animate={{
                    scale: [0.94, 1.05, 0.94],
                    y: [0, -7, 0],
                  }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: [0.45, 0, 0.55, 1],
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/results/btn-back-home.webp"
                    alt=""
                    className="results-thanks-btn-img"
                    draggable={false}
                  />
                </motion.span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="summary"
              className="results-summary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {isPerfect && (
                <motion.div
                  className="results-title-wrap"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05, duration: 0.5 }}
                >
                  <Image
                    src="/results/title-perfect.webp"
                    alt="Congratulations!"
                    width={1024}
                    height={329}
                    priority
                    className="results-title"
                  />
                </motion.div>
              )}

              <motion.div
                className={`results-card ${isPerfect ? "is-perfect" : "is-try"}`}
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.12, duration: 0.5 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    isPerfect
                      ? "/results/score-perfect.webp"
                      : "/results/score-try.webp"
                  }
                  alt=""
                  className="results-card-img"
                  draggable={false}
                />

                {!isPerfect && (
                  <>
                    <div className="results-overlay results-try-score">
                      <span className="results-try-score-main">
                        {result.score}
                      </span>
                      <span className="results-try-score-den">
                        / {MAX_SCORE}
                      </span>
                    </div>
                    <div className="results-overlay results-try-picks">
                      <span className="results-try-picks-main">
                        {result.correctPicks}
                      </span>
                      <span className="results-try-picks-den">
                        / {totalCorrect}
                      </span>
                    </div>
                  </>
                )}
              </motion.div>

              <motion.button
                type="button"
                className="results-photo-btn"
                onClick={() => {
                  playSound("buttonClick");
                  setPhase("thanks");
                }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.45 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Photo Taken — Continue"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/results/btn-photo-continue.webp"
                  alt=""
                  className="results-photo-img"
                  draggable={false}
                />
              </motion.button>

              {isPerfect && (
                <motion.div
                  className="results-footer-wrap"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.36, duration: 0.45 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/results/footer-perfect.webp"
                    alt=""
                    className="results-footer-img"
                    draggable={false}
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

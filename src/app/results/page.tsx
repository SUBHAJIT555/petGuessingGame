"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { AnimatedScore } from "@/components/AnimatedScore";
import { ConfettiOverlay } from "@/components/ConfettiOverlay";
import { ScreenShell } from "@/components/ScreenShell";
import { TouchButton } from "@/components/TouchButton";
import { useGame } from "@/context/GameContext";
import { usePageTransition } from "@/context/PageTransitionContext";
import { CATEGORY_META } from "@/lib/animals";
import { fadeUp, springPop, stagger } from "@/lib/motion";

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

  const meta = CATEGORY_META[result.category];
  const isPerfect = result.status === "perfect";

  return (
    <ScreenShell className="items-center justify-center text-center">
      <ConfettiOverlay active={isPerfect && phase === "summary"} />

      <AnimatePresence mode="wait">
        {phase === "thanks" ? (
          <motion.div
            key="thanks"
            className="flex w-full max-w-lg flex-col items-center"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="mb-4 text-8xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              {meta.emoji}
            </motion.span>
            <h1 className="display-title text-5xl sm:text-6xl">Thank You!</h1>
            <p className="mt-4 max-w-md text-lg text-cream/70">
              Photo moment complete. Thanks for playing!
            </p>
            <TouchButton
              className="mt-10 w-full"
              onClick={() => {
                resetGame();
                void navigate("/");
              }}
            >
              Next Player
            </TouchButton>
          </motion.div>
        ) : (
          <motion.div
            key="summary"
            className="flex w-full max-w-lg flex-col items-center"
            variants={stagger}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, y: -16 }}
          >
            <motion.p variants={fadeUp} transition={springPop} className="eyebrow mb-3">
              {isPerfect ? "Perfect Run" : "Result & Photo"}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              transition={springPop}
              className="display-title text-4xl sm:text-5xl"
            >
              {isPerfect ? "Congratulations!" : "Good Try!"}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={springPop}
              className="mt-3 max-w-md text-lg text-cream/65"
            >
              Smile for the camera — our photographer will take your shot
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={springPop}
              className="glass-panel mt-8 w-full space-y-3 p-5 text-left"
            >
              <div className="stat-row">
                <span className="text-cream/65">Category</span>
                <span className="flex items-center gap-2 font-display text-xl font-bold">
                  <span>{meta.emoji}</span>
                  {meta.label}
                </span>
              </div>
              <div className="stat-row">
                <span className="text-cream/65">Correct Picks</span>
                <span className="font-display text-2xl font-bold text-sun">
                  {result.correctPicks}
                  <span className="text-cream/45">
                    {" "}
                    / {result.totalCorrectPossible}
                  </span>
                </span>
              </div>
              <div className="score-pill mt-1 px-6 py-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
                  Final Score
                </p>
                <AnimatedScore
                  value={result.score}
                  className="font-display text-5xl font-extrabold leading-none sm:text-6xl"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={springPop}
              className="mt-8 flex w-full flex-col gap-3"
            >
              <p className="text-sm text-cream/40">
                Staff: tap after the photo is taken
              </p>
              <TouchButton
                variant="accent"
                className="w-full"
                onClick={() => setPhase("thanks")}
              >
                Photo Taken — Continue
              </TouchButton>
              <TouchButton
                variant="secondary"
                className="w-full"
                onClick={() => {
                  resetGame();
                  void navigate("/category");
                }}
              >
                Play Again
              </TouchButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenShell>
  );
}

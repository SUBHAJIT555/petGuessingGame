"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { AnimatedScore } from "@/components/AnimatedScore";
import { ConfettiOverlay } from "@/components/ConfettiOverlay";
import { ScreenShell } from "@/components/ScreenShell";
import { TouchButton } from "@/components/TouchButton";
import { useGame } from "@/context/GameContext";
import { CATEGORY_META } from "@/lib/animals";
import { fadeUp, springPop, stagger } from "@/lib/motion";

export default function ResultsPage() {
  const router = useRouter();
  const { result, resetGame } = useGame();

  useEffect(() => {
    if (!result) router.replace("/");
  }, [result, router]);

  if (!result) return null;

  const meta = CATEGORY_META[result.category];
  const isPerfect = result.status === "perfect";

  return (
    <ScreenShell className="items-center justify-center text-center">
      <ConfettiOverlay active={isPerfect} />

      <motion.div
        className="w-full max-w-lg"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <motion.p variants={fadeUp} transition={springPop} className="eyebrow mb-3">
          Result Summary
        </motion.p>
        <motion.h1
          variants={fadeUp}
          transition={springPop}
          className="display-title text-5xl sm:text-6xl"
        >
          {isPerfect ? "Congratulations!" : "Good Try!"}
        </motion.h1>

        <motion.div
          variants={fadeUp}
          transition={springPop}
          className="glass-panel mt-10 space-y-3 p-5 text-left"
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
              <span className="text-cream/45"> / {result.totalCorrectPossible}</span>
            </span>
          </div>
          <div className="score-pill mt-2 px-6 py-6 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
              Final Score
            </p>
            <AnimatedScore
              value={result.score}
              className="font-display text-6xl font-extrabold leading-none"
            />
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={springPop}
          className="mt-8 flex flex-col gap-4"
        >
          <TouchButton
            variant="accent"
            className="w-full"
            onClick={() => router.push("/selfie")}
          >
            Next: Photo Zone
          </TouchButton>
          <TouchButton
            variant="secondary"
            className="w-full"
            onClick={() => {
              resetGame();
              router.push("/category");
            }}
          >
            Play Again
          </TouchButton>
        </motion.div>
      </motion.div>
    </ScreenShell>
  );
}

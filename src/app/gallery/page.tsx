"use client";

import { motion } from "motion/react";
import { ScreenShell } from "@/components/ScreenShell";
import { TouchButton } from "@/components/TouchButton";
import { usePageTransition } from "@/context/PageTransitionContext";
import { fadeUp, springPop, stagger } from "@/lib/motion";

const HIGHLIGHTS = [
  { emoji: "🐾", label: "Find 20 animals" },
  { emoji: "⚡", label: "30–60 sec play" },
  { emoji: "📷", label: "Photo moment" },
];

export default function AttractPage() {
  const { navigate, isTransitioning } = usePageTransition();

  return (
    <ScreenShell className="items-center justify-between text-center">
      <motion.div
        className="w-full pt-6"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <motion.p variants={fadeUp} transition={springPop} className="eyebrow mb-4">
          Now Playing
        </motion.p>
        <motion.h1
          variants={fadeUp}
          transition={springPop}
          className="display-title text-[clamp(2.8rem,8vw,4.6rem)]"
        >
          Animal
          <span className="mt-1 block text-sun">Discovery</span>
          Challenge
        </motion.h1>
        <motion.p
          variants={fadeUp}
          transition={springPop}
          className="mx-auto mt-5 max-w-sm text-lg text-cream/70"
        >
          Step up, pick a category, and uncover the hidden animals
        </motion.p>
      </motion.div>

      <div className="relative flex w-full flex-1 flex-col items-center justify-center gap-10">
        <div className="absolute h-80 w-80 rounded-full bg-sun/10 blur-3xl" />

        <div className="relative flex items-center gap-4 sm:gap-6">
          {[
            { emoji: "🐕", label: "Pets" },
            { emoji: "🐄", label: "Farm" },
            { emoji: "🐎", label: "Racing" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="glass-panel flex flex-col items-center gap-3 px-5 py-6 sm:px-7 sm:py-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: [0, -10, 0],
              }}
              transition={{
                opacity: { delay: 0.2 + i * 0.1, duration: 0.4 },
                y: {
                  delay: 0.6 + i * 0.15,
                  duration: 3 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <span className="text-5xl sm:text-6xl">{item.emoji}</span>
              <span className="font-display text-sm font-bold tracking-wide text-cream/80 sm:text-base">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="grid w-full max-w-md grid-cols-3 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-cream/10 bg-forest-deep/40 px-2 py-4"
            >
              <p className="text-2xl">{item.emoji}</p>
              <p className="mt-2 text-xs font-semibold leading-snug text-cream/65">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="w-full max-w-md pb-3"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <TouchButton
          className="w-full"
          disabled={isTransitioning}
          onClick={() => navigate("/category")}
        >
          Tap to Play
        </TouchButton>
      </motion.div>
    </ScreenShell>
  );
}

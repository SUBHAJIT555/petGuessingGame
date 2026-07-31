"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { AnimatedScore } from "@/components/AnimatedScore";
import { ScreenShell } from "@/components/ScreenShell";
import { TouchButton } from "@/components/TouchButton";
import { useGame } from "@/context/GameContext";
import { CATEGORY_META } from "@/lib/animals";
import { fadeUp, springPop, stagger } from "@/lib/motion";

type Phase = "pose" | "thanks";

export default function PhotoZonePage() {
  const router = useRouter();
  const { result, category, resetGame } = useGame();
  const [phase, setPhase] = useState<Phase>("pose");

  useEffect(() => {
    if (!result) router.replace("/");
  }, [result, router]);

  if (!result || !category) return null;

  const meta = CATEGORY_META[category];

  return (
    <ScreenShell className="items-center justify-center text-center">
      <AnimatePresence mode="wait">
        {phase === "thanks" ? (
          <motion.div
            key="thanks"
            className="flex w-full max-w-lg flex-col items-center"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="mb-4 text-8xl"
              animate={{ y: [0, -10, 0], rotate: [0, -4, 4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              {meta.emoji}
            </motion.span>
            <h1 className="display-title text-5xl sm:text-6xl">Thank You!</h1>
            <p className="mt-4 max-w-md text-lg text-cream/70">
              Your photo moment is complete. Thanks for playing!
            </p>
            <TouchButton
              className="mt-10 w-full"
              onClick={() => {
                resetGame();
                router.push("/");
              }}
            >
              Next Player
            </TouchButton>
          </motion.div>
        ) : (
          <motion.div
            key="pose"
            className="flex w-full max-w-xl flex-col items-center"
            variants={stagger}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, y: -16 }}
          >
            <motion.p variants={fadeUp} transition={springPop} className="eyebrow mb-3">
              Photo Zone
            </motion.p>
            <motion.h1
              variants={fadeUp}
              transition={springPop}
              className="display-title text-[clamp(2.4rem,6.5vw,3.6rem)]"
            >
              Smile for the Camera!
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={springPop}
              className="mt-3 max-w-md text-lg text-cream/65"
            >
              Stand in front of the screen — our photographer will take your shot
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={springPop}
              className="glass-panel relative mt-10 w-full px-6 py-10"
            >
              <div className="mb-6 flex items-center justify-center gap-5 text-6xl sm:text-7xl">
                <motion.span
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  {meta.emoji}
                </motion.span>
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  📷
                </motion.span>
                <motion.span
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.35,
                  }}
                >
                  🐾
                </motion.span>
              </div>

              <p className="font-display text-2xl font-bold tracking-tight text-sun sm:text-3xl">
                Animal Discovery Challenge
              </p>
              <p className="mt-2 text-cream/60">{meta.label} Explorer</p>

              <div className="score-pill mx-auto mt-8 max-w-xs px-6 py-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
                  Your Score
                </p>
                <AnimatedScore
                  value={result.score}
                  className="font-display text-5xl font-extrabold leading-none"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={springPop}
              className="mt-8 w-full space-y-3"
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenShell>
  );
}

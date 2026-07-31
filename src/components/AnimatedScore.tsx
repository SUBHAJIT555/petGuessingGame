"use client";

import { useEffect, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";

type AnimatedScoreProps = {
  value: number;
  max?: number;
  className?: string;
};

export function AnimatedScore({
  value,
  max = 100,
  className = "",
}: AnimatedScoreProps) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [motionValue, rounded, value]);

  return (
    <motion.p
      className={className}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
    >
      {display}
      <span className="text-[0.45em] font-semibold opacity-55"> / {max}</span>
    </motion.p>
  );
}

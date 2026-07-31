"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type ScreenShellProps = {
  children: ReactNode;
  className?: string;
  /** Soft leaf/paw ambient icons. Off for more editorial screens. */
  ambient?: boolean;
};

export function ScreenShell({
  children,
  className = "",
  ambient = true,
}: ScreenShellProps) {
  return (
    <div className="kiosk-shell">
      <div className="jungle-border" aria-hidden />
      {ambient && <AmbientDecor />}
      <div className={`screen-content ${className}`}>{children}</div>
    </div>
  );
}

function AmbientDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
      <motion.div
        className="orb absolute -left-16 top-[12%] h-48 w-48 rounded-full bg-leaf/20 blur-3xl"
        animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb absolute -right-10 top-[28%] h-56 w-56 rounded-full bg-sun/15 blur-3xl"
        animate={{ x: [0, -14, 0], y: [0, 16, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.span
        className="absolute left-[6%] top-[10%] text-5xl opacity-30"
        animate={{ y: [0, -14, 0], rotate: [-8, 6, -8] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        🌿
      </motion.span>
      <motion.span
        className="absolute right-[7%] top-[14%] text-4xl opacity-25"
        animate={{ y: [0, -10, 0], rotate: [6, -8, 6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        🍃
      </motion.span>
      <motion.span
        className="absolute bottom-[12%] left-[8%] text-4xl opacity-20"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        🍂
      </motion.span>
      <motion.span
        className="absolute bottom-[16%] right-[9%] text-5xl opacity-25"
        animate={{ y: [0, -16, 0], rotate: [-4, 10, -4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      >
        🐾
      </motion.span>
    </div>
  );
}

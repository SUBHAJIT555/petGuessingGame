"use client";

import { motion } from "motion/react";

const marks = [
  {
    label: "Pets",
    // Monoline dog head
    paths: [
      "M32 58c-10-2-18-12-16-24 2-14 14-24 28-24 12 0 22 8 26 18",
      "M70 28c4-10 14-16 24-12 8 4 10 14 6 22",
      "M28 42c8 18 28 28 48 22 14-4 24-16 26-30",
      "M52 64v8",
    ],
  },
  {
    label: "Farm",
    // Monoline cow head
    paths: [
      "M30 36c0-14 14-24 34-24s34 10 34 24c0 20-14 36-34 36S30 56 30 36z",
      "M34 24c-8-10-18-12-22-8",
      "M90 24c8-10 18-12 22-8",
      "M48 40h4M76 40h4",
      "M56 52c4 4 12 4 16 0",
    ],
  },
  {
    label: "Racing",
    // Monoline horse head profile
    paths: [
      "M28 70c4-22 12-38 28-48 8-6 18-8 28-4l8 4",
      "M92 22c-2 10-8 18-18 24",
      "M64 42c12 4 22 16 26 30",
      "M48 70c8 2 18 2 26-2",
      "M84 28c6-2 12 2 10 8",
    ],
  },
] as const;

export function HomeHeroArt() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <motion.div
        className="absolute h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,rgba(212,175,95,0.16),transparent_68%)]"
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative grid w-full max-w-xl grid-cols-3 gap-3 px-2 sm:gap-5">
        {marks.map((mark, i) => (
          <motion.div
            key={mark.label}
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.28 + i * 0.1,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              className="flex aspect-square w-full max-w-[9.5rem] items-center justify-center rounded-[1.75rem] border border-[#d4af5f]/25 bg-[#d4af5f]/[0.06]"
              animate={{ y: [0, -8, 0] }}
              transition={{
                delay: 1 + i * 0.2,
                duration: 4.2 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                viewBox="0 0 120 100"
                className="h-[58%] w-[58%]"
                fill="none"
                stroke="#e8c76a"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {mark.paths.map((d) => (
                  <motion.path
                    key={d}
                    d={d}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      delay: 0.45 + i * 0.12,
                      duration: 1.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                ))}
              </svg>
            </motion.div>
            <span className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#e8c76a]/70">
              {mark.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

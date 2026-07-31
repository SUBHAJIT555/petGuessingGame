"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { HomeHeroArt } from "@/components/HomeHeroArt";
import { ScreenShell } from "@/components/ScreenShell";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <ScreenShell ambient={false} className="home-screen !px-0 !py-0">
      {/* Full-bleed atmospheric plane */}
      <div className="home-bg pointer-events-none absolute inset-0" aria-hidden>
        <div className="home-bg-wash" />
        <div className="home-bg-grid" />
        <div className="home-bg-vignette" />
      </div>

      <div className="relative z-[1] flex h-full flex-col px-[clamp(1.5rem,4vw,2.5rem)] py-[clamp(1.75rem,4vh,2.75rem)]">
        {/* Brand block — hero signal */}
        <header className="pt-2 text-center">
          <motion.p
            className="mb-5 font-body text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-[#d4af5f]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            Live Event Attraction
          </motion.p>

          <motion.h1
            className="home-brand font-display font-extrabold tracking-[-0.045em] text-[#f4efe4]"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block">Animal</span>
            <span className="home-brand-accent block">Discovery</span>
            <span className="block">Challenge</span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-[22rem] font-body text-[1.05rem] font-medium leading-relaxed tracking-[-0.01em] text-[#f4efe4]/62"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28, duration: 0.6 }}
          >
            Find your category. Reveal the board. Race the clock.
          </motion.p>
        </header>

        {/* Dominant visual */}
        <div className="relative min-h-0 flex-1 py-6">
          <HomeHeroArt />
        </div>

        {/* CTA */}
        <motion.div
          className="flex flex-col items-center gap-5 pb-1"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            type="button"
            onClick={() => router.push("/category")}
            className="home-cta"
            whileHover={{ scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.98, y: 2 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
          >
            <span>Play Now</span>
            <span className="home-cta-arrow" aria-hidden>
              →
            </span>
          </motion.button>

          <button
            type="button"
            onClick={() => router.push("/gallery")}
            className="font-body text-sm font-medium tracking-[0.08em] text-[#f4efe4]/35 transition-colors hover:text-[#d4af5f]"
          >
            Idle screen
          </button>
        </motion.div>
      </div>
    </ScreenShell>
  );
}

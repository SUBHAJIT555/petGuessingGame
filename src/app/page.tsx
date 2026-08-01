"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { FallingFoliage } from "@/components/FallingFoliage";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <main className="home-stage">
      {/* Full-bleed jungle scene — animals + environment */}
      <Image
        src="/home/background.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="home-stage-bg"
      />

      <FallingFoliage />

      <div className="home-stage-ui">
        {/* Brand logo */}
        <motion.div
          className="home-logo-wrap"
          initial={{ opacity: 0, y: -16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/home/logo.webp"
            alt="iFT"
            width={280}
            height={280}
            priority
            className="home-logo"
          />
        </motion.div>

        {/* Title lockup */}
        <motion.div
          className="home-title-wrap"
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/home/title.webp"
            alt="Animal Discovery Challenge — Explore · Discover · Learn"
            width={1400}
            height={811}
            priority
            className="home-title"
          />
        </motion.div>

        {/* Spacer so animals in the art stay visible */}
        <div className="home-mid-space" aria-hidden />

        {/* CTA */}
        <motion.button
          type="button"
          className="home-start-btn"
          onClick={() => router.push("/category")}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.03, y: -3 }}
          whileTap={{ scale: 0.97, y: 2 }}
          aria-label="Tap to start"
        >
          <motion.span
            className="home-start-btn-pulse"
            animate={{ scale: [1, 1.04, 1], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <Image
            src="/home/button.webp"
            alt=""
            width={900}
            height={249}
            priority
            className="home-start-btn-img"
          />
        </motion.button>
      </div>
    </main>
  );
}

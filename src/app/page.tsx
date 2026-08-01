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

        {/* CTA — smooth breathe to attract players */}
        <motion.button
          type="button"
          className="home-start-btn"
          onClick={() => router.push("/category")}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          whileTap={{ scale: 0.97 }}
          aria-label="Tap to start"
        >
          <motion.span
            className="home-start-btn-inner"
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
            <Image
              src="/home/button.webp"
              alt=""
              width={900}
              height={249}
              priority
              className="home-start-btn-img"
            />
          </motion.span>
        </motion.button>
      </div>
    </main>
  );
}

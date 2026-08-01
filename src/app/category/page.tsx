"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useGame } from "@/context/GameContext";
import { usePageTransition } from "@/context/PageTransitionContext";
import type { AnimalCategory } from "@/lib/types";

const CATEGORIES: {
  id: AnimalCategory;
  src: string;
  label: string;
}[] = [
  { id: "pets", src: "/category/card-pets.webp", label: "Pet Animals" },
  { id: "farm", src: "/category/card-farm.webp", label: "Farm Animals" },
  { id: "racing", src: "/category/card-racing.webp", label: "Racing Animals" },
];

export default function CategoryPage() {
  const { navigate, isTransitioning } = usePageTransition();
  const { selectCategory } = useGame();

  const handleSelect = (category: AnimalCategory) => {
    if (isTransitioning) return;
    selectCategory(category);
    void navigate("/game");
  };

  return (
    <main className="category-stage">
      <Image
        src="/category/background.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="category-stage-bg"
      />

      <div className="category-stage-ui">
        <motion.div
          className="category-logo-wrap"
          initial={{ opacity: 0, y: -14, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/home/logo.webp"
            alt="iFT"
            width={280}
            height={280}
            priority
            className="category-logo"
          />
        </motion.div>

        <motion.div
          className="category-title-wrap"
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/category/title.webp"
            alt="Choose Your Adventure"
            width={1200}
            height={407}
            priority
            className="category-title"
          />
        </motion.div>

        <motion.div
          className="category-cards"
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.22, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {CATEGORIES.map((cat, index) => (
            <motion.button
              key={cat.id}
              type="button"
              className="category-card-btn"
              aria-label={cat.label}
              onClick={() => handleSelect(cat.id)}
              disabled={isTransitioning}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 + index * 0.08, duration: 0.45 }}
              whileTap={{
                scale: 0.95,
                y: 3,
                transition: { type: "spring", stiffness: 500, damping: 28 },
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.src}
                alt={cat.label}
                className="category-card-img"
                draggable={false}
              />
            </motion.button>
          ))}
        </motion.div>

        <motion.button
          type="button"
          className="category-back-btn"
          onClick={() => navigate("/")}
          disabled={isTransitioning}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileTap={{ scale: 0.96 }}
          aria-label="Back"
        >
          <Image
            src="/category/back-btn.webp"
            alt=""
            width={700}
            height={249}
            priority
            className="category-back-img"
          />
        </motion.button>
      </div>
    </main>
  );
}

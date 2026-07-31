"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { CategoryCard } from "@/components/CategoryCard";
import { ScreenShell } from "@/components/ScreenShell";
import { useGame } from "@/context/GameContext";
import { fadeUp, springPop, stagger } from "@/lib/motion";
import type { AnimalCategory } from "@/lib/types";

const CATEGORIES: AnimalCategory[] = ["pets", "farm", "racing"];

export default function CategoryPage() {
  const router = useRouter();
  const { selectCategory } = useGame();

  const handleSelect = (category: AnimalCategory) => {
    selectCategory(category);
    router.push("/game");
  };

  return (
    <ScreenShell>
      <motion.div
        className="mb-8 text-center"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <motion.p variants={fadeUp} transition={springPop} className="eyebrow mb-3">
          Step 01
        </motion.p>
        <motion.h1
          variants={fadeUp}
          transition={springPop}
          className="display-title text-4xl sm:text-5xl"
        >
          Choose Your Category
        </motion.h1>
        <motion.p
          variants={fadeUp}
          transition={springPop}
          className="mt-3 text-lg text-cream/70"
        >
          Discover only animals from your chosen group
        </motion.p>
      </motion.div>

      <motion.div
        className="flex flex-1 flex-col justify-center gap-4"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        {CATEGORIES.map((category, index) => (
          <CategoryCard
            key={category}
            category={category}
            index={index}
            onSelect={handleSelect}
          />
        ))}
      </motion.div>
    </ScreenShell>
  );
}

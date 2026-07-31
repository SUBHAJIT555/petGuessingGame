"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { pageTransition, pageVariants } from "@/lib/motion";

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="h-full"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

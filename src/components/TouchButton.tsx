"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "accent" | "danger";

type TouchButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  children: ReactNode;
  variant?: Variant;
};

const variantClass: Record<Variant, string> = {
  primary: "touch-btn-primary",
  secondary: "touch-btn-secondary",
  accent: "touch-btn-accent",
  danger: "touch-btn-danger",
};

export function TouchButton({
  children,
  variant = "primary",
  className = "",
  disabled,
  ...props
}: TouchButtonProps) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.02, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.97, y: 3 }}
      transition={{ type: "spring", stiffness: 480, damping: 28 }}
      className={`touch-btn ${variantClass[variant]} ${className} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

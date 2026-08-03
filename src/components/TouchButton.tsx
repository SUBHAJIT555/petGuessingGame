"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { MouseEvent, ReactNode } from "react";
import { playSound } from "@/lib/sounds";

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
  onClick,
  ...props
}: TouchButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    playSound("buttonClick");
    onClick?.(event);
  };

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
      onClick={handleClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}

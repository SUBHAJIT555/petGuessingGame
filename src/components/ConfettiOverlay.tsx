"use client";

import { useMemo } from "react";

const COLORS = ["#f0c14b", "#e86a3c", "#4caf72", "#4a9bb8", "#f5e6c8", "#e0a820"];

export function ConfettiOverlay({ active }: { active: boolean }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        id: i,
        left: `${(i * 17) % 100}%`,
        delay: `${(i % 12) * 0.12}s`,
        duration: `${2.4 + (i % 5) * 0.35}s`,
        color: COLORS[i % COLORS.length],
        size: 8 + (i % 6) * 3,
        round: i % 3 === 0,
      })),
    [],
  );

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * (p.round ? 1 : 1.4),
            borderRadius: p.round ? "50%" : "2px",
            background: p.color,
            animation: `confetti-fall ${p.duration} linear ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

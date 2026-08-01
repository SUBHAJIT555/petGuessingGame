"use client";

const ASSETS = [
  "/home/foliage/leaf-yellow.svg",
  "/home/foliage/leaf-orange.svg",
  "/home/foliage/leaf-green.svg",
  "/home/foliage/flower-red.svg",
  "/home/foliage/flower-pink.svg",
] as const;

type Particle = {
  id: number;
  src: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  /** CSS animation name — each has a different wind path */
  path: "a" | "b" | "c" | "d" | "e";
};

/** 5 pieces, staggered — windy paths via CSS (reliable on kiosk) */
const PARTICLES: Particle[] = [
  {
    id: 0,
    src: ASSETS[0],
    left: "14%",
    size: 50,
    duration: 32,
    delay: 0,
    path: "a",
  },
  {
    id: 1,
    src: ASSETS[4],
    left: "70%",
    size: 36,
    duration: 34,
    delay: 7,
    path: "b",
  },
  {
    id: 2,
    src: ASSETS[1],
    left: "36%",
    size: 54,
    duration: 30,
    delay: 14,
    path: "c",
  },
  {
    id: 3,
    src: ASSETS[3],
    left: "56%",
    size: 38,
    duration: 33,
    delay: 21,
    path: "d",
  },
  {
    id: 4,
    src: ASSETS[2],
    left: "82%",
    size: 46,
    duration: 36,
    delay: 28,
    path: "e",
  },
];

export function FallingFoliage() {
  return (
    <div className="falling-foliage" aria-hidden>
      {PARTICLES.map((p) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={p.id}
          src={p.src}
          alt=""
          className={`falling-piece falling-path-${p.path}`}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
          draggable={false}
        />
      ))}
    </div>
  );
}

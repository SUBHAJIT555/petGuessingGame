import { animate, stagger } from "motion";

const EASE_COVER: [number, number, number, number] = [0.65, 0, 0.35, 1];
const EASE_REVEAL: [number, number, number, number] = [0.22, 1, 0.36, 1];
const FILL = "var(--blinds-fill, #72be44)";
const LOGO_SRC = "/home/brand-logo.webp";

export type BlindsOptions = {
  /** Slat thickness in px */
  size?: number;
  /** Horizontal rows or vertical columns */
  direction?: "row" | "column";
  coverDuration?: number;
  revealDuration?: number;
};

export type BlindsCurtain = {
  cover: () => Promise<void>;
  reveal: () => Promise<void>;
  destroy: () => void;
};

function brandLogoSize(): number {
  return Math.min(window.innerWidth * 0.4, window.innerHeight * 0.2, 300);
}

/**
 * Venetian-blind stage curtain — cover, swap view, reveal.
 * Brand logo is sliced across the slats and reassembles as they join.
 */
export function createBlindsCurtain(
  options: BlindsOptions = {},
): BlindsCurtain {
  const {
    size = 72,
    direction = "row",
    coverDuration = 0.48,
    revealDuration = 0.55,
  } = options;

  const isRow = direction === "row";
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const span = isRow ? vh : vw;
  const count = Math.max(8, Math.ceil(span / size) + 1);
  const step = span / count;
  /** Overlap kills subpixel hairlines between scaled slats */
  const overlap = 2;

  const logoSize = brandLogoSize();
  const logoLeft = (vw - logoSize) / 2;
  const logoTop = (vh - logoSize) / 2;

  const root = document.createElement("div");
  root.className = "blinds-curtains";
  root.setAttribute("aria-hidden", "true");
  Object.assign(root.style, {
    position: "fixed",
    inset: "0",
    zIndex: "2147483646",
    pointerEvents: "auto",
    touchAction: "none",
    overflow: "hidden",
    background: "transparent",
  });

  const slats: HTMLElement[] = [];
  for (let i = 0; i < count; i++) {
    const slat = document.createElement("div");
    slat.className = "blinds-curtain-slat";

    const slatTop = isRow ? i * step - overlap : 0;
    const slatLeft = isRow ? 0 : i * step - overlap;

    // Same logo on every slat; position offset so strips align into one mark
    const bgPosX = logoLeft - slatLeft;
    const bgPosY = logoTop - slatTop;

    Object.assign(slat.style, {
      position: "absolute",
      backgroundColor: FILL,
      backgroundImage: `url("${LOGO_SRC}")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: `${logoSize}px ${logoSize}px`,
      backgroundPosition: `${bgPosX}px ${bgPosY}px`,
      transformOrigin: "50% 50%",
      willChange: "transform",
      backfaceVisibility: "hidden",
      ...(isRow
        ? {
            left: "0",
            width: "100%",
            top: `${slatTop}px`,
            height: `${step + overlap * 2}px`,
            transform: "scaleY(0)",
          }
        : {
            top: "0",
            height: "100%",
            left: `${slatLeft}px`,
            width: `${step + overlap * 2}px`,
            transform: "scaleX(0)",
          }),
    });

    root.appendChild(slat);
    slats.push(slat);
  }

  document.body.appendChild(root);

  let destroyed = false;

  const destroy = () => {
    if (destroyed) return;
    destroyed = true;
    root.remove();
  };

  const cover = async () => {
    if (destroyed) return;
    const key = isRow ? "scaleY" : "scaleX";
    await animate(
      slats,
      { [key]: [0, 1] },
      {
        duration: coverDuration,
        ease: EASE_COVER,
        delay: stagger(0.016, { startDelay: 0.02 }),
      },
    ).finished;
    // Solid fill behind slats while the route swaps (logo stays on the slats)
    root.style.background = FILL;
  };

  const reveal = async () => {
    if (destroyed) return;
    root.style.background = "transparent";
    const key = isRow ? "scaleY" : "scaleX";
    await animate(
      slats,
      { [key]: [1, 0] },
      {
        duration: revealDuration,
        ease: EASE_REVEAL,
        delay: stagger(0.016, { from: "last" }),
      },
    ).finished;
    destroy();
  };

  return { cover, reveal, destroy };
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Warm the logo so the first blinds wipe isn’t blank */
export function preloadBlindsLogo(): void {
  if (typeof window === "undefined") return;
  const img = new Image();
  img.src = LOGO_SRC;
}

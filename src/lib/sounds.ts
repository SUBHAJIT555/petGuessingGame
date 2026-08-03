export type SoundName =
  | "buttonClick"
  | "blockFlip"
  | "wrongGuess"
  | "gameOver"
  | "victory";

const SOURCES: Record<SoundName, string> = {
  buttonClick: "/sounds/button-click.mp3",
  blockFlip: "/sounds/block-flip.mp3",
  wrongGuess: "/sounds/wrong-guess.mp3",
  gameOver: "/sounds/game-over.mp3",
  victory: "/sounds/victory.mp3",
};

const cache = new Map<SoundName, HTMLAudioElement>();
let unlocked = false;

function getBase(name: SoundName): HTMLAudioElement {
  let audio = cache.get(name);
  if (!audio) {
    audio = new Audio(SOURCES[name]);
    audio.preload = "auto";
    cache.set(name, audio);
  }
  return audio;
}

/** Call once after a user gesture so mobile browsers allow later playback. */
export function unlockAudio(): void {
  if (typeof window === "undefined" || unlocked) return;
  unlocked = true;
  (Object.keys(SOURCES) as SoundName[]).forEach((name) => {
    const audio = getBase(name);
    audio.load();
  });
}

export function preloadSounds(): void {
  if (typeof window === "undefined") return;
  (Object.keys(SOURCES) as SoundName[]).forEach((name) => {
    getBase(name);
  });
}

export function playSound(
  name: SoundName,
  options?: { volume?: number; delayMs?: number },
): void {
  if (typeof window === "undefined") return;

  const run = () => {
    unlockAudio();
    const base = getBase(name);
    const node = base.cloneNode(true) as HTMLAudioElement;
    node.volume = options?.volume ?? 1;
    void node.play().catch(() => {
      /* autoplay may be blocked until a gesture */
    });
  };

  if (options?.delayMs && options.delayMs > 0) {
    window.setTimeout(run, options.delayMs);
    return;
  }
  run();
}

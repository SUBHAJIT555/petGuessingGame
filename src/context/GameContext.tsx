"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  buildGameGrid,
  calcScore,
  pickStartingHintIds,
  transformDecoysToCategory,
} from "@/lib/game";
import { playSound } from "@/lib/sounds";
import {
  CORRECT_CARDS,
  GRID_SIZE,
  MAX_LIVES,
  POINTS_PER_CORRECT,
  START_HINT_CARDS,
  type AnimalCategory,
  type GameResult,
  type GameStatus,
  type GridCard,
} from "@/lib/types";

type GameContextValue = {
  category: AnimalCategory | null;
  cards: GridCard[];
  score: number;
  correctPicks: number;
  lives: number;
  maxLives: number;
  status: GameStatus;
  result: GameResult | null;
  hintIds: string[];
  selectCategory: (category: AnimalCategory) => void;
  revealHint: (cardId: string) => void;
  finishHinting: () => void;
  dismissIntro: () => void;
  revealCard: (cardId: string) => void;
  resetGame: () => void;
  clearResult: () => void;
};

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState<AnimalCategory | null>(null);
  const [cards, setCards] = useState<GridCard[]>([]);
  const [score, setScore] = useState(0);
  const [correctPicks, setCorrectPicks] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [status, setStatus] = useState<GameStatus>("idle");
  const [result, setResult] = useState<GameResult | null>(null);
  const [hintIds, setHintIds] = useState<string[]>([]);

  // Keep latest values so fast taps never miss a perfect win
  const cardsRef = useRef(cards);
  const correctPicksRef = useRef(correctPicks);
  const livesRef = useRef(lives);
  const scoreRef = useRef(score);
  const statusRef = useRef(status);
  const categoryRef = useRef(category);
  const hintIdsRef = useRef(hintIds);
  cardsRef.current = cards;
  correctPicksRef.current = correctPicks;
  livesRef.current = lives;
  scoreRef.current = score;
  statusRef.current = status;
  categoryRef.current = category;
  hintIdsRef.current = hintIds;

  const selectCategory = useCallback((next: AnimalCategory) => {
    const grid = buildGameGrid(next);
    const hints = pickStartingHintIds(grid, START_HINT_CARDS);

    setCategory(next);
    setCards(grid);
    setHintIds(hints);
    setScore(0);
    setCorrectPicks(0);
    setLives(MAX_LIVES);
    setStatus("hinting");
    setResult(null);

    cardsRef.current = grid;
    hintIdsRef.current = hints;
    correctPicksRef.current = 0;
    scoreRef.current = 0;
    livesRef.current = MAX_LIVES;
    statusRef.current = "hinting";
    categoryRef.current = next;
  }, []);

  const revealHint = useCallback((cardId: string) => {
    if (statusRef.current !== "hinting") return;
    if (!hintIdsRef.current.includes(cardId)) return;

    const target = cardsRef.current.find((c) => c.id === cardId);
    if (!target || target.revealed) return;

    const nextPicks = correctPicksRef.current + 1;
    const nextScore = calcScore(nextPicks);
    correctPicksRef.current = nextPicks;
    scoreRef.current = nextScore;

    playSound("blockFlip");
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, revealed: true } : c)),
    );
    setCorrectPicks(nextPicks);
    setScore(nextScore);
  }, []);

  const finishHinting = useCallback(() => {
    if (statusRef.current !== "hinting") return;
    setStatus("intro");
    statusRef.current = "intro";
  }, []);

  const dismissIntro = useCallback(() => {
    if (statusRef.current !== "intro") return;
    setStatus("playing");
    statusRef.current = "playing";
  }, []);

  const finishPerfect = useCallback((activeCategory: AnimalCategory) => {
    // All correct found → decoys transform → full 25×4 = 100
    const perfectScore = GRID_SIZE * POINTS_PER_CORRECT;
    setCorrectPicks(CORRECT_CARDS);
    setScore(perfectScore);
    setStatus("perfect");
    statusRef.current = "perfect";
    setResult({
      category: activeCategory,
      correctPicks: CORRECT_CARDS,
      score: perfectScore,
      status: "perfect",
      totalCorrectPossible: CORRECT_CARDS,
    });
  }, []);

  const revealCard = useCallback(
    (cardId: string) => {
      const activeCategory = categoryRef.current;
      if (!activeCategory || statusRef.current !== "playing") return;

      const target = cardsRef.current.find((c) => c.id === cardId);
      if (!target || target.revealed) return;

      if (!target.isCorrect) {
        playSound("blockFlip");
        playSound("wrongGuess", { delayMs: 120 });

        const nextLives = livesRef.current - 1;
        setCards((prev) =>
          prev.map((c) => (c.id === cardId ? { ...c, revealed: true } : c)),
        );
        setLives(nextLives);
        livesRef.current = nextLives;

        if (nextLives <= 0) {
          playSound("gameOver", { delayMs: 280 });
          setStatus("gameover");
          statusRef.current = "gameover";
          setResult({
            category: activeCategory,
            correctPicks: correctPicksRef.current,
            score: scoreRef.current,
            status: "gameover",
            totalCorrectPossible: CORRECT_CARDS,
          });
        }
        return;
      }

      const nextPicks = correctPicksRef.current + 1;
      const nextScore = calcScore(nextPicks);
      correctPicksRef.current = nextPicks;
      scoreRef.current = nextScore;

      playSound("blockFlip");

      if (nextPicks >= CORRECT_CARDS) {
        playSound("victory", { delayMs: 180 });
        setCards((prev) =>
          transformDecoysToCategory(prev, activeCategory, cardId),
        );
        finishPerfect(activeCategory);
        return;
      }

      setCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, revealed: true } : c)),
      );
      setCorrectPicks(nextPicks);
      setScore(nextScore);
    },
    [finishPerfect],
  );

  const resetGame = useCallback(() => {
    setCategory(null);
    setCards([]);
    setHintIds([]);
    setScore(0);
    setCorrectPicks(0);
    setLives(MAX_LIVES);
    setStatus("idle");
    setResult(null);
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setStatus("idle");
  }, []);

  const value = useMemo(
    () => ({
      category,
      cards,
      score,
      correctPicks,
      lives,
      maxLives: MAX_LIVES,
      status,
      result,
      hintIds,
      selectCategory,
      revealHint,
      finishHinting,
      dismissIntro,
      revealCard,
      resetGame,
      clearResult,
    }),
    [
      category,
      cards,
      score,
      correctPicks,
      lives,
      status,
      result,
      hintIds,
      selectCategory,
      revealHint,
      finishHinting,
      dismissIntro,
      revealCard,
      resetGame,
      clearResult,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}

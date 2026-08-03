"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  buildGameGrid,
  calcScore,
  transformDecoysToCategory,
} from "@/lib/game";
import { playSound } from "@/lib/sounds";
import {
  CORRECT_CARDS,
  MAX_LIVES,
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
  selectCategory: (category: AnimalCategory) => void;
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

  const selectCategory = useCallback((next: AnimalCategory) => {
    setCategory(next);
    setCards(buildGameGrid(next));
    setScore(0);
    setCorrectPicks(0);
    setLives(MAX_LIVES);
    setStatus("playing");
    setResult(null);
  }, []);

  const finishPerfect = useCallback((activeCategory: AnimalCategory) => {
    setCorrectPicks(CORRECT_CARDS);
    setScore(100);
    setStatus("perfect");
    setResult({
      category: activeCategory,
      correctPicks: CORRECT_CARDS,
      score: 100,
      status: "perfect",
      totalCorrectPossible: CORRECT_CARDS,
    });
  }, []);

  const revealCard = useCallback(
    (cardId: string) => {
      if (!category || status !== "playing") return;

      const target = cards.find((c) => c.id === cardId);
      if (!target || target.revealed) return;

      if (!target.isCorrect) {
        playSound("blockFlip");
        playSound("wrongGuess", { delayMs: 120 });

        const nextLives = lives - 1;
        setCards((prev) =>
          prev.map((c) => (c.id === cardId ? { ...c, revealed: true } : c)),
        );
        setLives(nextLives);

        if (nextLives <= 0) {
          playSound("gameOver", { delayMs: 280 });
          setStatus("gameover");
          setResult({
            category,
            correctPicks,
            score,
            status: "gameover",
            totalCorrectPossible: CORRECT_CARDS,
          });
        }
        return;
      }

      const nextPicks = correctPicks + 1;
      const nextScore = calcScore(nextPicks);

      playSound("blockFlip");

      if (nextPicks >= CORRECT_CARDS) {
        playSound("victory", { delayMs: 180 });
        setCards((prev) =>
          transformDecoysToCategory(prev, category, cardId),
        );
        finishPerfect(category);
        return;
      }

      setCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, revealed: true } : c)),
      );
      setCorrectPicks(nextPicks);
      setScore(nextScore);
    },
    [cards, category, correctPicks, finishPerfect, lives, score, status],
  );

  const resetGame = useCallback(() => {
    setCategory(null);
    setCards([]);
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
      selectCategory,
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
      selectCategory,
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

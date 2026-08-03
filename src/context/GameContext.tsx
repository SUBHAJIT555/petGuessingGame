"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { buildGameGrid, calcScore } from "@/lib/game";
import {
  CORRECT_CARDS,
  MAX_LIVES,
  type AnimalCategory,
  type GameResult,
  type GameStatus,
  type GridCard,
} from "@/lib/types";

const CATEGORY_EMOJI: Record<AnimalCategory, string> = {
  pets: "🐕",
  farm: "🐄",
  racing: "🐎",
};

const CATEGORY_IMAGE: Record<AnimalCategory, string> = {
  pets: "/game/animals/dog.webp",
  farm: "/game/animals/cow.webp",
  racing: "/game/animals/horse.webp",
};

const CATEGORY_LABEL_ANIMAL: Record<AnimalCategory, string> = {
  pets: "Pet Friend",
  farm: "Farm Friend",
  racing: "Racing Star",
};

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

  const revealCard = useCallback(
    (cardId: string) => {
      if (!category || status !== "playing") return;

      const target = cards.find((c) => c.id === cardId);
      if (!target || target.revealed) return;

      if (!target.isCorrect) {
        const nextLives = lives - 1;
        setCards((prev) =>
          prev.map((c) => (c.id === cardId ? { ...c, revealed: true } : c)),
        );
        setLives(nextLives);

        if (nextLives <= 0) {
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

      if (nextPicks >= CORRECT_CARDS) {
        setCards((prev) =>
          prev.map((c) => {
            if (c.id === cardId) return { ...c, revealed: true };
            if (!c.isCorrect && !c.revealed) {
              return {
                ...c,
                revealed: true,
                transformed: true,
                isCorrect: true,
                animal: {
                  ...c.animal,
                  name: CATEGORY_LABEL_ANIMAL[category],
                  emoji: CATEGORY_EMOJI[category],
                  image: CATEGORY_IMAGE[category],
                  category,
                },
              };
            }
            return c;
          }),
        );
        setCorrectPicks(CORRECT_CARDS);
        setScore(100);
        setStatus("perfect");
        setResult({
          category,
          correctPicks: CORRECT_CARDS,
          score: 100,
          status: "perfect",
          totalCorrectPossible: CORRECT_CARDS,
        });
        return;
      }

      setCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, revealed: true } : c)),
      );
      setCorrectPicks(nextPicks);
      setScore(nextScore);
    },
    [cards, category, correctPicks, lives, score, status],
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

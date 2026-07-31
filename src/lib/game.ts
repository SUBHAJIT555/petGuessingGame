import { getAnimalsByCategory, getAnimalsOutsideCategory } from "./animals";
import {
  CORRECT_CARDS,
  DECOY_CARDS,
  POINTS_PER_CORRECT,
  type AnimalCategory,
  type GridCard,
} from "./types";

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRandom<T>(items: T[], count: number): T[] {
  return shuffle(items).slice(0, count);
}

export function buildGameGrid(category: AnimalCategory): GridCard[] {
  const correctPool = getAnimalsByCategory(category);
  const decoyPool = getAnimalsOutsideCategory(category);

  // Repeat animals if pool is smaller than needed
  const correctAnimals = Array.from({ length: CORRECT_CARDS }, (_, i) => {
    return correctPool[i % correctPool.length];
  });
  const decoyAnimals = pickRandom(decoyPool, DECOY_CARDS);

  const cards: GridCard[] = [
    ...correctAnimals.map((animal, index) => ({
      id: `correct-${animal.id}-${index}`,
      animal,
      isCorrect: true,
      revealed: false,
      transformed: false,
    })),
    ...decoyAnimals.map((animal, index) => ({
      id: `decoy-${animal.id}-${index}`,
      animal,
      isCorrect: false,
      revealed: false,
      transformed: false,
    })),
  ];

  return shuffle(cards);
}

export function calcScore(correctPicks: number): number {
  return correctPicks * POINTS_PER_CORRECT;
}

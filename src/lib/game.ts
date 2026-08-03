import { getAnimalsByCategory, getAnimalsOutsideCategory } from "./animals";
import {
  CORRECT_CARDS,
  DECOY_CARDS,
  POINTS_PER_CORRECT,
  type Animal,
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

function isDecoyCard(card: GridCard): boolean {
  return card.id.startsWith("decoy-") || (!card.isCorrect && !card.transformed);
}

/** On perfect win: flip every decoy into a selected-category animal. */
export function transformDecoysToCategory(
  cards: GridCard[],
  category: AnimalCategory,
  lastRevealedId?: string,
): GridCard[] {
  const pool = getAnimalsByCategory(category);
  let decoyIndex = 0;

  return cards.map((card) => {
    if (card.id === lastRevealedId) {
      return { ...card, revealed: true };
    }

    if (!isDecoyCard(card)) {
      return card.revealed ? card : { ...card, revealed: true };
    }

    const replacement: Animal = pool[decoyIndex % pool.length];
    decoyIndex += 1;

    return {
      ...card,
      revealed: true,
      transformed: true,
      isCorrect: true,
      animal: {
        id: `transformed-${replacement.id}-${card.id}`,
        name: replacement.name,
        category,
        emoji: replacement.emoji,
        image: replacement.image,
      },
    };
  });
}

export type AnimalCategory = "pets" | "farm" | "racing";

export type Animal = {
  id: string;
  name: string;
  category: AnimalCategory;
  emoji: string;
  /** Portrait under /public/game/animals when available */
  image?: string;
};

export type GridCard = {
  id: string;
  animal: Animal;
  isCorrect: boolean;
  revealed: boolean;
  transformed: boolean;
};

export type GameStatus =
  | "idle"
  | "hinting"
  | "intro"
  | "playing"
  | "gameover"
  | "perfect";

export type GameResult = {
  category: AnimalCategory;
  correctPicks: number;
  score: number;
  status: "gameover" | "perfect";
  totalCorrectPossible: number;
};

export const POINTS_PER_CORRECT = 4;
export const CORRECT_CARDS = 22;
export const DECOY_CARDS = 3;
export const GRID_SIZE = 25;
export const MAX_SCORE = 100;
export const MAX_LIVES = 3;
/** Correct tiles shown at the start as examples */
export const START_HINT_CARDS = 2;

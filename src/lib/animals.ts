import type { Animal, AnimalCategory } from "./types";

export const CATEGORY_META: Record<
  AnimalCategory,
  { label: string; shortLabel: string; emoji: string; color: string; accent: string }
> = {
  pets: {
    label: "Pet Animals",
    shortLabel: "Pets",
    emoji: "🐕",
    color: "#2F6B4F",
    accent: "#F4A261",
  },
  farm: {
    label: "Farm Animals",
    shortLabel: "Farm",
    emoji: "🐄",
    color: "#3D7A3C",
    accent: "#E9C46A",
  },
  racing: {
    label: "Racing Animals",
    shortLabel: "Racing",
    emoji: "🐎",
    color: "#1F5C45",
    accent: "#E76F51",
  },
};

export const ANIMALS: Animal[] = [
  // Pets
  { id: "dog", name: "Dog", category: "pets", emoji: "🐕" },
  { id: "cat", name: "Cat", category: "pets", emoji: "🐈" },
  { id: "rabbit", name: "Rabbit", category: "pets", emoji: "🐇" },
  { id: "hamster", name: "Hamster", category: "pets", emoji: "🐹" },
  { id: "parrot", name: "Parrot", category: "pets", emoji: "🦜" },
  { id: "goldfish", name: "Goldfish", category: "pets", emoji: "🐠" },
  { id: "turtle", name: "Turtle", category: "pets", emoji: "🐢" },
  { id: "guinea-pig", name: "Guinea Pig", category: "pets", emoji: "🐹" },
  { id: "ferret", name: "Ferret", category: "pets", emoji: "🦡" },
  { id: "budgie", name: "Budgie", category: "pets", emoji: "🐦" },
  // Farm
  { id: "cow", name: "Cow", category: "farm", emoji: "🐄" },
  { id: "pig", name: "Pig", category: "farm", emoji: "🐖" },
  { id: "sheep", name: "Sheep", category: "farm", emoji: "🐑" },
  { id: "chicken", name: "Chicken", category: "farm", emoji: "🐔" },
  { id: "duck", name: "Duck", category: "farm", emoji: "🦆" },
  { id: "goat", name: "Goat", category: "farm", emoji: "🐐" },
  { id: "donkey", name: "Donkey", category: "farm", emoji: "🫏" },
  { id: "rooster", name: "Rooster", category: "farm", emoji: "🐓" },
  { id: "goose", name: "Goose", category: "farm", emoji: "🪿" },
  { id: "turkey", name: "Turkey", category: "farm", emoji: "🦃" },
  // Racing
  { id: "horse", name: "Horse", category: "racing", emoji: "🐎" },
  { id: "greyhound", name: "Greyhound", category: "racing", emoji: "🐕‍🦺" },
  { id: "camel", name: "Camel", category: "racing", emoji: "🐪" },
  { id: "cheetah", name: "Cheetah", category: "racing", emoji: "🐆" },
  { id: "ostrich", name: "Ostrich", category: "racing", emoji: "🦤" },
  { id: "pony", name: "Pony", category: "racing", emoji: "🐴" },
  { id: "thoroughbred", name: "Thoroughbred", category: "racing", emoji: "🏇" },
  { id: "husky", name: "Husky", category: "racing", emoji: "🐺" },
  { id: "falcon", name: "Falcon", category: "racing", emoji: "🦅" },
  { id: "hare", name: "Hare", category: "racing", emoji: "🐰" },
];

export function getAnimalsByCategory(category: AnimalCategory): Animal[] {
  return ANIMALS.filter((a) => a.category === category);
}

export function getAnimalsOutsideCategory(category: AnimalCategory): Animal[] {
  return ANIMALS.filter((a) => a.category !== category);
}

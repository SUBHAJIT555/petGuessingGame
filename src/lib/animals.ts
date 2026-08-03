import type { Animal, AnimalCategory } from "./types";

export const CATEGORY_META: Record<
  AnimalCategory,
  {
    label: string;
    shortLabel: string;
    emoji: string;
    color: string;
    accent: string;
    titleSrc: string;
  }
> = {
  pets: {
    label: "Pet Animals",
    shortLabel: "Pets",
    emoji: "🐕",
    color: "#2F6B4F",
    accent: "#F4A261",
    titleSrc: "/game/titles/pets.webp",
  },
  farm: {
    label: "Farm Animals",
    shortLabel: "Farm",
    emoji: "🐄",
    color: "#3D7A3C",
    accent: "#E9C46A",
    titleSrc: "/game/titles/farm.webp",
  },
  racing: {
    label: "Racing Animals",
    shortLabel: "Racing",
    emoji: "🐎",
    color: "#1F5C45",
    accent: "#E76F51",
    titleSrc: "/game/titles/racing.webp",
  },
};

export const ANIMALS: Animal[] = [
  // Pets — portraits we have: dog, cat, rabbit
  { id: "dog", name: "Dog", category: "pets", emoji: "🐕", image: "/game/animals/dog.webp" },
  { id: "cat", name: "Cat", category: "pets", emoji: "🐈", image: "/game/animals/cat.webp" },
  { id: "rabbit", name: "Rabbit", category: "pets", emoji: "🐇", image: "/game/animals/rabbit.webp" },
  { id: "hamster", name: "Hamster", category: "pets", emoji: "🐹", image: "/game/animals/rabbit.webp" },
  { id: "parrot", name: "Parrot", category: "pets", emoji: "🦜", image: "/game/animals/cat.webp" },
  { id: "goldfish", name: "Goldfish", category: "pets", emoji: "🐠", image: "/game/animals/dog.webp" },
  { id: "turtle", name: "Turtle", category: "pets", emoji: "🐢", image: "/game/animals/rabbit.webp" },
  { id: "guinea-pig", name: "Guinea Pig", category: "pets", emoji: "🐹", image: "/game/animals/cat.webp" },
  { id: "ferret", name: "Ferret", category: "pets", emoji: "🦡", image: "/game/animals/dog.webp" },
  { id: "budgie", name: "Budgie", category: "pets", emoji: "🐦", image: "/game/animals/cat.webp" },
  // Farm — portraits we have: cow, chicken, sheep
  { id: "cow", name: "Cow", category: "farm", emoji: "🐄", image: "/game/animals/cow.webp" },
  { id: "pig", name: "Pig", category: "farm", emoji: "🐖", image: "/game/animals/sheep.webp" },
  { id: "sheep", name: "Sheep", category: "farm", emoji: "🐑", image: "/game/animals/sheep.webp" },
  { id: "chicken", name: "Chicken", category: "farm", emoji: "🐔", image: "/game/animals/chicken.webp" },
  { id: "duck", name: "Duck", category: "farm", emoji: "🦆", image: "/game/animals/chicken.webp" },
  { id: "goat", name: "Goat", category: "farm", emoji: "🐐", image: "/game/animals/sheep.webp" },
  { id: "donkey", name: "Donkey", category: "farm", emoji: "🫏", image: "/game/animals/cow.webp" },
  { id: "rooster", name: "Rooster", category: "farm", emoji: "🐓", image: "/game/animals/chicken.webp" },
  { id: "goose", name: "Goose", category: "farm", emoji: "🪿", image: "/game/animals/chicken.webp" },
  { id: "turkey", name: "Turkey", category: "farm", emoji: "🦃", image: "/game/animals/cow.webp" },
  // Racing — portraits we have: horse, camel (+ dog/rabbit for similar types)
  { id: "horse", name: "Horse", category: "racing", emoji: "🐎", image: "/game/animals/horse.webp" },
  { id: "greyhound", name: "Greyhound", category: "racing", emoji: "🐕‍🦺", image: "/game/animals/dog.webp" },
  { id: "camel", name: "Camel", category: "racing", emoji: "🐪", image: "/game/animals/camel.webp" },
  { id: "cheetah", name: "Cheetah", category: "racing", emoji: "🐆", image: "/game/animals/horse.webp" },
  { id: "ostrich", name: "Ostrich", category: "racing", emoji: "🦤", image: "/game/animals/camel.webp" },
  { id: "pony", name: "Pony", category: "racing", emoji: "🐴", image: "/game/animals/horse.webp" },
  { id: "thoroughbred", name: "Thoroughbred", category: "racing", emoji: "🏇", image: "/game/animals/horse.webp" },
  { id: "husky", name: "Husky", category: "racing", emoji: "🐺", image: "/game/animals/dog.webp" },
  { id: "falcon", name: "Falcon", category: "racing", emoji: "🦅", image: "/game/animals/camel.webp" },
  { id: "hare", name: "Hare", category: "racing", emoji: "🐰", image: "/game/animals/rabbit.webp" },
];

/** Always returns an illustrated portrait path (never emoji). */
export function getAnimalPortrait(animal: Animal): string {
  if (animal.image) return animal.image;
  const fallback: Record<AnimalCategory, string> = {
    pets: "/game/animals/dog.webp",
    farm: "/game/animals/cow.webp",
    racing: "/game/animals/horse.webp",
  };
  return fallback[animal.category];
}

export function getAnimalsByCategory(category: AnimalCategory): Animal[] {
  return ANIMALS.filter((a) => a.category === category);
}

export function getAnimalsOutsideCategory(category: AnimalCategory): Animal[] {
  return ANIMALS.filter((a) => a.category !== category);
}

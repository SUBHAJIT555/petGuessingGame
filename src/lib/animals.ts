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
  // Pet Animals
  { id: "dog", name: "Dog", category: "pets", emoji: "🐕", image: "/game/animals/dog.webp" },
  { id: "cat", name: "Cat", category: "pets", emoji: "🐈", image: "/game/animals/cat.webp" },
  { id: "rabbit", name: "Rabbit", category: "pets", emoji: "🐇", image: "/game/animals/rabbit.webp" },
  { id: "hamster", name: "Hamster", category: "pets", emoji: "🐹", image: "/game/animals/hamster.webp" },
  { id: "guinea-pig", name: "Guinea Pig", category: "pets", emoji: "🐹", image: "/game/animals/guinea-pig.webp" },
  { id: "parrot", name: "Parrot", category: "pets", emoji: "🦜", image: "/game/animals/parrot.webp" },
  { id: "turtle", name: "Turtle", category: "pets", emoji: "🐢", image: "/game/animals/turtle.webp" },
  { id: "ferret", name: "Ferret", category: "pets", emoji: "🦡", image: "/game/animals/ferret.webp" },
  { id: "canary", name: "Canary", category: "pets", emoji: "🐦", image: "/game/animals/canary.webp" },

  // Farm Animals
  { id: "cow", name: "Cow", category: "farm", emoji: "🐄", image: "/game/animals/cow.webp" },
  { id: "goat", name: "Goat", category: "farm", emoji: "🐐", image: "/game/animals/goat.webp" },
  { id: "sheep", name: "Sheep", category: "farm", emoji: "🐑", image: "/game/animals/sheep.webp" },
  { id: "pig", name: "Pig", category: "farm", emoji: "🐖", image: "/game/animals/pig.webp" },
  { id: "chicken", name: "Chicken", category: "farm", emoji: "🐔", image: "/game/animals/chicken.webp" },
  { id: "duck", name: "Duck", category: "farm", emoji: "🦆", image: "/game/animals/duck.webp" },
  { id: "farm-horse", name: "Horse", category: "farm", emoji: "🐎", image: "/game/animals/horse-farm.webp" },
  { id: "donkey", name: "Donkey", category: "farm", emoji: "🫏", image: "/game/animals/donkey.webp" },
  { id: "turkey", name: "Turkey", category: "farm", emoji: "🦃", image: "/game/animals/turkey.webp" },
  { id: "buffalo", name: "Buffalo", category: "farm", emoji: "🐃", image: "/game/animals/buffalo.webp" },

  // Racing Animals
  { id: "horse", name: "Horse", category: "racing", emoji: "🐎", image: "/game/animals/horse.webp" },
  { id: "greyhound", name: "Greyhound", category: "racing", emoji: "🐕", image: "/game/animals/greyhound.webp" },
  { id: "camel", name: "Camel", category: "racing", emoji: "🐪", image: "/game/animals/camel.webp" },
  { id: "pigeon", name: "Pigeon", category: "racing", emoji: "🐦", image: "/game/animals/pigeon.webp" },
  { id: "ostrich", name: "Ostrich", category: "racing", emoji: "🐦", image: "/game/animals/ostrich.webp" },
  { id: "sled-dog", name: "Sled Dog", category: "racing", emoji: "🐕", image: "/game/animals/sled-dog.webp" },
  { id: "bull", name: "Bull", category: "racing", emoji: "🐂", image: "/game/animals/bull.webp" },
  { id: "reindeer", name: "Reindeer", category: "racing", emoji: "🦌", image: "/game/animals/reindeer.webp" },
  { id: "cheetah", name: "Cheetah", category: "racing", emoji: "🐆", image: "/game/animals/cheetah.webp" },
  { id: "zebra", name: "Zebra", category: "racing", emoji: "🦓", image: "/game/animals/zebra.webp" },
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

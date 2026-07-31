# Animal Discovery Challenge

Interactive touchscreen game for a **49" vertical event display**.

## Routes

| Route | Screen |
|-------|--------|
| `/` | Welcome |
| `/category` | Category selection (Pets / Farm / Racing) |
| `/game` | 5×5 discovery grid |
| `/results` | Score + photo zone (combined) |
| `/gallery` | Attract / idle screen |

## Stack

- Next.js App Router + TypeScript + Tailwind
- Motion (`motion/react`) for page + UI animation
- Portrait kiosk layout for 49" vertical touch displays

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Gameplay

- Pick a category → 20 matching + 5 decoy cards
- Correct pick = **+4** points
- Wrong pick = lose 1 life (**3 lives** → Game Over at 0)
- All 20 correct → Perfect **100/100** (decoys transform)
- Photo Zone is a pose screen for a live event photographer

Designed for fast 30–60 second play sessions.

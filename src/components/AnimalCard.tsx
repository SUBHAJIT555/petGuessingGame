"use client";

import { AnimatePresence, motion } from "motion/react";
import { getAnimalPortrait } from "@/lib/animals";
import { useIsTouchUi } from "@/hooks/useIsTouchUi";
import type { GridCard } from "@/lib/types";

type AnimalCardProps = {
  card: GridCard;
  onReveal: (id: string) => void;
  disabled?: boolean;
  index?: number;
};

function CardFront({
  frameSrc,
  portraitSrc,
  name,
  cardId,
  transformed,
}: {
  frameSrc: string;
  portraitSrc: string;
  name: string;
  cardId: string;
  transformed: boolean;
}) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={frameSrc}
        alt=""
        className="game-tile-frame"
        draggable={false}
      />
      <div className="game-tile-portrait">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={`${cardId}-${portraitSrc}-${transformed}`}
          src={portraitSrc}
          alt={name}
          className="game-tile-animal"
          draggable={false}
        />
      </div>
    </>
  );
}

export function AnimalCard({
  card,
  onReveal,
  disabled,
  index = 0,
}: AnimalCardProps) {
  const isTouchUi = useIsTouchUi();
  const showFront = card.revealed;
  const isGood = card.isCorrect || card.transformed;
  const frameSrc = isGood ? "/game/frame-correct.webp" : "/game/frame-wrong.webp";
  const portraitSrc = getAnimalPortrait(card.animal);

  return (
    <motion.button
      type="button"
      disabled={disabled || showFront}
      onClick={() => onReveal(card.id)}
      className={`game-tile${isTouchUi ? " is-touch-ui" : ""}`}
      style={isTouchUi ? undefined : { perspective: 900 }}
      initial={{ opacity: 0, scale: 0.82 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.015 * index,
        type: "spring",
        stiffness: 400,
        damping: 24,
      }}
      whileTap={showFront ? undefined : { scale: 0.94 }}
      aria-label={showFront ? card.animal.name : "Hidden animal card"}
    >
      {isTouchUi ? (
        /* Mobile: flat swap — avoids WebKit 3D backface bugs */
        <div className="game-tile-inner game-tile-inner--touch">
          <AnimatePresence mode="wait" initial={false}>
            {!showFront ? (
              <motion.div
                key="back"
                className="game-tile-face game-tile-back game-tile-face--touch"
                initial={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0.01 }}
                transition={{ duration: 0.18, ease: [0.4, 0, 1, 1] }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/game/tile-mystery.webp"
                  alt=""
                  className="game-tile-art"
                  draggable={false}
                />
              </motion.div>
            ) : (
              <motion.div
                key="front"
                className="game-tile-face game-tile-front game-tile-face--touch"
                initial={{ opacity: 0, scaleX: 0.01 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.22, ease: [0, 0, 0.2, 1] }}
              >
                <CardFront
                  frameSrc={frameSrc}
                  portraitSrc={portraitSrc}
                  name={card.animal.name}
                  cardId={card.id}
                  transformed={card.transformed}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Desktop: original 3D flip (unchanged) */
        <motion.div
          className="game-tile-inner"
          initial={false}
          animate={{ rotateY: showFront ? 180 : 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="game-tile-face game-tile-back">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/game/tile-mystery.webp"
              alt=""
              className="game-tile-art"
              draggable={false}
            />
          </div>

          <div className="game-tile-face game-tile-front">
            <CardFront
              frameSrc={frameSrc}
              portraitSrc={portraitSrc}
              name={card.animal.name}
              cardId={card.id}
              transformed={card.transformed}
            />
          </div>
        </motion.div>
      )}
    </motion.button>
  );
}

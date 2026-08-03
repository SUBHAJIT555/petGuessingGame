"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(hover: none), (pointer: coarse)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/** True on phones/tablets — coarse pointer / no hover (desktop stays false). */
export function useIsTouchUi(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

"use client";

import type { ReactNode } from "react";

/** Route content wrapper — blinds curtain owns page transitions. */
export default function Template({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

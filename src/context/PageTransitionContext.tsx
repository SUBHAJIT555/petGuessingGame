"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { createBlindsCurtain, prefersReducedMotion, preloadBlindsLogo } from "@/lib/blinds";

type NavigateOptions = {
  replace?: boolean;
};

type PageTransitionContextValue = {
  navigate: (href: string, options?: NavigateOptions) => Promise<void>;
  isTransitioning: boolean;
};

const PageTransitionContext =
  createContext<PageTransitionContextValue | null>(null);

function waitTwoFrames(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const busyRef = useRef(false);
  const pendingRef = useRef<{
    path: string;
    resolve: () => void;
  } | null>(null);

  useEffect(() => {
    preloadBlindsLogo();
  }, []);

  useEffect(() => {
    const pending = pendingRef.current;
    if (!pending) return;
    if (pathname === pending.path) {
      pending.resolve();
      pendingRef.current = null;
    }
  }, [pathname]);

  const navigate = useCallback(
    async (href: string, options?: NavigateOptions) => {
      const path = href.split("?")[0] || href;
      if (busyRef.current) return;
      if (path === pathname) return;

      if (prefersReducedMotion()) {
        if (options?.replace) router.replace(href);
        else router.push(href);
        return;
      }

      busyRef.current = true;
      setIsTransitioning(true);

      const blinds = createBlindsCurtain({
        size: 68,
        direction: "row",
        coverDuration: 0.46,
        revealDuration: 0.58,
      });

      try {
        await blinds.cover();

        const arrived = new Promise<void>((resolve) => {
          pendingRef.current = { path, resolve };
        });

        if (options?.replace) router.replace(href);
        else router.push(href);

        await Promise.race([
          arrived,
          new Promise<void>((resolve) => {
            window.setTimeout(resolve, 1400);
          }),
        ]);
        pendingRef.current = null;

        await waitTwoFrames();
        await blinds.reveal();
      } catch {
        blinds.destroy();
        if (options?.replace) router.replace(href);
        else router.push(href);
      } finally {
        busyRef.current = false;
        setIsTransitioning(false);
      }
    },
    [pathname, router],
  );

  const value = useMemo(
    () => ({ navigate, isTransitioning }),
    [navigate, isTransitioning],
  );

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition(): PageTransitionContextValue {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error(
      "usePageTransition must be used within PageTransitionProvider",
    );
  }
  return ctx;
}

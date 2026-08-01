import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { GameProvider } from "@/context/GameContext";
import { PageTransitionProvider } from "@/context/PageTransitionContext";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Animal Discovery Challenge",
  description:
    "Interactive touchscreen animal discovery game for event engagement on 49-inch vertical displays.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0b1f16",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="h-full overflow-hidden antialiased">
        <GameProvider>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </GameProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/context";
import { ThemeProvider } from "@/components/theme-provider";
import { NavBar } from "@/components/nav-bar";

export const metadata: Metadata = {
  title: "TutorMind - Adaptive Tutoring OS",
  description: "Spaced repetition, AI essay grader, collaborative whiteboard, and mastery analytics for effective learning.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AppProvider>
            <NavBar />
            <main>{children}</main>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
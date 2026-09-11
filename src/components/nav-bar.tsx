"use client";

import { useApp } from "@/lib/context";

export function NavBar() {
  const { user, t, logoutUser } = useApp();

  return (
    <nav className="border-b bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="/" className="flex items-center gap-2 text-lg font-semibold">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="14" fill="currentColor" className="text-primary" />
            <path d="M8 10h12M8 14h8M8 18h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          TutorMind
        </a>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">{user.name}</span>
              <button onClick={logoutUser} className="text-sm text-muted-foreground underline">{t("auth.logout")}</button>
            </>
          ) : (
            <a href="/auth" className="text-sm text-muted-foreground underline">{t("auth.login")}</a>
          )}
        </div>
      </div>
    </nav>
  );
}

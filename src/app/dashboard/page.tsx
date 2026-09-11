"use client";

import { useApp } from "@/lib/context";
import { DeckList } from "@/components/deck-list";

export default function DashboardPage() {
  const { user, t, cards, decks, getDueCount, getStreak, getMastery } = useApp();

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="mb-4 text-2xl font-bold">{t("nav.dashboard")}</h2>
        <p className="mb-6 text-muted-foreground">Silakan login untuk melihat dasbor.</p>
        <a href="/auth" className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90">
          {t("auth.login")}
        </a>
      </div>
    );
  }

  const dueCount = getDueCount();
  const streak = getStreak();
  const mastery = getMastery();
  const totalCards = cards.length;
  const totalDecks = decks.length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold">{t("nav.dashboard")}</h2>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="text-sm text-muted-foreground">{t("dash.cardsDue")}</div>
          <div className="text-2xl font-bold">{dueCount}</div>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="text-sm text-muted-foreground">{t("dash.totalCards")}</div>
          <div className="text-2xl font-bold">{totalCards}</div>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="text-sm text-muted-foreground">{t("dash.decksCount")}</div>
          <div className="text-2xl font-bold">{totalDecks}</div>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="text-sm text-muted-foreground">{t("dash.streak")}</div>
          <div className="text-2xl font-bold">{streak}</div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">{t("decks.title")}</h3>
          <DeckList />
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">{t("review.reviewQueue")}</h3>
          <p className="mb-4 text-sm text-muted-foreground">{t("dash.reviewQueue")}</p>
          <a href="/review" className="rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-primary/90">
            {t("review.title")}
          </a>
        </div>
      </div>
    </div>
  );
}
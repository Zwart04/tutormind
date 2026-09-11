"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getStoredUsers, StoredUser } from "@/lib/auth";
import { getDecks, getCards, getFinanceEntries } from "@/lib/storage";
import { toCardWithSRS, getCardsDueTodayCount, getReviewStreak, getMasteryPercentage, getReviewHistory } from "@/lib/srs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export function PublicTutorPage() {
  const params = useParams();
  const username = params.username as string;
  const [mounted, setMounted] = useState(false);
  const [tutor, setTutor] = useState<(StoredUser & { cardCount: number; deckCount: number; streak: number; mastery: number; dueCount: number; totalReviews: number }) | null>(null);
  const [trend, setTrend] = useState<{ date: string; count: number }[]>([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setMounted(true);
    const users = getStoredUsers();
    const found = users.find((u) => u.username === username);
    if (!found) {
      setNotFound(true);
      return;
    }

    const decks = getDecks(found.id);
    const cards = getCards(found.id);
    const finance = getFinanceEntries(found.id);

    const cardsWithSRS = cards.map(toCardWithSRS);
    const streak = getReviewStreak(cardsWithSRS);
    const mastery = getMasteryPercentage(cardsWithSRS);
    const dueCount = getCardsDueTodayCount(cardsWithSRS);
    const reviewTrend = getReviewHistory(cardsWithSRS, 7);
    const totalReviews = cardsWithSRS.reduce((acc, c) => acc + c.repetitions, 0);

    setTutor({
      ...found,
      cardCount: cards.length,
      deckCount: decks.length,
      streak,
      mastery,
      dueCount,
      totalReviews,
    });
    setTrend(reviewTrend);
  }, [username]);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (notFound || !tutor) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="mb-2 text-2xl font-bold">Tutor Not Found</h2>
        <p className="text-muted-foreground">No tutor with username "{username}" was found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill="currentColor" className="text-primary" />
            <path d="M12 16h24M12 24h16M12 32h20" stroke="white" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <h1 className="text-3xl font-bold">TutorMind</h1>
        </div>
        <h2 className="mb-1 text-2xl font-bold">{tutor.name}</h2>
        <p className="text-muted-foreground">@{tutor.username} - Learning with TutorMind</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-4 text-center shadow-sm">
          <div className="text-sm text-muted-foreground">Total Cards</div>
          <div className="text-2xl font-bold">{tutor.cardCount}</div>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center shadow-sm">
          <div className="text-sm text-muted-foreground">Day Streak</div>
          <div className="text-2xl font-bold">{tutor.streak}</div>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center shadow-sm">
          <div className="text-sm text-muted-foreground">Mastery</div>
          <div className="text-2xl font-bold">{tutor.mastery}%</div>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center shadow-sm">
          <div className="text-sm text-muted-foreground">Total Reviews</div>
          <div className="text-2xl font-bold">{tutor.totalReviews}</div>
        </div>
      </div>

      {trend.length > 0 && (
        <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Review Trend (7 days)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="text-center">
        <a href="/" className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90">
          Start Learning with TutorMind
        </a>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { CardWithSRS } from "@/lib/srs";

export default function ReviewPage() {
  const { user, t, cards, refreshCards, addFinance } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [done, setDone] = useState(false);
  const [gradedCount, setGradedCount] = useState(0);
  const [evaluating, setEvaluating] = useState(false);

  const cardList: CardWithSRS[] = cards.map((c) => ({
    ...c,
    easeFactor: c.easeFactor ?? 2.5,
    interval: c.interval ?? 0,
    repetitions: c.repetitions ?? 0,
    nextReview: c.nextReview ?? c.createdAt,
    lastReview: c.lastReview ?? 0,
  }));

  const due = cardList.filter((c) => c.nextReview <= Date.now());
  const card = due[currentIndex];

  const startSession = () => {
    if (due.length === 0) return;
    setCurrentIndex(0);
    setShowAnswer(false);
    setDone(false);
    setGradedCount(0);
    setEvaluating(true);
  };

  const grade = (g: number) => {
    if (!card || !user) return;

    // Update card SRS in localStorage
    const stored = cards.map((c) => {
      if (c.id !== card.id) return c;
      let newInterval = c.interval ?? 0;
      let newReps = c.repetitions ?? 0;
      let newEase = c.easeFactor ?? 2.5;
      let nextReview = c.nextReview ?? Date.now();

      if (g < 2) {
        newReps = 0;
        newInterval = 1;
        newEase = Math.max(1.3, newEase - 0.2);
        nextReview = Date.now() + 60 * 60 * 1000;
      } else {
        newReps = newReps + 1;
        newEase = Math.max(1.3, Math.min(3.0, newEase + (0.1 - (5 - g) * (0.08 + (5 - g) * 0.02))));
        if (newReps === 1) newInterval = 1;
        else if (newReps === 2) newInterval = 6;
        else newInterval = Math.round(newInterval * newEase);
        nextReview = Date.now() + newInterval * 24 * 60 * 60 * 1000;
      }

      return { ...c, easeFactor: newEase, interval: newInterval, repetitions: newReps, nextReview, lastReview: Date.now() };
    });

    localStorage.setItem(`tm_cards_${user.id}`, JSON.stringify(stored));

    const nextIndex = currentIndex + 1;
    if (nextIndex >= due.length) {
      setDone(true);
      setEvaluating(false);
      addFinance({
        type: "auto_task",
        description: `Review session: ${gradedCount + 1} cards`,
        amount: 0,
        category: "education",
        source: "auto-task",
        date: new Date().toISOString().split("T")[0],
      });
      setTimeout(() => refreshCards(), 100);
    } else {
      setCurrentIndex(nextIndex);
      setShowAnswer(false);
      setGradedCount(gradedCount + 1);
    }
  };

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h2 className="mb-4 text-2xl font-bold">{t("review.title")}</h2>
        <p className="mb-6 text-muted-foreground">Silakan login untuk memulai sesi tinjauan.</p>
        <a href="/auth" className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90">
          {t("auth.login")}
        </a>
      </div>
    );
  }

  if (!evaluating) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20">
        <h2 className="mb-2 text-2xl font-bold">{t("review.title")}</h2>
        <p className="mb-4 text-muted-foreground">
          {due.length === 0 ? t("review.noCards") : `${due.length} kartu tersisa untuk ditinjau.`}
        </p>
        {due.length > 0 && (
          <button onClick={startSession} className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90">
            {t("review.title")}
          </button>
        )}
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mb-4 text-5xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mx-auto">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="mb-2 text-2xl font-bold">{t("review.done")}</h2>
        <p className="mb-6 text-muted-foreground">{gradedCount} {t("review.cardsReviewed")}</p>
        <button onClick={() => { setCurrentIndex(0); setDone(false); setEvaluating(false); setGradedCount(0); }} className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90">
          {t("review.title")}
        </button>
      </div>
    );
  }

  if (!card) {
    return <div className="mx-auto max-w-2xl px-4 py-20 text-center"><p>{t("review.noCards")}</p></div>;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h2 className="mb-2 text-2xl font-bold">{t("review.title")}</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        {currentIndex + 1} / {due.length} — {t("review.progress")}
      </p>

      <div className="mb-6 rounded-lg border bg-card p-6 shadow-sm">
        <div className="mb-4 text-sm text-muted-foreground">{t("review.card")}</div>
        <div className="text-lg">
          {showAnswer ? card.back : card.front}
        </div>
        {!showAnswer && (
          <button onClick={() => setShowAnswer(true)} className="mt-4 rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-primary/90">
            {t("review.flip")}
          </button>
        )}
      </div>

      {showAnswer && (
        <div className="mb-6 grid grid-cols-3 gap-3">
          <button onClick={() => grade(0)} className="rounded-lg border bg-card p-4 hover:bg-muted">
            <div className="text-lg font-semibold">{t("review.again")}</div>
            <div className="text-xs text-muted-foreground">1 min</div>
          </button>
          <button onClick={() => grade(1)} className="rounded-lg border bg-card p-4 hover:bg-muted">
            <div className="text-lg font-semibold">{t("review.hard")}</div>
            <div className="text-xs text-muted-foreground">3 hari</div>
          </button>
          <button onClick={() => grade(2)} className="rounded-lg border bg-card p-4 hover:bg-muted">
            <div className="text-lg font-semibold">{t("review.good")}</div>
            <div className="text-xs text-muted-foreground">5 hari</div>
          </button>
          <button onClick={() => grade(3)} className="rounded-lg border bg-card p-4 hover:bg-muted">
            <div className="text-lg font-semibold">{t("review.easy")}</div>
            <div className="text-xs text-muted-foreground">10 hari</div>
          </button>
          <button onClick={() => grade(4)} className="rounded-lg border bg-card p-4 hover:bg-muted">
            <div className="text-lg font-semibold">{t("review.good4")}</div>
            <div className="text-xs text-muted-foreground">20 hari</div>
          </button>
          <button onClick={() => grade(5)} className="rounded-lg border bg-card p-4 hover:bg-muted">
            <div className="text-lg font-semibold">{t("review.perfect")}</div>
            <div className="text-xs text-muted-foreground">30+ hari</div>
          </button>
        </div>
      )}
    </div>
  );
}
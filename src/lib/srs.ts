// SM-2 Spaced Repetition Algorithm
import type { Card } from "./storage";

export interface CardWithSRS extends Card {
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: number;
  lastReview: number;
}

export function toCardWithSRS(card: Card): CardWithSRS {
  return {
    ...card,
    easeFactor: card.easeFactor ?? 2.5,
    interval: card.interval ?? 0,
    repetitions: card.repetitions ?? 0,
    nextReview: card.nextReview ?? card.createdAt,
    lastReview: card.lastReview ?? 0,
  };
}

// Grade: 0=Again, 1=Hard, 2=Good, 3=Easy, 4-5=Perfect
export function srsStep(card: CardWithSRS, grade: number): CardWithSRS {
  if (grade < 2) {
    return {
      ...card,
      repetitions: 0,
      interval: 1,
      easeFactor: Math.max(1.3, card.easeFactor - 0.2),
      nextReview: Date.now() + 60 * 60 * 1000, // 1 hour
      lastReview: Date.now(),
    };
  }

  const newReps = card.repetitions + 1;
  let newInterval: number;
  let newEase = card.easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));

  newEase = Math.max(1.3, Math.min(3.0, newEase));

  if (newReps === 1) {
    newInterval = 1;
  } else if (newReps === 2) {
    newInterval = 6;
  } else {
    newInterval = Math.round(card.interval * card.easeFactor);
  }

  return {
    ...card,
    repetitions: newReps,
    interval: newInterval,
    easeFactor: newEase,
    nextReview: Date.now() + newInterval * 24 * 60 * 60 * 1000,
    lastReview: Date.now(),
  };
}

export function isDue(card: CardWithSRS): boolean {
  return card.nextReview <= Date.now();
}

export function getDueCards(cards: CardWithSRS[]): CardWithSRS[] {
  return cards.filter(isDue);
}

export function getCardsDueTodayCount(cards: CardWithSRS[]): number {
  return getDueCards(cards).length;
}

export function getReviewStreak(cards: CardWithSRS[]): number {
  if (cards.length === 0) return 0;

  const sorted = [...cards]
    .map((c) => c.lastReview)
    .filter((t) => t > 0)
    .sort((a, b) => b - a);

  if (sorted.length === 0) return 0;

  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  let streak = 0;
  let checkDate = now;

  for (let i = 0; i < sorted.length; i++) {
    const dayStart = Math.floor(checkDate / oneDay) * oneDay;
    const dayEnd = dayStart + oneDay;

    const hasReviewToday = sorted.some((t) => t >= dayStart && t < dayEnd);
    if (hasReviewToday) {
      streak++;
      checkDate = dayStart - oneDay;
    } else if (i === 0) {
      checkDate = dayStart - oneDay;
      continue;
    } else {
      break;
    }
  }

  return streak;
}

export function getMasteryPercentage(cards: CardWithSRS[]): number {
  if (cards.length === 0) return 0;
  const mastered = cards.filter((c) => c.interval >= 21 && c.repetitions >= 5);
  return Math.round((mastered.length / cards.length) * 100);
}

export function getReviewHistory(cards: CardWithSRS[], days: number = 7): { date: string; count: number }[] {
  const result: { date: string; count: number }[] = [];
  const oneDay = 24 * 60 * 60 * 1000;
  const now = Date.now();

  for (let i = days - 1; i >= 0; i--) {
    const dayStart = Math.floor((now - i * oneDay) / oneDay) * oneDay;
    const dayEnd = dayStart + oneDay;
    const count = cards.filter((c) => c.lastReview >= dayStart && c.lastReview < dayEnd).length;
    const date = new Date(dayStart).toISOString().split("T")[0];
    result.push({ date, count });
  }

  return result;
}

export function getSubjectMastery(cards: CardWithSRS[], subjects: { id: string; name: string }[]): { subject: string; pct: number }[] {
  return subjects.map((s) => {
    const subjectCards = cards.filter((c) => c.deckId === s.id);
    const pct = subjectCards.length > 0 ? getMasteryPercentage(subjectCards) : 0;
    return { subject: s.name, pct };
  });
}

// Generate heatmap data for 12 weeks
export function getHeatmapData(cards: CardWithSRS[]): { date: string; count: number }[] {
  const result: { date: string; count: number }[] = [];
  const oneDay = 24 * 60 * 60 * 1000;
  const now = Date.now();
  const totalDays = 84; // 12 weeks

  for (let i = totalDays - 1; i >= 0; i--) {
    const dayStart = Math.floor((now - i * oneDay) / oneDay) * oneDay;
    const dayEnd = dayStart + oneDay;
    const count = cards.filter((c) => c.lastReview >= dayStart && c.lastReview < dayEnd).length;
    const date = new Date(dayStart).toISOString().split("T")[0];
    result.push({ date, count });
  }

  return result;
}
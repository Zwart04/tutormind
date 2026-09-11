import { StoredUser } from "./auth";

export interface Deck {
  id: string;
  userId: string;
  name: string;
  subject: string;
  createdAt: number;
  updatedAt: number;
}

export interface DeckWithCards extends Deck {
  cards: Card[];
}

export interface Card {
  id: string;
  deckId: string;
  front: string;
  back: string;
  createdAt: number;
  // SRS data embedded in card for persistence
  easeFactor?: number;
  interval?: number;
  repetitions?: number;
  nextReview?: number;
  lastReview?: number;
}

export interface FinanceEntry {
  id: string;
  userId: string;
  type: "auto_task" | "auto_bill" | "auto_vendor";
  description: string;
  amount: number;
  category: string;
  source: string;
  date: string;
  createdAt: number;
}

export interface Essay {
  id: string;
  userId: string;
  subject: string;
  prompt: string;
  essay: string;
  scores: {
    content: number;
    organization: number;
    grammar: number;
    vocabulary: number;
  };
  total: number;
  feedback: string;
  createdAt: number;
}

const DECKS_KEY = "tm_decks";
const CARDS_KEY = "tm_cards";
const FINANCE_KEY = "tm_finance";
const ESSAYS_KEY = "tm_essays";

function getKey(prefix: string, userId: string): string {
  return `${prefix}_${userId}`;
}

export function getDecks(userId: string): Deck[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(getKey(DECKS_KEY, userId));
    if (!raw) return [];
    return JSON.parse(raw) as Deck[];
  } catch {
    return [];
  }
}

export function saveDecks(userId: string, decks: Deck[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(getKey(DECKS_KEY, userId), JSON.stringify(decks));
}

export function getCards(userId: string): Card[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(getKey(CARDS_KEY, userId));
    if (!raw) return [];
    return JSON.parse(raw) as Card[];
  } catch {
    return [];
  }
}

export function saveCards(userId: string, cards: Card[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(getKey(CARDS_KEY, userId), JSON.stringify(cards));
}

export function getFinanceEntries(userId: string): FinanceEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(getKey(FINANCE_KEY, userId));
    if (!raw) return [];
    return JSON.parse(raw) as FinanceEntry[];
  } catch {
    return [];
  }
}

export function saveFinanceEntries(userId: string, entries: FinanceEntry[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(getKey(FINANCE_KEY, userId), JSON.stringify(entries));
}

export function getEssays(userId: string): Essay[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(getKey(ESSAYS_KEY, userId));
    if (!raw) return [];
    return JSON.parse(raw) as Essay[];
  } catch {
    return [];
  }
}

export function saveEssays(userId: string, essays: Essay[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(getKey(ESSAYS_KEY, userId), JSON.stringify(essays));
}

export function createDeck(userId: string, name: string, subject: string): Deck {
  const decks = getDecks(userId);
  const newDeck: Deck = {
    id: crypto.randomUUID(),
    userId,
    name,
    subject,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  decks.push(newDeck);
  saveDecks(userId, decks);
  return newDeck;
}

export function updateDeck(userId: string, id: string, updates: Partial<Deck>): Deck | null {
  const decks = getDecks(userId);
  const idx = decks.findIndex((d) => d.id === id);
  if (idx === -1) return null;
  decks[idx] = { ...decks[idx], ...updates, updatedAt: Date.now() };
  saveDecks(userId, decks);
  return decks[idx];
}

export function deleteDeck(userId: string, id: string): void {
  let decks = getDecks(userId);
  decks = decks.filter((d) => d.id !== id);
  saveDecks(userId, decks);

  let cards = getCards(userId);
  cards = cards.filter((c) => c.deckId !== id);
  saveCards(userId, cards);
}

export function addCard(userId: string, deckId: string, front: string, back: string): Card {
  const cards = getCards(userId);
  const newCard: Card = {
    id: crypto.randomUUID(),
    deckId,
    front,
    back,
    createdAt: Date.now(),
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: Date.now(),
    lastReview: 0,
  };
  cards.push(newCard);
  saveCards(userId, cards);
  return newCard;
}

export function deleteCard(userId: string, id: string): void {
  let cards = getCards(userId);
  cards = cards.filter((c) => c.id !== id);
  saveCards(userId, cards);
}

export function addFinanceEntry(userId: string, entry: Omit<FinanceEntry, "id" | "userId" | "createdAt">): FinanceEntry {
  const entries = getFinanceEntries(userId);
  const newEntry: FinanceEntry = {
    ...entry,
    id: crypto.randomUUID(),
    userId,
    createdAt: Date.now(),
  };
  entries.unshift(newEntry);
  saveFinanceEntries(userId, entries);
  return newEntry;
}

export function addEssay(userId: string, essay: Omit<Essay, "id" | "userId" | "createdAt">): Essay {
  const essays = getEssays(userId);
  const newEssay: Essay = {
    ...essay,
    id: crypto.randomUUID(),
    userId,
    createdAt: Date.now(),
  };
  essays.unshift(newEssay);
  saveEssays(userId, essays);
  return newEssay;
}
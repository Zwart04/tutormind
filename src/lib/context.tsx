"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { StoredUser, login, register, logout, getCurrentUser, updateCurrentUser } from "@/lib/auth";
import { Deck, Card, FinanceEntry, Essay, getDecks, getCards, getFinanceEntries, getEssays, createDeck, addCard, deleteCard, deleteDeck, addFinanceEntry, addEssay } from "@/lib/storage";
import { translate, Lang } from "@/lib/i18n";
import { CardWithSRS, getCardsDueTodayCount, getReviewStreak, getMasteryPercentage, getReviewHistory, getSubjectMastery, getHeatmapData } from "@/lib/srs";
import { gradeEssay, getRandomPrompt } from "@/lib/essay-grader";
import { generateRandomQuestion } from "@/lib/questions";

interface AppContextType {
  user: StoredUser | null;
  lang: Lang;
  setLang: (lang: Lang) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  decks: Deck[];
  cards: Card[];
  financeEntries: FinanceEntry[];
  essays: Essay[];
  refreshData: () => void;
  refreshCards: () => void;
  refreshDecks: () => void;
  refreshFinance: () => void;
  refreshEssays: () => void;
  loginUser: (email: string, password: string) => StoredUser | null;
  registerUser: (email: string, password: string, username: string, name: string) => StoredUser | null;
  logoutUser: () => void;
  createNewDeck: (name: string, subject: string) => Deck;
  addNewCard: (deckId: string, front: string, back: string) => Card;
  removeCard: (cardId: string) => void;
  removeDeck: (deckId: string) => void;
  addFinance: (entry: Omit<FinanceEntry, "id" | "userId" | "createdAt">) => FinanceEntry;
  addEssayEntry: (essay: Omit<Essay, "id" | "userId" | "createdAt">) => Essay;
  gradeEssayFunc: (essay: string, subject: string) => { scores: { content: number; organization: number; grammar: number; vocabulary: number; total: number; feedback: string }; prompt: string };
  generateQuestionFunc: () => { question: { id: string; subject: string; difficulty: "easy" | "medium" | "hard"; type: "multiple_choice"; question: string; options: string[]; correctAnswer: string; createdAt: number } };
  t: (key: string) => string;
  getUserCardsWithSRS: () => CardWithSRS[];
  getDueCount: () => number;
  getStreak: () => number;
  getMastery: () => number;
  getReviewTrend: (days: number) => { date: string; count: number }[];
  getSubjectMasteryData: () => { subject: string; pct: number }[];
  getAttribution: () => { source: string; visits: number }[];
  captureAttribution: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const SUBJECTS = [
  { id: "english", name: "English" },
  { id: "matematika", name: "Matematika" },
  { id: "ipa", name: "IPA" },
  { id: "ips", name: "IPS" },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [lang, setLangState] = useState<Lang>("en");
  const [theme, setThemeState] = useState<"light" | "dark">("light");
  const [decks, setDecks] = useState<Deck[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [financeEntries, setFinanceEntries] = useState<FinanceEntry[]>([]);
  const [essays, setEssays] = useState<Essay[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const u = getCurrentUser();
    setUser(u);

    if (u) {
      setDecks(getDecks(u.id));
      setCards(getCards(u.id));
      setFinanceEntries(getFinanceEntries(u.id));
      setEssays(getEssays(u.id));
    }

    const savedLang = localStorage.getItem("tm_lang") as Lang | null;
    if (savedLang && (savedLang === "en" || savedLang === "id")) setLangState(savedLang); else setLangState("en");

    const savedTheme = localStorage.getItem("tm_theme") as "light" | "dark" | null;
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) setThemeState(savedTheme); else setThemeState("light");
  }, []);

  const captureAttribution = useCallback(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("tm_attribution_captured")) return;
    const params = new URLSearchParams(window.location.search);
    const source = params.get("utm_source") || params.get("source") || "direct";
    localStorage.setItem("tm_source", source);
    localStorage.setItem("tm_attribution_captured", "1");
  }, []);

  const getAttribution = useCallback(() => {
    if (typeof window === "undefined") return [];
    const source = localStorage.getItem("tm_source") || "direct";
    const allSources: Record<string, number> = {};
    try {
      const raw = localStorage.getItem("tm_attribution_all") || "{}";
      Object.assign(allSources, JSON.parse(raw));
    } catch {}
    allSources[source] = (allSources[source] || 0) + 1;
    localStorage.setItem("tm_attribution_all", JSON.stringify(allSources));
    return Object.entries(allSources).map(([source, visits]) => ({ source, visits }));
  }, []);

  const refreshData = useCallback(() => {
    if (!user) return;
    setDecks(getDecks(user.id));
    setCards(getCards(user.id));
    setFinanceEntries(getFinanceEntries(user.id));
    setEssays(getEssays(user.id));
  }, [user]);

  const refreshCards = useCallback(() => {
    if (!user) return;
    setCards(getCards(user.id));
  }, [user]);

  const refreshDecks = useCallback(() => {
    if (!user) return;
    setDecks(getDecks(user.id));
  }, [user]);

  const refreshFinance = useCallback(() => {
    if (!user) return;
    setFinanceEntries(getFinanceEntries(user.id));
  }, [user]);

  const refreshEssays = useCallback(() => {
    if (!user) return;
    setEssays(getEssays(user.id));
  }, [user]);

  const loginUser = useCallback((email: string, password: string): StoredUser | null => {
    const u = login(email, password);
    setUser(u);
    if (u) {
      setDecks(getDecks(u.id));
      setCards(getCards(u.id));
      setFinanceEntries(getFinanceEntries(u.id));
      setEssays(getEssays(u.id));
    }
    return u;
  }, []);

  const registerUser = useCallback((email: string, password: string, username: string, name: string): StoredUser | null => {
    const u = register(email, password, username, name);
    setUser(u);
    if (u) {
      setDecks(getDecks(u.id));
      setCards(getCards(u.id));
      setFinanceEntries(getFinanceEntries(u.id));
      setEssays(getEssays(u.id));
    }
    return u;
  }, []);

  const logoutUser = useCallback(() => {
    logout();
    setUser(null);
    setDecks([]);
    setCards([]);
    setFinanceEntries([]);
    setEssays([]);
  }, []);

  const createNewDeck = useCallback((name: string, subject: string): Deck => {
    if (!user) throw new Error("Not authenticated");
    const deck = createDeck(user.id, name, subject);
    setDecks(getDecks(user.id));
    return deck;
  }, [user]);

  const addNewCard = useCallback((deckId: string, front: string, back: string): Card => {
    if (!user) throw new Error("Not authenticated");
    const card = addCard(user.id, deckId, front, back);
    setCards(getCards(user.id));
    return card;
  }, [user]);

  const removeCard = useCallback((cardId: string) => {
    if (!user) return;
    deleteCard(user.id, cardId);
    setCards(getCards(user.id));
  }, [user]);

  const removeDeck = useCallback((deckId: string) => {
    if (!user) return;
    deleteDeck(user.id, deckId);
    setDecks(getDecks(user.id));
    setCards(getCards(user.id));
  }, [user]);

  const addFinance = useCallback((entry: Omit<FinanceEntry, "id" | "userId" | "createdAt">): FinanceEntry => {
    if (!user) throw new Error("Not authenticated");
    const e = addFinanceEntry(user.id, entry);
    setFinanceEntries(getFinanceEntries(user.id));
    return e;
  }, [user]);

  const addEssayEntry = useCallback((essay: Omit<Essay, "id" | "userId" | "createdAt">): Essay => {
    if (!user) throw new Error("Not authenticated");
    const e = addEssay(user.id, essay);
    setEssays(getEssays(user.id));
    return e;
  }, [user]);

  const gradeEssayFunc = useCallback((essay: string, subject: string) => {
    const scores = gradeEssay(essay, subject);
    const prompt = getRandomPrompt(subject);
    return { scores, prompt };
  }, []);

  const generateQuestionFunc = useCallback((): { question: { id: string; subject: string; difficulty: "easy" | "medium" | "hard"; type: "multiple_choice"; question: string; options: string[]; correctAnswer: string; createdAt: number } } => {
    const q = generateRandomQuestion();
    return {
      question: {
        id: q.id,
        subject: q.subject,
        difficulty: q.difficulty,
        type: "multiple_choice",
        question: q.question,
        options: q.options ?? [],
        correctAnswer: q.correctAnswer ?? "",
        createdAt: q.createdAt,
      },
    };
  }, []);

  const getUserCardsWithSRS = useCallback((): CardWithSRS[] => {
    if (!user) return [];
    const allCards = getCards(user.id);
    return allCards.map((c) => ({
      id: c.id,
      deckId: c.deckId,
      front: c.front,
      back: c.back,
      createdAt: c.createdAt,
      easeFactor: c.easeFactor ?? 2.5,
      interval: c.interval ?? 0,
      repetitions: c.repetitions ?? 0,
      nextReview: c.nextReview ?? c.createdAt,
      lastReview: c.lastReview ?? 0,
    }));
  }, [user]);

  const getDueCount = useCallback(() => {
    return getCardsDueTodayCount(getUserCardsWithSRS());
  }, [getUserCardsWithSRS]);

  const getStreak = useCallback(() => {
    return getReviewStreak(getUserCardsWithSRS());
  }, [getUserCardsWithSRS]);

  const getMastery = useCallback(() => {
    return getMasteryPercentage(getUserCardsWithSRS());
  }, [getUserCardsWithSRS]);

  const getReviewTrend = useCallback((days: number) => {
    return getReviewHistory(getUserCardsWithSRS(), days);
  }, [getUserCardsWithSRS]);

  const getSubjectMasteryData = useCallback(() => {
    return getSubjectMastery(getUserCardsWithSRS(), SUBJECTS);
  }, [getUserCardsWithSRS]);

  const t = useCallback((key: string) => translate(key, lang), [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("tm_lang", l);
  }, []);

  const setTheme = useCallback((t: "light" | "dark") => {
    setThemeState(t);
    if (typeof window !== "undefined") {
      localStorage.setItem("tm_theme", t);
      document.documentElement.classList.toggle("dark", t === "dark");
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        lang,
        setLang,
        theme,
        setTheme,
        decks,
        cards,
        financeEntries,
        essays,
        refreshData,
        refreshCards,
        refreshDecks,
        refreshFinance,
        refreshEssays,
        loginUser,
        registerUser,
        logoutUser,
        createNewDeck,
        addNewCard,
        removeCard,
        removeDeck,
        addFinance,
        addEssayEntry,
        gradeEssayFunc,
        generateQuestionFunc,
        t,
        getUserCardsWithSRS,
        getDueCount,
        getStreak,
        getMastery,
        getReviewTrend,
        getSubjectMasteryData,
        getAttribution,
        captureAttribution,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

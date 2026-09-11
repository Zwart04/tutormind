"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { Deck, Card } from "@/lib/storage";

interface DeckListProps {
  onSelectDeck?: (deckId: string) => void;
}

export function DeckList({ onSelectDeck }: DeckListProps) {
  const { user, decks, t, createNewDeck, removeDeck, refreshDecks } = useApp();
  const [showNewDeck, setShowNewDeck] = useState(false);
  const [newDeckName, setNewDeckName] = useState("");
  const [newDeckSubject, setNewDeckSubject] = useState("english");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleCreateDeck = () => {
    if (!newDeckName.trim()) return;
    createNewDeck(newDeckName.trim(), newDeckSubject);
    setNewDeckName("");
    setShowNewDeck(false);
    refreshDecks();
  };

  const handleDeleteDeck = (deckId: string) => {
    removeDeck(deckId);
    setDeleteConfirm(null);
    refreshDecks();
  };

  const handleAddCard = (deckId: string, front: string, back: string) => {
    if (!user) return;
    const card: Card = {
      id: crypto.randomUUID(),
      deckId,
      front,
      back,
      createdAt: Date.now(),
    };
    const cards = (typeof window !== "undefined" ? JSON.parse(localStorage.getItem(`tm_cards_${user.id}`) ?? "[]") : []) as Card[];
    cards.push(card);
    localStorage.setItem(`tm_cards_${user.id}`, JSON.stringify(cards));
    refreshDecks();
  };

  if (!user) return null;

  return (
    <div>
      {showNewDeck && (
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={newDeckName}
            onChange={(e) => setNewDeckName(e.target.value)}
            className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
            placeholder={t("decks.deckName")}
          />
          <select
            value={newDeckSubject}
            onChange={(e) => setNewDeckSubject(e.target.value)}
            className="rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
          >
            <option value="english">English</option>
            <option value="matematika">Matematika</option>
            <option value="ipa">IPA</option>
            <option value="ips">IPS</option>
          </select>
          <button onClick={handleCreateDeck} className="rounded-lg bg-primary px-3 py-2 text-white text-sm hover:bg-primary/90">
            {t("common.save")}
          </button>
          <button onClick={() => setShowNewDeck(false)} className="rounded-lg border px-3 py-2 text-sm hover:bg-muted">
            {t("common.cancel")}
          </button>
        </div>
      )}

      {decks.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("decks.noDecks")}</p>
      ) : (
        <div className="space-y-2">
          {decks.map((deck) => {
            return (
              <div key={deck.id} className="flex items-center justify-between rounded-lg border bg-background p-3">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                  <div>
                    <div className="text-sm font-medium">{deck.name}</div>
                    <div className="text-xs text-muted-foreground">{deck.subject}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => onSelectDeck?.(deck.id)} className="text-xs text-muted-foreground underline hover:text-primary">
                    {t("card.newCard")}
                  </button>
                  {deleteConfirm === deck.id ? (
                    <>
                      <button onClick={() => handleDeleteDeck(deck.id)} className="text-xs text-red-500 hover:underline">
                        {t("common.confirm")}
                      </button>
                      <button onClick={() => setDeleteConfirm(null)} className="text-xs text-muted-foreground hover:underline">
                        {t("common.cancel")}
                      </button>
                    </>
                  ) : (
                    <button onClick={() => setDeleteConfirm(deck.id)} className="text-xs text-muted-foreground hover:underline">
                      {t("common.delete")}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {decks.length > 0 && !showNewDeck && (
        <button onClick={() => setShowNewDeck(true)} className="mt-4 text-sm text-muted-foreground underline hover:text-primary">
          + {t("decks.newDeck")}
        </button>
      )}
    </div>
  );
}

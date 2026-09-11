"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";

export function CardList({ cards }: { cards: { id: string; front: string; back: string; deckId: string; createdAt: number }[] }) {
  const { t } = useApp();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  if (cards.length === 0) {
    return <p className="text-sm text-muted-foreground">{t("decks.noDecks")}</p>;
  }

  return (
    <div className="space-y-2">
      {cards.map((card) => (
        <div key={card.id} className="rounded-lg border bg-background p-3">
          <div className="mb-2 text-sm font-medium">{card.front}</div>
          <div className="text-xs text-muted-foreground">{card.back}</div>
          <div className="mt-2 flex justify-end">
            {deleteConfirm === card.id ? (
              <>
                <button onClick={() => { setDeleteConfirm(null); }} className="text-xs text-red-500 hover:underline">
                  {t("common.confirm")}
                </button>
                <button onClick={() => setDeleteConfirm(null)} className="text-xs text-muted-foreground hover:underline">
                  {t("common.cancel")}
                </button>
              </>
            ) : (
              <button onClick={() => setDeleteConfirm(card.id)} className="text-xs text-muted-foreground hover:underline">
                {t("common.delete")}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

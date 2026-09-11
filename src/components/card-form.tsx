"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { Card } from "@/lib/storage";

interface CardFormProps {
  deckId: string;
  onAdd: (card: Card) => void;
  onCancel: () => void;
}

export function CardForm({ deckId, onAdd, onCancel }: CardFormProps) {
  const { t } = useApp();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!front.trim() || !back.trim()) return;
    onAdd({
      id: crypto.randomUUID(),
      deckId,
      front: front.trim(),
      back: back.trim(),
      createdAt: Date.now(),
    });
    setFront("");
    setBack("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 rounded-lg border bg-card p-4 shadow-sm">
      <h4 className="mb-3 font-semibold">{t("card.newCard")}</h4>
      <div className="mb-3">
        <label className="mb-1 block text-sm text-muted-foreground">{t("card.front")}</label>
        <textarea
          value={front}
          onChange={(e) => setFront(e.target.value)}
          className="w-full rounded-md border bg-background p-2 text-sm focus:border-primary focus:outline-none"
          rows={2}
          placeholder={t("card.question")}
        />
      </div>
      <div className="mb-3">
        <label className="mb-1 block text-sm text-muted-foreground">{t("card.back")}</label>
        <textarea
          value={back}
          onChange={(e) => setBack(e.target.value)}
          className="w-full rounded-md border bg-background p-2 text-sm focus:border-primary focus:outline-none"
          rows={2}
          placeholder={t("card.answer")}
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-white font-semibold hover:bg-primary/90">
          {t("common.save")}
        </button>
        <button type="button" onClick={onCancel} className="rounded-lg border px-4 py-2 hover:bg-muted">
          {t("common.cancel")}
        </button>
      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { DeckList } from "@/components/deck-list";

export default function DecksPage() {
  const { user, t } = useApp();

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="mb-4 text-2xl font-bold">{t("nav.decks")}</h2>
        <p className="mb-6 text-muted-foreground">Silakan login untuk mengelola paket kartu.</p>
        <a href="/auth" className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90">
          {t("auth.login")}
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t("nav.decks")}</h2>
      </div>
      <DeckList />
    </div>
  );
}
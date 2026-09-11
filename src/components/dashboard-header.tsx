"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";

export function DashboardHeader() {
  const { user, t, lang, setLang, theme, setTheme } = useApp();

  if (!user) return null;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{user.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as "en" | "id")}
          className="rounded-md border bg-background px-3 py-1 text-sm focus:border-primary focus:outline-none"
        >
          <option value="en">EN</option>
          <option value="id">ID</option>
        </select>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="rounded-md border bg-background px-3 py-1 text-sm hover:bg-muted"
        >
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>
    </div>
  );
}

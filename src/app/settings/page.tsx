"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";

export default function SettingsPage() {
  const { user, t, lang, setLang, theme, setTheme } = useApp();
  const [copied, setCopied] = useState(false);

  const shareLink = user ? `${window.location.origin}/s/${user.username}` : "";

  const copyLink = () => {
    if (!shareLink) return;
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="mb-4 text-2xl font-bold">{t("nav.settings")}</h2>
        <p className="mb-6 text-muted-foreground">Silakan login.</p>
        <a href="/auth" className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90">
          {t("auth.login")}
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold">{t("nav.settings")}</h2>

      <div className="space-y-6">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">{t("settings.language")}</h3>
          <div className="flex gap-3">
            <button
              onClick={() => setLang("en")}
              className={`rounded-md px-4 py-2 text-sm font-medium ${lang === "en" ? "bg-primary text-white" : "border bg-background hover:bg-muted"}`}
            >
              {t("settings.english")}
            </button>
            <button
              onClick={() => setLang("id")}
              className={`rounded-md px-4 py-2 text-sm font-medium ${lang === "id" ? "bg-primary text-white" : "border bg-background hover:bg-muted"}`}
            >
              {t("settings.indonesian")}
            </button>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">{t("settings.theme")}</h3>
          <div className="flex gap-3">
            <button
              onClick={() => setTheme("light")}
              className={`rounded-md px-4 py-2 text-sm font-medium ${theme === "light" ? "bg-primary text-white" : "border bg-background hover:bg-muted"}`}
            >
              {t("settings.light")}
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`rounded-md px-4 py-2 text-sm font-medium ${theme === "dark" ? "bg-primary text-white" : "border bg-background hover:bg-muted"}`}
            >
              {t("settings.dark")}
            </button>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">{t("share.title")}</h3>
          <p className="mb-3 text-sm text-muted-foreground">{t("share.link")}</p>
          <div className="flex items-center gap-3">
            <input
              type="text"
              readOnly
              value={shareLink}
              className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
            />
            <button onClick={copyLink} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">
              {copied ? t("share.copied") : t("share.copy")}
            </button>
          </div>
          {shareLink && (
            <a
              href={`https://wa.me/?text=Check my tutor profile: ${encodeURIComponent(shareLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block rounded-lg border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted"
            >
              {t("share.wa")}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
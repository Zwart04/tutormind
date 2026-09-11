"use client";

import { useApp } from "@/lib/context";
import Link from "next/link";

export function Landing() {
  const { user, t } = useApp();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-center">
      <div className="mb-8 flex items-center justify-center gap-3">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="24" fill="currentColor" className="text-primary" />
          <path d="M12 16h24M12 24h16M12 32h20" stroke="white" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <h1 className="text-4xl font-bold">TutorMind</h1>
      </div>

      <p className="mb-2 text-lg text-muted-foreground">{t("public.studying")}</p>
      <p className="mb-12 text-sm text-muted-foreground">Spaced Repetition + AI Essay Grader + Collaborative Whiteboard</p>

      <div className="mb-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-3 text-3xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5h7a4 4 0 0 1 0 7h-7"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>
          </div>
          <h3 className="mb-2 font-semibold">Spaced Repetition</h3>
          <p className="text-sm text-muted-foreground">Algoritma SM-2 asli. Kartu diulang otomatis sesuai jadwal. Kuasai materi selamanya.</p>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-3 text-3xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <h3 className="mb-2 font-semibold">AI Essay Grader</h3>
          <p className="text-sm text-muted-foreground">Submit esai, dapatkan penilaian detail per dimensi. Content, organisasi, tata bahasa, kosakata.</p>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-3 text-3xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
          </div>
          <h3 className="mb-2 font-semibold">Whiteboard Kolaboratif</h3>
          <p className="text-sm text-muted-foreground">Gambar, tulis, bagikan. Sync multi-tab pakai BroadcastChannel. Undo/redo, export PNG.</p>
        </div>
      </div>

      <div className="mb-12 flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold">Mulai Belajar Hari Ini</h2>
        {user ? (
          <Link href="/dashboard" className="rounded-lg bg-primary px-6 py-3 text-white font-semibold hover:bg-primary/90">
            Ke Dasbor
          </Link>
        ) : (
          <Link href="/auth" className="rounded-lg bg-primary px-6 py-3 text-white font-semibold hover:bg-primary/90">
            {t("auth.register")}
          </Link>
        )}
      </div>

      <div className="border-t pt-8">
        <p className="mb-4 text-xs text-muted-foreground">Adaptive Tutoring OS — belajar lebih cerdas, bukan lebih keras.</p>
      </div>
    </div>
  );
}

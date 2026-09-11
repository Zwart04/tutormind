"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";

export default function EssayPage() {
  const { user, t, gradeEssayFunc, addEssayEntry } = useApp();
  const [essay, setEssay] = useState("");
  const [subject, setSubject] = useState("english");
  const [result, setResult] = useState<{ content: number; organization: number; grammar: number; vocabulary: number; total: number; feedback: string } | null>(null);
  const [prompt, setPrompt] = useState("");

  const handleGrade = () => {
    if (!essay.trim() || essay.trim().split(/\s+/).length < 10) return;
    const { scores, prompt: p } = gradeEssayFunc(essay, subject);
    setResult(scores);
    setPrompt(p);
    if (user) {
      addEssayEntry({
        subject,
        prompt: p,
        essay,
        scores: { content: scores.content, organization: scores.organization, grammar: scores.grammar, vocabulary: scores.vocabulary },
        total: scores.total,
        feedback: scores.feedback,
      });
    }
  };

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="mb-4 text-2xl font-bold">{t("nav.essay")}</h2>
        <p className="mb-6 text-muted-foreground">Silakan login untuk menggunakan penilai esai.</p>
        <a href="/auth" className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90">
          {t("auth.login")}
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h2 className="mb-2 text-2xl font-bold">{t("nav.essay")}</h2>
      <p className="mb-6 text-sm text-muted-foreground">Submit esai Anda dan dapatkan penilaian detail per dimensi.</p>

      <div className="mb-6">
        <label className="mb-1 block text-sm font-medium">{t("decks.subject")}</label>
        <select value={subject} onChange={(e) => setSubject(e.target.value)} className="rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none">
          <option value="english">English</option>
          <option value="matematika">Matematika</option>
          <option value="ipa">IPA</option>
          <option value="ips">IPS</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="mb-1 block text-sm font-medium">Essay</label>
        <textarea
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          className="w-full rounded-md border bg-background p-3 text-sm focus:border-primary focus:outline-none"
          rows={10}
          placeholder="Tulis esai Anda di sini (minimal 20 kata)..."
        />
        <p className="mt-1 text-xs text-muted-foreground">{essay.trim().split(/\s+/).length} kata</p>
      </div>

      <button
        onClick={handleGrade}
        disabled={essay.trim().split(/\s+/).length < 20}
        className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90 disabled:opacity-50"
      >
        Grade Essay
      </button>

      {result && (
        <div className="mt-8 rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Hasil Penilaian</h3>
          <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="text-sm text-muted-foreground">Content</div>
              <div className="text-2xl font-bold">{result.content}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Organization</div>
              <div className="text-2xl font-bold">{result.organization}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Grammar</div>
              <div className="text-2xl font-bold">{result.grammar}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Vocabulary</div>
              <div className="text-2xl font-bold">{result.vocabulary}</div>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-sm text-muted-foreground">Total Score</div>
            <div className="text-4xl font-bold text-primary">{result.total}/100</div>
          </div>
          <div className="rounded-md border bg-background p-3 text-sm">
            <span className="font-semibold">Feedback:</span> {result.feedback}
          </div>
        </div>
      )}
    </div>
  );
}
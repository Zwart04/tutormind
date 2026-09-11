"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";

export default function QuestionsPage() {
  const { user, t, generateQuestionFunc } = useApp();
  const [question, setQuestion] = useState<{ id: string; subject: string; difficulty: string; type: string; question: string; options: string[]; correctAnswer: string } | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<Array<{ question: string; userAnswer: string; correct: boolean }>>([]);

  const handleGenerate = () => {
    const q = generateQuestionFunc();
    setQuestion(q.question);
    setSelected(null);
    setShowResult(false);
  };

  const handleAnswer = (idx: number) => {
    if (!question || showResult) return;
    setSelected(idx);
    setShowResult(true);
    const correct = question.options[idx] === question.correctAnswer;
    setAnswers((prev) => [...prev.slice(-9), { question: question.question, userAnswer: question.options[idx], correct }]);
  };

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="mb-4 text-2xl font-bold">{t("questions.title")}</h2>
        <p className="mb-6 text-muted-foreground">Silakan login.</p>
        <a href="/auth" className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90">
          {t("auth.login")}
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h2 className="mb-2 text-2xl font-bold">{t("questions.title")}</h2>
      <p className="mb-6 text-sm text-muted-foreground">Soal adaptif per mata pelajaran dengan tingkat kesulitan bervariasi.</p>

      <button onClick={handleGenerate} className="mb-6 rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90">
        {t("questions.generate")}
      </button>

      {question && (
        <div className="mb-6 rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{question.subject}</span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{question.difficulty}</span>
          </div>
          <p className="mb-4 text-lg font-medium">{question.question}</p>
          <div className="space-y-2">
            {question.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={showResult}
                className={`w-full rounded-md border p-3 text-left text-sm ${
                  showResult
                    ? opt === question.correctAnswer
                      ? "border-green-500 bg-green-50 dark:bg-green-950"
                      : selected === idx
                      ? "border-red-500 bg-red-50 dark:bg-red-950"
                      : "bg-card"
                    : "bg-card hover:bg-muted"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {showResult && (
            <p className="mt-4 text-sm font-medium">
              {selected !== null && question.options[selected] === question.correctAnswer ? (
                <span className="text-green-600">Benar!</span>
              ) : (
                <span className="text-red-600">Salah. Jawaban benar: {question.correctAnswer}</span>
              )}
            </p>
          )}
        </div>
      )}

      {answers.length > 0 && (
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold">{t("questions.myAnswers")}</h3>
          <div className="space-y-2">
            {answers.map((a, i) => (
              <div key={i} className="flex items-center justify-between rounded-md border bg-background p-3 text-sm">
                <span className="truncate">{a.question}</span>
                <span className={a.correct ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  {a.correct ? "Benar" : "Salah"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
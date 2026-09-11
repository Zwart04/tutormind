"use client";

import { useApp } from "@/lib/context";

export function SubjectSelector({ onSelect }: { onSelect: (subject: string) => void }) {
  const { t } = useApp();
  const subjects = [
    { id: "english", name: t("essay.subject") === "Subject" ? "English" : "English" },
    { id: "matematika", name: "Matematika" },
    { id: "ipa", name: "IPA" },
    { id: "ips", name: "IPS" },
  ];

  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-medium">{t("essay.subject")}</label>
      <div className="flex flex-wrap gap-2">
        {subjects.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}

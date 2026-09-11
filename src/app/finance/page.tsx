"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export default function FinancePage() {
  const { user, t, financeEntries } = useApp();

  const exportPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("TutorMind - Finance Journal", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);

    autoTable(doc, {
      startY: 35,
      head: [["Date", "Description", "Category", "Amount", "Source"]],
      body: financeEntries.map((e) => [e.date, e.description, e.category, `Rp ${e.amount.toLocaleString()}`, e.source]),
    });

    doc.save("finance-journal.pdf");
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      financeEntries.map((e) => ({
        Date: e.date,
        Description: e.description,
        Category: e.category,
        Amount: e.amount,
        Source: e.source,
        Type: e.type,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Finance");
    XLSX.writeFile(wb, "finance-journal.xlsx");
  };

  const monthlySummary = financeEntries.reduce(
    (acc, e) => {
      const month = e.date.substring(0, 7);
      if (!acc[month]) acc[month] = 0;
      acc[month] += e.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  const chartData = Object.entries(monthlySummary)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, total]) => ({ month, total }));

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="mb-4 text-2xl font-bold">{t("nav.finance")}</h2>
        <p className="mb-6 text-muted-foreground">Silakan login.</p>
        <a href="/auth" className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90">
          {t("auth.login")}
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t("finance.title")}</h2>
        <div className="flex gap-3">
          <button onClick={exportPdf} className="rounded-lg border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted">
            {t("finance.exportPdf")}
          </button>
          <button onClick={exportExcel} className="rounded-lg border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted">
            {t("finance.exportExcel")}
          </button>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="mb-6 rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">{t("finance.monthly")}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="rounded-lg border bg-card shadow-sm">
        <div className="border-b p-4">
          <h3 className="text-lg font-semibold">{t("finance.entries")}</h3>
        </div>
        {financeEntries.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">{t("finance.noEntries")}</p>
        ) : (
          <div className="divide-y">
            {financeEntries.map((e) => (
              <div key={e.id} className="flex items-center justify-between p-4">
                <div>
                  <div className="font-medium">{e.description}</div>
                  <div className="text-xs text-muted-foreground">
                    {e.date} · {e.category} · {e.source}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">Rp {e.amount.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{e.type}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
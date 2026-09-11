"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/lib/context";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function AnalyticsPage() {
  const { user, t, getReviewTrend, getSubjectMasteryData, getAttribution } = useApp();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="mb-4 text-2xl font-bold">{t("nav.analytics")}</h2>
        <p className="mb-6 text-muted-foreground">Silakan login.</p>
        <a href="/auth" className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90">
          {t("auth.login")}
        </a>
      </div>
    );
  }

  const trendData = getReviewTrend(7);
  const masteryData = getSubjectMasteryData();
  const attributionData = getAttribution();

  if (!mounted) {
    return <div className="mx-auto max-w-4xl px-4 py-8"><p>{t("common.loading")}</p></div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold">{t("nav.analytics")}</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">{t("analytics.reviewTrend")}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">{t("analytics.mastery")}</h3>
          {masteryData.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("analytics.noData")}</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={masteryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
                <YAxis dataKey="subject" type="category" tick={{ fontSize: 10 }} width={80} />
                <Tooltip />
                <Bar dataKey="pct" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">{t("analytics.attribution")}</h3>
          {attributionData.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("analytics.noData")}</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={attributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="visits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Total Reviews (7d)</div>
              <div className="text-2xl font-bold">{trendData.reduce((a, b) => a + b.count, 0)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Avg/Day</div>
              <div className="text-2xl font-bold">
                {trendData.length > 0 ? (trendData.reduce((a, b) => a + b.count, 0) / trendData.length).toFixed(1) : 0}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Subjects</div>
              <div className="text-2xl font-bold">{masteryData.length}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Top Source</div>
              <div className="text-2xl font-bold">{attributionData.length > 0 ? attributionData[0].source : "-"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
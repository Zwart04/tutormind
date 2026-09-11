"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";

export default function AuthPage() {
  const { t, loginUser, registerUser } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }
    const user = loginUser(email, password);
    if (user) {
      window.location.href = "/dashboard";
    } else {
      setError(t("auth.error"));
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password || !username || !name) {
      setError("Semua field wajib diisi.");
      return;
    }
    if (!email.includes("@")) {
      setError("Format email tidak valid.");
      return;
    }
    if (password.length < 4) {
      setError("Password minimal 4 karakter.");
      return;
    }
    const user = registerUser(email, password, username, name);
    if (user) {
      window.location.href = "/dashboard";
    } else {
      setError("Email atau username sudah terdaftar.");
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">{isRegister ? t("auth.register") : t("auth.title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("auth.subtitle")}</p>
      </div>

      <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-4">
        {isRegister && (
          <div>
            <label className="mb-1 block text-sm font-medium">{t("auth.name")}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2 focus:border-primary focus:outline-none"
              placeholder="John Doe"
            />
          </div>
        )}
        {isRegister && (
          <div>
            <label className="mb-1 block text-sm font-medium">{t("auth.username")}</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2 focus:border-primary focus:outline-none"
              placeholder="john_doe"
            />
          </div>
        )}
        <div>
          <label className="mb-1 block text-sm font-medium">{t("auth.email")}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2 focus:border-primary focus:outline-none"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{t("auth.password")}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2 focus:border-primary focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-primary/90"
        >
          {isRegister ? t("auth.register") : t("auth.login")}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <button
          onClick={() => { setIsRegister(!isRegister); setError(""); }}
          className="text-primary underline"
        >
          {isRegister ? "Sudah punya akun? Masuk" : "Belum punya akun? Daftar"}
        </button>
      </div>

      <div className="mt-6 rounded-md border bg-card p-4 text-xs text-muted-foreground">
        <p className="font-semibold">Demo Account:</p>
        <p>Email: user@example.com</p>
        <p>Password: password</p>
      </div>
    </div>
  );
}
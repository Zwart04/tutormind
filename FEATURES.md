# TutorMind - Adaptive Tutoring OS

## Fitur Utama (8 Fitur Kompleks)

### 1. Spaced Repetition SM-2 Engine
- Implementasi algoritma SuperMemo 2 asli di `lib/srs.ts`
- Setiap card: ease_factor, interval, repetitions, next_review
- Grading 0-5 (Again/Hard/Good/Easy) update schedule otomatis
- Dashboard: cards due today, streak, review queue size
- Recharts bar chart: cards reviewed per day (7 hari terakhir)

### 2. AI Essay Grader (Rubrik-based Mock)
- Input essay + pilih subject (English/Matematika/IPA/IPS)
- Output score per dimensi: content, organization, grammar, vocabulary
- Skor 0-100 per dimensi + total + feedback teks
- Mock AI deterministik: heuristic keyword + structure analysis
- Riwayat essay disimpan, bisa revisit

### 3. Real-time Collaborative Whiteboard
- Canvas drawing: pen, eraser, shapes (rect/circle/line), color picker
- BroadcastChannel API untuk sync multi-tab (same-browser mock)
- Multi-cursor: setiap user lihat cursor user lain
- Undo/redo stack (Ctrl+Z / Ctrl+Y)
- Clear board + export PNG

### 4. Adaptive Question Generator
- Template soal per subject + difficulty (easy/medium/hard)
- Soal baru di-generate tiap session (seeded random biar reproducible)
- Types: multiple choice, short answer, essay prompt
- Jawaban disimpan, bisa review nanti

### 5. Daily Review Queue (Background Worker mock)
- Hitung card "due today" berdasarkan SM-2 schedule
- Badge notifikasi di sidebar: X cards due
- Prioritas queue: card dengan interval terpendek duluan
- Selesaikan review → stats update real-time

### 6. Mastery Heatmap (Recharts)
- 52-week calendar heatmap: intensity = cards mastered per hari
- Color scale: hijau (rendah) → oranye → merah (tinggi)
- Hover tooltip: date + cards mastered + total reviews
- Toggle tampilan: 12 bulan terakhir / 52 minggu

### 7. Auto Finance Journal
- Setiap study session → entry auto-journal (tipe: auto-task)
- Setiap essay grade → entry auto-journal
- Kategori: education, auto-generated
- Monthly summary bar chart (Recharts)
- Export PDF + Excel dari journal

### 8. Bilingual Shareable Tutor Page + Auth + Settings
- Auth: localStorage-based (hf_user/hf_users), login/register
- Public `/s/[username]` bagi visitor lihat stats tutor (tanpa login)
- UTM capture → localStorage.source → Recharts attribution chart
- Bilingual EN/ID toggle di semua halaman
- Settings: theme light/dark, language, avatar

## Notification Spec
- In-app toast (shadcn Toast) untuk semua aksi: add card, grade, save essay, dll
- Wa.me share-link untuk berbagi halaman tutor
- Email mock (mailto:) untuk share
- NO WAHA tab/API/QR scan

## Attribution Spec
- Baca UTM params (`?utm_source=...&utm_medium=...`) first visit
- Simpan ke localStorage.source sekali
- Recharts bar chart di /analytics tab
- NO fbq, NO gtag, NO Meta Pixel, NO Google Ads

## Auto Finance Journal
- Setiap review session = auto-task entry "Study Session: <subject>"
- Setiap essay grade = auto-task "Essay Graded: <title>"
- Monthly summary + export PDF/Excel

## Auth
- localStorage-based (hf_user/hf_users)
- Login/Register page profesional dengan email+password validation
- Logout, protected routes (redirect ke /auth kalau belum login)

## Routes (14)
1. `GET /` — Landing page + CTA
2. `GET /auth` — Login/Register
3. `GET /dashboard` — Overview stats (cards due, streak, mastery %)
4. `GET /decks` — List decks (CRUD)
5. `POST /decks/new` — Create deck
6. `GET /decks/[id]` — Deck detail + cards list
7. `GET /review` — SRS review session
8. `GET /essay` — Essay grader
9. `GET /whiteboard` — Collaborative canvas
10. `GET /questions` — Adaptive question generator
11. `GET /analytics` — Heatmap + Recharts + attribution + finance journal
12. `GET /finance` — Auto-journal entries + export
13. `GET /settings` — Language toggle, theme, avatar
14. `GET /s/[username]` — Public tutor share page

## Stack
- Next.js 16 App Router + static export
- TypeScript
- Tailwind v4 + @tailwindcss/postcss
- shadcn/ui-style components (custom)
- Recharts 2
- jsPDF + jspdf-autotable
- xlsx
- lucide-react (NO emoji)
- localStorage auth + data persistence
- BroadcastChannel API (whiteboard sync)

## Design Rules
- No emoji di UI (kecuali logo SVG)
- Light/Dark mode toggle
- Bilingual EN/ID dictionary lengkap (`src/lib/i18n.ts`)
- Modern minimal SaaS, lucide-react icons everywhere

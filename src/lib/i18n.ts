export interface Dictionary {
  [key: string]: {
    en: string;
    id: string;
  };
}

export const t: Dictionary = {
  // Auth
  "auth.title": { en: "Sign In", id: "Masuk" },
  "auth.subtitle": { en: "Welcome back to TutorMind", id: "Selamat datang di TutorMind" },
  "auth.email": { en: "Email", id: "Email" },
  "auth.password": { en: "Password", id: "Kata sandi" },
  "auth.register": { en: "Create Account", id: "Buat Akun" },
  "auth.login": { en: "Sign In", id: "Masuk" },
  "auth.logout": { en: "Logout", id: "Keluar" },
  "auth.username": { en: "Username", id: "Nama pengguna" },
  "auth.name": { en: "Full Name", id: "Nama Lengkap" },
  "auth.error": { en: "Invalid credentials", id: "Kredensial tidak valid" },
  "auth.success": { en: "Welcome back!", id: "Selamat datang kembali!" },

  // Nav
  "nav.dashboard": { en: "Dashboard", id: "Dasbor" },
  "nav.decks": { en: "Decks", id: "Paket" },
  "nav.review": { en: "Review", id: "Tinjauan" },
  "nav.essay": { en: "Essay Grader", id: "Penilai Esai" },
  "nav.whiteboard": { en: "Whiteboard", id: "Papan Tulis" },
  "nav.questions": { en: "Questions", id: "Pertanyaan" },
  "nav.analytics": { en: "Analytics", id: "Analitik" },
  "nav.finance": { en: "Finance", id: "Keuangan" },
  "nav.settings": { en: "Settings", id: "Pengaturan" },

  // Dashboard
  "dash.title": { en: "Dashboard", id: "Dasbor" },
  "dash.cardsDue": { en: "Cards Due Today", id: "Kartu Hari Ini" },
  "dash.totalCards": { en: "Total Cards", id: "Total Kartu" },
  "dash.decksCount": { en: "Decks", id: "Paket" },
  "dash.streak": { en: "Day Streak", id: "Hari Beruntun" },
  "dash.reviewQueue": { en: "Review Queue", id: "Antrian Tinjauan" },
  "dash.recentActivity": { en: "Recent Activity", id: "Aktivitas Terbaru" },
  "dash.noActivity": { en: "No activity yet. Start a review session!", id: "Belum ada aktivitas. Mulai sesi tinjauan!" },

  // Decks
  "decks.title": { en: "My Decks", id: "Paket Saya" },
  "decks.newDeck": { en: "New Deck", id: "Paket Baru" },
  "decks.deckName": { en: "Deck Name", id: "Nama Paket" },
  "decks.subject": { en: "Subject", id: "Mata Pelajaran" },
  "decks.cards": { en: "cards", id: "kartu" },
  "decks.noDecks": { en: "No decks yet. Create one!", id: "Belum ada paket. Buat satu!" },
  "decks.deleteConfirm": { en: "Delete this deck?", id: "Hapus paket ini?" },
  "decks.deleteNote": { en: "All cards will be deleted too.", id: "Semua kartu juga akan dihapus." },

  // Cards
  "card.front": { en: "Front", id: "Depan" },
  "card.back": { en: "Back", id: "Belakang" },
  "card.newCard": { en: "Add Card", id: "Tambah Kartu" },
  "card.question": { en: "Question", id: "Pertanyaan" },
  "card.answer": { en: "Answer", id: "Jawaban" },

  // Review
  "review.title": { en: "Review Session", id: "Sesi Tinjauan" },
  "review.card": { en: "Card", id: "Kartu" },
  "review.flip": { en: "Flip", id: "Balik" },
  "review.again": { en: "Again (0)", id: "Lagi (0)" },
  "review.hard": { en: "Hard (1)", id: "Sulit (1)" },
  "review.good": { en: "Good (2)", id: "Bagus (2)" },
  "review.easy": { en: "Easy (3)", id: "Mudah (3)" },
  "review.perfect": { en: "Perfect (5)", id: "Sempurna (5)" },
  "review.good4": { en: "Good (4)", id: "Bagus (4)" },
  "review.noCards": { en: "No cards due for review. Great job!", id: "Tidak ada kartu yang harus ditinjau. Kerja bagus!" },
  "review.progress": { en: "Progress", id: "Kemajuan" },
  "review.done": { en: "Session Complete!", id: "Sesi Selesai!" },
  "review.cardsReviewed": { en: "cards reviewed", id: "kartu ditinjau" },

  // SRS
  "srs.interval": { en: "Interval", id: "Interval" },
  "srs.nextReview": { en: "Next Review", id: "Tinjauan Berikutnya" },
  "srs.easeFactor": { en: "Ease", id: "Kemudahan" },

  // Essay Grader
  "essay.title": { en: "Essay Grader", id: "Penilai Esai" },
  "essay.prompt": { en: "Essay Prompt", id: "Prompt Esai" },
  "essay.essay": { en: "Your Essay", id: "Esaimu" },
  "essay.grade": { en: "Grade Essay", id: "Nilai Esai" },
  "essay.subject": { en: "Subject", id: "Mata Pelajaran" },
  "essay.result": { en: "Grading Result", id: "Hasil Penilaian" },
  "essay.content": { en: "Content", id: "Konten" },
  "essay.organization": { en: "Organization", id: "Struktur" },
  "essay.grammar": { en: "Grammar", id: "Tata Bahasa" },
  "essay.vocabulary": { en: "Vocabulary", id: "Kosakata" },
  "essay.total": { en: "Total Score", id: "Skor Total" },
  "essay.feedback": { en: "Feedback", id: "Umpan Balik" },
  "essay.history": { en: "Essay History", id: "Riwayat Esai" },
  "essay.noHistory": { en: "No essays graded yet.", id: "Belum ada esai yang dinilai." },

  // Whiteboard
  "whiteboard.title": { en: "Collaborative Whiteboard", id: "Papan Tulis Kolaboratif" },
  "whiteboard.tools": { en: "Tools", id: "Alat" },
  "whiteboard.pen": { en: "Pen", id: "Pen" },
  "whiteboard.eraser": { en: "Eraser", id: "Penghapus" },
  "whiteboard.rect": { en: "Rectangle", id: "Persegi" },
  "whiteboard.circle": { en: "Circle", id: "Lingkaran" },
  "whiteboard.line": { en: "Line", id: "Garis" },
  "whiteboard.undo": { en: "Undo", id: "Kembali" },
  "whiteboard.redo": { en: "Redo", id: "Ulangi" },
  "whiteboard.clear": { en: "Clear", id: "Bersihkan" },
  "whiteboard.export": { en: "Export PNG", id: "Ekspor PNG" },
  "whiteboard.color": { en: "Color", id: "Warna" },
  "whiteboard.size": { en: "Size", id: "Ukuran" },

  // Questions
  "questions.title": { en: "Adaptive Questions", id: "Pertanyaan Adaptif" },
  "questions.difficulty": { en: "Difficulty", id: "Tingkat Kesulitan" },
  "questions.generate": { en: "Generate", id: "Hasilkan" },
  "questions.ask": { en: "Ask", id: "Tanya" },
  "questions.myAnswers": { en: "My Answers", id: "Jawaban Saya" },
  "questions.noQuestions": { en: "No questions generated yet.", id: "Belum ada pertanyaan yang dihasilkan." },

  // Analytics
  "analytics.title": { en: "Analytics", id: "Analitik" },
  "analytics.reviewTrend": { en: "Review Trend (7 days)", id: "Tren Tinjauan (7 hari)" },
  "analytics.mastery": { en: "Mastery by Subject", id: "Penguasaan per Mata Pelajaran" },
  "analytics.heatmapLabel": { en: "Study Activity (last 12 weeks)", id: "Aktivitas Belajar (12 minggu terakhir)" },
  "analytics.attribution": { en: "Traffic Sources (Attribution)", id: "Sumber Traffic (Atribusi)" },
  "analytics.source": { en: "Source", id: "Sumber" },
  "analytics.visits": { en: "Visits", id: "Kunjungan" },
  "analytics.noData": { en: "No analytics data yet.", id: "Belum ada data analitik." },

  // Finance
  "finance.title": { en: "Auto Finance Journal", id: "Catatan Keuangan Otomatis" },
  "finance.entries": { en: "Entries", id: "Entri" },
  "finance.amount": { en: "Amount", id: "Jumlah" },
  "finance.category": { en: "Category", id: "Kategori" },
  "finance.source": { en: "Source", id: "Sumber" },
  "finance.date": { en: "Date", id: "Tanggal" },
  "finance.description": { en: "Description", id: "Deskripsi" },
  "finance.monthly": { en: "Monthly Summary", id: "Ringkasan Bulanan" },
  "finance.exportPdf": { en: "Export PDF", id: "Ekspor PDF" },
  "finance.exportExcel": { en: "Export Excel", id: "Ekspor Excel" },
  "finance.noEntries": { en: "No finance entries yet.", id: "Belum ada entri keuangan." },

  // Settings
  "settings.title": { en: "Settings", id: "Pengaturan" },
  "settings.language": { en: "Language", id: "Bahasa" },
  "settings.theme": { en: "Theme", id: "Tema" },
  "settings.light": { en: "Light", id: "Terang" },
  "settings.dark": { en: "Dark", id: "Gelap" },
  "settings.english": { en: "English", id: "Inggris" },
  "settings.indonesian": { en: "Bahasa Indonesia", id: "Bahasa Indonesia" },
  "settings.avatar": { en: "Avatar URL", id: "URL Avatar" },

  // Share / Public
  "share.title": { en: "Share Tutor Page", id: "Bagikan Halaman Tutor" },
  "share.link": { en: "Share Link", id: "Tautan Bagikan" },
  "share.copy": { en: "Copy Link", id: "Salin Tautan" },
  "share.wa": { en: "Share via WhatsApp", id: "Bagikan via WhatsApp" },
  "share.copied": { en: "Link copied!", id: "Tautan disalin!" },
  "public.title": { en: "Tutor Profile", id: "Profil Tutor" },
  "public.studying": { en: "Learning with TutorMind", id: "Belajar dengan TutorMind" },

  // Common
  "common.save": { en: "Save", id: "Simpan" },
  "common.cancel": { en: "Cancel", id: "Batal" },
  "common.delete": { en: "Delete", id: "Hapus" },
  "common.edit": { en: "Edit", id: "Edit" },
  "common.confirm": { en: "Confirm", id: "Konfirmasi" },
  "common.loading": { en: "Loading...", id: "Memuat..." },
  "common.error": { en: "Something went wrong", id: "Terjadi kesalahan" },
  "common.logout": { en: "Logout", id: "Keluar" },
  "common.search": { en: "Search...", id: "Cari..." },
  "common.filter": { en: "Filter", id: "Saring" },
  "common.all": { en: "All", id: "Semua" },
  "common.today": { en: "Today", id: "Hari Ini" },
  "common.last7": { en: "Last 7 days", id: "7 hari terakhir" },
  "common.last30": { en: "Last 30 days", id: "30 hari terakhir" },
  "common.thisMonth": { en: "This Month", id: "Bulan Ini" },
  "common.lastMonth": { en: "Last Month", id: "Bulan Lalu" },
};

export type Lang = "en" | "id";

export function translate(key: string, lang: Lang): string {
  const entry = t[key];
  if (!entry) return key;
  return entry[lang] ?? entry.en;
}

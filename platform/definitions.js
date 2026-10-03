export const PRODUCTS = {
  "tutormind": {
    "accent": "#779cf0",
    "currency": "IDR",
    "tagline": "Turn curiosity into progress.",
    "modules": [
      {
        "key": "courses",
        "label": "Kursus",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "description",
            "label": "Deskripsi",
            "type": "textarea"
          },
          {
            "key": "level",
            "label": "Tingkat",
            "type": "text"
          }
        ],
        "statuses": [
          "draft",
          "published",
          "archived"
        ]
      },
      {
        "key": "lessons",
        "label": "Materi",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "course_id",
            "label": "Kursus",
            "type": "ref",
            "ref": "courses",
            "required": true
          },
          {
            "key": "position",
            "label": "Urutan",
            "type": "number",
            "min": 0
          },
          {
            "key": "body",
            "label": "Materi",
            "type": "textarea",
            "required": true
          },
          {
            "key": "duration",
            "label": "Estimasi menit",
            "type": "number",
            "min": 1
          }
        ],
        "statuses": [
          "active",
          "archived"
        ]
      },
      {
        "key": "enrollments",
        "label": "Pendaftaran belajar",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "course_id",
            "label": "Kursus",
            "type": "ref",
            "ref": "courses",
            "required": true
          },
          {
            "key": "learner",
            "label": "Nama pelajar",
            "type": "text",
            "required": true
          },
          {
            "key": "date",
            "label": "Tanggal",
            "type": "date",
            "required": true
          }
        ],
        "statuses": [
          "active",
          "completed"
        ]
      },
      {
        "key": "study_sessions",
        "label": "Sesi belajar",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "course_id",
            "label": "Kursus",
            "type": "ref",
            "ref": "courses",
            "required": true
          },
          {
            "key": "lesson_id",
            "label": "Materi",
            "type": "ref",
            "ref": "lessons",
            "required": false
          },
          {
            "key": "date",
            "label": "Tanggal",
            "type": "date",
            "required": true
          },
          {
            "key": "minutes",
            "label": "Menit belajar",
            "type": "number",
            "min": 1
          },
          {
            "key": "notes",
            "label": "Catatan",
            "type": "textarea"
          }
        ],
        "statuses": [
          "planned",
          "done"
        ]
      },
      {
        "key": "flashcards",
        "label": "Flashcard",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "course_id",
            "label": "Kursus",
            "type": "ref",
            "ref": "courses",
            "required": true
          },
          {
            "key": "question",
            "label": "Pertanyaan",
            "type": "textarea",
            "required": true
          },
          {
            "key": "answer",
            "label": "Jawaban",
            "type": "textarea",
            "required": true
          },
          {
            "key": "next_review",
            "label": "Review berikutnya",
            "type": "date"
          }
        ],
        "statuses": [
          "active",
          "archived"
        ]
      },
      {
        "key": "quizzes",
        "label": "Kuis",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "course_id",
            "label": "Kursus",
            "type": "ref",
            "ref": "courses",
            "required": true
          },
          {
            "key": "questions",
            "label": "Pertanyaan & kunci",
            "type": "quiz",
            "required": true
          }
        ],
        "statuses": [
          "active",
          "archived"
        ]
      },
      {
        "key": "attempts",
        "label": "Hasil latihan",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "quiz_id",
            "label": "Kuis",
            "type": "ref",
            "ref": "quizzes",
            "required": true
          },
          {
            "key": "answers",
            "label": "Jawaban",
            "type": "json"
          },
          {
            "key": "score",
            "label": "Nilai",
            "type": "number",
            "min": 0,
            "max": 100
          },
          {
            "key": "date",
            "label": "Tanggal",
            "type": "date",
            "required": true
          }
        ],
        "statuses": [
          "submitted"
        ]
      },
      {
        "key": "assignments",
        "label": "Tugas",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "course_id",
            "label": "Kursus",
            "type": "ref",
            "ref": "courses",
            "required": true
          },
          {
            "key": "body",
            "label": "Instruksi",
            "type": "textarea"
          },
          {
            "key": "deadline",
            "label": "Tenggat",
            "type": "date"
          }
        ],
        "statuses": [
          "todo",
          "submitted",
          "graded"
        ]
      },
      {
        "key": "notes",
        "label": "Catatan belajar",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "course_id",
            "label": "Kursus",
            "type": "ref",
            "ref": "courses",
            "required": false
          },
          {
            "key": "body",
            "label": "Catatan",
            "type": "textarea"
          }
        ],
        "statuses": [
          "active",
          "archived"
        ]
      },
      {
        "key": "learn",
        "label": "Ruang belajar",
        "tool": "learning",
        "fields": []
      },
      {
        "key": "assistant",
        "label": "Tutor AI",
        "tool": "ai",
        "fields": []
      },
      {
        "key": "reports",
        "label": "Laporan",
        "tool": "reports",
        "fields": [],
        "statuses": []
      }
    ],
    "id": "tutormind",
    "name": "TutorMind Academy",
    "purpose": "Platform belajar dan pembuatan kursus dengan materi, latihan, penilaian dan progres nyata.",
    "sources": [
      "tutormind",
      "courseforge",
      "inventa"
    ],
    "workflow": "Buat kursus → materi → belajar → latihan flashcard/kuis → kirim jawaban → penilaian dari kunci jawaban → progres; bantuan AI dipanggil dari backend."
  }
};

// Essay Grader - Mock AI (deterministic heuristic)
export interface EssayScore {
  content: number;     // 0-100
  organization: number; // 0-100
  grammar: number;     // 0-100
  vocabulary: number;  // 0-100
  total: number;
  feedback: string;
}

const SUBJECT_CONFIG: Record<
  string,
  {
    keywords: string[];
    structureWords: string[];
    vocabularyWords: string[];
  }
> = {
  english: {
    keywords: ["the", "a", "an", "is", "are", "was", "were", "have", "has", "had", "do", "does", "did", "will", "would", "can", "could", "should", "may", "might", "must"],
    structureWords: ["first", "second", "third", "then", "next", "finally", "however", "therefore", "moreover", "furthermore", "in conclusion", "in summary", "for example", "on the other hand"],
    vocabularyWords: ["significant", "substantial", "approximately", "consequently", "nevertheless", "notwithstanding", "furthermore", "moreover", "regarding", "concerning", "demonstrate", "illustrate", "emphasize"],
  },
  matematika: {
    keywords: ["calculate", "solve", "find", "determine", "prove", "show", "given", "assume", "let", "therefore", "equals", "equation", "formula", "substitute"],
    structureWords: ["first", "substitute", "simplify", "factor", "expand", "cancel", "rewrite", "conclude"],
    vocabularyWords: ["integral", "derivative", "function", "variable", "constant", "coefficient", "equation", "inequality", "theorem", "proof", "approximately", "exactly"],
  },
  ipa: {
    keywords: ["experiment", "observe", "measure", "analyze", "hypothesis", "result", "conclusion", "data", "theory", "law", "effect", "cause", "process", "system"],
    structureWords: ["first", "then", "next", "observe", "record", "analyze", "compare", "conclude"],
    vocabularyWords: ["photosynthesis", "respiration", "cellular", "molecular", "atomic", "chemical", "reaction", "equilibrium", "thermodynamics", "kinetic", "potential", "frequency", "wavelength"],
  },
  ips: {
    keywords: ["society", "economy", "political", "culture", "history", "population", "development", "change", "impact", "factor", "trend", "period", "region"],
    structureWords: ["first", "second", "furthermore", "consequently", "in contrast", "similarly", "for instance", "in conclusion"],
    vocabularyWords: ["demographic", "socioeconomic", "globalization", "industrialization", "urbanization", "modernization", "colonialism", "imperialism", "revolution", "reform", "migration", "inequality"],
  },
};

function scoreDimension(text: string, config: { keywords: string[]; structureWords: string[]; vocabularyWords: string[] }): { score: number; feedback: string } {
  const words = text.toLowerCase().split(/[\s\n.,!?;:]+/).filter(Boolean);
  const wordCount = words.length;

  const keywordCount = config.keywords.filter((k) => words.includes(k.toLowerCase())).length;
  const structureCount = config.structureWords.filter((s) => text.toLowerCase().includes(s.toLowerCase())).length;
  const vocabCount = config.vocabularyWords.filter((v) => words.includes(v.toLowerCase())).length;

  // Content score: keyword coverage + length
  let contentScore = Math.min(100, (keywordCount / Math.max(1, config.keywords.length)) * 60 + Math.min(40, (wordCount / 50) * 40));
  let orgScore = Math.min(100, structureCount * 15 + Math.min(40, wordCount / 100) * 60);
  let grammarScore = Math.min(100, wordCount > 20 ? 75 : wordCount > 50 ? 85 : wordCount > 100 ? 90 : 60);
  let vocabScore = Math.min(100, vocabCount * 8 + Math.min(40, wordCount / 80) * 30);

  // Penalize very short essays
  if (wordCount < 20) {
    contentScore *= 0.5;
    orgScore *= 0.5;
    grammarScore *= 0.7;
    vocabScore *= 0.5;
  }

  contentScore = Math.max(10, Math.min(100, contentScore));
  orgScore = Math.max(10, Math.min(100, orgScore));
  grammarScore = Math.max(10, Math.min(100, grammarScore));
  vocabScore = Math.max(10, Math.min(100, vocabScore));

  const feedbacks: string[] = [];
  if (wordCount < 20) feedbacks.push("Essay terlalu pendek. Tambahkan lebih banyak penjelasan dan contoh.");
  if (keywordCount < 3) feedbacks.push("Gunakan lebih banyak kata kunci yang relevan dengan mata pelajaran.");
  if (structureCount < 2) feedbacks.push("Perkuat struktur tulisan dengan kata sambung yang jelas.");
  if (vocabScore < 40) feedbacks.push("Perlu variasi kosakata yang lebih luas.");
  if (grammarScore >= 70) feedbacks.push("Tata bahasa cukup baik.");
  if (contentScore >= 70) feedbacks.push("Konten esai mencakup topik dengan baik.");
  if (orgScore >= 70) feedbacks.push("Struktur tulisan sudah terorganisir dengan baik.");

  if (feedbacks.length === 0) feedbacks.push("Esai cukup baik. Pertimbangkan untuk menambahkan lebih banyak contoh konkret.");

  return {
    score: Math.round((contentScore + orgScore + grammarScore + vocabScore) / 4),
    feedback: feedbacks.join(" "),
  };
}

export function gradeEssay(essay: string, subject: string = "english"): EssayScore {
  const config = SUBJECT_CONFIG[subject] ?? SUBJECT_CONFIG.english;

  const contentRes = scoreDimension(essay, { keywords: config.keywords, structureWords: config.structureWords, vocabularyWords: config.vocabularyWords });
  const orgRes = scoreDimension(essay, { keywords: config.structureWords, structureWords: config.structureWords, vocabularyWords: [] });
  const grammarRes = { score: Math.round(contentRes.score * 0.9 + 10), feedback: "" };
  const vocabRes = { score: Math.round(contentRes.score * 0.85 + 15), feedback: "" };

  const total = Math.round((contentRes.score + orgRes.score + grammarRes.score + vocabRes.score) / 4);

  let level = "Perlu perbaikan";
  let color = "#ef4444";
  if (total >= 80) { level = "Excellent"; color = "#22c55e"; }
  else if (total >= 60) { level = "Good"; color = "#eab308"; }
  else if (total >= 40) { level = "Fair"; color = "#f97316"; }

  return {
    content: contentRes.score,
    organization: orgRes.score,
    grammar: grammarRes.score,
    vocabulary: vocabRes.score,
    total,
    feedback: `Level: ${level}. ${contentRes.feedback}`,
  };
}

export const ESSAY_PROMPTS: Record<string, string[]> = {
  english: [
    "Write an essay about the importance of learning English in the modern world.",
    "Describe a memorable experience from your school days and what you learned from it.",
    "What are the advantages and disadvantages of social media? Discuss.",
  ],
  matematika: [
    "Explain how calculus is used in real-world applications.",
    "Describe the importance of geometry in architecture and engineering.",
    "How does probability help us make decisions in everyday life?",
  ],
  ipa: [
    "Explain the process of photosynthesis and its importance for life on Earth.",
    "Describe the water cycle and its role in the ecosystem.",
    "What is climate change and how does it affect biodiversity?",
  ],
  ips: [
    "Discuss the impact of globalization on local cultures.",
    "Explain how the industrial revolution changed society.",
    "What are the main factors that influence economic development?",
  ],
};

export function getRandomPrompt(subject: string): string {
  const prompts = ESSAY_PROMPTS[subject] ?? ESSAY_PROMPTS.english;
  return prompts[Math.floor(Math.random() * prompts.length)];
}

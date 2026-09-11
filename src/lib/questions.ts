// Question Generator
export interface GeneratedQuestion {
  id: string;
  subject: string;
  difficulty: "easy" | "medium" | "hard";
  type: "multiple_choice" | "short_answer" | "essay_prompt";
  question: string;
  options?: string[];
  correctAnswer?: string;
  userAnswer?: string;
  createdAt: number;
}

const QUESTION_TEMPLATES: Record<string, Record<string, { question: string; options: string[]; answer: string }[]>> = {
  english: {
    easy: [
      { question: "What is the past tense of 'go'?", options: ["goed", "went", "gone", "going"], answer: "went" },
      { question: "Choose the correct sentence: ", options: ["He go to school", "He goes to school", "He going to school", "He went school"], answer: "He goes to school" },
      { question: "What is a synonym of 'happy'?", options: ["sad", "angry", "joyful", "tired"], answer: "joyful" },
    ],
    medium: [
      { question: "Which sentence uses the conditional correctly?", options: ["If I will go, I see him", "If I go, I will see him", "If I went, I see him", "If I go, I see him"], answer: "If I go, I will see him" },
      { question: "Choose the correct preposition: 'She is interested ___ learning.'", options: ["on", "at", "in", "for"], answer: "in" },
      { question: "What does 'ubiquitous' mean?", options: ["rare", "found everywhere", "expensive", "heavy"], answer: "found everywhere" },
    ],
    hard: [
      { question: "Identify the grammatically correct sentence:", options: ["Having finished his work, the TV was turned on by John.", "Having finished his work, John turned on the TV.", "Having finished his work, turned on the TV by John.", "Having finished his work, John was turned on the TV."], answer: "Having finished his work, John turned on the TV." },
      { question: "Which sentence uses the subjunctive mood?", options: ["I wish I was richer.", "I wish I were richer.", "I wish I am richer.", "I wish I be richer."], answer: "I wish I were richer." },
      { question: "What is the meaning of 'ephemeral'?", options: ["eternal", "short-lived", "glorious", "mysterious"], answer: "short-lived" },
    ],
  },
  matematika: {
    easy: [
      { question: "What is 15 + 27?", options: ["32", "42", "45", "35"], answer: "42" },
      { question: "What is 8 x 7?", options: ["54", "56", "48", "64"], answer: "56" },
      { question: "What is 144 / 12?", options: ["10", "11", "12", "13"], answer: "12" },
    ],
    medium: [
      { question: "Solve for x: 2x + 5 = 17", options: ["x = 5", "x = 6", "x = 7", "x = 8"], answer: "x = 6" },
      { question: "What is the area of a rectangle with length 8 and width 5?", options: ["13", "30", "40", "26"], answer: "40" },
      { question: "What is 15% of 200?", options: ["20", "25", "30", "35"], answer: "30" },
    ],
    hard: [
      { question: "Solve: 3x^2 - 12x + 9 = 0", options: ["x = 1 or x = 3", "x = -1 or x = 3", "x = 1 or x = -3", "x = -1 or x = -3"], answer: "x = 1 or x = 3" },
      { question: "What is the derivative of x^3?", options: ["x^2", "3x", "3x^2", "x^3"], answer: "3x^2" },
      { question: "If sin(theta) = 1/2, what is theta (in degrees)?", options: ["30 or 150", "45 or 135", "60 or 120", "90"], answer: "30 or 150" },
    ],
  },
  ipa: {
    easy: [
      { question: "What planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
      { question: "What is H2O commonly known as?", options: ["Salt", "Water", "Acid", "Oxygen"], answer: "Water" },
      { question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" },
    ],
    medium: [
      { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"], answer: "Mitochondria" },
      { question: "What is Newton's Second Law?", options: ["F = ma", "F = mv", "F = mg", "E = mc^2"], answer: "F = ma" },
      { question: "What type of bond shares electrons?", options: ["Ionic", "Covalent", "Metallic", "Hydrogen"], answer: "Covalent" },
    ],
    hard: [
      { question: "What is the half-life of Carbon-14?", options: ["5730 years", "1000 years", "10000 years", "100 years"], answer: "5730 years" },
      { question: "Which law states that entropy of an isolated system always increases?", options: ["First Law of Thermodynamics", "Second Law of Thermodynamics", "Third Law of Thermodynamics", "Law of Conservation of Energy"], answer: "Second Law of Thermodynamics" },
      { question: "What is the Hardy-Weinberg equilibrium used for?", options: ["Measuring mutation rates", "Predicting allele frequencies", "Calculating evolutionary fitness", "Determining genetic drift"], answer: "Predicting allele frequencies" },
    ],
  },
  ips: {
    easy: [
      { question: "What is the capital of Indonesia?", options: ["Surabaya", "Jakarta", "Bandung", "Medan"], answer: "Jakarta" },
      { question: "Which century did World War II occur?", options: ["18th", "19th", "20th", "21st"], answer: "20th" },
      { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
    ],
    medium: [
      { question: "What economic system is based on private ownership?", options: ["Socialism", "Capitalism", "Communism", "Feudalism"], answer: "Capitalism" },
      { question: "Who wrote 'The Communist Manifesto'?", options: ["Karl Marx and Friedrich Engels", "John Locke", "Adam Smith", "Thomas Hobbes"], answer: "Karl Marx and Friedrich Engels" },
      { question: "What was the main cause of World War I?", options: ["Assassination of Archduke Franz Ferdinand", "German invasion of Poland", "Attack on Pearl Harbor", "Fall of Berlin Wall"], answer: "Assassination of Archduke Franz Ferdinand" },
    ],
    hard: [
      { question: "What concept did Foucault introduce in 'Discipline and Punish'?", options: ["Cultural hegemony", "Panopticon", "Sociological imagination", "Rational choice theory"], answer: "Panopticon" },
      { question: "What is 'Manifest Destiny' associated with?", options: ["European colonialism in Africa", "American westward expansion", "Japanese imperialism", "Russian Revolution"], answer: "American westward expansion" },
      { question: "Which sociologist proposed the concept of 'bureaucracy' as an ideal type?", options: ["Max Weber", "Emile Durkheim", "Karl Marx", "Herbert Spencer"], answer: "Max Weber" },
    ],
  },
};

export function generateQuestion(subject: string, difficulty: "easy" | "medium" | "hard"): GeneratedQuestion {
  const templates = QUESTION_TEMPLATES[subject]?.[difficulty] ?? QUESTION_TEMPLATES.english.easy;
  const template = templates[Math.floor(Math.random() * templates.length)];

  return {
    id: crypto.randomUUID(),
    subject,
    difficulty,
    type: "multiple_choice",
    question: template.question,
    options: template.options,
    correctAnswer: template.answer,
    createdAt: Date.now(),
  };
}

export function generateRandomQuestion(): GeneratedQuestion {
  const subjects: (keyof typeof QUESTION_TEMPLATES)[] = ["english", "matematika", "ipa", "ips"];
  const difficulties: ("easy" | "medium" | "hard")[] = ["easy", "medium", "hard"];
  const subject = subjects[Math.floor(Math.random() * subjects.length)];
  const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
  return generateQuestion(subject, difficulty);
}

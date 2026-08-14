export type FormulaTier = "important" | "basic" | "advanced";

export interface Formula {
  name: string;
  formula: string;
  explanation: string;
  tier: FormulaTier;
}

export interface Definition {
  term: string;
  explanation: string;
}

export interface Chapter {
  slug: string;
  number: number;
  title: string;
  definitions?: Definition[];
  formulas: Formula[];
}

export interface Subject {
  slug: "physics" | "chemistry" | "mathematics" | "computer-science";
  name: string;
  icon: string;
  blurb: string;
  chapters: Chapter[];
}

export const TIERS: { tier: FormulaTier; label: string; icon: string }[] = [
  { tier: "important", label: "Important Formula", icon: "⭐" },
  { tier: "basic", label: "Basic Formulas", icon: "📖" },
  { tier: "advanced", label: "Advanced Formulas", icon: "⚡" },
];

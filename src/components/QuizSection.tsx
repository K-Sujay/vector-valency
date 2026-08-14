import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";
import type { Chapter, Subject } from "@/data";
import { QUESTION_BANK } from "@/data/questionBank";

type Difficulty = "basic" | "easyPlus" | "medium" | "hard" | "challenge";
type QuestionType = "mcq" | "short";

type QuizQuestion = {
  id: string;
  prompt: string;
  type: QuestionType;
  options?: string[];
  correct: string;
  explanation: string;
  marks: number;
  topic: string;
  kind: "concept" | "formula" | "application" | "case" | "definition" | "exam";
};

type QuizSet = {
  id: number;
  title: string;
  subtitle: string;
  difficulty: Difficulty;
  marksPerQuestion: number;
  questions: QuizQuestion[];
};

const SETS: Omit<QuizSet, "questions">[] = [
  { id: 1, title: "Set 1 · Basic", subtitle: "Core recall and fundamentals", difficulty: "basic", marksPerQuestion: 1 },
  { id: 2, title: "Set 2 · Easy+", subtitle: "One step beyond the basics", difficulty: "easyPlus", marksPerQuestion: 1 },
  { id: 3, title: "Set 3 · Medium", subtitle: "Apply concepts and connect ideas", difficulty: "medium", marksPerQuestion: 2 },
  { id: 4, title: "Set 4 · Hard", subtitle: "Multi-step thinking and exam traps", difficulty: "hard", marksPerQuestion: 3 },
  { id: 5, title: "Set 5 · Exam Challenge", subtitle: "Teacher-style 3–5 mark challenge", difficulty: "challenge", marksPerQuestion: 5 },
];

const TARGET_QUESTIONS = 20;

function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

function shuffle<T>(items: T[], seed: number): T[] {
  const result = [...items];
  let x = seed || 1;
  for (let i = result.length - 1; i > 0; i--) {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    const j = Math.abs(x) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function marksFor(difficulty: Difficulty) {
  return difficulty === "basic" || difficulty === "easyPlus" ? 1 : difficulty === "medium" ? 2 : difficulty === "hard" ? 3 : 5;
}

function makeDefinitionQuestions(chapter: Chapter, difficulty: Difficulty, count: number, seed: number): QuizQuestion[] {
  const definitions = chapter.definitions ?? [];
  if (definitions.length < 2) return [];
  const marks = marksFor(difficulty);
  const selected = shuffle(definitions, seed).slice(0, Math.min(count, definitions.length));
  return selected.map((correct, index) => {
    const distractors = shuffle(definitions.filter((d) => d.term !== correct.term), seed + index * 37).slice(0, 3);
    return {
      id: `def-${difficulty}-${index}-${correct.term}`,
      prompt: difficulty === "basic"
        ? `Which term matches this definition?\n\n${correct.explanation}`
        : `Which concept is best described by the following?\n\n${correct.explanation}`,
      type: "mcq",
      options: shuffle([correct.term, ...distractors.map((d) => d.term)], seed + index * 53),
      correct: correct.term,
      explanation: `${correct.term}: ${correct.explanation}`,
      marks,
      topic: correct.term,
      kind: "definition",
    };
  });
}

function makeFormulaQuestions(chapter: Chapter, difficulty: Difficulty, count: number, seed: number): QuizQuestion[] {
  const formulas = chapter.formulas ?? [];
  if (formulas.length < 2) return [];
  const marks = marksFor(difficulty);
  const selected = shuffle(formulas, seed).slice(0, Math.min(count, formulas.length));
  return selected.map((correct, index) => {
    const distractors = shuffle(formulas.filter((f) => f.name !== correct.name), seed + 101 + index * 41).slice(0, 3);
    return {
      id: `formula-${difficulty}-${index}-${correct.name}`,
      prompt: `Which expression correctly represents ${correct.name}?`,
      type: "mcq",
      options: shuffle([correct.formula, ...distractors.map((f) => f.formula)], seed + 151 + index * 29),
      correct: correct.formula,
      explanation: `${correct.name}: ${correct.formula}. ${correct.explanation}`,
      marks,
      topic: correct.name,
      kind: "formula",
    };
  });
}

function makeConceptQuestions(chapter: Chapter, difficulty: Difficulty, count: number, seed: number): QuizQuestion[] {
  const definitions = chapter.definitions ?? [];
  const formulas = chapter.formulas ?? [];
  if (!definitions.length || !formulas.length) return [];
  const marks = marksFor(difficulty);
  const concepts = shuffle(definitions, seed).slice(0, Math.min(count, definitions.length));
  return concepts.map((d, index) => {
    const related = formulas[index % formulas.length];
    const distractors = shuffle(formulas.filter((f) => f.name !== related.name), seed + 701 + index * 17).slice(0, 3);
    return {
      id: `concept-${difficulty}-${index}-${d.term}`,
      prompt: `Which formula/relation is most directly associated with the concept “${d.term}” in this chapter?`,
      type: "mcq",
      options: shuffle([related.name, ...distractors.map((f) => f.name)], seed + 901 + index),
      correct: related.name,
      explanation: `${related.name}: ${related.formula}. ${related.explanation}`,
      marks,
      topic: d.term,
      kind: "concept",
    };
  });
}

function makeTrueFalseQuestions(chapter: Chapter, difficulty: Difficulty, count: number, seed: number): QuizQuestion[] {
  const definitions = chapter.definitions ?? [];
  if (!definitions.length) return [];
  const marks = marksFor(difficulty);
  const selected = shuffle(definitions, seed).slice(0, Math.min(count, definitions.length));
  return selected.map((d, index) => {
    const truth = index % 2 === 0;
    const prompt = truth
      ? `True or False: The following statement correctly describes “${d.term}”.\n\n${d.explanation}`
      : `True or False: “${d.term}” means that ${d.explanation.replace(/[.!?]+$/, "")} is unrelated to the concept.`;
    return {
      id: `tf-${difficulty}-${index}-${d.term}`,
      prompt,
      type: "mcq",
      options: ["True", "False"],
      correct: truth ? "True" : "False",
      explanation: truth ? `${d.term}: ${d.explanation}` : `The statement is false. ${d.term}: ${d.explanation}`,
      marks,
      topic: d.term,
      kind: "concept",
    };
  });
}

function makeShortQuestions(chapter: Chapter, difficulty: Difficulty, count: number, seed: number): QuizQuestion[] {
  const definitions = chapter.definitions ?? [];
  if (!definitions.length) return [];
  const marks = marksFor(difficulty);
  const selected = shuffle(definitions, seed).slice(0, Math.min(count, definitions.length));
  return selected.map((d, index) => ({
    id: `short-${difficulty}-${index}-${d.term}`,
    prompt: `Enter the key term/concept that matches this description:\n\n${d.explanation}`,
    type: "short",
    correct: d.term,
    explanation: `${d.term}: ${d.explanation}`,
    marks,
    topic: d.term,
    kind: "definition",
  }));
}

function makeApplicationQuestions(chapter: Chapter, subject: Subject["slug"], difficulty: Difficulty, count: number, seed: number): QuizQuestion[] {
  const formulas = chapter.formulas ?? [];
  if (!formulas.length) return [];
  const marks = marksFor(difficulty);
  const selected = shuffle(formulas, seed).slice(0, Math.min(count, formulas.length));

  return selected.map((f, index) => {
    const distractors = shuffle(formulas.filter((x) => x.name !== f.name), seed + 1200 + index * 31).slice(0, 3);
    const subjectHint = subject === "physics"
      ? "a numerical or physical situation"
      : subject === "chemistry"
        ? "a reaction, property, trend or numerical situation"
        : subject === "mathematics"
          ? "a problem-solving situation"
          : "a programming, database or computer-science situation";

    return {
      id: `application-${difficulty}-${index}-${f.name}`,
      prompt: `A ${subjectHint} requires the relation “${f.name}”. Which option is the correct starting relation before substitution or further reasoning?`,
      type: "mcq",
      options: shuffle([f.formula, ...distractors.map((x) => x.formula)], seed + 1400 + index),
      correct: f.formula,
      explanation: `Start with ${f.name}: ${f.formula}. ${f.explanation}`,
      marks,
      topic: f.name,
      kind: "application",
    };
  });
}

function makeCaseQuestions(chapter: Chapter, subject: Subject["slug"], difficulty: Difficulty, count: number, seed: number): QuizQuestion[] {
  const definitions = chapter.definitions ?? [];
  const formulas = chapter.formulas ?? [];
  if (!definitions.length || !formulas.length) return [];
  const marks = marksFor(difficulty);
  const selected = shuffle(definitions, seed).slice(0, Math.min(count, definitions.length));

  return selected.map((d, index) => {
    const related = formulas[index % formulas.length];
    const distractors = shuffle(formulas.filter((x) => x.name !== related.name), seed + 1700 + index * 23).slice(0, 3);
    const context = subject === "physics"
      ? `A student faces an unfamiliar physical situation involving “${d.term}”.`
      : subject === "chemistry"
        ? `A student is analysing an unfamiliar chemistry situation involving “${d.term}”.`
        : subject === "mathematics"
          ? `A student encounters an unfamiliar mathematics problem involving “${d.term}”.`
          : `A student is analysing an unfamiliar computer-science problem involving “${d.term}”.`;

    return {
      id: `case-${difficulty}-${index}-${d.term}`,
      prompt: `${context}\n\nWhich relation/concept should be considered first?`,
      type: "mcq",
      options: shuffle([related.name, ...distractors.map((x) => x.name)], seed + 1900 + index),
      correct: related.name,
      explanation: `Identify the governing idea first: ${related.name}. ${related.formula}. ${related.explanation}`,
      marks,
      topic: d.term,
      kind: "case",
    };
  });
}

function makeCuratedQuestions(chapter: Chapter, subject: Subject["slug"], set: Omit<QuizSet, "questions">): QuizQuestion[] {
  return QUESTION_BANK
    .filter((q) => q.chapterSlug === chapter.slug && q.subject === subject && q.set === set.id)
    .map((q) => ({ ...q, kind: "exam" as const }));
}

function buildSet(chapter: Chapter, subject: Subject["slug"], set: Omit<QuizSet, "questions">): QuizSet {
  const seed = hash(`${subject}-${chapter.slug}-${set.id}`);
  let questions: QuizQuestion[] = makeCuratedQuestions(chapter, subject, set);

  if (set.difficulty === "basic") {
    questions = [
      ...makeDefinitionQuestions(chapter, set.difficulty, 7, seed),
      ...makeFormulaQuestions(chapter, set.difficulty, 7, seed + 17),
      ...makeTrueFalseQuestions(chapter, set.difficulty, 6, seed + 31),
      ...makeShortQuestions(chapter, set.difficulty, 5, seed + 47),
    ];
  } else if (set.difficulty === "easyPlus") {
    questions = [
      ...makeDefinitionQuestions(chapter, set.difficulty, 4, seed),
      ...makeFormulaQuestions(chapter, set.difficulty, 5, seed + 17),
      ...makeConceptQuestions(chapter, set.difficulty, 5, seed + 31),
      ...makeApplicationQuestions(chapter, subject, set.difficulty, 5, seed + 47),
      ...makeShortQuestions(chapter, set.difficulty, 4, seed + 61),
    ];
  } else if (set.difficulty === "medium") {
    questions = [
      ...makeConceptQuestions(chapter, set.difficulty, 5, seed),
      ...makeApplicationQuestions(chapter, subject, set.difficulty, 7, seed + 17),
      ...makeTrueFalseQuestions(chapter, set.difficulty, 4, seed + 31),
      ...makeCaseQuestions(chapter, subject, set.difficulty, 5, seed + 47),
      ...makeShortQuestions(chapter, set.difficulty, 4, seed + 61),
    ];
  } else if (set.difficulty === "hard") {
    questions = [
      ...makeApplicationQuestions(chapter, subject, set.difficulty, 8, seed),
      ...makeCaseQuestions(chapter, subject, set.difficulty, 7, seed + 17),
      ...makeConceptQuestions(chapter, set.difficulty, 4, seed + 31),
      ...makeShortQuestions(chapter, set.difficulty, 6, seed + 47),
    ];
  } else {
    questions = [
      ...makeCaseQuestions(chapter, subject, set.difficulty, 10, seed),
      ...makeApplicationQuestions(chapter, subject, set.difficulty, 8, seed + 17),
      ...makeShortQuestions(chapter, set.difficulty, 8, seed + 31),
      ...makeConceptQuestions(chapter, set.difficulty, 4, seed + 47),
    ];
  }

  // Curated exam-style questions are kept in a separate bank; generated questions fill the remaining pool.
  // This lets every subject/chapter have a working quiz while curated banks can grow over time.
  return { ...set, questions: shuffle(questions, seed + 97).slice(0, TARGET_QUESTIONS) };
}

function normaliseAnswer(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function QuizSection({ chapter, subject }: { chapter: Chapter; subject: Subject["slug"] }) {
  const sets = useMemo(() => SETS.map((set) => buildSet(chapter, subject, set)), [chapter, subject]);
  const [selectedSet, setSelectedSet] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [earned, setEarned] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [mistakes, setMistakes] = useState(0);

  const activeSet = selectedSet === null ? null : sets[selectedSet];
  const question = activeSet?.questions[current];
  const totalMarks = activeSet?.questions.reduce((sum, q) => sum + q.marks, 0) ?? 0;
  const percent = totalMarks ? Math.round((earned / totalMarks) * 100) : 0;

  const startSet = (index: number) => {
    setSelectedSet(index);
    setCurrent(0);
    setAnswer("");
    setSubmitted(false);
    setEarned(0);
    setAnsweredCount(0);
    setFinished(false);
    setMistakes(0);
  };

  const isCorrect = question
    ? question.type === "mcq"
      ? answer === question.correct
      : normaliseAnswer(answer) === normaliseAnswer(question.correct)
    : false;

  const submit = () => {
    if (!question || submitted || !answer.trim()) return;
    setSubmitted(true);
    setAnsweredCount((value) => value + 1);
    if (isCorrect) setEarned((value) => value + question.marks);
    else setMistakes((value) => value + 1);
  };

  const next = () => {
    if (!activeSet || !submitted) return;
    if (current === activeSet.questions.length - 1) {
      setFinished(true);
      return;
    }
    setCurrent((value) => value + 1);
    setAnswer("");
    setSubmitted(false);
  };

  const reset = () => startSet(selectedSet ?? 0);

  if (!sets.some((set) => set.questions.length)) return null;

  return (
    <section id="quiz" className="mt-14 scroll-mt-28">
      <div className="glass rounded-3xl p-5 sm:p-8">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-primary/10 p-3 text-primary"><CircleHelp className="h-6 w-6" /></div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-primary">Chapter Quiz Arena</p>
            <h2 className="mt-1 text-2xl font-bold">Train from basic to exam level</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Five progressive sets. Each set mixes recall, concepts, formulas, application and case-style questions. Hard and Challenge sets are designed to feel closer to teacher/exam questions rather than simple definition recall. Submit an answer to reveal the solution and reasoning.
            </p>
          </div>
        </div>

        {selectedSet === null ? (
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sets.map((set, index) => {
              const marks = set.questions.reduce((sum, q) => sum + q.marks, 0);
              return (
                <button key={set.id} onClick={() => startSet(index)} className="rounded-2xl border border-border bg-background/30 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-secondary/50">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{set.title}</span>
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">{set.marksPerQuestion} mark{set.marksPerQuestion > 1 ? "s" : ""}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{set.subtitle}</p>
                  <p className="mt-4 text-xs font-medium text-primary">{set.questions.length} questions · {marks} total marks →</p>
                </button>
              );
            })}
          </div>
        ) : finished ? (
          <div className="mt-7 rounded-3xl bg-background/30 p-7 text-center sm:p-10">
            <Trophy className="mx-auto h-11 w-11 text-primary" />
            <p className="mt-4 font-mono text-xs uppercase tracking-wider text-primary">Set complete</p>
            <h3 className="mt-2 text-3xl font-bold">{earned} / {totalMarks}</h3>
            <p className="mt-2 text-muted-foreground">{percent}% · {answeredCount} answered · {mistakes} to review</p>
            <div className="mx-auto mt-6 max-w-md rounded-2xl bg-secondary/60 p-4 text-left text-sm text-muted-foreground">
              <strong className="text-foreground">Recommendation:</strong>{" "}
              {percent >= 85 ? "Move up to the next set." : percent >= 60 ? "Retry this set once, then move up." : "Repeat this set and review every solution before moving up."}
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button onClick={reset} className="btn-neon inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm"><RotateCcw className="h-4 w-4" /> Try Again</button>
              <button onClick={() => setSelectedSet(null)} className="rounded-2xl border border-border px-5 py-3 text-sm font-medium hover:bg-secondary">Choose Another Set</button>
            </div>
          </div>
        ) : question ? (
          <div className="mt-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-primary">{activeSet.title} · Question {current + 1} of {activeSet.questions.length}</p>
                <div className="mt-3 h-2 w-48 overflow-hidden rounded-full bg-secondary sm:w-72">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((current + 1) / activeSet.questions.length) * 100}%` }} />
                </div>
              </div>
              <div className="flex gap-2">
                <span className="rounded-full bg-secondary px-3 py-1.5 text-xs text-muted-foreground">{question.marks} mark{question.marks > 1 ? "s" : ""}</span>
                <span className="rounded-full bg-secondary px-3 py-1.5 text-xs text-muted-foreground">{question.kind}</span>
                <span className="rounded-full bg-secondary px-3 py-1.5 text-xs text-muted-foreground">Score: {earned}</span>
              </div>
            </div>

            <div className="mt-7 whitespace-pre-line text-xl font-semibold leading-8 sm:text-2xl">{question.prompt}</div>
            <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">Topic: {question.topic}</p>

            {question.type === "mcq" ? (
              <div className="mt-6 grid gap-3">
                {question.options?.map((option, index) => {
                  const correct = option === question.correct;
                  const chosen = option === answer;
                  const state = !submitted ? "idle" : correct ? "correct" : chosen ? "wrong" : "idle";
                  return (
                    <button key={`${option}-${index}`} disabled={submitted} onClick={() => setAnswer(option)} className={`w-full rounded-2xl border p-4 text-left text-sm transition-all ${state === "correct" ? "border-emerald-500/60 bg-emerald-500/10" : state === "wrong" ? "border-destructive/60 bg-destructive/10" : chosen ? "border-primary/60 bg-primary/10" : "border-border bg-background/30 hover:border-primary/50 hover:bg-secondary/50"}`}>
                      <span className="flex items-start gap-3">
                        <span className="font-mono text-xs text-muted-foreground">{String.fromCharCode(65 + index)}</span>
                        <span className="min-w-0 font-medium leading-6 text-foreground">{option}</span>
                        {state === "correct" ? <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-emerald-500" /> : null}
                        {state === "wrong" ? <XCircle className="ml-auto h-5 w-5 shrink-0 text-destructive" /> : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="mt-6">
                <input value={answer} disabled={submitted} onChange={(event) => setAnswer(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") submit(); }} placeholder="Type your answer and press Submit" className="w-full rounded-2xl border border-border bg-background/50 px-4 py-4 text-sm outline-none transition focus:border-primary" />
              </div>
            )}

            {submitted ? (
              <div className={`mt-5 rounded-2xl p-5 ${isCorrect ? "bg-emerald-500/10" : "bg-destructive/10"}`}>
                <p className={`text-sm font-semibold ${isCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}>
                  {isCorrect ? `Correct! +${question.marks} mark${question.marks > 1 ? "s" : ""}` : "Not quite — study the solution before moving on."}
                </p>
                {!isCorrect ? <p className="mt-2 text-sm"><strong>Correct answer:</strong> {question.correct}</p> : null}
                <div className="mt-3 rounded-xl bg-background/40 p-4">
                  <p className="text-xs font-mono uppercase tracking-wider text-primary">Step-by-step / exam method</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Solution:</strong> {question.explanation}</p>
                </div>
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap justify-between gap-3">
              <button onClick={() => setSelectedSet(null)} className="inline-flex items-center gap-2 rounded-2xl border border-border px-4 py-3 text-sm hover:bg-secondary"><ChevronLeft className="h-4 w-4" /> Change Set</button>
              {!submitted ? (
                <button disabled={!answer.trim()} onClick={submit} className="btn-neon rounded-2xl px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-40">Submit Answer</button>
              ) : (
                <button onClick={next} className="btn-neon inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm">{current === activeSet.questions.length - 1 ? "Finish Set" : "Next Question"} <ChevronRight className="h-4 w-4" /></button>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

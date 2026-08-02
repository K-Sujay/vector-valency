import { physics } from "./physics";
import { chemistry } from "./chemistry";
import { mathematics } from "./mathematics";
import type { Chapter, Subject } from "./types";

export * from "./types";
export { physics, chemistry, mathematics };

export const subjects: Subject[] = [physics, chemistry, mathematics];

export function getSubject(slug: string): Subject | undefined {
  return subjects.find((s) => s.slug === slug);
}

export function getChapter(subjectSlug: string, chapterSlug: string): Chapter | undefined {
  return getSubject(subjectSlug)?.chapters.find((c) => c.slug === chapterSlug);
}

export type SearchResult = {
  kind: "subject" | "chapter" | "formula";
  label: string;
  context: string;
  subject: Subject["slug"];
  chapterSlug?: string;
};

export function searchAll(rawQuery: string, limit = 12): SearchResult[] {
  const q = rawQuery.trim().toLowerCase();
  if (q.length < 2) return [];
  const results: SearchResult[] = [];

  for (const subject of subjects) {
    if (subject.name.toLowerCase().includes(q)) {
      results.push({
        kind: "subject",
        label: subject.name,
        context: `${subject.chapters.length} chapters`,
        subject: subject.slug,
      });
    }
    for (const chapter of subject.chapters) {
      if (chapter.title.toLowerCase().includes(q)) {
        results.push({
          kind: "chapter",
          label: `Ch ${chapter.number}. ${chapter.title}`,
          context: subject.name,
          subject: subject.slug,
          chapterSlug: chapter.slug,
        });
      }
      for (const formula of chapter.formulas) {
        if (formula.name.toLowerCase().includes(q)) {
          results.push({
            kind: "formula",
            label: formula.name,
            context: `${subject.name} · ${chapter.title}`,
            subject: subject.slug,
            chapterSlug: chapter.slug,
          });
        }
      }
    }
  }

  return results.slice(0, limit);
}

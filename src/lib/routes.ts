import type { Subject } from "@/data";

export const subjectPath = {
  physics: "/physics",
  chemistry: "/chemistry",
  mathematics: "/mathematics",
} as const;

export const chapterPath = {
  physics: "/physics/$chapter",
  chemistry: "/chemistry/$chapter",
  mathematics: "/mathematics/$chapter",
} as const;

export type SubjectSlug = Subject["slug"];

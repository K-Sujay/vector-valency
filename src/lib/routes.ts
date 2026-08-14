import type { Subject } from "@/data";

export const subjectPath = {
  physics: "/physics",
  chemistry: "/chemistry",
  mathematics: "/mathematics",
  "computer-science": "/computer-science",
} as const;

export const chapterPath = {
  physics: "/physics/$chapter",
  chemistry: "/chemistry/$chapter",
  mathematics: "/mathematics/$chapter",
  "computer-science": "/computer-science/$chapter",
} as const;

export type SubjectSlug = Subject["slug"];

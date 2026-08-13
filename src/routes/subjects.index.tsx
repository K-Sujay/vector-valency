import { createFileRoute } from "@tanstack/react-router";
import { subjects } from "@/data";
import { SubjectCard } from "@/components/SubjectCard";

export const Route = createFileRoute("/subjects/")({
  head: () => ({
    meta: [
      { title: "Subjects — Vector & Valency" },
      {
        name: "description",
        content:
          "Browse CBSE Class 12 Physics, Chemistry, Mathematics and Computer Science — chapters, formulas and quick revision in one place.",
      },
      { property: "og:title", content: "Subjects — Vector & Valency" },
      {
        property: "og:description",
        content: "Browse every subject's chapters and formula sheets in one place.",
      },
      { property: "og:url", content: "/subjects" },
    ],
    links: [{ rel: "canonical", href: "/subjects" }],
  }),
  component: SubjectsPage,
});

function SubjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          CBSE Class 12 · NCERT
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Subjects</h1>
        <p className="mt-3 text-muted-foreground">
          Every chapter, formula and quick-revision sheet, organised by subject.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {subjects.map((s, i) => (
          <SubjectCard key={s.slug} subject={s} index={i} />
        ))}
      </div>
    </div>
  );
}

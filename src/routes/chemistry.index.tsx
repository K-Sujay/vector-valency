import { createFileRoute } from "@tanstack/react-router";
import { chemistry } from "@/data";
import { SubjectPage } from "@/components/SubjectPage";

export const Route = createFileRoute("/chemistry/")({
  head: () => ({
    meta: [
      { title: "CBSE Class 12 Chemistry Chapters & Formulas — Vector & Valency" },
      {
        name: "description",
        content:
          "All revised CBSE Class 12 Chemistry NCERT chapters with important, basic and advanced formula sheets.",
      },
      { property: "og:title", content: "CBSE Class 12 Chemistry Formula Sheets" },
      {
        property: "og:description",
        content: "Chapter-wise Chemistry formula sheets for fast Class 12 revision.",
      },
      { property: "og:url", content: "/chemistry" },
    ],
    links: [{ rel: "canonical", href: "/chemistry" }],
  }),
  component: () => <SubjectPage subject={chemistry} />,
});

import { createFileRoute } from "@tanstack/react-router";
import { mathematics } from "@/data";
import { SubjectPage } from "@/components/SubjectPage";

export const Route = createFileRoute("/mathematics/")({
  head: () => ({
    meta: [
      { title: "CBSE Class 12 Maths Chapters & Formulas — Vector & Valency" },
      {
        name: "description",
        content:
          "All revised CBSE Class 12 Mathematics NCERT chapters with important, basic and advanced formula sheets.",
      },
      { property: "og:title", content: "CBSE Class 12 Mathematics Formula Sheets" },
      {
        property: "og:description",
        content: "Chapter-wise Maths formula sheets for fast Class 12 revision.",
      },
      { property: "og:url", content: "/mathematics" },
    ],
    links: [{ rel: "canonical", href: "/mathematics" }],
  }),
  component: () => <SubjectPage subject={mathematics} />,
});

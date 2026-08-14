import { createFileRoute } from "@tanstack/react-router";
import { physics } from "@/data";
import { SubjectPage } from "@/components/SubjectPage";

export const Route = createFileRoute("/physics/")({
  head: () => ({
    meta: [
      { title: "CBSE Class 12 Physics Chapters & Formulas — Vector & Valency" },
      {
        name: "description",
        content:
          "All revised CBSE Class 12 Physics NCERT chapters with important, basic and advanced formula sheets.",
      },
      { property: "og:title", content: "CBSE Class 12 Physics Formula Sheets" },
      {
        property: "og:description",
        content: "Chapter-wise Physics formula sheets for fast Class 12 revision.",
      },
      { property: "og:url", content: "/physics" },
    ],
    links: [{ rel: "canonical", href: "/physics" }],
  }),
  component: () => <SubjectPage subject={physics} />,
});

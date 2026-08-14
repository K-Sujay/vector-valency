import { createFileRoute } from "@tanstack/react-router";
import { computerScience } from "@/data";
import { SubjectPage } from "@/components/SubjectPage";

export const Route = createFileRoute("/computer-science/")({
  head: () => ({
    meta: [
      { title: "CBSE Class 12 Computer Science Chapters & Formulas — Vector & Valency" },
      {
        name: "description",
        content:
          "All revised CBSE Class 12 Computer Science NCERT chapters with important, basic and advanced formula sheets.",
      },
      { property: "og:title", content: "CBSE Class 12 Computer Science Formula Sheets" },
      {
        property: "og:description",
        content: "Chapter-wise Computer Science formula sheets for fast Class 12 revision.",
      },
      { property: "og:url", content: "/computer-science" },
    ],
    links: [{ rel: "canonical", href: "/computer-science" }],
  }),
  component: () => <SubjectPage subject={computerScience} />,
});

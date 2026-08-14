import { createFileRoute, notFound } from "@tanstack/react-router";
import { chemistry, getChapter } from "@/data";
import { ChapterPage } from "@/components/ChapterPage";

export const Route = createFileRoute("/chemistry/$chapter")({
  loader: ({ params }) => {
    const chapter = getChapter("chemistry", params.chapter);
    if (!chapter) throw notFound();
    return { title: chapter.title };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Chapter not found" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.title} — Chemistry Formulas | Vector & Valency`;
    const description = `Important, basic and advanced formulas for CBSE Class 12 Chemistry chapter ${loaderData.title}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: ChemistryChapter,
});

function ChemistryChapter() {
  const { chapter: slug } = Route.useParams();
  const chapter = getChapter("chemistry", slug)!;
  return <ChapterPage subject={chemistry} chapter={chapter} />;
}

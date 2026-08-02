import { createFileRoute, notFound } from "@tanstack/react-router";
import { getChapter, mathematics } from "@/data";
import { ChapterPage } from "@/components/ChapterPage";

export const Route = createFileRoute("/mathematics/$chapter")({
  loader: ({ params }) => {
    const chapter = getChapter("mathematics", params.chapter);
    if (!chapter) throw notFound();
    return { title: chapter.title };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Chapter not found" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.title} — Maths Formulas | Vector & Valency`;
    const description = `Important, basic and advanced formulas for CBSE Class 12 Mathematics chapter ${loaderData.title}.`;
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
  component: MathsChapter,
});

function MathsChapter() {
  const { chapter: slug } = Route.useParams();
  const chapter = getChapter("mathematics", slug)!;
  return <ChapterPage subject={mathematics} chapter={chapter} />;
}

import { createFileRoute, notFound } from "@tanstack/react-router";
import { getChapter, physics } from "@/data";
import { ChapterPage } from "@/components/ChapterPage";

export const Route = createFileRoute("/physics/$chapter")({
  loader: ({ params }) => {
    const chapter = getChapter("physics", params.chapter);
    if (!chapter) throw notFound();
    return { title: chapter.title };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Chapter not found" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.title} — Physics Formulas | Vector & Valency`;
    const description = `Important, basic and advanced formulas for CBSE Class 12 Physics chapter ${loaderData.title}.`;
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
  component: PhysicsChapter,
});

function PhysicsChapter() {
  const { chapter: slug } = Route.useParams();
  const chapter = getChapter("physics", slug)!;
  return <ChapterPage subject={physics} chapter={chapter} />;
}

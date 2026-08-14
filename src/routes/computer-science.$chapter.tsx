import { createFileRoute, notFound } from "@tanstack/react-router";
import { computerScience, getChapter } from "@/data";
import { ChapterPage } from "@/components/ChapterPage";

export const Route = createFileRoute("/computer-science/$chapter")({
  loader: ({ params }) => {
    const chapter = getChapter("computer-science", params.chapter);
    if (!chapter) throw notFound();
    return { title: chapter.title };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Chapter not found" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.title} — Computer Science Formulas | Vector & Valency`;
    const description = `Important, basic and advanced formulas for CBSE Class 12 Computer Science chapter ${loaderData.title}.`;
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
  component: ComputerScienceChapter,
});

function ComputerScienceChapter() {
  const { chapter: slug } = Route.useParams();
  const chapter = getChapter("computer-science", slug)!;
  return <ChapterPage subject={computerScience} chapter={chapter} />;
}

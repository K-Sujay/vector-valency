import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { subjects } from "@/data";
import { SearchBar } from "@/components/SearchBar";
import { SubjectCard } from "@/components/SubjectCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vector & Valency — CBSE Class 12 Formula Sheets" },
      {
        name: "description",
        content:
          "Learn Smart, Score Better. Organized Physics, Chemistry and Mathematics formula sheets for CBSE Class 12 revision.",
      },
      { property: "og:title", content: "Vector & Valency — CBSE Class 12 Formula Sheets" },
      {
        property: "og:description",
        content: "Fast, organized formula sheets for CBSE Class 12 Physics, Chemistry and Maths.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      <section className="aurora relative overflow-hidden">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-5 pb-20 pt-20 text-center sm:pt-28">
          <motion.img
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src="/logo-mark.svg"
            alt="Vector & Valency logo"
            className="h-28 w-auto sm:h-40"
          />

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 text-4xl font-bold leading-tight sm:text-6xl"
          >
            <span className="neon-text">Vector &amp; Valency</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground sm:text-xl"
          >
            Learn Smart, Score Better
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 w-full max-w-xl"
          >
            <SearchBar />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <Link
              to="/subjects"
              className="btn-neon inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03]"
            >
              Start Learning <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <h2 className="text-2xl font-bold sm:text-3xl">Choose your subject</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Official revised CBSE Class 12 NCERT chapters, with formula sheets for every chapter.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {subjects.map((s, i) => (
            <SubjectCard key={s.slug} subject={s} index={i} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-5">
        <div className="glass neon-ring grid gap-6 rounded-3xl p-8 sm:grid-cols-3">
          {[
            { k: "37", v: "NCERT chapters covered" },
            { k: "4", v: "Sections per formula sheet" },
            { k: "1-tap", v: "Copy any formula" },
          ].map((item) => (
            <div key={item.v}>
              <p className="text-3xl font-bold neon-text">{item.k}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.v}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

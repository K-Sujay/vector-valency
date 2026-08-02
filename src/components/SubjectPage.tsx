import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { Subject } from "@/data";
import { chapterPath } from "@/lib/routes";
import { SearchBar } from "./SearchBar";

export function SubjectPage({ subject }: { subject: Subject }) {
  return (
    <div className="aurora">
      <div className="mx-auto max-w-6xl px-5 pt-14">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-medium text-muted-foreground">CBSE Class 12 · NCERT</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            <span className="neon-text">{subject.name}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">{subject.blurb}</p>
        </motion.div>

        <div className="mt-8 max-w-xl">
          <SearchBar placeholder={`Search ${subject.name} chapters or formulas…`} />
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {subject.chapters.map((chapter, i) => (
            <motion.li
              key={chapter.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}
            >
              <Link
                to={chapterPath[subject.slug]}
                params={{ chapter: chapter.slug }}
                className="glass group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl p-5 transition-shadow hover:shadow-[var(--shadow-glow)]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary/70 font-mono text-sm text-primary">
                  {chapter.number}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground">
                    {chapter.title}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {chapter.formulas.length} formulas
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { TIERS, type Chapter, type Subject } from "@/data";
import { subjectPath } from "@/lib/routes";
import { FormulaCard } from "./FormulaCard";

export function ChapterPage({ subject, chapter }: { subject: Subject; chapter: Chapter }) {
  return (
    <div className="aurora">
      <div className="mx-auto max-w-4xl px-5 pt-12">
        <Link
          to={subjectPath[subject.slug]}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> All {subject.name} chapters
        </Link>

        <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <p className="font-mono text-sm text-primary">Chapter {chapter.number}</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{chapter.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Formula sheet · {chapter.formulas.length} formulas
          </p>
        </motion.header>

        {TIERS.map(({ tier, label, icon }) => {
          const items = chapter.formulas.filter((f) => f.tier === tier);
          if (items.length === 0) return null;
          return (
            <section key={tier} className="mt-12">
              <h2 className="text-lg font-semibold text-foreground">
                <span aria-hidden>{icon}</span> {label}
              </h2>
              <div className="mt-5 grid gap-4">
                {items.map((f, i) => (
                  <FormulaCard key={f.name} formula={f} index={i} />
                ))}
              </div>
            </section>
          );
        })}

        <section className="mt-14">
          <h2 className="text-lg font-semibold text-foreground">
            <span aria-hidden>📋</span> Formula Summary
          </h2>
          <div className="glass mt-5 overflow-x-auto rounded-2xl">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Formula</th>
                </tr>
              </thead>
              <tbody>
                {chapter.formulas.map((f) => (
                  <tr key={f.name} className="border-t border-border">
                    <td className="px-5 py-3 align-top font-medium text-foreground">{f.name}</td>
                    <td className="px-5 py-3 align-top font-mono text-muted-foreground">
                      {f.formula}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

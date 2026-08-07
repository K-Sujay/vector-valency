import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Atom, FlaskConical, Sigma } from "lucide-react";
import type { Subject } from "@/data";
import { subjectPath } from "@/lib/routes";

const icons = {
  physics: Atom,
  chemistry: FlaskConical,
  mathematics: Sigma,
  "computer-science": Atom,
} as const;

export function SubjectCard({ subject, index }: { subject: Subject; index: number }) {
  const Icon = icons[subject.slug];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
    >
      <Link
        to={subjectPath[subject.slug]}
        className="glass neon-ring flex h-full flex-col rounded-3xl p-7 transition-shadow hover:shadow-[var(--shadow-glow)]"
      >
        <Icon className="h-8 w-8 text-primary" aria-hidden />
        <h3 className="mt-5 text-xl font-semibold text-foreground">{subject.name}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{subject.blurb}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
          {subject.chapters.length} chapters <ArrowRight className="h-4 w-4" />
        </span>
      </Link>
    </motion.div>
  );
}

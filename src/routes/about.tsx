import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Vector & Valency — Created by K. Sujay" },
      {
        name: "description",
        content:
          "Vector & Valency was created by K. Sujay to help CBSE Class 12 students access Physics, Chemistry, Maths and Computer Science formulas, definitions in one organized place and have fun time having quizes ",
      },
      { property: "og:title", content: "About Vector & Valency" },
      {
        property: "og:description",
        content: "Meet K. Sujay, creator of Vector & Valency — Learn Smart, Score Better.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <div className="aurora">
      <div className="mx-auto max-w-4xl px-5 pt-16">
        <Logo size="md" showTagline />
        <h1 className="mt-8 text-4xl font-bold sm:text-5xl">
          <span className="neon-text">About Us</span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass neon-ring mt-10 grid gap-8 rounded-3xl p-8 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start"
        >
          <img
            src="/creator.jpg"
            alt="K. Sujay, creator of Vector & Valency"
            className="h-40 w-40 shrink-0 rounded-2xl object-cover shadow-[var(--shadow-glow)]"
          />
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold text-foreground">K. Sujay</h2>
            <p className="mt-1 text-sm font-medium text-primary">Creator</p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Hi, I'm K. Sujay, the creator of Vector &amp; Valency. I created this platform to help
              CBSE Class 12 students quickly access important formulas for Physics, Chemistry, and
              Mathematics in one organized place. My goal is to make revision simple, fast, and
              effective.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

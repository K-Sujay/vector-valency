import { useState } from "react";
import { motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import type { Formula } from "@/data";

export function FormulaCard({ formula, index }: { formula: Formula; index: number }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${formula.name}: ${formula.formula}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="glass group rounded-2xl p-5"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <h3 className="min-w-0 text-base font-semibold text-foreground">{formula.name}</h3>
        <button
          onClick={copy}
          aria-label={`Copy ${formula.name}`}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <p className="mt-3 overflow-x-auto rounded-xl bg-secondary/60 px-4 py-3 font-mono text-sm leading-relaxed text-foreground">
        {formula.formula}
      </p>
      <p className="mt-3 text-sm text-muted-foreground">{formula.explanation}</p>
    </motion.article>
  );
}

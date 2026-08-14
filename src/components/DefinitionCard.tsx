import { useState } from "react";
import { motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import type { Definition } from "@/data";

export function DefinitionCard({ definition, index }: { definition: Definition; index: number }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${definition.term}: ${definition.explanation}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.24) }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-foreground">{definition.term}</h3>
        <button
          onClick={copy}
          aria-label={`Copy ${definition.term} definition`}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{definition.explanation}</p>
    </motion.article>
  );
}

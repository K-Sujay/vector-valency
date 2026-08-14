import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { searchAll } from "@/data";
import { chapterPath, subjectPath } from "@/lib/routes";

const kindStyles: Record<string, string> = {
  subject: "text-neon-cyan",
  chapter: "text-neon-violet",
  formula: "text-neon-magenta",
  definition: "text-neon-cyan",
};

export function SearchBar({ placeholder = "Search subjects, chapters, definitions or formulas…" }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const results = useMemo(() => searchAll(query), [query]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={boxRef} className="relative w-full">
      <div className="glass neon-ring flex items-center gap-3 rounded-2xl px-4 py-3">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          aria-label="Search"
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      {open && query.trim().length >= 2 && (
        <div className="glass absolute z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-2xl p-2">
          {results.length === 0 ? (
            <p className="px-3 py-4 text-sm text-muted-foreground">No matches found.</p>
          ) : (
            results.map((r, i) => (
              <Link
                key={`${r.label}-${i}`}
                {...(r.chapterSlug
                  ? { to: chapterPath[r.subject], params: { chapter: r.chapterSlug } }
                  : { to: subjectPath[r.subject] })}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent/12"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-foreground">
                    {r.label}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">{r.context}</span>
                </span>
                <span
                  className={`shrink-0 text-[10px] font-semibold uppercase tracking-wider ${kindStyles[r.kind]}`}
                >
                  {r.kind}
                </span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export function Logo({
  size = "md",
  showTagline = false,
}: {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}) {
  const mark = { sm: "h-9", md: "h-11", lg: "h-24 sm:h-32" }[size];
  const text = { sm: "text-base", md: "text-xl", lg: "text-3xl sm:text-4xl" }[size];

  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <img src="/logo-mark.png" alt="Vector & Valency logo" className={`${mark} w-auto shrink-0`} />
      <span className="min-w-0">
        <span className={`block truncate font-display font-bold leading-tight ${text}`}>
          Vector &amp; Valency
        </span>
        {showTagline && (
          <span className="block truncate text-xs text-muted-foreground sm:text-sm">
            Learn Smart, Score Better
          </span>
        )}
      </span>
    </span>
  );
}

import { SearchX } from "lucide-react";

export function EmptyState({
  title = "No results found",
  description = "Try a different search term or clear the filters.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
      <SearchX className="size-8 text-muted-foreground" aria-hidden="true" />
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  icon?: LucideIcon;
}

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
  icon: Icon,
}: SectionCardProps) {
  return (
    <section className={cn("card-elevated overflow-hidden p-5 sm:p-7", className)}>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-b border-border/80 pb-5">
        <div className="flex min-w-0 items-start gap-3">
          {Icon ? (
            <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon className="size-5" aria-hidden="true" />
            </span>
          ) : null}
          <div className="min-w-0">
            <h2 className="font-display text-base font-bold tracking-tight sm:text-lg">{title}</h2>
            {description ? (
              <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {description}
              </p>
            ) : null}
          </div>
        </div>
        {action}
      </header>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function FieldList({ items }: { items: { label: string; value?: ReactNode }[] }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="min-w-0 rounded-xl border border-border/80 bg-gradient-to-b from-surface/80 to-surface/40 px-4 py-3.5"
        >
          <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            {item.label}
          </dt>
          <dd className="mt-1.5 break-words text-sm font-semibold leading-snug text-foreground">
            {item.value || <span className="font-normal text-muted-foreground">Not provided</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

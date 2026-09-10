import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

/** Compact gradient hero reused by every inner public page. */
export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="gradient-hero relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-accent/25 blur-3xl"
      />
      <div className="container-page relative py-14 sm:py-20">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-sm text-primary-foreground/80 sm:text-base">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-7">{children}</div> : null}
      </div>
    </section>
  );
}

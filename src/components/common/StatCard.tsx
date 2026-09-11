import type { AssociationStat } from "@/services/association/association.service";

export function StatCard({ stat }: { stat: AssociationStat }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
      <p className="font-display text-2xl font-bold text-primary sm:text-3xl">{stat.value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {stat.label}
      </p>
    </div>
  );
}

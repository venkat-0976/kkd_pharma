import { StatCard } from "@/components/cards/StatCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { listStats } from "@/services/association/association.service";

export function StatsSection() {
  const stats = listStats();
  return (
    <section className="container-page section-y pt-20">
      <SectionHeading
        eyebrow="Association at a glance"
        title="A healthcare network built on 500+ member firms"
        description="Aggregate association figures only. No individual member record is published on this website."
      />
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Compass, Flag, HeartPulse, Target } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Kakinada Union — Pharmacy Association" },
      {
        name: "description",
        content:
          "History, mission, vision and objectives of Kakinada Union, the pharmacy healthcare association for retail and wholesale members.",
      },
      { property: "og:title", content: "About Kakinada Union" },
      {
        property: "og:description",
        content: "Our history, mission, vision and objectives as Kakinada's pharmacy healthcare association.",
      },
    ],
  }),
  component: AboutPage,
});

const pillars = [
  {
    icon: Target,
    title: "Mission",
    body: "Protect the professional interests of every registered pharmacy member and raise the standard of medicine supply across Kakinada.",
  },
  {
    icon: Compass,
    title: "Vision",
    body: "A fully compliant, digitally organised pharmacy network where every licence, record and document is current and verifiable.",
  },
  {
    icon: HeartPulse,
    title: "Values",
    body: "Patient safety first, transparent trade practice, professional integrity and member privacy by default.",
  },
];

const milestones = [
  { year: "1991", text: "Kakinada Union founded by a group of 42 retail pharmacy owners." },
  { year: "2003", text: "Wholesale and distribution members formally admitted to the union." },
  { year: "2012", text: "Regulatory support desk established for drug and food licence guidance." },
  { year: "2019", text: "Group health insurance and welfare programmes introduced for member families." },
  { year: "2026", text: "Secure digital member portal launched for licence and document management." },
];

function AboutPage() {
  return (
    <PublicLayout>
      <PageHero
        eyebrow="About us"
        title="Three decades of standing with Kakinada's pharmacies"
        description="Kakinada Union is a registered association of retail and wholesale pharmacy firms working together on compliance, professional development and community health."
      />

      <section className="container-page section-y">
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <article key={p.title} className="card-elevated p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 text-base font-semibold">{p.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="gradient-soft border-y border-border">
        <div className="container-page section-y">
          <SectionHeading eyebrow="Our journey" title="Milestones" />
          <ol className="mt-8 space-y-5 border-l border-border pl-6">
            {milestones.map((m) => (
              <li key={m.year} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] top-1.5 size-3 rounded-full border-2 border-background bg-primary"
                />
                <p className="text-sm font-semibold text-primary">{m.year}</p>
                <p className="mt-1 text-sm text-muted-foreground">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page section-y">
        <SectionHeading eyebrow="Objectives" title="What the union commits to" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            "Represent members before regulatory and civic authorities.",
            "Keep every member licence current with proactive expiry reminders.",
            "Run continuing education for pharmacists and counter staff.",
            "Circulate statutory and pricing updates without delay.",
            "Maintain accurate, private records for each member firm.",
            "Support community health camps and awareness drives.",
          ].map((item) => (
            <li key={item} className="flex gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
              <Flag className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </PublicLayout>
  );
}

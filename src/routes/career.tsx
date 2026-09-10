import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { JobCard } from "@/components/cards/JobCard";
import { CareerApplicationForm } from "@/components/forms/CareerApplicationForm";
import { listJobs } from "@/services/career/jobs.service";
import type { JobPosting } from "@/types/directory";

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "Careers in Pharmacy & Healthcare — Kakinada Union" },
      {
        name: "description",
        content:
          "Open pharmacy, sales, finance and healthcare positions with Kakinada Union member firms. Apply online.",
      },
      { property: "og:title", content: "Careers — Kakinada Union" },
      {
        property: "og:description",
        content: "Build your career in healthcare and pharmacy with Kakinada Union member firms.",
      },
    ],
  }),
  component: CareerPage,
});

function CareerPage() {
  const jobs = listJobs();
  const [selected, setSelected] = useState<string>("");
  const formRef = useRef<HTMLDivElement>(null);

  const handleApply = (job: JobPosting) => {
    setSelected(job.title);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PublicLayout>
      <PageHero
        eyebrow="Career"
        title="Build your career in healthcare & pharmacy"
        description="Kakinada Union member firms hire pharmacists, counter staff, field executives and support roles throughout the year."
      />

      <section className="container-page section-y">
        <SectionHeading eyebrow="Open positions" title="Current openings" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.slug} job={job} onApply={handleApply} />
          ))}
        </div>
      </section>

      <section className="gradient-soft border-y border-border">
        <div className="container-page section-y" ref={formRef}>
          <SectionHeading
            eyebrow="Application"
            title="Apply online"
            description="Fill in your details and attach a resume. Applications are reviewed by the union office and shared only with the hiring member firm."
          />
          <div className="mt-8 max-w-3xl">
            <CareerApplicationForm key={selected} defaultPosition={selected} />
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

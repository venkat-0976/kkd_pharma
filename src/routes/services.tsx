import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHero } from "@/components/common/PageHero";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { listServices } from "@/services/association/association.service";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Member Services — Kakinada Union" },
      {
        name: "description",
        content:
          "Pharmacy support, regulatory guidance, networking, professional development and industry updates for Kakinada Union members.",
      },
      { property: "og:title", content: "Member Services — Kakinada Union" },
      {
        property: "og:description",
        content: "Association services offered to registered retail and wholesale pharmacy members.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const services = listServices();
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Services"
        title="Support built around a working pharmacy"
        description="From licence renewals to continuing education, association services are designed for the day-to-day reality of retail and wholesale pharmacy."
      />

      <section className="container-page section-y">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>

      <section className="gradient-soft border-y border-border">
        <div className="container-page section-y">
          <SectionHeading
            eyebrow="Member portal"
            title="Every service is backed by a secure record"
            description="Licence details, pharmacist records and uploaded documents live only inside the authenticated member area."
            action={
              <Button asChild>
                <Link to="/login">Member Login</Link>
              </Button>
            }
          />
        </div>
      </section>
    </PublicLayout>
  );
}

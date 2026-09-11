import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHero } from "@/components/common/PageHero";
import { ServiceCard } from "@/components/common/ServiceCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { listServices } from "@/services/association/association.service";

export function ServicesPage() {
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

      <section className="gradient-hero text-primary-foreground">
        <div className="container-page section-y flex flex-col items-center text-center">
          <SectionHeading
            eyebrow="Get involved"
            title="Become part of Kakinada's pharmacy collective"
            description="Membership is open to any licensed retail or wholesale pharmacy operating within Kakinada municipal limits."
          />
          <div className="mt-6 flex gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/join">Apply for membership</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Link to="/contact">Contact office</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

export default ServicesPage;

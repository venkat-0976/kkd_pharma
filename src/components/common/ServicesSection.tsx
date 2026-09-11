import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/common/ServiceCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { listServices } from "@/services/association/association.service";

export function ServicesSection() {
  const services = listServices();
  return (
    <section className="gradient-soft border-y border-border">
      <div className="container-page section-y">
        <SectionHeading
          eyebrow="What we do"
          title="Association services for every member"
          action={
            <Button asChild variant="outline">
              <Link to="/services">All services</Link>
            </Button>
          }
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

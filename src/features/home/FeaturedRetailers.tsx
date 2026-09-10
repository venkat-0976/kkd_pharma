import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BusinessCard } from "@/components/cards/BusinessCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { listRetailers } from "@/services/directory/retailers.service";

export function FeaturedRetailers() {
  const retailers = listRetailers().slice(0, 3);
  return (
    <section className="container-page section-y">
      <SectionHeading
        eyebrow="Retail members"
        title="Featured retail pharmacies"
        description="Public business listings only — shop name, business type and general address."
        action={
          <Button asChild variant="outline">
            <Link to="/retailers">View all retailers</Link>
          </Button>
        }
      />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {retailers.map((business) => (
          <BusinessCard key={business.slug} business={business} />
        ))}
      </div>
    </section>
  );
}

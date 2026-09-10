import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BusinessCard } from "@/components/cards/BusinessCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { listWholesalers } from "@/services/directory/wholesalers.service";

export function FeaturedWholesalers() {
  const wholesalers = listWholesalers().slice(0, 3);
  return (
    <section className="gradient-soft border-y border-border">
      <div className="container-page section-y">
        <SectionHeading
          eyebrow="Wholesale members"
          title="Featured wholesalers & distributors"
          description="Same privacy rules as retail listings — no licence, GST or personal contact data."
          action={
            <Button asChild variant="outline">
              <Link to="/wholesalers">View all wholesalers</Link>
            </Button>
          }
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {wholesalers.map((business) => (
            <BusinessCard key={business.slug} business={business} />
          ))}
        </div>
      </div>
    </section>
  );
}

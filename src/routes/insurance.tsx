import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHero } from "@/components/common/PageHero";
import { OrganisationCard } from "@/components/cards/OrganisationCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { listInsurancePlans } from "@/services/directory/partners.service";

export const Route = createFileRoute("/insurance")({
  head: () => ({
    meta: [
      { title: "Insurance & Welfare — Kakinada Union" },
      {
        name: "description",
        content:
          "Group health cover, shop and stock protection and indemnity guidance arranged for Kakinada Union members.",
      },
      { property: "og:title", content: "Insurance & Welfare — Kakinada Union" },
      {
        property: "og:description",
        content: "Insurance programmes negotiated by Kakinada Union for its pharmacy members.",
      },
    ],
  }),
  component: InsurancePage,
});

function InsurancePage() {
  const plans = listInsurancePlans();
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Insurance"
        title="Protection for member firms and families"
        description="The union negotiates group cover so individual pharmacies get better terms than they would alone."
      />
      <div className="container-page section-y space-y-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => (
            <OrganisationCard key={p.slug} organisation={p} />
          ))}
        </div>
        <SectionHeading
          title="Enrolment happens inside the member portal"
          description="Policy documents and personal details are handled privately after sign-in — never through public pages."
          action={
            <Button asChild>
              <Link to="/login">Member Login</Link>
            </Button>
          }
        />
      </div>
    </PublicLayout>
  );
}

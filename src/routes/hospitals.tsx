import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHero } from "@/components/common/PageHero";
import { OrganisationCard } from "@/components/cards/OrganisationCard";
import { PrivacyNotice } from "@/components/common/PrivacyNotice";
import { listHospitals } from "@/services/directory/partners.service";

export const Route = createFileRoute("/hospitals")({
  head: () => ({
    meta: [
      { title: "Partner Hospitals — Kakinada Union" },
      {
        name: "description",
        content: "Hospitals partnered with Kakinada Union for medicine supply and community health work.",
      },
      { property: "og:title", content: "Partner Hospitals — Kakinada Union" },
      {
        property: "og:description",
        content: "Basic public information about hospitals associated with Kakinada Union.",
      },
    ],
  }),
  component: HospitalsPage,
});

function HospitalsPage() {
  const hospitals = listHospitals();
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Hospitals"
        title="Partner hospitals"
        description="Hospitals that work with union member pharmacies on supply, emergency stock and health programmes."
      />
      <div className="container-page section-y space-y-6">
        <PrivacyNotice message="Public partner information only. No patient, member or licence data is published here." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hospitals.map((h) => (
            <OrganisationCard key={h.slug} organisation={h} />
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}

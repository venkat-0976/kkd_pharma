import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHero } from "@/components/common/PageHero";
import { OrganisationCard } from "@/components/cards/OrganisationCard";
import { PrivacyNotice } from "@/components/common/PrivacyNotice";
import { listDoctors } from "@/services/directory/partners.service";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "Associated Doctors — Kakinada Union" },
      {
        name: "description",
        content:
          "Doctors associated with Kakinada Union health camps and awareness programmes. Public professional information only.",
      },
      { property: "og:title", content: "Associated Doctors — Kakinada Union" },
      {
        property: "og:description",
        content: "Public professional information about doctors associated with Kakinada Union.",
      },
    ],
  }),
  component: DoctorsPage,
});

function DoctorsPage() {
  const doctors = listDoctors();
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Doctors"
        title="Associated doctors"
        description="Consultants who support union health camps, awareness drives and professional sessions."
      />
      <div className="container-page section-y space-y-6">
        <PrivacyNotice message="Only publicly shareable professional information is listed. Personal contact details are not published." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d) => (
            <OrganisationCard key={d.slug} organisation={d} />
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}

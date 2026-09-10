import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHero } from "@/components/common/PageHero";
import { OrganisationCard } from "@/components/cards/OrganisationCard";
import { PrivacyNotice } from "@/components/common/PrivacyNotice";
import { listLabs } from "@/services/directory/partners.service";

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "Diagnostic Labs — Kakinada Union" },
      {
        name: "description",
        content: "Diagnostic laboratories and imaging centres associated with Kakinada Union members.",
      },
      { property: "og:title", content: "Diagnostic Labs — Kakinada Union" },
      {
        property: "og:description",
        content: "Public information about laboratories partnered with Kakinada Union.",
      },
    ],
  }),
  component: LabsPage,
});

function LabsPage() {
  const labs = listLabs();
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Labs"
        title="Diagnostic laboratories"
        description="Pathology and imaging partners serving member pharmacies and their customers."
      />
      <div className="container-page section-y space-y-6">
        <PrivacyNotice message="Laboratory information only. No patient reports or member records appear on public pages." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {labs.map((l) => (
            <OrganisationCard key={l.slug} organisation={l} />
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}

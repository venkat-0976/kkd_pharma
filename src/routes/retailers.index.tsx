import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHero } from "@/components/common/PageHero";
import { PrivacyNotice } from "@/components/common/PrivacyNotice";
import { DirectoryGrid } from "@/features/directory/DirectoryGrid";
import { ComplianceNoticeDialog } from "@/features/directory/ComplianceNoticeDialog";
import { listRetailerAreas, listRetailers } from "@/services/directory/retailers.service";

export const Route = createFileRoute("/retailers/")({
  head: () => ({
    meta: [
      { title: "Retail Pharmacy Directory — Kakinada Union" },
      {
        name: "description",
        content:
          "Browse Kakinada Union retail pharmacy members by area and category. Public business listings only.",
      },
      { property: "og:title", content: "Retail Pharmacy Directory — Kakinada Union" },
      {
        property: "og:description",
        content: "Search retail pharmacy members of Kakinada Union by name, area and category.",
      },
    ],
  }),
  component: RetailersPage,
});

function RetailersPage() {
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Retailers"
        title="Retail pharmacy members"
        description="Search the association's retail pharmacy members across Kakinada."
      />
      <div className="container-page section-y space-y-6">
        <ComplianceNoticeDialog type="Retailer" />
        <PrivacyNotice />
        <DirectoryGrid businesses={listRetailers()} areas={listRetailerAreas()} />
      </div>
    </PublicLayout>
  );
}

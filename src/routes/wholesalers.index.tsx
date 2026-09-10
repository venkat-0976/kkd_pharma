import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHero } from "@/components/common/PageHero";
import { PrivacyNotice } from "@/components/common/PrivacyNotice";
import { DirectoryGrid } from "@/features/directory/DirectoryGrid";
import { ComplianceNoticeDialog } from "@/features/directory/ComplianceNoticeDialog";
import { listWholesalerAreas, listWholesalers } from "@/services/directory/wholesalers.service";

export const Route = createFileRoute("/wholesalers/")({
  head: () => ({
    meta: [
      { title: "Wholesaler & Distributor Directory — Kakinada Union" },
      {
        name: "description",
        content:
          "Browse Kakinada Union wholesale and distribution members by area and category. Public business listings only.",
      },
      { property: "og:title", content: "Wholesaler Directory — Kakinada Union" },
      {
        property: "og:description",
        content: "Search wholesale and distribution members of Kakinada Union by name, area and category.",
      },
    ],
  }),
  component: WholesalersPage,
});

function WholesalersPage() {
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Wholesalers"
        title="Wholesale & distribution members"
        description="Stockists, distributors and surgical suppliers registered with Kakinada Union."
      />
      <div className="container-page section-y space-y-6">
        <ComplianceNoticeDialog type="Wholesaler" />
        <PrivacyNotice />
        <DirectoryGrid businesses={listWholesalers()} areas={listWholesalerAreas()} />
      </div>
    </PublicLayout>
  );
}

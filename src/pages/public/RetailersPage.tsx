import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHero } from "@/components/common/PageHero";
import { PrivacyNotice } from "@/components/common/PrivacyNotice";
import { DirectoryGrid } from "@/features/directory/DirectoryGrid";
import { ComplianceNoticeDialog } from "@/features/directory/ComplianceNoticeDialog";
import { listRetailerAreas, listRetailers } from "@/services/directory/retailers.service";

export function RetailersPage() {
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

export default RetailersPage;

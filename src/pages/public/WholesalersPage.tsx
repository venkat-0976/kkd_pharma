import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHero } from "@/components/common/PageHero";
import { PrivacyNotice } from "@/components/common/PrivacyNotice";
import { DirectoryGrid } from "@/features/directory/DirectoryGrid";
import { ComplianceNoticeDialog } from "@/features/directory/ComplianceNoticeDialog";
import { listWholesalerAreas, listWholesalers } from "@/services/directory/wholesalers.service";

export function WholesalersPage() {
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Wholesalers"
        title="Wholesale distribution members"
        description="Search wholesale and distribution members supplying pharmacies across Kakinada."
      />
      <div className="container-page section-y space-y-6">
        <ComplianceNoticeDialog type="Wholesaler" />
        <PrivacyNotice />
        <DirectoryGrid businesses={listWholesalers()} areas={listWholesalerAreas()} />
      </div>
    </PublicLayout>
  );
}

export default WholesalersPage;

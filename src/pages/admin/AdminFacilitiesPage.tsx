import { useEffect, useState } from "react";
import { FacilityDirectoryTable } from "@/components/admin/FacilityDirectoryTable";
import { adminService } from "@/services/admin/admin.service";
import { Skeleton } from "@/components/ui/skeleton";
import type { HealthcarePartner } from "@/types/directory";

export function AdminFacilitiesPage() {
  const [facilities, setFacilities] = useState<HealthcarePartner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.listFacilities().then((data) => {
      setFacilities(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Healthcare Facilities</h1>
        <p className="text-sm text-muted-foreground">
          {loading ? "Loading facilities…" : `${facilities.length} partner facilities registered.`}
        </p>
      </div>
      {loading ? (
        <Skeleton className="h-80 w-full" />
      ) : (
        <FacilityDirectoryTable facilities={facilities} />
      )}
    </div>
  );
}

export default AdminFacilitiesPage;

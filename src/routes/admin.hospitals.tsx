import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminPageHeader } from "@/features/admin/AdminShell";
import { FacilityDirectoryTable } from "@/features/admin/FacilityDirectoryTable";
import { adminService } from "@/services/admin/admin.service";

export const Route = createFileRoute("/admin/hospitals")({ component: AdminHospitalsPage });

function AdminHospitalsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "facilities", "hospitals"],
    queryFn: () =>
      adminService
        .listFacilities("Multi-speciality hospital")
        .then(async (items) => [
          ...items,
          ...(await adminService.listFacilities("Dental hospital")),
        ]),
  });
  return (
    <div>
      <AdminPageHeader
        title="Hospitals"
        description={data ? `${data.length} hospital registrations.` : "Loading hospitals..."}
      />
      {isLoading || !data ? (
        <Skeleton className="h-80 w-full" />
      ) : (
        <FacilityDirectoryTable facilities={data} />
      )}
    </div>
  );
}

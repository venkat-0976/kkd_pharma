import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminPageHeader } from "@/features/admin/AdminShell";
import { FacilityDirectoryTable } from "@/features/admin/FacilityDirectoryTable";
import { adminService } from "@/services/admin/admin.service";

export const Route = createFileRoute("/admin/blood-banks")({ component: AdminBloodBanksPage });

function AdminBloodBanksPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "facilities", "blood-banks"],
    queryFn: () => adminService.listFacilities("Blood bank"),
  });
  return (
    <div>
      <AdminPageHeader
        title="Blood banks"
        description={data ? `${data.length} registered blood banks.` : "Loading blood banks..."}
      />
      {isLoading || !data ? (
        <Skeleton className="h-80 w-full" />
      ) : (
        <FacilityDirectoryTable facilities={data} />
      )}
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminPageHeader } from "@/features/admin/AdminShell";
import { FacilityDirectoryTable } from "@/features/admin/FacilityDirectoryTable";
import { adminService } from "@/services/admin/admin.service";

export const Route = createFileRoute("/admin/labs")({ component: AdminLabsPage });

function AdminLabsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "facilities", "labs"],
    queryFn: () => adminService.listFacilities("Diagnostic laboratory"),
  });
  return (
    <div>
      <AdminPageHeader
        title="Laboratories"
        description={data ? `${data.length} diagnostic laboratories.` : "Loading laboratories..."}
      />
      {isLoading || !data ? (
        <Skeleton className="h-80 w-full" />
      ) : (
        <FacilityDirectoryTable facilities={data} />
      )}
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminPageHeader } from "@/features/admin/AdminShell";
import { FacilityDirectoryTable } from "@/features/admin/FacilityDirectoryTable";
import { adminService } from "@/services/admin/admin.service";

export const Route = createFileRoute("/admin/doctors")({ component: AdminDoctorsPage });

function AdminDoctorsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "doctors"],
    queryFn: async () => {
      const hospitals = await adminService.listFacilities("Multi-speciality hospital");
      const dental = await adminService.listFacilities("Dental hospital");
      return {
        facilities: [...hospitals, ...dental],
        doctors: [...hospitals, ...dental].flatMap((facility) => facility.doctors ?? []),
      };
    },
  });
  return (
    <div>
      <AdminPageHeader
        title="Doctors"
        description={
          data
            ? `${data.doctors.length} doctors linked to registered hospitals.`
            : "Loading doctors..."
        }
      />
      {isLoading || !data ? (
        <Skeleton className="h-80 w-full" />
      ) : (
        <FacilityDirectoryTable facilities={data.facilities} doctors={data.doctors} />
      )}
    </div>
  );
}

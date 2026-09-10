import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminPageHeader } from "@/features/admin/AdminShell";
import { MemberDirectoryTable } from "@/features/admin/MemberDirectoryTable";
import { adminService } from "@/services/admin/admin.service";

export const Route = createFileRoute("/admin/retailers")({
  head: () => ({
    meta: [
      { title: "Retailer Members — Kakinada Union Admin" },
      { name: "description", content: "Retail pharmacy members registered with the union." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminRetailersPage,
});

function AdminRetailersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "members", "Retailer"],
    queryFn: () => adminService.listMembers("Retailer"),
  });

  return (
    <div>
      <AdminPageHeader
        title="Retailer members"
        description={data ? `${data.length} retail pharmacy members registered.` : "Loading members…"}
      />
      {isLoading || !data ? <Skeleton className="h-80 w-full" /> : <MemberDirectoryTable members={data} />}
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminPageHeader } from "@/features/admin/AdminShell";
import { MemberDirectoryTable } from "@/features/admin/MemberDirectoryTable";
import { adminService } from "@/services/admin/admin.service";

export const Route = createFileRoute("/admin/wholesalers")({
  head: () => ({
    meta: [
      { title: "Wholesaler Members — Kakinada Union Admin" },
      { name: "description", content: "Wholesale distribution members registered with the union." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminWholesalersPage,
});

function AdminWholesalersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "members", "Wholesaler"],
    queryFn: () => adminService.listMembers("Wholesaler"),
  });

  return (
    <div>
      <AdminPageHeader
        title="Wholesaler members"
        description={data ? `${data.length} wholesale members registered.` : "Loading members…"}
      />
      {isLoading || !data ? <Skeleton className="h-80 w-full" /> : <MemberDirectoryTable members={data} />}
    </div>
  );
}

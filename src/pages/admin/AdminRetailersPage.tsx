import { useEffect, useState } from "react";
import { MemberDirectoryTable } from "@/components/admin/MemberDirectoryTable";
import { adminService } from "@/services/admin/admin.service";
import { Skeleton } from "@/components/ui/skeleton";
import type { MemberRecord } from "@/types/member";

export function AdminRetailersPage() {
  const [members, setMembers] = useState<MemberRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.listMembers("Retailer").then((data) => {
      setMembers(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Retailer Members</h1>
        <p className="text-sm text-muted-foreground">
          {loading ? "Loading members…" : `${members.length} retail pharmacy members registered.`}
        </p>
      </div>
      {loading ? <Skeleton className="h-80 w-full" /> : <MemberDirectoryTable members={members} />}
    </div>
  );
}

export default AdminRetailersPage;

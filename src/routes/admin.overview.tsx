import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, ClipboardCheck, Store, Users, Warehouse } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminPageHeader } from "@/features/admin/AdminShell";
import { adminService } from "@/services/admin/admin.service";
import { listRenewalsDue } from "@/services/compliance/compliance.service";
import { formatDate } from "@/lib/expiry";

export const Route = createFileRoute("/admin/overview")({
  head: () => ({
    meta: [
      { title: "Admin Overview — Kakinada Union" },
      { name: "description", content: "Union admin console overview." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminOverviewPage,
});

function AdminOverviewPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: () => adminService.getStats(),
  });

  const renewals = listRenewalsDue();

  if (isLoading || !stats) return <Skeleton className="h-96 w-full" />;

  const cards = [
    { label: "Retailer members", value: stats.retailers, icon: Store },
    { label: "Wholesaler members", value: stats.wholesalers, icon: Warehouse },
    { label: "Total members", value: stats.totalMembers, icon: Users },
    { label: "Pending applications", value: stats.pending, icon: ClipboardCheck },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Union overview"
        description="Membership counts, application status and renewals — non-sensitive data only."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="card-elevated p-5">
              <span className="grid size-10 place-items-center rounded-xl bg-secondary">
                <Icon className="size-5 text-primary" aria-hidden="true" />
              </span>
              <p className="mt-4 text-3xl font-semibold tracking-tight">{card.value}</p>
              <p className="text-sm text-muted-foreground">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="card-elevated p-5">
          <h2 className="text-sm font-semibold">Application status</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Pending approval</dt>
              <dd className="font-semibold">{stats.pending}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Approved</dt>
              <dd className="font-semibold">{stats.approved}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Rejected</dt>
              <dd className="font-semibold">{stats.rejected}</dd>
            </div>
          </dl>
        </div>

        <div className="card-elevated p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <AlertTriangle className="size-4 text-warning-foreground" aria-hidden="true" />
            Renewals due ({renewals.length})
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {renewals.slice(0, 6).map((item) => (
              <li key={item.slug} className="flex items-center justify-between gap-3">
                <span className="truncate">{item.shopName}</span>
                <span
                  className={
                    item.status === "expired" ? "shrink-0 text-destructive" : "shrink-0 text-muted-foreground"
                  }
                >
                  {formatDate(item.renewalDue)}
                </span>
              </li>
            ))}
            {renewals.length === 0 ? (
              <li className="text-muted-foreground">All member renewals are up to date.</li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

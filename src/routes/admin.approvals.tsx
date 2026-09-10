import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminPageHeader } from "@/features/admin/AdminShell";
import { EmptyState } from "@/components/common/EmptyState";
import { formatDate } from "@/lib/expiry";
import { adminService, type ApplicationStatus } from "@/services/admin/admin.service";

export const Route = createFileRoute("/admin/approvals")({
  head: () => ({
    meta: [
      { title: "Membership Approvals — Kakinada Union Admin" },
      { name: "description", content: "Approve or reject pending Kakinada Union membership applications." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminApprovalsPage,
});

const statusStyles: Record<ApplicationStatus, string> = {
  Pending: "border-warning/40 bg-warning/15 text-warning-foreground",
  Approved: "border-success/30 bg-success/10 text-success",
  Rejected: "border-destructive/30 bg-destructive/10 text-destructive",
};

function AdminApprovalsPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "applications"],
    queryFn: () => adminService.listApplications(),
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApplicationStatus }) =>
      adminService.setApplicationStatus(id, status),
    onSuccess: async (_result, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast.success(`Application ${variables.status.toLowerCase()}`);
    },
  });

  if (isLoading || !data) return <Skeleton className="h-96 w-full" />;

  const pending = data.filter((a) => a.status === "Pending");
  const decided = data.filter((a) => a.status !== "Pending");

  return (
    <div>
      <AdminPageHeader
        title="Membership approvals"
        description={`${pending.length} pending · ${data.filter((a) => a.status === "Approved").length} approved · ${data.filter((a) => a.status === "Rejected").length} rejected`}
      />

      {pending.length === 0 ? (
        <EmptyState title="No pending applications" description="Every membership request has been reviewed." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {pending.map((app) => (
            <article key={app.id} className="card-elevated p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-semibold">{app.shopName}</h2>
                  <p className="text-xs text-muted-foreground">
                    {app.businessType} · Applied {formatDate(app.appliedOn)} · {app.id}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[app.status]}`}>
                  {app.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {app.generalAddress}, {app.area}, {app.city}
              </p>
              <div className="mt-5 flex gap-2">
                <Button
                  size="sm"
                  disabled={mutation.isPending}
                  onClick={() => mutation.mutate({ id: app.id, status: "Approved" })}
                >
                  <Check className="size-4" aria-hidden="true" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={mutation.isPending}
                  onClick={() => mutation.mutate({ id: app.id, status: "Rejected" })}
                >
                  <X className="size-4" aria-hidden="true" />
                  Reject
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}

      <h2 className="mt-8 text-sm font-semibold">Decision history</h2>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-border bg-surface/70">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Application</th>
              <th className="px-4 py-3 font-semibold">Shop / firm</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {decided.map((app) => (
              <tr key={app.id} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-3 text-muted-foreground">{app.id}</td>
                <td className="px-4 py-3 font-medium">{app.shopName}</td>
                <td className="px-4 py-3 text-muted-foreground">{app.businessType}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[app.status]}`}>
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
            {decided.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  No decisions recorded yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

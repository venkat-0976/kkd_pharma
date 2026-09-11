import { Link } from "react-router-dom";
import {
  Bell,
  Building2,
  FileText,
  IdCard,
  ShieldCheck,
  Store,
  Users,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { MemberPageHeader } from "@/components/layout/AuthenticatedPortalLayout";
import { RetailerOverviewCard } from "@/components/retailer/RetailerOverviewCard";
import { useMemberRecord } from "@/hooks/useMemberRecord";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/expiry";

export function Dashboard() {
  const { data: record, isLoading } = useMemberRecord();

  if (isLoading || !record) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-28 w-full rounded-2xl" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
      </div>
    );
  }

  const { profile, owners, pharmacists, employees, documents, preferences } = record;
  const activeAlerts = record ? Object.values(record.licences).filter((l) => l.number) : [];
  const reminderDays = preferences?.reminderDays ?? [60, 30, 15, 7];

  return (
    <div className="space-y-6">
      <MemberPageHeader
        title={`Welcome, ${profile.shopName}`}
        description={`Retail Pharmacy Portal · Member ID: ${profile.memberId} · Status: ${profile.status}`}
        action={
          <Button asChild>
            <Link to="/retailer/profile">
              <Store className="size-4" aria-hidden="true" />
              Manage Profile
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <RetailerOverviewCard
          title="Owners & Partners"
          count={owners.length}
          subtitle="Registered proprietors"
          icon={Users}
        />
        <RetailerOverviewCard
          title="Registered Pharmacists"
          count={pharmacists.length}
          subtitle="Licensed dispensing staff"
          icon={Building2}
        />
        <RetailerOverviewCard
          title="Employees"
          count={employees.length}
          subtitle="Support & counter staff"
          icon={IdCard}
        />
        <RetailerOverviewCard
          title="Vault Documents"
          count={documents.length}
          subtitle="Uploaded compliance records"
          icon={FileText}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-foreground">Business Overview</h2>
            <Link
              to="/retailer/profile"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              View details <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border/80 bg-surface/50 p-3.5">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Firm / Registration No.
              </dt>
              <dd className="mt-1 text-sm font-semibold text-foreground">
                {profile.firmNumber || "Not provided"}
              </dd>
            </div>
            <div className="rounded-xl border border-border/80 bg-surface/50 p-3.5">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Business Mobile
              </dt>
              <dd className="mt-1 text-sm font-semibold text-foreground">
                {profile.businessMobile || "Not provided"}
              </dd>
            </div>
            <div className="rounded-xl border border-border/80 bg-surface/50 p-3.5">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Public Owner Name
              </dt>
              <dd className="mt-1 text-sm font-semibold text-foreground">
                {profile.publicOwnerName || "Not provided"}
              </dd>
            </div>
            <div className="rounded-xl border border-border/80 bg-surface/50 p-3.5">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Established Year
              </dt>
              <dd className="mt-1 text-sm font-semibold text-foreground">
                {profile.establishedYear || "Not provided"}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3 border-t border-border/70 pt-5">
            <Button asChild variant="outline" size="sm">
              <Link to="/retailer/licences">
                <ShieldCheck className="size-4" /> Licences & Compliance
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/retailer/documents">
                <FileText className="size-4" /> Upload Documents
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/retailer/directory">
                <Users className="size-4" /> Union Directory
              </Link>
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-base font-bold text-foreground">
              <Bell className="size-4 text-primary" />
              Compliance Alerts
            </h2>
            <Link
              to="/retailer/alerts"
              className="text-xs font-semibold text-primary hover:underline"
            >
              All Alerts
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {pharmacists.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                No pharmacists registered. Add registered pharmacist to receive licence expiry
                alerts.
              </div>
            ) : (
              pharmacists.map((ph) => (
                <div
                  key={ph.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-border/80 bg-surface/40 p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-foreground">{ph.fullName}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      Licence: {ph.licenceNumber}
                    </p>
                  </div>
                  <span className="shrink-0 text-[11px] font-medium text-muted-foreground">
                    Exp: {formatDate(ph.licenceExpiry)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

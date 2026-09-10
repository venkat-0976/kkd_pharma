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
  Warehouse,
} from "lucide-react";
import { MemberPageHeader } from "@/layouts/AuthenticatedPortalLayout";
import { WholesalerOverviewCard } from "@/components/wholesaler/WholesalerOverviewCard";
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

  const { profile, owners, pharmacists, employees, documents } = record;

  return (
    <div className="space-y-6">
      <MemberPageHeader
        title={`Welcome, ${profile.shopName}`}
        description={`Wholesale Distribution Portal · Member ID: ${profile.memberId} · Status: ${profile.status}`}
        action={
          <Button asChild>
            <Link to="/wholesaler/profile">
              <Warehouse className="size-4" aria-hidden="true" />
              Manage Profile
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <WholesalerOverviewCard
          title="Owners & Partners"
          count={owners.length}
          subtitle="Registered proprietors"
          icon={Users}
        />
        <WholesalerOverviewCard
          title="Competent Persons"
          count={pharmacists.length}
          subtitle="Technical & dispensing staff"
          icon={Building2}
        />
        <WholesalerOverviewCard
          title="Staff & Employees"
          count={employees.length}
          subtitle="Warehouse & sales staff"
          icon={IdCard}
        />
        <WholesalerOverviewCard
          title="Vault Documents"
          count={documents.length}
          subtitle="Compliance & licence files"
          icon={FileText}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-foreground">
              Wholesale Business Profile
            </h2>
            <Link
              to="/wholesaler/profile"
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
              <Link to="/wholesaler/licences">
                <ShieldCheck className="size-4" /> Licences & Compliance
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/wholesaler/competent-person">
                <Users className="size-4" /> Competent Persons
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/wholesaler/documents">
                <FileText className="size-4" /> Documents Vault
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/wholesaler/directory">
                <Users className="size-4" /> Member Directory
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
              to="/wholesaler/alerts"
              className="text-xs font-semibold text-primary hover:underline"
            >
              All Alerts
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {pharmacists.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                No competent persons registered. Add qualified staff to receive licence reminders.
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

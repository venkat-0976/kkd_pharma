import { Link } from "react-router-dom";
import {
  FileText,
  History,
  ShieldCheck,
  User,
  AlertCircle,
  Building2,
  Calendar,
  Phone,
  Mail,
} from "lucide-react";
import { MemberPageHeader } from "@/layouts/AuthenticatedPortalLayout";
import { PharmacistOverviewCard } from "@/components/pharmacist/PharmacistOverviewCard";
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
      </div>
    );
  }

  const primaryPharmacist = record.pharmacists[0];

  return (
    <div className="space-y-6">
      <MemberPageHeader
        title={`Welcome, ${primaryPharmacist?.fullName || record.profile.shopName}`}
        description="Registered Pharmacist Portal · Practice Certification & Compliance Management"
        action={
          <Button asChild>
            <Link to="/pharmacist/profile">
              <User className="size-4" aria-hidden="true" />
              My Profile
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <PharmacistOverviewCard
          title="Registration Status"
          count={primaryPharmacist ? "Active" : "Pending"}
          subtitle={
            primaryPharmacist ? `Licence ${primaryPharmacist.licenceNumber}` : "Not registered"
          }
          icon={ShieldCheck}
          variant="success"
        />
        <PharmacistOverviewCard
          title="Saved Documents"
          count={record.documents.length}
          subtitle="Certificates & Registrations"
          icon={FileText}
        />
        <PharmacistOverviewCard
          title="Affiliated Firm"
          count={record.profile.shopName ? "1" : "0"}
          subtitle={record.profile.shopName || "Self-employed"}
          icon={Building2}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <h2 className="font-display text-base font-bold text-foreground">
            Professional Profile Overview
          </h2>

          {primaryPharmacist ? (
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border/80 bg-surface/50 p-3.5">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Pharmacist Name
                </dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">
                  {primaryPharmacist.fullName}
                </dd>
              </div>
              <div className="rounded-xl border border-border/80 bg-surface/50 p-3.5">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Licence Number
                </dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">
                  {primaryPharmacist.licenceNumber}
                </dd>
              </div>
              <div className="rounded-xl border border-border/80 bg-surface/50 p-3.5">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Licence Expiry
                </dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">
                  {formatDate(primaryPharmacist.licenceExpiry)}
                </dd>
              </div>
              <div className="rounded-xl border border-border/80 bg-surface/50 p-3.5">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Contact Mobile
                </dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">
                  {primaryPharmacist.mobile || record.profile.businessMobile}
                </dd>
              </div>
            </dl>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
              Please complete your professional pharmacist profile details.
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3 border-t border-border/70 pt-5">
            <Button asChild variant="outline" size="sm">
              <Link to="/pharmacist/documents">
                <FileText className="size-4" /> View Documents
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/pharmacist/employment-history">
                <History className="size-4" /> Employment History
              </Link>
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="flex items-center gap-2 font-display text-base font-bold text-foreground">
            <ShieldCheck className="size-4 text-primary" />
            Compliance Status
          </h2>

          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-border/80 bg-surface/40 p-4">
              <p className="text-xs font-semibold text-foreground">State Pharmacy Council</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Registration certified and active for clinical &amp; retail dispensing.
              </p>
            </div>
            <div className="rounded-xl border border-border/80 bg-surface/40 p-4">
              <p className="text-xs font-semibold text-foreground">Periodic Renewal Notice</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Automatic renewal alerts will trigger 60, 30, and 15 days before expiration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

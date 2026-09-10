import { Link } from "react-router-dom";
import { BellRing, CalendarClock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { MemberPageHeader } from "@/layouts/AuthenticatedPortalLayout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { useMemberRecord } from "@/hooks/useMemberRecord";
import { buildAlerts } from "@/services/member/member.service";
import { expiryPhrase, formatDate } from "@/lib/expiry";

export function AlertsPage() {
  const { data: record, isLoading } = useMemberRecord();

  if (isLoading || !record) return <Skeleton className="h-80 w-full" />;

  const alerts = buildAlerts(record);
  const expired = alerts.filter((a) => a.status === "expired");
  const expiring = alerts.filter((a) => a.status === "expiring");
  const valid = alerts.filter((a) => a.status === "valid");

  const groups = [
    { title: "Expired — act now", items: expired },
    { title: "Expiring soon", items: expiring },
    { title: "Upcoming renewals", items: valid },
  ].filter((g) => g.items.length > 0);

  return (
    <div className="space-y-6">
      <MemberPageHeader
        title="Expiry Alerts"
        description={`Reminders are generated ${record.preferences.reminderDays
          .slice()
          .sort((a, b) => b - a)
          .join(", ")} days before each renewal date.`}
        action={
          <Button variant="outline" asChild>
            <Link to="/wholesaler/settings">Reminder settings</Link>
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Expired", value: expired.length },
          { label: "Expiring soon", value: expiring.length },
          { label: "Tracked items", value: alerts.length },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border/80 bg-gradient-to-b from-surface/80 to-surface/40 px-4 py-3.5"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-1.5 font-display text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {groups.length === 0 ? (
        <EmptyState
          title="Nothing to renew"
          description="Add licence expiry dates so the portal can remind you before they lapse."
        />
      ) : (
        groups.map((group) => (
          <section key={group.title} className="space-y-3">
            <h2 className="flex items-center gap-2 font-display text-base font-bold">
              <BellRing className="size-4 text-primary" aria-hidden="true" />
              {group.title}
            </h2>
            <ul className="space-y-3">
              {group.items.map((alert) => (
                <li
                  key={alert.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{alert.label}</p>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                      <CalendarClock className="size-3.5" aria-hidden="true" />
                      {formatDate(alert.expiryDate)} · {expiryPhrase(alert.expiryDate)}
                    </p>
                  </div>
                  <StatusBadge status={alert.status} />
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}

export default AlertsPage;

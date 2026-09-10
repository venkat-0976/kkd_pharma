import { AlertTriangle, CircleCheck, CircleSlash, Clock } from "lucide-react";
import type { ExpiryStatus } from "@/types/member";
import { statusLabel } from "@/lib/expiry";
import { cn } from "@/lib/utils";

const styles: Record<ExpiryStatus, string> = {
  valid: "border-success/30 bg-success/10 text-success",
  expiring: "border-warning/40 bg-warning/15 text-warning-foreground",
  expired: "border-destructive/30 bg-destructive/10 text-destructive",
  missing: "border-border bg-muted text-muted-foreground",
};

const icons: Record<ExpiryStatus, typeof CircleCheck> = {
  valid: CircleCheck,
  expiring: Clock,
  expired: AlertTriangle,
  missing: CircleSlash,
};

export function StatusBadge({ status, className }: { status: ExpiryStatus; className?: string }) {
  const Icon = icons[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
        styles[status],
        className,
      )}
    >
      <Icon className="size-3.5 shrink-0" aria-hidden="true" />
      {statusLabel[status]}
    </span>
  );
}

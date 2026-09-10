import { useEffect, useState } from "react";
import { AlertTriangle, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/expiry";
import { listRenewalsDue } from "@/services/compliance/compliance.service";
import type { BusinessType } from "@/types/directory";

/**
 * Public renewal notice.
 *
 * Shown once per browsing session on the Retailers / Wholesalers tabs of the
 * open website. It lists only the shop name, area and renewal date — no
 * licence numbers, documents or private contact details are ever included.
 */
export function ComplianceNoticeDialog({ type }: { type: BusinessType }) {
  const [open, setOpen] = useState(false);
  const items = listRenewalsDue(type);

  useEffect(() => {
    if (items.length === 0) return;
    const key = `ku.renewal.notice.${type}`;
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(key)) return;
    window.sessionStorage.setItem(key, "1");
    const timer = window.setTimeout(() => setOpen(true), 700);
    return () => window.clearTimeout(timer);
  }, [type, items.length]);

  if (items.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-warning-foreground" aria-hidden="true" />
            {type} renewal notice
          </DialogTitle>
          <DialogDescription>
            These {type.toLowerCase()} members have a union document renewal that is due or overdue.
            Renewal dates only — no licence or personal details are published.
          </DialogDescription>
        </DialogHeader>

        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.slug}
              className="flex items-start justify-between gap-3 rounded-xl border border-border bg-surface/60 p-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{item.shopName}</p>
                <p className="text-xs text-muted-foreground">
                  {item.area}, {item.city}
                </p>
              </div>
              <span
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                  item.status === "expired"
                    ? "border-destructive/30 bg-destructive/10 text-destructive"
                    : "border-warning/40 bg-warning/15 text-warning-foreground"
                }`}
              >
                <Clock className="size-3.5" aria-hidden="true" />
                {item.status === "expired" ? "Overdue" : "Due"} {formatDate(item.renewalDue)}
              </span>
            </li>
          ))}
        </ul>

        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

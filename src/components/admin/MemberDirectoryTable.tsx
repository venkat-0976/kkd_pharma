import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/expiry";
import type { MemberSummary } from "@/services/admin/admin.service";

function RenewalPill({ member }: { member: MemberSummary }) {
  const { status, renewalDue } = member.renewal;
  const styles =
    status === "expired"
      ? "border-destructive/30 bg-destructive/10 text-destructive"
      : status === "expiring"
        ? "border-warning/40 bg-warning/15 text-warning-foreground"
        : "border-success/30 bg-success/10 text-success";
  const label =
    status === "expired" ? "Overdue" : status === "expiring" ? "Due soon" : "Up to date";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${styles}`}
    >
      {label} · {formatDate(renewalDue)}
    </span>
  );
}

/** Non-sensitive member directory: name, type, general address and renewal status only. */
export function MemberDirectoryTable({ members }: { members: MemberSummary[] }) {
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      (m) =>
        m.shopName.toLowerCase().includes(q) ||
        m.area.toLowerCase().includes(q) ||
        m.generalAddress.toLowerCase().includes(q),
    );
  }, [members, query]);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by shop name or area"
        aria-label="Search members"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="sm:max-w-sm"
      />

      <div className="overflow-x-auto rounded-2xl border border-border bg-surface/70">
        <table className="w-full min-w-[42rem] text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Shop / firm</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">General address</th>
              <th className="px-4 py-3 font-semibold">Membership</th>
              <th className="px-4 py-3 font-semibold">Renewal</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.slug} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-3 font-medium">{m.shopName}</td>
                <td className="px-4 py-3 text-muted-foreground">{m.businessType}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {m.generalAddress}, {m.area}, {m.city}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                    {m.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <RenewalPill member={m} />
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  No members match that search.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground">
        Only non-sensitive business details are shown here. Licence numbers, GST data, Aadhaar and
        uploaded documents are never exposed in the admin directory.
      </p>
    </div>
  );
}

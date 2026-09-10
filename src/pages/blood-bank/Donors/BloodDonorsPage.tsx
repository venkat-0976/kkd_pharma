import { FileText, Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MemberPageHeader } from "@/layouts/AuthenticatedPortalLayout";

const rows = [
  ["Registered donors", "342 donors", "This year", "Active"],
  ["Eligible donors", "218 donors", "Ready to contact", "Active"],
];

export function BloodDonorsPage() {
  return (
    <div className="space-y-6">
      <MemberPageHeader
        title="Donors"
        description="Manage donor records and eligibility information securely."
      />
      <section className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div className="flex items-center gap-2">
            <FileText className="size-5 text-primary" aria-hidden="true" />
            <h2 className="font-semibold">Donors list</h2>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="size-4" aria-hidden="true" /> Add record
          </Button>
        </div>
        <table className="w-full min-w-2xl text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              {["Name / group", "Details", "Reference", "Status"].map((h) => (
                <th key={h} className="px-5 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-b border-border/60 last:border-0">
                {row.map((cell) => (
                  <td
                    key={cell}
                    className="px-5 py-3 text-muted-foreground first:font-medium first:text-foreground"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Pencil className="size-3.5" aria-hidden="true" /> Donor data is private and managed
        securely.
      </p>
    </div>
  );
}

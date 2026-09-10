import { MapPin, Pencil, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MemberPageHeader } from "@/layouts/AuthenticatedPortalLayout";

export function BloodBankAddressPage() {
  const fields = ["Building", "Street", "Area", "City", "District", "Pincode"];
  return (
    <div className="space-y-6">
      <MemberPageHeader
        title="Address details"
        description="Keep the blood bank location and contact information current."
        action={<Button><Save className="size-4" aria-hidden="true" /> Save changes</Button>}
      />
      <section className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
            <MapPin className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-semibold">Address information</h2>
            <p className="text-sm text-muted-foreground">Editable address information</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field}>
              <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{field}</Label>
              <Input className="mt-2" placeholder={`Enter ${field.toLowerCase()}`} />
            </div>
          ))}
        </div>
      </section>
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Pencil className="size-3.5" aria-hidden="true" /> Changes are reviewed by authorised union administrators.
      </p>
    </div>
  );
}

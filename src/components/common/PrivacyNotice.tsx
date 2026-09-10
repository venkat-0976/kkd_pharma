import { ShieldCheck } from "lucide-react";

/**
 * Rendered on public directory pages to make the public/private boundary
 * explicit. Sensitive member data is never fetched or rendered here.
 */
export function PrivacyNotice({
  message = "Only business information approved for public listing is shown here. Licence numbers, documents, owner and pharmacist personal contacts stay inside the secure member area.",
}: {
  message?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 text-sm text-muted-foreground">
      <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

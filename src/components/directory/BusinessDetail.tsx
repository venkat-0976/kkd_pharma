import { Link } from "react-router-dom";
import { ArrowLeft, Building2, CalendarDays, MapPin, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PrivacyNotice } from "@/components/common/PrivacyNotice";
import type { PublicBusiness } from "@/types/directory";

/**
 * Public business detail view. Only public-approved fields are received here —
 * private licence and document data is never fetched for public pages.
 */
export function BusinessDetail({ business }: { business: PublicBusiness }) {
  const backTo = business.businessType === "Retailer" ? "/retailers" : "/wholesalers";

  return (
    <div className="container-page section-y">
      <Button asChild variant="ghost" className="mb-6 -ml-3">
        <Link to={backTo}>
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to {business.businessType === "Retailer" ? "retailers" : "wholesalers"}
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <Badge variant="secondary">{business.businessType}</Badge>
          <h1 className="mt-3 text-3xl font-bold">{business.shopName}</h1>
          {business.about ? <p className="mt-4 text-muted-foreground">{business.about}</p> : null}

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="card-elevated p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                General address
              </p>
              <p className="mt-2 flex items-start gap-2 text-sm">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                {business.generalAddress}, {business.area}, {business.city}
              </p>
            </div>
            <div className="card-elevated p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Business contact
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm">
                <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
                {business.publicPhone ?? "Not published"}
              </p>
            </div>
            <div className="card-elevated p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Proprietor
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm">
                <Building2 className="size-4 shrink-0 text-primary" aria-hidden="true" />
                {business.publicOwnerName ?? "Not published"}
              </p>
            </div>
            <div className="card-elevated p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Established
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm">
                <CalendarDays className="size-4 shrink-0 text-primary" aria-hidden="true" />
                {business.established ?? "—"}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {business.categories.map((c) => (
              <Badge key={c} variant="outline" className="font-normal">
                {c}
              </Badge>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <PrivacyNotice />
          <div className="card-elevated p-5">
            <h2 className="text-base font-semibold">Is this your firm?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to update your business profile, owners, pharmacists, licences and documents.
            </p>
            <Button asChild className="mt-4 w-full">
              <Link to="/login">Member Login</Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

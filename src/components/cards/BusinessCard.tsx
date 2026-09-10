import { Link } from "react-router-dom";
import { MapPin, Phone, Store, Warehouse } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PublicBusiness } from "@/types/directory";

/**
 * Public business card. Renders public-approved fields only —
 * never licence numbers, documents or personal contact details.
 */
export function BusinessCard({ business }: { business: PublicBusiness }) {
  const isRetailer = business.businessType === "Retailer";
  const Icon = isRetailer ? Store : Warehouse;
  const detailPath = isRetailer ? `/retailers/${business.slug}` : `/wholesalers/${business.slug}`;

  return (
    <article className="card-elevated card-elevated-hover flex h-full flex-col p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold">{business.shopName}</h3>
          <Badge variant="secondary" className="mt-1.5">
            {business.businessType}
          </Badge>
        </div>
      </div>

      <dl className="mt-4 space-y-2 text-sm text-muted-foreground">
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <dd>
            {business.generalAddress}, {business.area}, {business.city}
          </dd>
        </div>
        {business.publicPhone ? (
          <div className="flex items-center gap-2">
            <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <dd>{business.publicPhone}</dd>
          </div>
        ) : null}
        {business.publicOwnerName ? (
          <div className="flex items-center gap-2">
            <span className="text-foreground/70">Proprietor:</span>
            <dd>{business.publicOwnerName}</dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {business.categories.map((c) => (
          <Badge key={c} variant="outline" className="font-normal">
            {c}
          </Badge>
        ))}
      </div>

      <div className="mt-6 pt-1">
        <Button asChild variant="outline" className="w-full">
          <Link to={detailPath}>View Business</Link>
        </Button>
      </div>
    </article>
  );
}

import { MapPin, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PublicOrganisation } from "@/types/directory";

/** Generic public card for hospitals, doctors, labs and insurance programmes. */
export function OrganisationCard({ organisation }: { organisation: PublicOrganisation }) {
  return (
    <article className="card-elevated card-elevated-hover flex h-full flex-col p-5">
      <Badge variant="secondary" className="w-fit">
        {organisation.category}
      </Badge>
      <h3 className="mt-3 text-base font-semibold">{organisation.name}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{organisation.description}</p>

      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
          {organisation.area}, {organisation.city}
        </p>
        {organisation.publicPhone ? (
          <p className="flex items-center gap-2">
            <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
            {organisation.publicPhone}
          </p>
        ) : null}
      </div>

      {organisation.specialities?.length ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {organisation.specialities.map((s) => (
            <Badge key={s} variant="outline" className="font-normal">
              {s}
            </Badge>
          ))}
        </div>
      ) : null}
    </article>
  );
}

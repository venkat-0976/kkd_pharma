import { GraduationCap, Network, Newspaper, Pill, ShieldCheck, Users } from "lucide-react";
import type { AssociationService } from "@/services/association/association.service";

const icons = {
  pill: Pill,
  users: Users,
  network: Network,
  shield: ShieldCheck,
  graduation: GraduationCap,
  newspaper: Newspaper,
};

export function ServiceCard({ service }: { service: AssociationService }) {
  const Icon = icons[service.icon];
  return (
    <article className="card-elevated card-elevated-hover h-full p-6">
      <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-base font-semibold">{service.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
    </article>
  );
}

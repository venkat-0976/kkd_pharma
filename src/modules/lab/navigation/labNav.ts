import { FileText, FlaskConical, ListChecks, MapPin, Users } from "lucide-react";
import type { NavItem } from "@/layouts/AuthenticatedPortalLayout";

export const labNav: NavItem[] = [
  { label: "Laboratory details", short: "Details", to: "/lab", icon: FlaskConical },
  { label: "Address details", short: "Address", to: "/lab/address", icon: MapPin },
  { label: "Tests & services", short: "Services", to: "/lab/services", icon: ListChecks },
  { label: "Staff", short: "Staff", to: "/lab/staff", icon: Users },
  { label: "Documents", short: "Docs", to: "/lab/documents", icon: FileText },
];

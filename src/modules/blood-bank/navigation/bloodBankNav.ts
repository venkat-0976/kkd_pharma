import { Droplets, FileText, ListChecks, MapPin, Users } from "lucide-react";
import type { NavItem } from "@/layouts/AuthenticatedPortalLayout";

export const bloodBankNav: NavItem[] = [
  { label: "Blood bank details", short: "Details", to: "/blood-bank", icon: Droplets },
  { label: "Address details", short: "Address", to: "/blood-bank/address", icon: MapPin },
  { label: "Blood inventory", short: "Inventory", to: "/blood-bank/inventory", icon: ListChecks },
  { label: "Donors", short: "Donors", to: "/blood-bank/donors", icon: Users },
  { label: "Documents", short: "Docs", to: "/blood-bank/documents", icon: FileText },
];

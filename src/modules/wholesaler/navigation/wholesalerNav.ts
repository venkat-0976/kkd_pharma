import {
  Bell,
  Building2,
  FileText,
  IdCard,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import type { NavItem } from "@/layouts/AuthenticatedPortalLayout";

export const wholesalerNav: NavItem[] = [
  { label: "Company", short: "Company", to: "/wholesaler/profile", icon: UserRound },
  { label: "Owners & Partners", short: "Owners", to: "/wholesaler/owners", icon: Users },
  { label: "Pharmacists", short: "Pharma", to: "/wholesaler/pharmacists", icon: Building2 },
  { label: "Employees", short: "Staff", to: "/wholesaler/employees", icon: IdCard },
  { label: "Licences & Compliance", short: "Licences", to: "/wholesaler/licences", icon: ShieldCheck },
  { label: "Documents", short: "Docs", to: "/wholesaler/documents", icon: FileText },
  { label: "Directory", short: "Directory", to: "/wholesaler/directory", icon: Users },
  { label: "Expiry Alerts", short: "Alerts", to: "/wholesaler/alerts", icon: Bell },
  { label: "Settings", short: "Settings", to: "/wholesaler/settings", icon: Settings },
];

export const wholesalerMobileNav = wholesalerNav.filter((item) =>
  ["/wholesaler/profile", "/wholesaler/documents", "/wholesaler/licences", "/wholesaler/alerts"].includes(item.to),
);

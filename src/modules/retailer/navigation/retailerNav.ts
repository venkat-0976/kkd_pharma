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

export const retailerNav: NavItem[] = [
  { label: "Company", short: "Company", to: "/retailer/profile", icon: UserRound },
  { label: "Owners & Partners", short: "Owners", to: "/retailer/owners", icon: Users },
  { label: "Pharmacists", short: "Pharma", to: "/retailer/pharmacists", icon: Building2 },
  { label: "Employees", short: "Staff", to: "/retailer/employees", icon: IdCard },
  { label: "Licences & Compliance", short: "Licences", to: "/retailer/licences", icon: ShieldCheck },
  { label: "Documents", short: "Docs", to: "/retailer/documents", icon: FileText },
  { label: "Directory", short: "Directory", to: "/retailer/directory", icon: Users },
  { label: "Expiry Alerts", short: "Alerts", to: "/retailer/alerts", icon: Bell },
  { label: "Settings", short: "Settings", to: "/retailer/settings", icon: Settings },
];

export const retailerMobileNav = retailerNav.filter((item) =>
  ["/retailer/profile", "/retailer/documents", "/retailer/licences", "/retailer/alerts"].includes(item.to),
);

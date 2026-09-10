import { LayoutDashboard, UserRound, FileText, History, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  short: string;
  to: string;
  icon: LucideIcon;
}

export const pharmacistNav: NavItem[] = [
  { label: "Dashboard", short: "Dash", to: "/pharmacist/dashboard", icon: LayoutDashboard },
  { label: "Profile", short: "Profile", to: "/pharmacist/profile", icon: UserRound },
  { label: "Documents", short: "Docs", to: "/pharmacist/documents", icon: FileText },
  {
    label: "Employment History",
    short: "History",
    to: "/pharmacist/employment-history",
    icon: History,
  },
  { label: "Settings", short: "Settings", to: "/pharmacist/settings", icon: Settings },
];

export const pharmacistMobileNav = pharmacistNav;

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
import type { LoginType } from "@/services/auth/auth.service";
import { hospitalPortal } from "@/portals/hospital";
import { doctorPortal } from "@/portals/doctor";
import { labPortal } from "@/portals/lab";
import { bloodBankPortal } from "@/portals/blood-bank";

export interface MemberNavItem {
  label: string;
  short: string;
  to: string;
  icon: typeof UserRound;
}

export const memberNav: MemberNavItem[] = [
  { label: "Company", short: "Company", to: "/member/profile", icon: UserRound },
  { label: "Owners & Partners", short: "Owners", to: "/member/owners", icon: Users },
  { label: "Pharmacists", short: "Pharma", to: "/member/pharmacists", icon: Building2 },
  { label: "Employees", short: "Staff", to: "/member/employees", icon: IdCard },
  { label: "Licences & Compliance", short: "Licences", to: "/member/licences", icon: ShieldCheck },
  { label: "Documents", short: "Docs", to: "/member/documents", icon: FileText },
  { label: "Directory", short: "Directory", to: "/member/directory", icon: Users },
  // Address is edited on the Profile tab. Uncomment to restore this sidebar item:
  // { label: "Shop Address", short: "Address", to: "/member/address", icon: MapPin },
  { label: "Expiry Alerts", short: "Alerts", to: "/member/alerts", icon: Bell },
  { label: "Settings", short: "Settings", to: "/member/settings", icon: Settings },
];

/** Items shown in the mobile bottom bar (the rest live in the drawer). */
export const mobileNav = memberNav.filter((item) =>
  ["/member/profile", "/member/documents", "/member/licences", "/member/alerts"].includes(item.to),
);

export const roleNav: Record<
  Exclude<LoginType, "Admin" | "Retailer" | "Wholesaler">,
  MemberNavItem[]
> = {
  Hospital: hospitalPortal.tabs,
  Doctor: doctorPortal.tabs,
  Lab: labPortal.tabs,
  "Blood bank": bloodBankPortal.tabs,
};

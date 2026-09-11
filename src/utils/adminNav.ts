import {
  ClipboardCheck,
  FlaskConical,
  HeartPulse,
  Hospital,
  LayoutDashboard,
  Store,
  Warehouse,
} from "lucide-react";

export interface AdminNavItem {
  label: string;
  short: string;
  to: string;
  icon: typeof Store;
}

export const adminNav: AdminNavItem[] = [
  { label: "Overview", short: "Overview", to: "/admin/overview", icon: LayoutDashboard },
  { label: "Retailers", short: "Retailers", to: "/admin/retailers", icon: Store },
  { label: "Wholesalers", short: "Wholesalers", to: "/admin/wholesalers", icon: Warehouse },
  { label: "Hospitals", short: "Hospitals", to: "/admin/hospitals", icon: Hospital },
  { label: "Doctors", short: "Doctors", to: "/admin/doctors", icon: HeartPulse },
  { label: "Labs", short: "Labs", to: "/admin/labs", icon: FlaskConical },
  { label: "Blood banks", short: "Blood banks", to: "/admin/blood-banks", icon: HeartPulse },
  {
    label: "Membership approvals",
    short: "Approvals",
    to: "/admin/approvals",
    icon: ClipboardCheck,
  },
];

import { ClipboardList, FileText, HeartPulse, Hospital, MapPin } from "lucide-react";
import type { NavItem } from "@/layouts/AuthenticatedPortalLayout";

export const hospitalNav: NavItem[] = [
  { label: "Hospital details", short: "Details", to: "/hospital", icon: Hospital },
  { label: "Address details", short: "Address", to: "/hospital/address", icon: MapPin },
  { label: "Doctors", short: "Doctors", to: "/hospital/doctors", icon: HeartPulse },
  { label: "Patients", short: "Patients", to: "/hospital/patients", icon: ClipboardList },
  { label: "Documents", short: "Docs", to: "/hospital/documents", icon: FileText },
];

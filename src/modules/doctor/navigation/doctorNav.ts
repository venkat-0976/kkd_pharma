import { ClipboardList, FileText, Hospital, UserRound } from "lucide-react";
import type { NavItem } from "@/layouts/AuthenticatedPortalLayout";

export const doctorNav: NavItem[] = [
  { label: "Professional profile", short: "Profile", to: "/doctor", icon: UserRound },
  { label: "Hospital affiliation", short: "Hospital", to: "/doctor/hospital", icon: Hospital },
  { label: "Patients", short: "Patients", to: "/doctor/patients", icon: ClipboardList },
  { label: "Documents", short: "Docs", to: "/doctor/documents", icon: FileText },
];

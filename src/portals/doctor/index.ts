import { ClipboardList, FileText, Hospital, UserRound } from "lucide-react";
import type { PortalDefinition } from "@/portals/types";

export const doctorPortal: PortalDefinition = {
  title: "Doctor member portal",
  description: "Manage your professional profile, affiliations, patients and credentials.",
  tabs: [
    { label: "Professional profile", short: "Profile", to: "/member/doctor", icon: UserRound },
    {
      label: "Hospital affiliation",
      short: "Hospital",
      to: "/member/doctor-hospital",
      icon: Hospital,
    },
    { label: "Patients", short: "Patients", to: "/member/doctor-patients", icon: ClipboardList },
    { label: "Documents", short: "Docs", to: "/member/role-documents", icon: FileText },
  ],
};

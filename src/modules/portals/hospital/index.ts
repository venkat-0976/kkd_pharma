import { ClipboardList, FileText, HeartPulse, Hospital, MapPin } from "lucide-react";
import type { PortalDefinition } from "@/portals/types";

export const hospitalPortal: PortalDefinition = {
  title: "Hospital member portal",
  description: "Manage hospital registration, doctors, patients and required records.",
  tabs: [
    { label: "Hospital details", short: "Details", to: "/member/hospital", icon: Hospital },
    { label: "Address details", short: "Address", to: "/member/hospital-address", icon: MapPin },
    { label: "Doctors", short: "Doctors", to: "/member/hospital-doctors", icon: HeartPulse },
    { label: "Patients", short: "Patients", to: "/member/hospital-patients", icon: ClipboardList },
    { label: "Documents", short: "Docs", to: "/member/role-documents", icon: FileText },
  ],
};

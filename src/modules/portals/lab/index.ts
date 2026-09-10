import { FileText, FlaskConical, ListChecks, MapPin, Users } from "lucide-react";
import type { PortalDefinition } from "@/portals/types";

export const labPortal: PortalDefinition = {
  title: "Laboratory member portal",
  description: "Manage laboratory registration, services, staff and certificates.",
  tabs: [
    { label: "Laboratory details", short: "Details", to: "/member/lab", icon: FlaskConical },
    { label: "Address details", short: "Address", to: "/member/lab-address", icon: MapPin },
    { label: "Tests & services", short: "Services", to: "/member/lab-services", icon: ListChecks },
    { label: "Staff", short: "Staff", to: "/member/lab-staff", icon: Users },
    { label: "Documents", short: "Docs", to: "/member/role-documents", icon: FileText },
  ],
};

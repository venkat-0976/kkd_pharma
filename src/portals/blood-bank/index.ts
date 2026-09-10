import { Droplets, FileText, ListChecks, MapPin, Users } from "lucide-react";
import type { PortalDefinition } from "@/portals/types";

export const bloodBankPortal: PortalDefinition = {
  title: "Blood bank member portal",
  description: "Manage blood bank registration, inventory, donors and certificates.",
  tabs: [
    { label: "Blood bank details", short: "Details", to: "/member/blood-bank", icon: Droplets },
    { label: "Address details", short: "Address", to: "/member/blood-bank-address", icon: MapPin },
    {
      label: "Blood inventory",
      short: "Inventory",
      to: "/member/blood-inventory",
      icon: ListChecks,
    },
    { label: "Donors", short: "Donors", to: "/member/blood-donors", icon: Users },
    { label: "Documents", short: "Docs", to: "/member/role-documents", icon: FileText },
  ],
};

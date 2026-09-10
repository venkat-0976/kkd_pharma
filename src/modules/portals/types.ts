import type { MemberNavItem } from "@/config/memberNav";

export interface PortalDefinition {
  title: string;
  description: string;
  tabs: MemberNavItem[];
}

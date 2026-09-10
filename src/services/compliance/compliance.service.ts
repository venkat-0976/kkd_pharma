import type { PublicBusiness } from "@/types/directory";
import { listRetailers } from "@/services/directory/retailers.service";
import { listWholesalers } from "@/services/directory/wholesalers.service";
import { daysUntil } from "@/lib/expiry";

/**
 * PUBLIC-SAFE compliance summary.
 *
 * Only the union renewal *date* and a derived status are exposed here — never
 * licence numbers, document names, storage keys or any private member field.
 * The public website may render these; the admin console reuses the same data.
 */

export type RenewalStatus = "valid" | "expiring" | "expired";

export interface ComplianceSummary {
  slug: string;
  shopName: string;
  businessType: PublicBusiness["businessType"];
  area: string;
  city: string;
  /** Date the member's union document renewal falls due. */
  renewalDue: string;
  daysRemaining: number;
  status: RenewalStatus;
}

function iso(offsetDays: number) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

/** Preview data — replaced by a backend read once the secure backend lands. */
const renewalOffsets: Record<string, number> = {
  "sri-lakshmi-medicals": -6,
  "vijaya-pharma": 11,
  "balaji-medical-stores": 24,
  "godavari-pharma-distributors": -14,
  "apex-pharma-traders": 9,
  "coastal-medi-supplies": 120,
};

const EXPIRING_WINDOW = 30;

function summarise(business: PublicBusiness): ComplianceSummary {
  const offset = renewalOffsets[business.slug] ?? 240;
  const renewalDue = iso(offset);
  const daysRemaining = daysUntil(renewalDue) ?? 0;
  const status: RenewalStatus =
    daysRemaining < 0 ? "expired" : daysRemaining <= EXPIRING_WINDOW ? "expiring" : "valid";
  return {
    slug: business.slug,
    shopName: business.shopName,
    businessType: business.businessType,
    area: business.area,
    city: business.city,
    renewalDue,
    daysRemaining,
    status,
  };
}

export function listCompliance(type?: PublicBusiness["businessType"]): ComplianceSummary[] {
  const source =
    type === "Retailer"
      ? listRetailers()
      : type === "Wholesaler"
        ? listWholesalers()
        : [...listRetailers(), ...listWholesalers()];
  return source.map(summarise).sort((a, b) => a.daysRemaining - b.daysRemaining);
}

/** Businesses whose renewal is overdue or due within the reminder window. */
export function listRenewalsDue(type?: PublicBusiness["businessType"]): ComplianceSummary[] {
  return listCompliance(type).filter((item) => item.status !== "valid");
}

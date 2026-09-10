import type { PublicBusiness } from "@/types/directory";

/** Typed mock service for the PUBLIC wholesaler directory (public fields only). */

const wholesalers: PublicBusiness[] = [
  {
    slug: "godavari-pharma-distributors",
    shopName: "Godavari Pharma Distributors",
    businessType: "Wholesaler",
    publicOwnerName: "B. Satyanarayana",
    generalAddress: "Wholesale Market Complex, Main Road",
    area: "Main Road",
    city: "Kakinada",
    publicPhone: "+91 884 237 2200",
    about: "Multi-brand pharmaceutical distribution across East Godavari district.",
    established: 1995,
    categories: ["Distribution", "Multi-brand"],
  },
  {
    slug: "coastal-medi-supplies",
    shopName: "Coastal Medi Supplies",
    businessType: "Wholesaler",
    generalAddress: "Port Area Godown Street",
    area: "Port Area",
    city: "Kakinada",
    about: "Cold-chain capable wholesaler for vaccines and biologicals.",
    established: 2006,
    categories: ["Cold Chain", "Distribution"],
  },
  {
    slug: "sree-venkateswara-agencies",
    shopName: "Sree Venkateswara Agencies",
    businessType: "Wholesaler",
    publicOwnerName: "V. Prasad",
    generalAddress: "Bhanugudi Junction Commercial Block",
    area: "Bhanugudi",
    city: "Kakinada",
    publicPhone: "+91 884 234 8811",
    about: "Stockist for leading formulations and OTC ranges.",
    established: 2001,
    categories: ["Stockist", "OTC"],
  },
  {
    slug: "unity-surgical-wholesale",
    shopName: "Unity Surgical Wholesale",
    businessType: "Wholesaler",
    generalAddress: "Suryarao Peta Trade Centre",
    area: "Suryarao Peta",
    city: "Kakinada",
    about: "Surgical disposables and hospital consumables wholesale.",
    established: 2012,
    categories: ["Surgical", "Hospital Supply"],
  },
  {
    slug: "apex-pharma-traders",
    shopName: "Apex Pharma Traders",
    businessType: "Wholesaler",
    generalAddress: "Sarpavaram Industrial Road",
    area: "Sarpavaram",
    city: "Kakinada",
    publicPhone: "+91 884 239 5566",
    about: "Bulk supply partner for retail pharmacies and nursing homes.",
    established: 2009,
    categories: ["Bulk Supply", "Distribution"],
  },
  {
    slug: "nova-health-distributors",
    shopName: "Nova Health Distributors",
    businessType: "Wholesaler",
    generalAddress: "Turangi Warehouse Lane",
    area: "Turangi",
    city: "Kakinada",
    about: "Nutraceutical and wellness product distribution.",
    established: 2018,
    categories: ["Nutraceuticals", "Distribution"],
  },
];

export function listWholesalers(): PublicBusiness[] {
  return wholesalers;
}

export function getWholesalerBySlug(slug: string): PublicBusiness | undefined {
  return wholesalers.find((w) => w.slug === slug);
}

export function listWholesalerAreas(): string[] {
  return Array.from(new Set(wholesalers.map((w) => w.area))).sort();
}

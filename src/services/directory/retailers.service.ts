import type { PublicBusiness } from "@/types/directory";

/**
 * Typed mock service for the PUBLIC retailer directory.
 * Replace the mock source with a backend call in a later phase — the
 * component layer only depends on these function signatures.
 * Only public-approved fields are ever returned here.
 */

const retailers: PublicBusiness[] = [
  {
    slug: "sri-lakshmi-medicals",
    shopName: "Sri Lakshmi Medicals",
    businessType: "Retailer",
    publicOwnerName: "K. Ramesh",
    generalAddress: "Main Road, near Bhanugudi Junction",
    area: "Bhanugudi",
    city: "Kakinada",
    publicPhone: "+91 884 236 1122",
    about:
      "Neighbourhood retail pharmacy serving Bhanugudi with round-the-clock essential medicines.",
    established: 2004,
    categories: ["Retail Pharmacy", "24x7"],
  },
  {
    slug: "sai-krishna-medical-hall",
    shopName: "Sai Krishna Medical Hall",
    businessType: "Retailer",
    generalAddress: "Sarpavaram Junction",
    area: "Sarpavaram",
    city: "Kakinada",
    about: "Retail pharmacy with a dedicated chronic-care refill counter.",
    established: 2011,
    categories: ["Retail Pharmacy", "Chronic Care"],
  },
  {
    slug: "vijaya-pharma",
    shopName: "Vijaya Pharma",
    businessType: "Retailer",
    publicOwnerName: "M. Vijaya Lakshmi",
    generalAddress: "Gandhi Nagar 3rd Line",
    area: "Gandhi Nagar",
    city: "Kakinada",
    publicPhone: "+91 884 235 4477",
    about: "Family-run retail pharmacy focused on paediatric and dermatology prescriptions.",
    established: 1998,
    categories: ["Retail Pharmacy", "Paediatric"],
  },
  {
    slug: "annapurna-medicals",
    shopName: "Annapurna Medicals",
    businessType: "Retailer",
    generalAddress: "Ramaraopeta Main Road",
    area: "Ramaraopeta",
    city: "Kakinada",
    about: "Retail counter attached to a diagnostic collection point.",
    established: 2016,
    categories: ["Retail Pharmacy"],
  },
  {
    slug: "balaji-medical-stores",
    shopName: "Balaji Medical Stores",
    businessType: "Retailer",
    publicOwnerName: "P. Srinivas",
    generalAddress: "Suryarao Peta, opposite Government Hospital",
    area: "Suryarao Peta",
    city: "Kakinada",
    publicPhone: "+91 884 238 9090",
    about: "Hospital-facing pharmacy stocking surgical and emergency supplies.",
    established: 2008,
    categories: ["Retail Pharmacy", "Surgical"],
  },
  {
    slug: "care-well-pharmacy",
    shopName: "Care Well Pharmacy",
    businessType: "Retailer",
    generalAddress: "Jagannaickpur Bus Stand Road",
    area: "Jagannaickpur",
    city: "Kakinada",
    about: "Modern retail pharmacy with home-delivery service across the port area.",
    established: 2019,
    categories: ["Retail Pharmacy", "Home Delivery"],
  },
  {
    slug: "devi-medical-agency",
    shopName: "Devi Medical Agency",
    businessType: "Retailer",
    generalAddress: "Rama Rao Peta 6th Line",
    area: "Ramaraopeta",
    city: "Kakinada",
    publicPhone: "+91 884 231 7654",
    about: "Retail pharmacy with an ayurveda and wellness section.",
    established: 2013,
    categories: ["Retail Pharmacy", "Wellness"],
  },
  {
    slug: "godavari-medicals",
    shopName: "Godavari Medicals",
    businessType: "Retailer",
    publicOwnerName: "S. Naveen Kumar",
    generalAddress: "Turangi Bypass Road",
    area: "Turangi",
    city: "Kakinada",
    about: "Retail pharmacy serving the Turangi residential belt.",
    established: 2021,
    categories: ["Retail Pharmacy"],
  },
];

export function listRetailers(): PublicBusiness[] {
  return retailers;
}

export function getRetailerBySlug(slug: string): PublicBusiness | undefined {
  return retailers.find((r) => r.slug === slug);
}

export function listRetailerAreas(): string[] {
  return Array.from(new Set(retailers.map((r) => r.area))).sort();
}

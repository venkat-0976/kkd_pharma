/**
 * PUBLIC-SAFE types only.
 *
 * Anything listed here may be rendered on public pages. Sensitive member data
 * (Aadhaar, drug/food/pharmacist licence numbers & documents, GST confidential
 * data, personal mobile numbers, uploaded certificates) must NEVER be added to
 * these types — they belong to the authenticated member area (Phase 2).
 */

export type BusinessType = "Retailer" | "Wholesaler";

export interface PublicBusiness {
  /** Public slug used in URLs. Never an internal member id. */
  slug: string;
  shopName: string;
  businessType: BusinessType;
  /** Only rendered when the member has approved it as public. */
  publicOwnerName?: string;
  /** General address — no door numbers or private location data. */
  generalAddress: string;
  area: string;
  city: string;
  /** Business landline / shop number approved for public listing. */
  publicPhone?: string;
  /** Short public description of the business. */
  about?: string;
  established?: number;
  categories: string[];
}

export interface PublicOrganisation {
  slug: string;
  name: string;
  category: string;
  area: string;
  city: string;
  description: string;
  publicPhone?: string;
  specialities?: string[];
}

export interface JobPosting {
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  experience: string;
  description: string;
  requirements: string[];
  postedOn: string;
}

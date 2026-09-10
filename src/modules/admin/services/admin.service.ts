import type { BusinessType, PublicBusiness } from "@/types/directory";
import { listRetailers } from "@/services/directory/retailers.service";
import { listWholesalers } from "@/services/directory/wholesalers.service";
import {
  listCompliance,
  listRenewalsDue,
  type ComplianceSummary,
} from "@/services/compliance/compliance.service";

/**
 * Admin console service (preview).
 *
 * IMPORTANT PRIVACY RULE: the admin console only ever handles non-sensitive
 * business fields — shop name, business type, general address, area/city and
 * membership status. Licence numbers, Aadhaar, GST data, personal mobiles and
 * uploaded documents are never returned here. When the backend lands, every
 * method must additionally verify an ADMIN role server-side.
 */

export type ApplicationStatus = "Pending" | "Approved" | "Rejected";

export interface MemberSummary {
  slug: string;
  shopName: string;
  businessType: BusinessType;
  generalAddress: string;
  area: string;
  city: string;
  status: "Active";
  renewal: ComplianceSummary;
}

export interface MembershipApplication {
  id: string;
  shopName: string;
  businessType: BusinessType;
  generalAddress: string;
  area: string;
  city: string;
  appliedOn: string;
  status: ApplicationStatus;
}

export interface AdminStats {
  retailers: number;
  wholesalers: number;
  totalMembers: number;
  pending: number;
  approved: number;
  rejected: number;
  renewalsDue: number;
}

export interface FacilityDoctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  registrationNumber: string;
  experience: string;
  status: "Active" | "Inactive";
}

export interface FacilitySummary {
  slug: string;
  code: string;
  name: string;
  address: string;
  city: string;
  category: string;
  phone: string;
  status: "Active" | "Inactive";
  doctors?: FacilityDoctor[];
}

const facilities: FacilitySummary[] = [
  {
    slug: "kakinada-general-hospital",
    code: "HSP-001",
    name: "Kakinada General Hospital",
    address: "Main Road, Sarpavaram",
    city: "Kakinada",
    category: "Multi-speciality hospital",
    phone: "0884 236 4100",
    status: "Active",
    doctors: [
      {
        id: "DOC-001",
        name: "Dr. Ananya Rao",
        specialty: "Cardiology",
        qualification: "MD, DM Cardiology",
        registrationNumber: "APMC-20481",
        experience: "12 years",
        status: "Active",
      },
      {
        id: "DOC-002",
        name: "Dr. Vikram Kumar",
        specialty: "Neurology",
        qualification: "MBBS, MD Neurology",
        registrationNumber: "APMC-19230",
        experience: "9 years",
        status: "Active",
      },
    ],
  },
  {
    slug: "coastal-dental-care",
    code: "HSP-002",
    name: "Coastal Dental Care",
    address: "Ramanayyapeta Junction",
    city: "Kakinada",
    category: "Dental hospital",
    phone: "0884 238 1122",
    status: "Active",
    doctors: [
      {
        id: "DOC-003",
        name: "Dr. Meera Sethi",
        specialty: "Dentistry",
        qualification: "BDS, MDS",
        registrationNumber: "APMC-22901",
        experience: "7 years",
        status: "Active",
      },
    ],
  },
  {
    slug: "coastal-diagnostics",
    code: "LAB-001",
    name: "Coastal Diagnostics Lab",
    address: "Jawahar Street",
    city: "Kakinada",
    category: "Diagnostic laboratory",
    phone: "0884 240 5511",
    status: "Active",
  },
  {
    slug: "kakinada-red-cross",
    code: "BB-001",
    name: "Kakinada Red Cross Blood Bank",
    address: "Government Hospital Campus",
    city: "Kakinada",
    category: "Blood bank",
    phone: "0884 242 1000",
    status: "Active",
  },
];

const STORE_KEY = "ku.admin.applications.preview";

const seedApplications: MembershipApplication[] = [
  {
    id: "APP-2041",
    shopName: "Sri Venkata Sai Medicals",
    businessType: "Retailer",
    generalAddress: "Main Road, near Temple Street",
    area: "Jagannaickpur",
    city: "Kakinada",
    appliedOn: "2026-07-28",
    status: "Pending",
  },
  {
    id: "APP-2042",
    shopName: "Coastal Care Pharma Agencies",
    businessType: "Wholesaler",
    generalAddress: "Godown Road, Industrial Estate",
    area: "Turangi",
    city: "Kakinada",
    appliedOn: "2026-08-02",
    status: "Pending",
  },
  {
    id: "APP-2043",
    shopName: "Ravi Medical Stores",
    businessType: "Retailer",
    generalAddress: "Bus Stand Road",
    area: "Ramaraopeta",
    city: "Kakinada",
    appliedOn: "2026-08-09",
    status: "Pending",
  },
  {
    id: "APP-2039",
    shopName: "Aditya Pharma Traders",
    businessType: "Wholesaler",
    generalAddress: "Sarpavaram Junction",
    area: "Sarpavaram",
    city: "Kakinada",
    appliedOn: "2026-07-12",
    status: "Approved",
  },
  {
    id: "APP-2035",
    shopName: "Nova Medical Point",
    businessType: "Retailer",
    generalAddress: "Suryarao Peta",
    area: "Suryarao Peta",
    city: "Kakinada",
    appliedOn: "2026-06-30",
    status: "Rejected",
  },
];

function readApplications(): MembershipApplication[] {
  if (typeof window === "undefined") return seedApplications;
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as MembershipApplication[]) : seedApplications;
  } catch {
    return seedApplications;
  }
}

function writeApplications(items: MembershipApplication[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORE_KEY, JSON.stringify(items));
}

function toSummary(business: PublicBusiness, renewals: ComplianceSummary[]): MemberSummary {
  const renewal = renewals.find((r) => r.slug === business.slug)!;
  return {
    slug: business.slug,
    shopName: business.shopName,
    businessType: business.businessType,
    generalAddress: business.generalAddress,
    area: business.area,
    city: business.city,
    status: "Active",
    renewal,
  };
}

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const adminService = {
  async listFacilities(category?: string): Promise<FacilitySummary[]> {
    await delay();
    return facilities.filter((facility) => !category || facility.category === category);
  },

  async getFacility(slug: string): Promise<FacilitySummary | undefined> {
    await delay();
    return facilities.find((facility) => facility.slug === slug);
  },

  async listMembers(type?: BusinessType): Promise<MemberSummary[]> {
    await delay();
    const renewals = listCompliance();
    const source =
      type === "Retailer"
        ? listRetailers()
        : type === "Wholesaler"
          ? listWholesalers()
          : [...listRetailers(), ...listWholesalers()];
    return source.map((b) => toSummary(b, renewals));
  },

  async listApplications(): Promise<MembershipApplication[]> {
    await delay();
    return readApplications();
  },

  async setApplicationStatus(
    id: string,
    status: ApplicationStatus,
  ): Promise<MembershipApplication[]> {
    await delay(240);
    const next = readApplications().map((app) => (app.id === id ? { ...app, status } : app));
    writeApplications(next);
    return next;
  },

  async getStats(): Promise<AdminStats> {
    await delay(120);
    const applications = readApplications();
    return {
      retailers: listRetailers().length,
      wholesalers: listWholesalers().length,
      totalMembers: listRetailers().length + listWholesalers().length,
      pending: applications.filter((a) => a.status === "Pending").length,
      approved: applications.filter((a) => a.status === "Approved").length,
      rejected: applications.filter((a) => a.status === "Rejected").length,
      renewalsDue: listRenewalsDue().length,
    };
  },
};

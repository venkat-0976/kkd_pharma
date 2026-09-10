import type { MemberType } from "@/services/auth/auth.service";

/**
 * Private member data model (Phase 2).
 *
 * Every record below is PRIVATE. It belongs to exactly one member (memberId)
 * and must be re-authorised server-side once the backend lands.
 */

export type ExpiryStatus = "valid" | "expiring" | "expired" | "missing";

export interface BusinessProfile {
  memberId: string;
  shopName: string;
  memberType: MemberType;
  firmNumber: string;
  email: string;
  businessMobile: string;
  establishedYear: string;
  publicOwnerName: string;
  status: "Active" | "Pending" | "Inactive";
}

export type OwnerRole = "Proprietor" | "Partner" | "Director" | "Managing Partner";

export interface Owner {
  id: string;
  memberId: string;
  fullName: string;
  mobile: string;
  email?: string;
  role: OwnerRole;
  isPublic: boolean;
  photo?: string;
}

export interface Employee {
  id: string;
  memberId: string;
  fullName: string;
  mobile: string;
  address: string;
  photo?: string;
}

export interface Pharmacist {
  id: string;
  memberId: string;
  fullName: string;
  mobile: string;
  licenceNumber: string;
  licenceExpiry: string; // ISO date
  address: string;
  documentId?: string;
  photo?: string;
}

export type LicenceKind = "drug" | "gst" | "food" | "labour" | "healthcare";

export interface LicenceRecord {
  kind: LicenceKind;
  memberId: string;
  number: string;
  licenceType?: string | undefined;
  issueDate?: string | undefined;
  expiryDate?: string | undefined;
  registrationInfo?: string | undefined;
  documentId?: string | undefined;
}

export type DocumentCategory =
  | "Drug Licence"
  | "Pharmacist Licence"
  | "GST"
  | "Food Licence"
  | "Healthcare Professional"
  | "Labour"
  | "Godown Licence"
  | "Rent Form"
  | "Other";

export interface MemberDocument {
  id: string;
  memberId: string;
  name: string;
  category: DocumentCategory;
  fileType: "pdf" | "jpg" | "jpeg" | "png";
  sizeKb: number;
  uploadedAt: string;
  expiryDate?: string;
  /** Private object-storage key. Never a /public path. */
  storageKey: string;
}

export interface ShopAddress {
  memberId: string;
  doorNumber: string;
  street: string;
  area: string;
  mandal: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
}

export interface NotificationPreferences {
  memberId: string;
  reminderDays: number[];
  emailAlerts: boolean;
  smsAlerts: boolean;
}

export interface ExpiryAlert {
  id: string;
  label: string;
  category: DocumentCategory;
  expiryDate: string;
  daysRemaining: number;
  status: ExpiryStatus;
  documentId?: string;
}

export interface MemberRecord {
  profile: BusinessProfile;
  owners: Owner[];
  pharmacists: Pharmacist[];
  employees: Employee[];
  licences: Record<LicenceKind, LicenceRecord>;
  documents: MemberDocument[];
  address: ShopAddress;
  preferences: NotificationPreferences;
}

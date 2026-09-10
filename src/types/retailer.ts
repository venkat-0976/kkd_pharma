import type {
  BusinessProfile,
  Owner,
  Pharmacist,
  Employee,
  LicenceRecord,
  LicenceKind,
  MemberDocument,
  ShopAddress,
  NotificationPreferences,
  ExpiryAlert,
  MemberRecord,
} from "./member";

export type {
  BusinessProfile,
  Owner,
  Pharmacist,
  Employee,
  LicenceRecord,
  LicenceKind,
  MemberDocument,
  ShopAddress,
  NotificationPreferences,
  ExpiryAlert,
  MemberRecord,
};

export interface RetailerDashboardStats {
  totalOwners: number;
  totalPharmacists: number;
  totalEmployees: number;
  totalDocuments: number;
  expiringAlertsCount: number;
}

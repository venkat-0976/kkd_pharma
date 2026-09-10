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
import type { CompetentPerson } from "./competentPerson";

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
  CompetentPerson,
};

export interface WholesalerDashboardStats {
  totalOwners: number;
  totalCompetentPersons: number;
  totalEmployees: number;
  totalDocuments: number;
  expiringAlertsCount: number;
}

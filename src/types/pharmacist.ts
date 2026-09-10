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
  registrationDate?: string;
  stateCouncil?: string;
}

export interface PharmacistProfile {
  pharmacistId: string;
  fullName: string;
  email: string;
  mobile: string;
  licenceNumber: string;
  licenceExpiry: string;
  registrationCouncil: string;
  qualification: string;
  yearsOfExperience: number;
  address: string;
  status: "Active" | "Pending" | "Inactive";
}

export interface EmploymentHistoryEntry {
  id: string;
  organizationName: string;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  remarks?: string;
}

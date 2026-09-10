export interface CompetentPerson {
  id: string;
  memberId: string;
  fullName: string;
  mobile: string;
  qualification?: string;
  experienceYears?: number;
  licenceNumber: string;
  licenceExpiry: string; // ISO date format YYYY-MM-DD
  address: string;
  documentId?: string;
  photo?: string;
}

export type CompetentPersonInput = Omit<CompetentPerson, "memberId">;

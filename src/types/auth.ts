export type MemberType = "Retailer" | "Wholesaler";

export type LoginType =
  | "Admin"
  | "Retailer"
  | "Wholesaler"
  | "Hospital"
  | "Doctor"
  | "Lab"
  | "Blood bank";

export type Role =
  | "MEMBER"
  | "ADMIN"
  | "SUPER_ADMIN"
  | "HOSPITAL"
  | "DOCTOR"
  | "LAB"
  | "BLOOD_BANK";

export interface Session {
  memberId: string;
  memberType: MemberType;
  shopName: string;
  role: Role;
  loginType?: LoginType;
}

export interface AuthCredentials {
  identifier: string;
  password: string;
  loginType?: LoginType;
}

import { z } from "zod";

const mobile = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/u, { message: "Enter a valid 10-digit Indian mobile number" });

export const ownerSchema = z.object({
  id: z.string().optional(),
  photo: z.string().optional(),
  fullName: z.string().trim().min(2, "Full name is required").max(100),
  mobile,
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(255)
    .optional()
    .or(z.literal("")),
  role: z.enum(["Proprietor", "Partner", "Director", "Managing Partner"]),
  isPublic: z.boolean(),
});
export type OwnerValues = z.infer<typeof ownerSchema>;

export const pharmacistSchema = z.object({
  id: z.string().optional(),
  photo: z.string().optional(),
  fullName: z.string().trim().min(2, "Full name is required").max(100),
  mobile,
  licenceNumber: z.string().trim().min(4, "Licence number is required").max(40),
  licenceExpiry: z.string().min(1, "Licence expiry date is required"),
  address: z.string().trim().min(5, "Address is required").max(240),
});
export type PharmacistValues = z.infer<typeof pharmacistSchema>;

export const employeeSchema = z.object({
  id: z.string().optional(),
  photo: z.string().optional(),
  fullName: z.string().trim().min(2, "Full name is required").max(100),
  mobile,
  address: z.string().trim().min(5, "Address is required").max(240),
});
export type EmployeeValues = z.infer<typeof employeeSchema>;

export const businessProfileSchema = z.object({
  shopName: z.string().trim().min(2, "Shop name is required").max(120),
  firmNumber: z.string().trim().max(60),
  email: z.string().trim().email("Enter a valid email address").max(255),
  businessMobile: mobile,
  establishedYear: z
    .string()
    .trim()
    .regex(/^(19|20)\d{2}$/u, "Enter a 4-digit year")
    .or(z.literal("")),
  publicOwnerName: z.string().trim().max(100),
});
export type BusinessProfileValues = z.infer<typeof businessProfileSchema>;

export const addressSchema = z.object({
  doorNumber: z.string().trim().max(40).optional().or(z.literal("")),
  street: z.string().trim().max(80).optional().or(z.literal("")),
  area: z.string().trim().min(2, "Area is required").max(80),
  mandal: z.string().trim().max(80).optional().or(z.literal("")),
  city: z.string().trim().max(60).optional().or(z.literal("")),
  district: z.string().trim().min(2, "District is required").max(60),
  state: z.string().trim().min(2, "State is required").max(60),
  pincode: z
    .string()
    .trim()
    .regex(/^\d{6}$/u, "Enter a valid 6-digit PIN code"),
  latitude: z.string().trim().optional().or(z.literal("")),
  longitude: z.string().trim().optional().or(z.literal("")),
});
export type AddressValues = z.infer<typeof addressSchema>;

export const licenceSchema = z.object({
  number: z.string().trim().max(60),
  licenceType: z.string().trim().max(80).optional().or(z.literal("")),
  registrationInfo: z.string().trim().max(160).optional().or(z.literal("")),
  issueDate: z.string().optional().or(z.literal("")),
  expiryDate: z.string().optional().or(z.literal("")),
});
export type LicenceValues = z.infer<typeof licenceSchema>;

const COMMON_PASSWORDS = ["password123", "qwerty123456", "administrator", "kakinada1234"];

export const strongPassword = z
  .string()
  .min(12, "Use at least 12 characters")
  .max(128)
  .regex(/[A-Z]/u, "Add an uppercase letter")
  .regex(/[a-z]/u, "Add a lowercase letter")
  .regex(/\d/u, "Add a number")
  .regex(/[^A-Za-z0-9]/u, "Add a special character")
  .refine((v) => !COMMON_PASSWORDS.includes(v.toLowerCase()), "This password is too common");

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password"),
    newPassword: strongPassword,
    confirmPassword: z.string().min(1, "Confirm your new password"),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((v) => v.newPassword !== v.currentPassword, {
    message: "New password must differ from the current one",
    path: ["newPassword"],
  });
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export function passwordStrength(value: string) {
  const checks = [
    value.length >= 12,
    /[A-Z]/u.test(value),
    /[a-z]/u.test(value),
    /\d/u.test(value),
    /[^A-Za-z0-9]/u.test(value),
    value.length >= 16,
  ];
  const score = checks.filter(Boolean).length;
  const label = score <= 2 ? "Weak" : score <= 4 ? "Fair" : score === 5 ? "Strong" : "Excellent";
  return { score, label, percent: Math.round((score / 6) * 100) };
}

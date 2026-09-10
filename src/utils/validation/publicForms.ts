import { z } from "zod";

const mobile = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/u, { message: "Enter a valid 10-digit Indian mobile number" });

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  mobile,
  subject: z.string().trim().min(3, "Subject is required").max(120),
  message: z.string().trim().min(10, "Please add a few more details").max(1000),
});
export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const careerApplicationSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(100),
  mobile,
  email: z.string().trim().email("Enter a valid email address").max(255),
  position: z.string().trim().min(1, "Select a position"),
  experience: z.string().trim().min(1, "Experience is required").max(60),
  qualification: z.string().trim().min(2, "Qualification is required").max(120),
  coverMessage: z.string().trim().max(1000).optional().or(z.literal("")),
});
export type CareerApplicationValues = z.infer<typeof careerApplicationSchema>;

export const loginSchema = z.object({
  identifier: z.string().trim().min(4, "Enter your mobile number or member ID").max(60),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
});
export type LoginValues = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  identifier: z.string().trim().min(4, "Enter your registered mobile number or member ID").max(60),
});
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const membershipApplicationSchema = z.object({
  shopName: z.string().trim().min(2, "Shop / firm name is required").max(120),
  businessType: z.enum(["Retailer", "Wholesaler"], { message: "Select a member type" }),
  ownerName: z.string().trim().min(2, "Owner name is required").max(100),
  mobile,
  email: z.string().trim().email("Enter a valid email address").max(255),
  area: z.string().trim().min(2, "Area is required").max(80),
  city: z.string().trim().min(2, "City is required").max(80),
  message: z.string().trim().max(600).optional().or(z.literal("")),
});
export type MembershipApplicationValues = z.infer<typeof membershipApplicationSchema>;

/** Upload rules shared by every public upload control (resume today, documents later). */
export const ALLOWED_UPLOAD_TYPES = ["application/pdf", "image/jpeg", "image/png"] as const;
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export function validateUpload(file: File): string | null {
  if (!(ALLOWED_UPLOAD_TYPES as readonly string[]).includes(file.type)) {
    return "Only PDF, JPG or PNG files are allowed";
  }
  if (file.size > MAX_UPLOAD_BYTES) return "File must be 5 MB or smaller";
  return null;
}

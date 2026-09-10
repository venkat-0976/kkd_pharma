import { FileText, MapPin, Pencil, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MemberPageHeader } from "@/features/member/MemberShell";
import { authService } from "@/services/auth/auth.service";

export type RoleWorkspaceKind =
  | "hospital"
  | "hospital-address"
  | "hospital-doctors"
  | "hospital-patients"
  | "doctor"
  | "doctor-hospital"
  | "doctor-patients"
  | "lab"
  | "lab-address"
  | "lab-services"
  | "lab-staff"
  | "blood-bank"
  | "blood-bank-address"
  | "blood-inventory"
  | "blood-donors"
  | "role-documents";

const content: Record<
  RoleWorkspaceKind,
  { title: string; description: string; fields: string[]; rows?: string[][] }
> = {
  hospital: {
    title: "Hospital details",
    description: "Maintain your hospital registration and public healthcare information.",
    fields: [
      "Hospital name",
      "Hospital code",
      "Hospital type",
      "Registration number",
      "Emergency contact",
    ],
  },
  "hospital-address": {
    title: "Address details",
    description: "Keep the hospital location and visiting information current.",
    fields: ["Door number / building", "Street", "Area", "City", "District", "Pincode"],
  },
  "hospital-doctors": {
    title: "Doctors",
    description: "Doctors associated with this hospital and their specialties.",
    fields: [],
    rows: [
      ["Dr. Ananya Rao", "Cardiology", "MD, DM Cardiology", "Active"],
      ["Dr. Vikram Kumar", "Neurology", "MBBS, MD Neurology", "Active"],
    ],
  },
  "hospital-patients": {
    title: "Patients",
    description:
      "Manage patient records privately. Patient data is never shown in the public directory.",
    fields: [],
    rows: [
      ["Patient records", "24 active cases", "Last updated today", "Private"],
      ["Discharged records", "118 records", "Archive", "Private"],
    ],
  },
  doctor: {
    title: "Professional profile",
    description: "Manage your professional registration and specialty details.",
    fields: [
      "Full name",
      "Specialty",
      "Qualification",
      "Medical registration number",
      "Years of experience",
    ],
  },
  "doctor-hospital": {
    title: "Hospital affiliation",
    description: "Review the hospital or clinics connected to your professional profile.",
    fields: [],
    rows: [["Kakinada General Hospital", "Cardiology", "Primary affiliation", "Active"]],
  },
  "doctor-patients": {
    title: "Patients",
    description: "Your patient workspace is private and accessible only to authorised care staff.",
    fields: [],
    rows: [
      ["Active patients", "18 cases", "Current care", "Private"],
      ["Completed cases", "64 records", "Archive", "Private"],
    ],
  },
  lab: {
    title: "Laboratory details",
    description: "Maintain your laboratory registration and accreditation information.",
    fields: [
      "Laboratory name",
      "Laboratory code",
      "Laboratory type",
      "Registration number",
      "Accreditation",
    ],
  },
  "lab-address": {
    title: "Address details",
    description: "Keep the laboratory location and contact information current.",
    fields: ["Building", "Street", "Area", "City", "District", "Pincode"],
  },
  "lab-services": {
    title: "Tests & services",
    description: "List the diagnostic tests and services offered by your laboratory.",
    fields: [],
    rows: [
      ["Clinical pathology", "Routine blood and urine testing", "24 hours", "Active"],
      ["Biochemistry", "Health screening panels", "48 hours", "Active"],
    ],
  },
  "lab-staff": {
    title: "Staff",
    description: "Manage authorised laboratory staff and responsible professionals.",
    fields: [],
    rows: [
      ["Priya Nair", "Lab technician", "APMLT-1092", "Active"],
      ["Ramesh Babu", "Pathologist", "APMC-18821", "Active"],
    ],
  },
  "blood-bank": {
    title: "Blood bank details",
    description: "Maintain your blood bank registration and operating information.",
    fields: [
      "Blood bank name",
      "Blood bank code",
      "Operating authority",
      "License number",
      "Emergency contact",
    ],
  },
  "blood-bank-address": {
    title: "Address details",
    description: "Keep the blood bank location and contact information current.",
    fields: ["Building", "Street", "Area", "City", "District", "Pincode"],
  },
  "blood-inventory": {
    title: "Blood inventory",
    description: "Track available blood groups and units privately for authorised staff.",
    fields: [],
    rows: [
      ["A positive", "18 units", "Valid", "Available"],
      ["O positive", "26 units", "Valid", "Available"],
      ["AB negative", "3 units", "Valid", "Available"],
    ],
  },
  "blood-donors": {
    title: "Donors",
    description: "Manage donor records and eligibility information securely.",
    fields: [],
    rows: [
      ["Registered donors", "342 donors", "This year", "Active"],
      ["Eligible donors", "218 donors", "Ready to contact", "Active"],
    ],
  },
  "role-documents": {
    title: "Documents",
    description:
      "Upload and manage the registrations, licences and certificates required for your account.",
    fields: [],
    rows: [
      ["Registration certificate", "Required", "Not uploaded", "Action needed"],
      ["Operating licence", "Required", "Not uploaded", "Action needed"],
      ["Professional / accreditation certificate", "Required", "Not uploaded", "Action needed"],
    ],
  },
};

export function RoleWorkspace({ kind }: { kind: RoleWorkspaceKind }) {
  const page = content[kind];
  const session = authService.getSession();
  const isDocuments = kind === "role-documents";
  return (
    <div className="space-y-6">
      <MemberPageHeader
        title={page.title}
        description={page.description}
        action={
          <Button>
            <Save className="size-4" aria-hidden="true" /> Save changes
          </Button>
        }
      />
      {page.fields.length ? (
        <section className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <MapPin className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-semibold">{session?.shopName ?? "Account information"}</h2>
              <p className="text-sm text-muted-foreground">
                {isDocuments ? "Required account documents" : "Editable account information"}
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {page.fields.map((field) => (
              <div key={field}>
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {field}
                </Label>
                <Input
                  className="mt-2"
                  defaultValue={
                    field === "Hospital name" ||
                    field === "Laboratory name" ||
                    field === "Blood bank name"
                      ? session?.shopName
                      : undefined
                  }
                  placeholder={`Enter ${field.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}
      {page.rows ? (
        <section className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
          <div className="flex items-center justify-between border-b border-border p-5">
            <div className="flex items-center gap-2">
              <FileText className="size-5 text-primary" aria-hidden="true" />
              <h2 className="font-semibold">{page.title} list</h2>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="size-4" aria-hidden="true" /> Add record
            </Button>
          </div>
          <table className="w-full min-w-2xl text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                {(page.rows[0] ?? []).map((_, index) => (
                  <th key={index} className="px-5 py-3">
                    {["Name / group", "Details", "Reference", "Status"][index]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {page.rows.map((row) => (
                <tr key={row[0]} className="border-b border-border/60 last:border-0">
                  {row.map((cell) => (
                    <td
                      key={cell}
                      className="px-5 py-3 text-muted-foreground first:font-medium first:text-foreground"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Pencil className="size-3.5" aria-hidden="true" /> Changes are saved to your private
        workspace and reviewed by authorised union administrators.
      </p>
    </div>
  );
}

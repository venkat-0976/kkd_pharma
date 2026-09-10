
# Helper function to build a fields-form page
function Write-FieldsPage {
  param(
    [string]$OutPath,
    [string]$ExportName,
    [string]$Title,
    [string]$Description,
    [string[]]$Fields,
    [string]$NameField = ""
  )
  $fieldList = ($Fields | ForEach-Object { "    `"$_`"," }) -join "`n"
  $defaultValue = if ($NameField) { @"

                defaultValue={field === "$NameField" ? session?.shopName : undefined}
"@ } else { "" }
  $content = @"
import { MapPin, Pencil, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MemberPageHeader } from "@/layouts/AuthenticatedPortalLayout";
import { authService } from "@/services/auth/auth.service";

export function $ExportName() {
  const session = authService.getSession();
  const fields = [
$fieldList
  ];
  return (
    <div className="space-y-6">
      <MemberPageHeader
        title="$Title"
        description="$Description"
        action={
          <Button>
            <Save className="size-4" aria-hidden="true" /> Save changes
          </Button>
        }
      />
      <section className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
            <MapPin className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-semibold">{session?.shopName ?? "Account information"}</h2>
            <p className="text-sm text-muted-foreground">Editable account information</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field}>
              <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {field}
              </Label>
              <Input
                className="mt-2"$defaultValue
                placeholder={`Enter `+"`"+`${field.toLowerCase()}`+"`"+`}
              />
            </div>
          ))}
        </div>
      </section>
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Pencil className="size-3.5" aria-hidden="true" /> Changes are saved to your private
        workspace and reviewed by authorised union administrators.
      </p>
    </div>
  );
}
"@
  $dir = Split-Path $OutPath
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  Set-Content $OutPath $content -NoNewline
  Write-Output "Created: $OutPath"
}

# Helper function to build a table page
function Write-TablePage {
  param(
    [string]$OutPath,
    [string]$ExportName,
    [string]$Title,
    [string]$Description,
    [string[][]]$Rows
  )
  $rowsJson = ($Rows | ForEach-Object {
    $cells = ($_ | ForEach-Object { "`"$_`"" }) -join ", "
    "      [$cells],"
  }) -join "`n"
  $content = @"
import { FileText, Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MemberPageHeader } from "@/layouts/AuthenticatedPortalLayout";

export function $ExportName() {
  const rows: string[][] = [
$rowsJson
  ];
  return (
    <div className="space-y-6">
      <MemberPageHeader
        title="$Title"
        description="$Description"
      />
      <section className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div className="flex items-center gap-2">
            <FileText className="size-5 text-primary" aria-hidden="true" />
            <h2 className="font-semibold">$Title list</h2>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="size-4" aria-hidden="true" /> Add record
          </Button>
        </div>
        <table className="w-full min-w-2xl text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              {["Name / group", "Details", "Reference", "Status"].map((h) => (
                <th key={h} className="px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-b border-border/60 last:border-0">
                {row.map((cell) => (
                  <td key={cell} className="px-5 py-3 text-muted-foreground first:font-medium first:text-foreground">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Pencil className="size-3.5" aria-hidden="true" /> Changes are reviewed by authorised union administrators.
      </p>
    </div>
  );
}
"@
  $dir = Split-Path $OutPath
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  Set-Content $OutPath $content -NoNewline
  Write-Output "Created: $OutPath"
}

# Helper to write a route file
function Write-RouteFile {
  param(
    [string]$OutPath,
    [string]$RouteId,
    [string]$Title,
    [string]$ImportPath,
    [string]$ComponentName
  )
  $content = @"
import { createFileRoute } from "@tanstack/react-router";
import { $ComponentName } from "$ImportPath";

export const Route = createFileRoute("$RouteId")({
  head: () => ({
    meta: [
      { title: "$Title" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: $ComponentName,
});
"@
  Set-Content $OutPath $content -NoNewline
  Write-Output "Created route: $OutPath"
}

# HOSPITAL pages
Write-FieldsPage `
  -OutPath "src\modules\hospital\pages\Details\HospitalDetailsPage.tsx" `
  -ExportName "HospitalDetailsPage" `
  -Title "Hospital details" `
  -Description "Maintain your hospital registration and public healthcare information." `
  -Fields @("Hospital name","Hospital code","Hospital type","Registration number","Emergency contact") `
  -NameField "Hospital name"

Write-FieldsPage `
  -OutPath "src\modules\hospital\pages\Address\HospitalAddressPage.tsx" `
  -ExportName "HospitalAddressPage" `
  -Title "Address details" `
  -Description "Keep the hospital location and visiting information current." `
  -Fields @("Door number / building","Street","Area","City","District","Pincode")

Write-TablePage `
  -OutPath "src\modules\hospital\pages\Doctors\HospitalDoctorsPage.tsx" `
  -ExportName "HospitalDoctorsPage" `
  -Title "Doctors" `
  -Description "Doctors associated with this hospital and their specialties." `
  -Rows @(
    @("Dr. Ananya Rao","Cardiology","MD, DM Cardiology","Active"),
    @("Dr. Vikram Kumar","Neurology","MBBS, MD Neurology","Active")
  )

Write-TablePage `
  -OutPath "src\modules\hospital\pages\Patients\HospitalPatientsPage.tsx" `
  -ExportName "HospitalPatientsPage" `
  -Title "Patients" `
  -Description "Manage patient records privately. Patient data is never shown in the public directory." `
  -Rows @(
    @("Patient records","24 active cases","Last updated today","Private"),
    @("Discharged records","118 records","Archive","Private")
  )

# LAB pages
Write-FieldsPage `
  -OutPath "src\modules\lab\pages\Details\LabDetailsPage.tsx" `
  -ExportName "LabDetailsPage" `
  -Title "Laboratory details" `
  -Description "Maintain your laboratory registration and accreditation information." `
  -Fields @("Laboratory name","Laboratory code","Laboratory type","Registration number","Accreditation") `
  -NameField "Laboratory name"

Write-FieldsPage `
  -OutPath "src\modules\lab\pages\Address\LabAddressPage.tsx" `
  -ExportName "LabAddressPage" `
  -Title "Address details" `
  -Description "Keep the laboratory location and contact information current." `
  -Fields @("Building","Street","Area","City","District","Pincode")

Write-TablePage `
  -OutPath "src\modules\lab\pages\Services\LabServicesPage.tsx" `
  -ExportName "LabServicesPage" `
  -Title "Tests & services" `
  -Description "List the diagnostic tests and services offered by your laboratory." `
  -Rows @(
    @("Clinical pathology","Routine blood and urine testing","24 hours","Active"),
    @("Biochemistry","Health screening panels","48 hours","Active")
  )

Write-TablePage `
  -OutPath "src\modules\lab\pages\Staff\LabStaffPage.tsx" `
  -ExportName "LabStaffPage" `
  -Title "Staff" `
  -Description "Manage authorised laboratory staff and responsible professionals." `
  -Rows @(
    @("Priya Nair","Lab technician","APMLT-1092","Active"),
    @("Ramesh Babu","Pathologist","APMC-18821","Active")
  )

# BLOOD BANK pages
Write-FieldsPage `
  -OutPath "src\modules\blood-bank\pages\Details\BloodBankDetailsPage.tsx" `
  -ExportName "BloodBankDetailsPage" `
  -Title "Blood bank details" `
  -Description "Maintain your blood bank registration and operating information." `
  -Fields @("Blood bank name","Blood bank code","Operating authority","License number","Emergency contact") `
  -NameField "Blood bank name"

Write-FieldsPage `
  -OutPath "src\modules\blood-bank\pages\Address\BloodBankAddressPage.tsx" `
  -ExportName "BloodBankAddressPage" `
  -Title "Address details" `
  -Description "Keep the blood bank location and contact information current." `
  -Fields @("Building","Street","Area","City","District","Pincode")

Write-TablePage `
  -OutPath "src\modules\blood-bank\pages\Inventory\BloodInventoryPage.tsx" `
  -ExportName "BloodInventoryPage" `
  -Title "Blood inventory" `
  -Description "Track available blood groups and units privately for authorised staff." `
  -Rows @(
    @("A positive","18 units","Valid","Available"),
    @("O positive","26 units","Valid","Available"),
    @("AB negative","3 units","Valid","Available")
  )

Write-TablePage `
  -OutPath "src\modules\blood-bank\pages\Donors\BloodDonorsPage.tsx" `
  -ExportName "BloodDonorsPage" `
  -Title "Donors" `
  -Description "Manage donor records and eligibility information securely." `
  -Rows @(
    @("Registered donors","342 donors","This year","Active"),
    @("Eligible donors","218 donors","Ready to contact","Active")
  )

# DOCTOR pages
Write-FieldsPage `
  -OutPath "src\modules\doctor\pages\Profile\DoctorProfilePage.tsx" `
  -ExportName "DoctorProfilePage" `
  -Title "Professional profile" `
  -Description "Manage your professional registration and specialty details." `
  -Fields @("Full name","Specialty","Qualification","Medical registration number","Years of experience")

Write-TablePage `
  -OutPath "src\modules\doctor\pages\Hospital\DoctorHospitalPage.tsx" `
  -ExportName "DoctorHospitalPage" `
  -Title "Hospital affiliation" `
  -Description "Review the hospital or clinics connected to your professional profile." `
  -Rows @(
    @("Kakinada General Hospital","Cardiology","Primary affiliation","Active")
  )

Write-TablePage `
  -OutPath "src\modules\doctor\pages\Patients\DoctorPatientsPage.tsx" `
  -ExportName "DoctorPatientsPage" `
  -Title "Patients" `
  -Description "Your patient workspace is private and accessible only to authorised care staff." `
  -Rows @(
    @("Active patients","18 cases","Current care","Private"),
    @("Completed cases","64 records","Archive","Private")
  )

Write-Output "All role module pages created."

# ---- ROUTES ----

# Hospital
Write-RouteFile -OutPath "src\routes\hospital.index.tsx" -RouteId "/hospital/" -Title "" -ImportPath "" -ComponentName ""
Set-Content "src\routes\hospital.index.tsx" @'
import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/hospital/")({
  beforeLoad: () => { throw redirect({ to: "/hospital/details" }); },
});
'@ -NoNewline

Write-RouteFile -OutPath "src\routes\hospital.details.tsx" -RouteId "/hospital/details" -Title "Hospital Details — KKD Portal" -ImportPath "@/modules/hospital/pages/Details/HospitalDetailsPage" -ComponentName "HospitalDetailsPage"
Write-RouteFile -OutPath "src\routes\hospital.address.tsx" -RouteId "/hospital/address" -Title "Address — KKD Hospital Portal" -ImportPath "@/modules/hospital/pages/Address/HospitalAddressPage" -ComponentName "HospitalAddressPage"
Write-RouteFile -OutPath "src\routes\hospital.doctors.tsx" -RouteId "/hospital/doctors" -Title "Doctors — KKD Hospital Portal" -ImportPath "@/modules/hospital/pages/Doctors/HospitalDoctorsPage" -ComponentName "HospitalDoctorsPage"
Write-RouteFile -OutPath "src\routes\hospital.patients.tsx" -RouteId "/hospital/patients" -Title "Patients — KKD Hospital Portal" -ImportPath "@/modules/hospital/pages/Patients/HospitalPatientsPage" -ComponentName "HospitalPatientsPage"

# Lab
Set-Content "src\routes\lab.index.tsx" @'
import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/lab/")({
  beforeLoad: () => { throw redirect({ to: "/lab/details" }); },
});
'@ -NoNewline

Write-RouteFile -OutPath "src\routes\lab.details.tsx" -RouteId "/lab/details" -Title "Lab Details — KKD Portal" -ImportPath "@/modules/lab/pages/Details/LabDetailsPage" -ComponentName "LabDetailsPage"
Write-RouteFile -OutPath "src\routes\lab.address.tsx" -RouteId "/lab/address" -Title "Address — KKD Lab Portal" -ImportPath "@/modules/lab/pages/Address/LabAddressPage" -ComponentName "LabAddressPage"
Write-RouteFile -OutPath "src\routes\lab.services.tsx" -RouteId "/lab/services" -Title "Services — KKD Lab Portal" -ImportPath "@/modules/lab/pages/Services/LabServicesPage" -ComponentName "LabServicesPage"
Write-RouteFile -OutPath "src\routes\lab.staff.tsx" -RouteId "/lab/staff" -Title "Staff — KKD Lab Portal" -ImportPath "@/modules/lab/pages/Staff/LabStaffPage" -ComponentName "LabStaffPage"

# Blood bank
Set-Content "src\routes\blood-bank.index.tsx" @'
import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/blood-bank/")({
  beforeLoad: () => { throw redirect({ to: "/blood-bank/details" }); },
});
'@ -NoNewline

Write-RouteFile -OutPath "src\routes\blood-bank.details.tsx" -RouteId "/blood-bank/details" -Title "Blood Bank Details — KKD Portal" -ImportPath "@/modules/blood-bank/pages/Details/BloodBankDetailsPage" -ComponentName "BloodBankDetailsPage"
Write-RouteFile -OutPath "src\routes\blood-bank.address.tsx" -RouteId "/blood-bank/address" -Title "Address — KKD Blood Bank Portal" -ImportPath "@/modules/blood-bank/pages/Address/BloodBankAddressPage" -ComponentName "BloodBankAddressPage"
Write-RouteFile -OutPath "src\routes\blood-bank.inventory.tsx" -RouteId "/blood-bank/inventory" -Title "Inventory — KKD Blood Bank Portal" -ImportPath "@/modules/blood-bank/pages/Inventory/BloodInventoryPage" -ComponentName "BloodInventoryPage"
Write-RouteFile -OutPath "src\routes\blood-bank.donors.tsx" -RouteId "/blood-bank/donors" -Title "Donors — KKD Blood Bank Portal" -ImportPath "@/modules/blood-bank/pages/Donors/BloodDonorsPage" -ComponentName "BloodDonorsPage"

# Doctor
Set-Content "src\routes\doctor.index.tsx" @'
import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/doctor/")({
  beforeLoad: () => { throw redirect({ to: "/doctor/profile" }); },
});
'@ -NoNewline

Write-RouteFile -OutPath "src\routes\doctor.profile.tsx" -RouteId "/doctor/profile" -Title "Professional Profile — KKD Doctor Portal" -ImportPath "@/modules/doctor/pages/Profile/DoctorProfilePage" -ComponentName "DoctorProfilePage"
Write-RouteFile -OutPath "src\routes\doctor.hospital.tsx" -RouteId "/doctor/hospital" -Title "Hospital Affiliation — KKD Doctor Portal" -ImportPath "@/modules/doctor/pages/Hospital/DoctorHospitalPage" -ComponentName "DoctorHospitalPage"
Write-RouteFile -OutPath "src\routes\doctor.patients.tsx" -RouteId "/doctor/patients" -Title "Patients — KKD Doctor Portal" -ImportPath "@/modules/doctor/pages/Patients/DoctorPatientsPage" -ComponentName "DoctorPatientsPage"

Write-Output "All role routes created."

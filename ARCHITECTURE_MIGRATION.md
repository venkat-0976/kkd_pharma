# KKD Pharmacy — Architecture Migration Map

This document lists every file being migrated, its purpose, the owning business module, current and new routes, target locations, navigation mapping, API services, and auth requirements.

| Current File | Current Purpose | Owner | Current Route | New Location | New Route | Page/Component | Navigation | API/Service | Auth | Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `src/components/layout/PublicLayout.tsx` | Main website layout shell | website | N/A | `src/layouts/WebsiteLayout.tsx` | N/A | Layout component | N/A | N/A | None | Rename & Move |
| `src/features/auth/AuthLayout.tsx` | Authentication pages shell | auth | N/A | `src/layouts/AuthLayout.tsx` | N/A | Layout component | N/A | N/A | None | Move |
| `src/features/admin/AdminShell.tsx` | Admin panel shell layout | admin | N/A | `src/layouts/AdminLayout.tsx` | N/A | Layout component | N/A | N/A | Admin | Refactor & Move |
| `src/features/member/MemberShell.tsx` | Member portal layout shell | Shared | N/A | `src/layouts/AuthenticatedPortalLayout.tsx` | N/A | Reusable layout | N/A | N/A | Member | Refactor & Move |
| `src/features/auth/forms/LoginForm.tsx` | Visual LoginForm component | auth | N/A | `src/modules/auth/components/LoginForm.tsx` | N/A | Form Component | N/A | N/A | None | Move |
| `src/features/auth/forms/ForgotPasswordForm.tsx` | Visual ForgotPasswordForm | auth | N/A | `src/modules/auth/components/ForgotPasswordForm.tsx` | N/A | Form Component | N/A | N/A | None | Move |
| `src/features/auth/forms/DemoCredentials.tsx` | Preview credentials table | auth | N/A | `src/modules/auth/components/DemoCredentials.tsx` | N/A | Helper Component | N/A | N/A | None | Move |
| `src/routes/login.tsx` | Login route handler | auth | `/login` | `src/routes/login.tsx` | `/login` | Route Entry | N/A | N/A | None | Update imports |
| `src/routes/forgot-password.tsx` | Forgot password route handler | auth | `/forgot-password` | `src/routes/forgot-password.tsx` | `/forgot-password` | Route Entry | N/A | N/A | None | Update imports |
| `src/routes/index.tsx` | Home page route handler | website | `/` | `src/routes/index.tsx` | `/` | Route Entry | N/A | N/A | None | Update imports |
| `src/features/home/HeroSection.tsx` | Hero section of homepage | website | N/A | `src/modules/website/components/HeroSection.tsx` | N/A | Section Component | N/A | N/A | None | Move |
| `src/features/home/StatsSection.tsx` | Stats section of homepage | website | N/A | `src/modules/website/components/StatsSection.tsx` | N/A | Section Component | N/A | N/A | None | Move |
| `src/features/home/ServicesSection.tsx` | Services list of homepage | website | N/A | `src/modules/website/components/ServicesSection.tsx` | N/A | Section Component | N/A | N/A | None | Move |
| `src/features/home/FeaturedRetailers.tsx` | Featured retailers section | website | N/A | `src/modules/website/components/FeaturedRetailers.tsx` | N/A | Section Component | N/A | N/A | None | Move |
| `src/features/home/FeaturedWholesalers.tsx` | Featured wholesalers section | website | N/A | `src/modules/website/components/FeaturedWholesalers.tsx` | N/A | Section Component | N/A | N/A | None | Move |
| `src/features/home/MemberCta.tsx` | Member Call to Action | website | N/A | `src/modules/website/components/MemberCta.tsx` | N/A | Section Component | N/A | N/A | None | Move |
| `src/routes/about.tsx` | About page route handler | website | `/about` | `src/routes/about.tsx` | `/about` | Route Entry | N/A | N/A | None | Update imports |
| `src/routes/career.tsx` | Career page route handler | website | `/career` | `src/routes/career.tsx` | `/career` | Route Entry | N/A | N/A | None | Update imports |
| `src/routes/contact.tsx` | Contact page route handler | website | `/contact` | `src/routes/contact.tsx` | `/contact` | Route Entry | N/A | N/A | None | Update imports |
| `src/routes/services.tsx` | Services page route handler | website | `/services` | `src/routes/services.tsx` | `/services` | Route Entry | N/A | N/A | None | Update imports |
| `src/routes/doctors.tsx` | Doctors directory route handler | website | `/doctors` | `src/routes/doctors.tsx` | `/doctors` | Route Entry | N/A | N/A | None | Update imports |
| `src/routes/hospitals.tsx` | Hospitals directory route handler | website | `/hospitals` | `src/routes/hospitals.tsx` | `/hospitals` | Route Entry | N/A | N/A | None | Update imports |
| `src/routes/labs.tsx` | Labs directory route handler | website | `/labs` | `src/routes/labs.tsx` | `/labs` | Route Entry | N/A | N/A | None | Update imports |
| `src/routes/insurance.tsx` | Insurance page route handler | website | `/insurance` | `src/routes/insurance.tsx` | `/insurance` | Route Entry | N/A | N/A | None | Update imports |
| `src/routes/join.tsx` | Join form route handler | website | `/join` | `src/routes/join.tsx` | `/join` | Route Entry | N/A | N/A | None | Update imports |
| `src/routes/retailers.index.tsx` | Retailers directory index route | website | `/retailers` | `src/routes/retailers.index.tsx` | `/retailers` | Route Entry | N/A | N/A | None | Update imports |
| `src/routes/retailers.$slug.tsx` | Retailer detailed public profile | website | `/retailers/$slug` | `src/routes/retailers.$slug.tsx` | `/retailers/$slug` | Route Entry | N/A | N/A | None | Update imports |
| `src/routes/wholesalers.index.tsx` | Wholesalers directory index route | website | `/wholesalers` | `src/routes/wholesalers.index.tsx` | `/wholesalers` | Route Entry | N/A | N/A | None | Update imports |
| `src/routes/wholesalers.$slug.tsx` | Wholesaler detailed public profile | website | `/wholesalers/$slug` | `src/routes/wholesalers.$slug.tsx` | `/wholesalers/$slug` | Route Entry | N/A | N/A | None | Update imports |
| `src/features/directory/DirectoryGrid.tsx` | Directory search and grid | website | N/A | `src/modules/website/components/DirectoryGrid.tsx` | N/A | UI Component | N/A | N/A | None | Move |
| `src/features/directory/BusinessDetail.tsx` | Public detail panel | website | N/A | `src/modules/website/components/BusinessDetail.tsx` | N/A | UI Component | N/A | N/A | None | Move |
| `src/features/directory/ComplianceNoticeDialog.tsx` | Public directory notice | website | N/A | `src/modules/website/components/ComplianceNoticeDialog.tsx` | N/A | Dialog Component | N/A | N/A | None | Move |
| `src/components/forms/CareerApplicationForm.tsx` | Job application form | website | N/A | `src/modules/website/components/CareerApplicationForm.tsx` | N/A | Form Component | N/A | N/A | None | Move |
| `src/components/forms/ContactForm.tsx` | Website contact enquiry form | website | N/A | `src/modules/website/components/ContactForm.tsx` | N/A | Form Component | N/A | N/A | None | Move |
| `src/components/forms/MembershipApplicationForm.tsx` | Public member application form | website | N/A | `src/modules/website/components/MembershipApplicationForm.tsx` | N/A | Form Component | N/A | N/A | None | Move |
| `src/components/forms/DirectoryFilters.tsx` | Area/Category filters | website | N/A | `src/modules/website/components/DirectoryFilters.tsx` | N/A | Filter Component | N/A | N/A | None | Move |
| `src/components/cards/JobCard.tsx` | Career listing card | website | N/A | `src/modules/website/components/JobCard.tsx` | N/A | Card Component | N/A | N/A | None | Move |
| `src/components/cards/OrganisationCard.tsx` | Directory partner listing card | website | N/A | `src/modules/website/components/OrganisationCard.tsx` | N/A | Card Component | N/A | N/A | None | Move |
| `src/components/cards/BusinessCard.tsx` | Directory business listing card | website | N/A | `src/modules/website/components/BusinessCard.tsx` | N/A | Card Component | N/A | N/A | None | Move |
| `src/components/cards/ServiceCard.tsx` | Homepage service box | website | N/A | `src/modules/website/components/ServiceCard.tsx` | N/A | Card Component | N/A | N/A | None | Move |
| `src/components/cards/StatCard.tsx` | Homepage count box | website | N/A | `src/modules/website/components/StatCard.tsx` | N/A | Card Component | N/A | N/A | None | Move |
| `src/routes/admin.tsx` | Admin guard layout handler | admin | `/admin` | `src/routes/admin.tsx` | `/admin` | Route Entry | N/A | N/A | Admin | Update imports |
| `src/routes/admin.index.tsx` | Admin index path redirector | admin | `/admin/` | `src/routes/admin.index.tsx` | `/admin/` | Route Entry | N/A | N/A | Admin | Update imports |
| `src/routes/admin.overview.tsx` | Admin overview layout page | admin | `/admin/overview` | `src/routes/admin.overview.tsx` | `/admin/overview` | Route Entry | N/A | N/A | Admin | Update imports |
| `src/routes/admin.approvals.tsx` | Approvals listing route handler | admin | `/admin/approvals` | `src/routes/admin.approvals.tsx` | `/admin/approvals` | Route Entry | N/A | N/A | Admin | Update imports |
| `src/routes/admin.retailers.tsx` | Retailer audit directory route | admin | `/admin/retailers` | `src/routes/admin.retailers.tsx` | `/admin/retailers` | Route Entry | N/A | N/A | Admin | Update imports |
| `src/routes/admin.wholesalers.tsx` | Wholesaler audit directory route | admin | `/admin/wholesalers` | `src/routes/admin.wholesalers.tsx` | `/admin/wholesalers` | Route Entry | N/A | N/A | Admin | Update imports |
| `src/routes/admin.hospitals.tsx` | Hospital audit directory route | admin | `/admin/hospitals` | `src/routes/admin.hospitals.tsx` | `/admin/hospitals` | Route Entry | N/A | N/A | Admin | Update imports |
| `src/routes/admin.labs.tsx` | Lab audit directory route | admin | `/admin/labs` | `src/routes/admin.labs.tsx` | `/admin/labs` | Route Entry | N/A | N/A | Admin | Update imports |
| `src/routes/admin.doctors.tsx` | Doctor audit directory route | admin | `/admin/doctors` | `src/routes/admin.doctors.tsx` | `/admin/doctors` | Route Entry | N/A | N/A | Admin | Update imports |
| `src/routes/admin.blood-banks.tsx` | Blood bank audit directory route | admin | `/admin/blood-banks` | `src/routes/admin.blood-banks.tsx` | `/admin/blood-banks` | Route Entry | N/A | N/A | Admin | Update imports |
| `src/routes/admin.facilities.$slug.tsx` | Facility audit detail page handler | admin | `/admin/facilities/$slug` | `src/routes/admin.facilities.$slug.tsx` | `/admin/facilities/$slug` | Route Entry | N/A | N/A | Admin | Update imports |
| `src/features/admin/MemberDirectoryTable.tsx` | Members directory for admins | admin | N/A | `src/modules/admin/components/MemberDirectoryTable.tsx` | N/A | Table Component | N/A | N/A | Admin | Move |
| `src/features/admin/FacilityDirectoryTable.tsx` | Facility directory for admins | admin | N/A | `src/modules/admin/components/FacilityDirectoryTable.tsx` | N/A | Table Component | N/A | N/A | Admin | Move |
| `src/config/adminNav.ts` | Sidebar navigation config for admin | admin | N/A | `src/modules/admin/navigation/adminNav.ts` | N/A | Nav definition | N/A | N/A | None | Move |
| `src/services/admin/admin.service.ts` | Admin stats and approval APIs | admin | N/A | `src/modules/admin/services/admin.service.ts` | N/A | Mock Service | N/A | N/A | None | Move |
| `src/routes/member.hospital.tsx` | Hospital Details Route | hospital | `/member/hospital` | `src/routes/hospital.tsx` | `/hospital` | Route Entry | N/A | N/A | Hospital | Rename & Refactor |
| `src/routes/member.hospital-address.tsx` | Hospital Address Route | hospital | `/member/hospital-address` | `src/routes/hospital.address.tsx` | `/hospital/address` | Route Entry | N/A | N/A | Hospital | Rename & Refactor |
| `src/routes/member.hospital-doctors.tsx` | Hospital Doctors Route | hospital | `/member/hospital-doctors` | `src/routes/hospital.doctors.tsx` | `/hospital/doctors` | Route Entry | N/A | N/A | Hospital | Rename & Refactor |
| `src/routes/member.hospital-patients.tsx` | Hospital Patients Route | hospital | `/member/hospital-patients` | `src/routes/hospital.patients.tsx` | `/hospital/patients` | Route Entry | N/A | N/A | Hospital | Rename & Refactor |
| `src/portals/hospital/index.ts` | Hospital portal tabs config | hospital | N/A | `src/modules/hospital/navigation/hospitalNav.ts` | N/A | Nav definition | N/A | N/A | None | Move & Rename |
| `src/routes/member.lab.tsx` | Laboratory Details Route | lab | `/member/lab` | `src/routes/lab.tsx` | `/lab` | Route Entry | N/A | N/A | Lab | Rename & Refactor |
| `src/routes/member.lab-address.tsx` | Laboratory Address Route | lab | `/member/lab-address` | `src/routes/lab.address.tsx` | `/lab/address` | Route Entry | N/A | N/A | Lab | Rename & Refactor |
| `src/routes/member.lab-services.tsx` | Laboratory Services Route | lab | `/member/lab-services` | `src/routes/lab.services.tsx` | `/lab/services` | Route Entry | N/A | N/A | Lab | Rename & Refactor |
| `src/routes/member.lab-staff.tsx` | Laboratory Staff Route | lab | `/member/lab-staff` | `src/routes/lab.staff.tsx` | `/lab/staff` | Route Entry | N/A | N/A | Lab | Rename & Refactor |
| `src/portals/lab/index.ts` | Laboratory portal tabs config | lab | N/A | `src/modules/lab/navigation/labNav.ts` | N/A | Nav definition | N/A | N/A | None | Move & Rename |
| `src/routes/member.blood-bank.tsx` | Blood Bank Details Route | blood-bank | `/member/blood-bank` | `src/routes/blood-bank.tsx` | `/blood-bank` | Route Entry | N/A | N/A | Blood Bank | Rename & Refactor |
| `src/routes/member.blood-bank-address.tsx` | Blood Bank Address Route | blood-bank | `/member/blood-bank-address` | `src/routes/blood-bank.address.tsx` | `/blood-bank/address` | Route Entry | N/A | N/A | Blood Bank | Rename & Refactor |
| `src/routes/member.blood-inventory.tsx` | Blood Bank Inventory Route | blood-bank | `/member/blood-inventory` | `src/routes/blood-bank.inventory.tsx` | `/blood-bank/inventory` | Route Entry | N/A | N/A | Blood Bank | Rename & Refactor |
| `src/routes/member.blood-donors.tsx` | Blood Bank Donors Route | blood-bank | `/member/blood-donors` | `src/routes/blood-bank.donors.tsx` | `/blood-bank/donors` | Route Entry | N/A | N/A | Blood Bank | Rename & Refactor |
| `src/portals/blood-bank/index.ts` | Blood Bank portal tabs config | blood-bank | N/A | `src/modules/blood-bank/navigation/bloodBankNav.ts` | N/A | Nav definition | N/A | N/A | None | Move & Rename |
| `src/routes/member.doctor.tsx` | Doctor Profile Route | doctor | `/member/doctor` | `src/routes/doctor.tsx` | `/doctor` | Route Entry | N/A | N/A | Doctor | Rename & Refactor |
| `src/routes/member.doctor-hospital.tsx` | Doctor Hospital Affiliations | doctor | `/member/doctor-hospital` | `src/routes/doctor.hospital.tsx` | `/doctor/hospital` | Route Entry | N/A | N/A | Doctor | Rename & Refactor |
| `src/routes/member.doctor-patients.tsx` | Doctor Patients Route | doctor | `/member/doctor-patients` | `src/routes/doctor.patients.tsx` | `/doctor/patients` | Route Entry | N/A | N/A | Doctor | Rename & Refactor |
| `src/portals/doctor/index.ts` | Doctor portal tabs config | doctor | N/A | `src/modules/doctor/navigation/doctorNav.ts` | N/A | Nav definition | N/A | N/A | None | Move & Rename |
| `src/routes/member.role-documents.tsx` | Role Upload Documents Route | Shared | `/member/role-documents` | Split: N/A | Redirect | N/A | N/A | N/A | Role | Split / Redirect |
| `src/features/member/RoleWorkspace.tsx` | Large workspace renderer switch | Shared | N/A | Split: N/A | N/A | Workspace Panel | N/A | N/A | Role | Split to modules |
| `src/routes/member.profile.tsx` | General Profile Route | Shared | `/member/profile` | `src/routes/retailer.profile.tsx` / `src/routes/wholesaler.profile.tsx` | `/retailer/profile` / `/wholesaler/profile` | Route Entry | N/A | N/A | Member | Split & Redirect |
| `src/routes/member.owners.tsx` | General Owners Route | Shared | `/member/owners` | `src/routes/retailer.owners.tsx` / `src/routes/wholesaler.owners.tsx` | `/retailer/owners` / `/wholesaler/owners` | Route Entry | N/A | N/A | Member | Split & Redirect |
| `src/routes/member.pharmacists.tsx` | General Pharmacists Route | Shared | `/member/pharmacists` | `src/routes/retailer.pharmacists.tsx` / `src/routes/wholesaler.pharmacists.tsx` | `/retailer/pharmacists` / `/wholesaler/pharmacists` | Route Entry | N/A | N/A | Member | Split & Redirect |
| `src/routes/member.employees.tsx` | General Employees Route | Shared | `/member/employees` | `src/routes/retailer.employees.tsx` / `src/routes/wholesaler.employees.tsx` | `/retailer/employees` / `/wholesaler/employees` | Route Entry | N/A | N/A | Member | Split & Redirect |
| `src/routes/member.licences.tsx` | General Licences Route | Shared | `/member/licences` | `src/routes/retailer.licences.tsx` / `src/routes/wholesaler.licences.tsx` | `/retailer/licences` / `/wholesaler/licences` | Route Entry | N/A | N/A | Member | Split & Redirect |
| `src/routes/member.documents.tsx` | General Documents Route | Shared | `/member/documents` | `src/routes/retailer.documents.tsx` / `src/routes/wholesaler.documents.tsx` | `/retailer/documents` / `/wholesaler/documents` | Route Entry | N/A | N/A | Member | Split & Redirect |
| `src/routes/member.alerts.tsx` | General Alerts Route | Shared | `/member/alerts` | `src/routes/retailer.alerts.tsx` / `src/routes/wholesaler.alerts.tsx` | `/retailer/alerts` / `/wholesaler/alerts` | Route Entry | N/A | N/A | Member | Split & Redirect |
| `src/routes/member.settings.tsx` | General Settings Route | Shared | `/member/settings` | `src/routes/retailer.settings.tsx` / `src/routes/wholesaler.settings.tsx` | `/retailer/settings` / `/wholesaler/settings` | Route Entry | N/A | N/A | Member | Split & Redirect |
| `src/features/member/ShopAddressForm.tsx` | Shop address capture form | Shared | N/A | `src/components/common/ShopAddressForm.tsx` | N/A | Reusable Form | N/A | N/A | Member | Move |
| `src/features/member/DocumentUploadDialog.tsx` | Doc upload modal dialog | Shared | N/A | `src/components/common/DocumentUploadDialog.tsx` | N/A | Reusable Dialog | N/A | N/A | Member | Move |
| `src/features/member/DocumentViewDialog.tsx` | Doc view viewer dialog | Shared | N/A | `src/components/common/DocumentViewDialog.tsx` | N/A | Reusable Dialog | N/A | N/A | Member | Move |
| `src/features/member/EmployeeDialog.tsx` | Staff create/edit dialog | Shared | N/A | `src/components/common/EmployeeDialog.tsx` | N/A | Reusable Dialog | N/A | N/A | Member | Move |
| `src/features/member/LicenceCard.tsx` | Drug/Food license item box | Shared | N/A | `src/components/common/LicenceCard.tsx` | N/A | Reusable Card | N/A | N/A | Member | Move |
| `src/features/member/OwnerDialog.tsx` | Owner details create/edit | Shared | N/A | `src/components/common/OwnerDialog.tsx` | N/A | Reusable Dialog | N/A | N/A | Member | Move |
| `src/features/member/PharmacistDialog.tsx` | Pharmacist details dialog | Shared | N/A | `src/components/common/PharmacistDialog.tsx` | N/A | Reusable Dialog | N/A | N/A | Member | Move |
| `src/features/member/SectionCard.tsx` | Member card layout frame | Shared | N/A | `src/components/common/SectionCard.tsx` | N/A | Reusable Card | N/A | N/A | Member | Move |
| `src/features/member/StatusBadge.tsx` | Expiry status visual tag | Shared | N/A | `src/components/common/StatusBadge.tsx` | N/A | Reusable Badge | N/A | N/A | Member | Move |
| `src/features/member/UnionShopIdentity.tsx` | Header shop name/id label | Shared | N/A | `src/components/common/UnionShopIdentity.tsx` | N/A | Reusable Component | N/A | N/A | Member | Move |
| `src/services/member/member.service.ts` | Member profile API services | Shared | N/A | `src/modules/retailer/services/retailer.service.ts` / `src/modules/wholesaler/services/wholesaler.service.ts` | N/A | Mock Service | N/A | N/A | Member | Split & Move |
| `src/services/member/member.seed.ts` | Mock databases and accounts | Shared | N/A | `src/modules/retailer/services/retailer.seed.ts` / `src/modules/wholesaler/services/wholesaler.seed.ts` | N/A | Mock Database | N/A | N/A | Member | Split & Move |
| `src/config/memberNav.ts` | General member sidebar tabs | Shared | N/A | `src/modules/retailer/navigation/retailerNav.ts` / `src/modules/wholesaler/navigation/wholesalerNav.ts` | N/A | Navigation definition | N/A | N/A | None | Split & Move |

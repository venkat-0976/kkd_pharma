# Project Structure & Complete File Tree

This document provides the complete, exhaustive tree listing of all files and sub-files in the application.

```text
src/
├── App.tsx             # Root application component (Router + Providers + Toaster)
├── assets                 # Images and static imported assets
│   └── images                 # Static image assets (hero imagery, placeholders)
│       └── hero-pharmacy.jpg
├── components                 # Reusable UI and layout components
│   ├── cards                 # Reusable business/job/service/stat cards
│   │   ├── BusinessCard.tsx
│   │   ├── JobCard.tsx
│   │   ├── OrganisationCard.tsx
│   │   ├── ServiceCard.tsx
│   │   └── StatCard.tsx
│   ├── common                 # Reusable app-wide components
│   │   ├── DocumentUploadDialog.tsx
│   │   ├── DocumentViewDialog.tsx
│   │   ├── EmployeeDialog.tsx
│   │   ├── EmptyState.tsx
│   │   ├── LicenceCard.tsx
│   │   ├── Logo.tsx
│   │   ├── MemberDirectory.tsx
│   │   ├── MemberViewToggle.tsx
│   │   ├── OwnerDialog.tsx
│   │   ├── PageHero.tsx
│   │   ├── PersonAvatar.tsx
│   │   ├── PersonPhotoUpload.tsx
│   │   ├── PharmacistDialog.tsx
│   │   ├── PrivacyNotice.tsx
│   │   ├── SectionCard.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── ShopAddressForm.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── UnionShopIdentity.tsx
│   │   └── WhatsAppButton.tsx
│   ├── documents
│   │   └── index.ts
│   ├── forms                 # Form components (contact, application, directory filters)
│   │   ├── CareerApplicationForm.tsx
│   │   ├── ContactForm.tsx
│   │   ├── DirectoryFilters.tsx
│   │   └── MembershipApplicationForm.tsx
│   ├── layout                 # Public site layout/header/footer
│   │   ├── PharmacistLayout.tsx
│   │   ├── PublicLayout.tsx
│   │   ├── RetailerLayout.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── SiteHeader.tsx
│   │   └── WholesalerLayout.tsx
│   ├── navigation                 # Navigation components
│   │   └── MobileNavDrawer.tsx
│   ├── pharmacist
│   │   └── PharmacistOverviewCard.tsx
│   ├── retailer
│   │   └── RetailerOverviewCard.tsx
│   ├── ui                 # Shadcn/Radix-style primitive UI components
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── alert.tsx
│   │   ├── aspect-ratio.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   ├── chart.tsx
│   │   ├── checkbox.tsx
│   │   ├── collapsible.tsx
│   │   ├── command.tsx
│   │   ├── context-menu.tsx
│   │   ├── dialog.tsx
│   │   ├── drawer.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── hover-card.tsx
│   │   ├── input-otp.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── menubar.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── pagination.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   ├── radio-group.tsx
│   │   ├── resizable.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   ├── slider.tsx
│   │   ├── sonner.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toggle-group.tsx
│   │   ├── toggle.tsx
│   │   └── tooltip.tsx
│   └── wholesaler                 # Wholesaler-specific overview cards
│       └── WholesalerOverviewCard.tsx
├── config                 # Navigation and application configuration registries
│   ├── adminNav.ts
│   ├── licenceFields.ts
│   ├── memberNav.ts
│   ├── navigation.ts
│   └── unions.ts
├── contexts                 # React Context providers (AuthContext, BusinessContext)
│   ├── AuthContext.tsx
│   └── BusinessContext.tsx
├── features                 # Feature domain modules
│   ├── admin                 # Admin dashboard and admin tables
│   │   ├── AdminShell.tsx
│   │   ├── FacilityDirectoryTable.tsx
│   │   └── MemberDirectoryTable.tsx
│   ├── auth                 # LOGIN / PASSWORD RECOVERY area
│   │   ├── AuthLayout.tsx             # Authentication layout shell with branding banner
│   │   └── forms                 # Authentication forms (Login, ForgotPassword, Credentials)
│   │       ├── DemoCredentials.tsx             # Quick-fill demo credentials helper
│   │       ├── ForgotPasswordForm.tsx             # Password recovery request form
│   │       └── LoginForm.tsx             # Multi-role authentication form
│   ├── directory                 # Retailer/wholesaler directory UI
│   │   ├── BusinessDetail.tsx
│   │   ├── ComplianceNoticeDialog.tsx
│   │   └── DirectoryGrid.tsx
│   ├── home                 # Homepage sections
│   │   ├── FeaturedRetailers.tsx
│   │   ├── FeaturedWholesalers.tsx
│   │   ├── HeroSection.tsx
│   │   ├── MemberCta.tsx
│   │   ├── ServicesSection.tsx
│   │   └── StatsSection.tsx
│   └── member                 # Member portal and member workspaces
│       ├── DocumentUploadDialog.tsx
│       ├── DocumentViewDialog.tsx
│       ├── EmployeeDialog.tsx
│       ├── LicenceCard.tsx
│       ├── MemberShell.tsx
│       ├── OwnerDialog.tsx
│       ├── PharmacistDialog.tsx
│       ├── RoleWorkspace.tsx
│       ├── SectionCard.tsx
│       ├── ShopAddressForm.tsx
│       ├── StatusBadge.tsx
│       └── UnionShopIdentity.tsx
├── hooks                 # Custom React hooks (session, member record, mobile detection)
│   ├── use-mobile.tsx
│   ├── useMemberRecord.ts
│   └── useSession.ts
├── index.css             # Primary Tailwind CSS v4 design tokens and utility classes
├── layouts                 # Authentication and portal layout wrappers
│   ├── AdminLayout.tsx
│   ├── AuthLayout.tsx             # Authentication layout shell with branding banner
│   ├── AuthenticatedPortalLayout.tsx
│   ├── BloodBankLayout.tsx
│   ├── DoctorLayout.tsx
│   ├── HospitalLayout.tsx
│   ├── LabLayout.tsx
│   ├── RetailerLayout.tsx
│   ├── WebsiteLayout.tsx
│   └── WholesalerLayout.tsx
├── lib                 # Utilities, expiry calculators, and Firebase client
│   ├── error-capture.ts
│   ├── error-page.ts
│   ├── expiry.ts
│   ├── firebase.ts
│   ├── initials.ts
│   ├── lovable-error-reporting.ts
│   ├── reverseGeocode.ts
│   └── utils.ts
├── main.tsx             # Client entry point mounting React root
├── modules                 # Feature modules with domain-scoped components and navigation
│   ├── admin
│   │   ├── components                 # Reusable UI and layout components
│   │   │   ├── FacilityDirectoryTable.tsx
│   │   │   └── MemberDirectoryTable.tsx
│   │   ├── navigation
│   │   │   └── adminNav.ts
│   │   └── services                 # Business/data service layer and mock databases
│   │       └── admin.service.ts
│   ├── auth
│   │   ├── components                 # Reusable UI and layout components
│   │   │   ├── DemoCredentials.tsx             # Quick-fill demo credentials helper
│   │   │   ├── ForgotPasswordForm.tsx             # Password recovery request form
│   │   │   └── LoginForm.tsx             # Multi-role authentication form
│   │   └── services                 # Business/data service layer and mock databases
│   │       └── auth.service.ts
│   ├── blood-bank
│   │   ├── navigation
│   │   │   └── bloodBankNav.ts
│   │   └── pages                 # Route-level screen components
│   │       ├── Address
│   │       │   └── BloodBankAddressPage.tsx
│   │       ├── Details
│   │       │   └── BloodBankDetailsPage.tsx
│   │       ├── Donors
│   │       │   └── BloodDonorsPage.tsx
│   │       └── Inventory
│   │           └── BloodInventoryPage.tsx
│   ├── doctor
│   │   └── navigation
│   │       └── doctorNav.ts
│   ├── hospital
│   │   ├── navigation
│   │   │   └── hospitalNav.ts
│   │   └── pages                 # Route-level screen components
│   │       ├── Address
│   │       │   └── HospitalAddressPage.tsx
│   │       ├── Details
│   │       │   └── HospitalDetailsPage.tsx
│   │       ├── Doctors
│   │       │   └── HospitalDoctorsPage.tsx
│   │       └── Patients
│   │           └── HospitalPatientsPage.tsx
│   ├── lab
│   │   ├── navigation
│   │   │   └── labNav.ts
│   │   └── pages                 # Route-level screen components
│   │       ├── Address
│   │       │   └── LabAddressPage.tsx
│   │       ├── Details
│   │       │   └── LabDetailsPage.tsx
│   │       ├── Services
│   │       │   └── LabServicesPage.tsx
│   │       └── Staff
│   │           └── LabStaffPage.tsx
│   ├── pharmacist
│   │   └── navigation
│   │       └── pharmacistNav.ts
│   ├── retailer
│   │   ├── navigation
│   │   │   └── retailerNav.ts
│   │   └── pages                 # Route-level screen components
│   │       ├── Alerts
│   │       │   └── AlertsPage.tsx
│   │       ├── Documents
│   │       │   └── DocumentsPage.tsx
│   │       ├── Employees
│   │       │   └── EmployeesPage.tsx
│   │       ├── Licences
│   │       │   └── LicencesPage.tsx
│   │       ├── Owners
│   │       │   └── OwnersPage.tsx
│   │       ├── Pharmacists
│   │       │   └── PharmacistsPage.tsx
│   │       ├── Profile
│   │       │   └── ProfilePage.tsx
│   │       └── Settings
│   │           └── SettingsPage.tsx
│   ├── website
│   │   └── components                 # Reusable UI and layout components
│   │       ├── BusinessCard.tsx
│   │       ├── BusinessDetail.tsx
│   │       ├── CareerApplicationForm.tsx
│   │       ├── ComplianceNoticeDialog.tsx
│   │       ├── ContactForm.tsx
│   │       ├── DirectoryFilters.tsx
│   │       ├── DirectoryGrid.tsx
│   │       ├── FeaturedRetailers.tsx
│   │       ├── FeaturedWholesalers.tsx
│   │       ├── HeroSection.tsx
│   │       ├── JobCard.tsx
│   │       ├── MemberCta.tsx
│   │       ├── MembershipApplicationForm.tsx
│   │       ├── OrganisationCard.tsx
│   │       ├── ServiceCard.tsx
│   │       ├── ServicesSection.tsx
│   │       ├── StatCard.tsx
│   │       └── StatsSection.tsx
│   └── wholesaler
│       ├── navigation
│       │   └── wholesalerNav.ts
│       └── pages                 # Route-level screen components
│           ├── Alerts
│           │   └── AlertsPage.tsx
│           ├── Documents
│           │   └── DocumentsPage.tsx
│           ├── Employees
│           │   └── EmployeesPage.tsx
│           ├── Licences
│           │   └── LicencesPage.tsx
│           ├── Owners
│           │   └── OwnersPage.tsx
│           ├── Pharmacists
│           │   └── PharmacistsPage.tsx
│           ├── Profile
│           │   └── ProfilePage.tsx
│           └── Settings
│               └── SettingsPage.tsx
├── pages                 # Route-level screen components
│   ├── auth                 # Authentication pages (Login, ForgotPassword)
│   │   ├── ForgotPasswordPage.tsx
│   │   └── LoginPage.tsx
│   ├── pharmacist                 # Pharmacist member portal pages
│   │   ├── Dashboard.tsx
│   │   ├── Documents
│   │   │   └── DocumentsPage.tsx
│   │   ├── EmploymentHistory
│   │   │   └── EmploymentHistoryPage.tsx
│   │   ├── Profile
│   │   │   └── ProfilePage.tsx
│   │   └── Settings
│   │       └── SettingsPage.tsx
│   ├── public                 # Public-facing association website pages
│   │   ├── AboutPage.tsx
│   │   ├── BusinessDetailPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── JoinPage.tsx
│   │   ├── RetailersPage.tsx
│   │   ├── ServicesPage.tsx
│   │   └── WholesalersPage.tsx
│   ├── retailer                 # Retailer member portal pages
│   │   ├── Alerts
│   │   │   └── AlertsPage.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Directory
│   │   │   └── DirectoryPage.tsx
│   │   ├── Documents
│   │   │   └── DocumentsPage.tsx
│   │   ├── Employees
│   │   │   └── EmployeesPage.tsx
│   │   ├── Licences
│   │   │   └── LicencesPage.tsx
│   │   ├── Owners
│   │   │   └── OwnersPage.tsx
│   │   ├── Pharmacists
│   │   │   └── PharmacistsPage.tsx
│   │   ├── Profile
│   │   │   └── ProfilePage.tsx
│   │   └── Settings
│   │       └── SettingsPage.tsx
│   └── wholesaler                 # Wholesaler member portal pages
│       ├── Alerts
│       │   └── AlertsPage.tsx
│       ├── CompetentPerson
│       │   └── CompetentPersonPage.tsx
│       ├── Dashboard.tsx
│       ├── Directory
│       │   └── DirectoryPage.tsx
│       ├── Documents
│       │   └── DocumentsPage.tsx
│       ├── Employees
│       │   └── EmployeesPage.tsx
│       ├── Licences
│       │   └── LicencesPage.tsx
│       ├── Owners
│       │   └── OwnersPage.tsx
│       ├── Profile
│       │   └── ProfilePage.tsx
│       └── Settings
│           └── SettingsPage.tsx
├── portals                 # Role-specific portal definitions
│   ├── admin                 # Admin portal registry
│   │   └── index.ts
│   ├── blood-bank                 # Blood-bank portal registry
│   │   └── index.ts
│   ├── doctor                 # Doctor portal registry
│   │   └── index.ts
│   ├── hospital                 # Hospital portal registry
│   │   └── index.ts
│   ├── lab                 # Diagnostic lab portal registry
│   │   └── index.ts
│   ├── retailer                 # Retailer portal registry
│   │   └── index.ts
│   ├── types.ts
│   └── wholesaler                 # Wholesaler portal registry
│       └── index.ts
├── routeTree.gen.ts
├── router.tsx
├── routes                 # React Router v7 route definitions and sub-routers
│   ├── PharmacistRoutes.tsx
│   ├── README.md
│   ├── RetailerRoutes.tsx
│   ├── WholesalerRoutes.tsx
│   ├── __root.tsx
│   ├── about.tsx
│   ├── admin.approvals.tsx
│   ├── admin.blood-banks.tsx
│   ├── admin.doctors.tsx
│   ├── admin.facilities.$slug.tsx
│   ├── admin.hospitals.tsx
│   ├── admin.index.tsx
│   ├── admin.labs.tsx
│   ├── admin.overview.tsx
│   ├── admin.retailers.tsx
│   ├── admin.tsx
│   ├── admin.wholesalers.tsx
│   ├── blood-bank.tsx
│   ├── career.tsx
│   ├── contact.tsx
│   ├── doctor.tsx
│   ├── doctors.tsx
│   ├── forgot-password.tsx
│   ├── hospital.tsx
│   ├── hospitals.tsx
│   ├── index.tsx
│   ├── insurance.tsx
│   ├── join.tsx
│   ├── lab.tsx
│   ├── labs.tsx
│   ├── login.tsx
│   ├── member.address.tsx
│   ├── member.alerts.tsx
│   ├── member.blood-bank-address.tsx
│   ├── member.blood-bank.tsx
│   ├── member.blood-donors.tsx
│   ├── member.blood-inventory.tsx
│   ├── member.directory.tsx
│   ├── member.doctor-hospital.tsx
│   ├── member.doctor-patients.tsx
│   ├── member.doctor.tsx
│   ├── member.documents.tsx
│   ├── member.employees.tsx
│   ├── member.hospital-address.tsx
│   ├── member.hospital-doctors.tsx
│   ├── member.hospital-patients.tsx
│   ├── member.hospital.tsx
│   ├── member.index.tsx
│   ├── member.lab-address.tsx
│   ├── member.lab-services.tsx
│   ├── member.lab-staff.tsx
│   ├── member.lab.tsx
│   ├── member.licences.tsx
│   ├── member.owners.tsx
│   ├── member.pharmacists.tsx
│   ├── member.profile.tsx
│   ├── member.role-documents.tsx
│   ├── member.settings.tsx
│   ├── member.tsx
│   ├── retailer.alerts.tsx
│   ├── retailer.directory.tsx
│   ├── retailer.documents.tsx
│   ├── retailer.employees.tsx
│   ├── retailer.index.tsx
│   ├── retailer.licences.tsx
│   ├── retailer.owners.tsx
│   ├── retailer.pharmacists.tsx
│   ├── retailer.profile.tsx
│   ├── retailer.settings.tsx
│   ├── retailer.tsx
│   ├── retailers.$slug.tsx
│   ├── retailers.index.tsx
│   ├── services.tsx
│   ├── wholesaler.alerts.tsx
│   ├── wholesaler.directory.tsx
│   ├── wholesaler.documents.tsx
│   ├── wholesaler.employees.tsx
│   ├── wholesaler.index.tsx
│   ├── wholesaler.licences.tsx
│   ├── wholesaler.owners.tsx
│   ├── wholesaler.pharmacists.tsx
│   ├── wholesaler.profile.tsx
│   ├── wholesaler.settings.tsx
│   ├── wholesaler.tsx
│   ├── wholesalers.$slug.tsx
│   └── wholesalers.index.tsx
├── server.ts
├── services                 # Business/data service layer and mock databases
│   ├── admin                 # Admin directory service
│   │   └── admin.service.ts
│   ├── api                 # API client and error definitions
│   │   ├── client.ts
│   │   ├── errors.ts
│   │   └── types.ts
│   ├── api.ts
│   ├── association                 # Public association services and milestones
│   │   └── association.service.ts
│   ├── auth                 # Authentication state and mock credentials service
│   │   └── auth.service.ts
│   ├── auth.ts
│   ├── career                 # Job listings and recruitment service
│   │   └── jobs.service.ts
│   ├── competentPerson.ts
│   ├── compliance                 # Regulatory guidelines and statutory notices
│   │   └── compliance.service.ts
│   ├── directory                 # Retailer, wholesaler, and partner directories
│   │   ├── partners.service.ts
│   │   ├── retailers.service.ts
│   │   └── wholesalers.service.ts
│   ├── documents.ts
│   ├── employees.ts
│   ├── member                 # Member CRUD operations and mock database seeds
│   │   ├── member.seed.ts
│   │   └── member.service.ts
│   ├── pharmacist.ts
│   ├── retailer.ts
│   └── wholesaler.ts
├── start.ts
├── styles.css             # Design system definitions & OKLCH color token definitions
├── types                 # Shared TypeScript types and data models
│   ├── auth.ts
│   ├── competentPerson.ts
│   ├── directory.ts
│   ├── employee.ts
│   ├── member.ts
│   ├── pharmacist.ts
│   ├── retailer.ts
│   └── wholesaler.ts
├── utils                 # Shared utility helper functions
│   └── index.ts
└── validation                 # Form validation schemas
    ├── memberForms.ts
    └── publicForms.ts
```

---

## Directory Overview

| Directory | Description |
|-----------|-------------|
| `src/assets/` | Images and static imported assets |
| `src/components/cards/` | Reusable business/job/service/stat cards |
| `src/components/common/` | Reusable app-wide components |
| `src/components/layout/` | Public site layout/header/footer |
| `src/components/navigation/` | Navigation components |
| `src/components/ui/` | Shadcn/Radix-style primitive UI components |
| `src/features/auth/` | LOGIN / PASSWORD RECOVERY area (forms, demo credentials, layout) |
| `src/features/admin/` | Admin dashboard and admin tables |
| `src/features/member/` | Member portal and member workspaces |
| `src/features/directory/` | Retailer/wholesaler directory UI |
| `src/features/home/` | Homepage sections |
| `src/features/forms/` | Remaining public forms |
| `src/portals/` | Role-specific portal definitions (admin, blood-bank, doctor, hospital, lab, retailer, wholesaler) |
| `src/pages/` | Route-level screen components for public, auth, and member roles |
| `src/routes/` | React Router v7 route definitions and sub-routers |
| `src/services/` | Business/data service layer |
| `src/config/` | Navigation and application configuration |
| `src/contexts/` | React Context providers (AuthContext, BusinessContext) |
| `src/hooks/` | React hooks |
| `src/lib/` | Utilities and infrastructure helpers |
| `src/types/` | Shared TypeScript types |
| `src/validation/` | Form validation schemas |

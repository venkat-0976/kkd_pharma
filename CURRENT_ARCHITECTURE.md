# KKD Pharmacy — Current Project Inventory & Target Architecture

This document maps all existing source files, their responsibilities, current routes, current ownership, dependencies, and the target location in the refactored architecture.

---

## 1. Core & Infrastructure Files

| File Path               | Responsibility                                                                     | Current Owner         | Dependencies                                              | Target Location                                                                                             |
| :---------------------- | :--------------------------------------------------------------------------------- | :-------------------- | :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `src/router.tsx`        | Creates the TanStack Router instance and integrates React Query.                   | Shared Infrastructure | `@/routeTree.gen`                                         | `src/router.tsx` (Unchanged, imports updated)                                                               |
| `src/server.ts`         | Server-side entry wrapper for error capturing and custom SSR responses.            | Shared Infrastructure | `@/lib/error-capture`, `@/lib/error-page`                 | `src/server.ts` (Unchanged)                                                                                 |
| `src/start.ts`          | Creates the TanStack Start instance with custom middleware (CSRF, Errors).         | Shared Infrastructure | `@/lib/error-page`                                        | `src/start.ts` (Unchanged)                                                                                  |
| `src/styles.css`        | Global design system styles, healthcare teal/clinical blue theme variables.        | Shared Infrastructure | Tailwind CSS                                              | `src/styles.css` (Unchanged)                                                                                |
| `src/routes/__root.tsx` | Root route rendering QueryClientProvider, global `<Outlet />`, and head meta tags. | Shared Infrastructure | `@/components/ui/sonner`, `@/lib/lovable-error-reporting` | `src/routes/__root.tsx` (Route context and head template kept, main app wrapper moves to `src/app/App.tsx`) |

---

## 2. Shared Layout Components

| File Path                                | Responsibility                                                                 | Current Owner  | Dependencies                                                       | Target Location                                                                                             |
| :--------------------------------------- | :----------------------------------------------------------------------------- | :------------- | :----------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `src/components/layout/PublicLayout.tsx` | Layout component for public website headers and footers.                       | Public Website | `@/components/layout/SiteHeader`, `@/components/layout/SiteFooter` | `src/layouts/WebsiteLayout.tsx` (Renamed & moved)                                                           |
| `src/features/auth/AuthLayout.tsx`       | Split-screen login/forgot-password/join layout screen.                         | Auth Feature   | `@/components/common/Logo`                                         | `src/layouts/AuthLayout.tsx` (Moved)                                                                        |
| `src/features/admin/AdminShell.tsx`      | Shell wrapper (sidebar, headers, logout) for admin console.                    | Admin Feature  | `@/config/adminNav`, `@/services/auth/auth.service`                | `src/layouts/AdminLayout.tsx` (Refactored and moved)                                                        |
| `src/features/member/MemberShell.tsx`    | Shell wrapper (sidebar, header, mobile navigation, notifications) for members. | Member Feature | `@/config/memberNav`, `@/services/auth/auth.service`               | `src/layouts/AuthenticatedPortalLayout.tsx` (Abstracted) / Individual layouts in `src/layouts/` wrapping it |

---

## 3. Public Website Pages & Features

| File Path                          | Responsibility                  | Current Route        | Target Route         | Target Component                             |
| :--------------------------------- | :------------------------------ | :------------------- | :------------------- | :------------------------------------------- |
| `src/routes/index.tsx`             | Home page structure.            | `/`                  | `/`                  | `src/pages/website/HomePage.tsx`             |
| `src/routes/about.tsx`             | About page content.             | `/about`             | `/about`             | `src/pages/website/AboutPage.tsx`            |
| `src/routes/career.tsx`            | Careers list and apply form.    | `/career`            | `/career`            | `src/pages/website/CareerPage.tsx`           |
| `src/routes/contact.tsx`           | Contact details and form.       | `/contact`           | `/contact`           | `src/pages/website/ContactPage.tsx`          |
| `src/routes/services.tsx`          | Services descriptions.          | `/services`          | `/services`          | `src/pages/website/ServicesPage.tsx`         |
| `src/routes/doctors.tsx`           | Associated doctors directory.   | `/doctors`           | `/doctors`           | `src/pages/website/DoctorsPage.tsx`          |
| `src/routes/hospitals.tsx`         | Associated hospitals directory. | `/hospitals`         | `/hospitals`         | `src/pages/website/HospitalsPage.tsx`        |
| `src/routes/labs.tsx`              | Associated labs directory.      | `/labs`              | `/labs`              | `src/pages/website/LabsPage.tsx`             |
| `src/routes/insurance.tsx`         | Insurance benefits and welfare. | `/insurance`         | `/insurance`         | `src/pages/website/InsurancePage.tsx`        |
| `src/routes/join.tsx`              | Membership sign-up form.        | `/join`              | `/join`              | `src/pages/website/JoinPage.tsx`             |
| `src/routes/retailers.index.tsx`   | Retailers public directory.     | `/retailers`         | `/retailers`         | `src/pages/website/RetailersPage.tsx`        |
| `src/routes/retailers.$slug.tsx`   | Retailer public details.        | `/retailers/$slug`   | `/retailers/$slug`   | `src/pages/website/RetailerDetailPage.tsx`   |
| `src/routes/wholesalers.index.tsx` | Wholesalers public directory.   | `/wholesalers`       | `/wholesalers`       | `src/pages/website/WholesalersPage.tsx`      |
| `src/routes/wholesalers.$slug.tsx` | Wholesaler public details.      | `/wholesalers/$slug` | `/wholesalers/$slug` | `src/pages/website/WholesalerDetailPage.tsx` |

---

## 4. Authentication Pages & Forms

| File Path                                        | Responsibility                              | Current Route      | Target Route       | Target Component / Location                                               |
| :----------------------------------------------- | :------------------------------------------ | :----------------- | :----------------- | :------------------------------------------------------------------------ |
| `src/routes/login.tsx`                           | Core Login Page.                            | `/login`           | `/login`           | `src/pages/auth/LoginPage.tsx`                                            |
| `src/routes/forgot-password.tsx`                 | Forgot Password Page.                       | `/forgot-password` | `/forgot-password` | `src/pages/auth/ForgotPasswordPage.tsx`                                   |
| `src/features/auth/forms/LoginForm.tsx`          | Form UI and submit handler for Login.       | N/A (Component)    | N/A (Component)    | `src/features/auth/forms/LoginForm.tsx` (Preserved and updated redirects) |
| `src/features/auth/forms/ForgotPasswordForm.tsx` | Form UI for Requesting Password Reset.      | N/A (Component)    | N/A (Component)    | `src/features/auth/forms/ForgotPasswordForm.tsx`                          |
| `src/features/auth/forms/DemoCredentials.tsx`    | Helper panel for login using demo profiles. | N/A (Component)    | N/A (Component)    | `src/features/auth/forms/DemoCredentials.tsx`                             |

---

## 5. Admin Module Pages

| File Path                               | Responsibility              | Current Route             | Target Route              | Target Component                                            |
| :-------------------------------------- | :-------------------------- | :------------------------ | :------------------------ | :---------------------------------------------------------- |
| `src/routes/admin.index.tsx`            | Main admin panel entry.     | `/admin`                  | `/admin`                  | Redirects to `/admin/overview`                              |
| `src/routes/admin.overview.tsx`         | Admin overview dashboards.  | `/admin/overview`         | `/admin/overview`         | `src/modules/admin/pages/Overview/OverviewPage.tsx`         |
| `src/routes/admin.approvals.tsx`        | Approvals queue dashboard.  | `/admin/approvals`        | `/admin/approvals`        | `src/modules/admin/pages/Approvals/ApprovalsPage.tsx`       |
| `src/routes/admin.retailers.tsx`        | Retailers directory list.   | `/admin/retailers`        | `/admin/retailers`        | `src/modules/admin/pages/Retailers/RetailersPage.tsx`       |
| `src/routes/admin.wholesalers.tsx`      | Wholesalers directory list. | `/admin/wholesalers`      | `/admin/wholesalers`      | `src/modules/admin/pages/Wholesalers/WholesalersPage.tsx`   |
| `src/routes/admin.hospitals.tsx`        | Hospitals directory list.   | `/admin/hospitals`        | `/admin/hospitals`        | `src/modules/admin/pages/Hospitals/HospitalsPage.tsx`       |
| `src/routes/admin.labs.tsx`             | Labs directory list.        | `/admin/labs`             | `/admin/labs`             | `src/modules/admin/pages/Labs/LabsPage.tsx`                 |
| `src/routes/admin.doctors.tsx`          | Doctors directory list.     | `/admin/doctors`          | `/admin/doctors`          | `src/modules/admin/pages/Doctors/DoctorsPage.tsx`           |
| `src/routes/admin.blood-banks.tsx`      | Blood banks directory list. | `/admin/blood-banks`      | `/admin/blood-banks`      | `src/modules/admin/pages/BloodBanks/BloodBanksPage.tsx`     |
| `src/routes/admin.facilities.$slug.tsx` | Facility audit detail page. | `/admin/facilities/$slug` | `/admin/facilities/$slug` | `src/modules/admin/pages/Facilities/FacilityDetailPage.tsx` |

---

## 6. Private Portals & Workspace Routing Map

Currently, roles route through `/member/...`. They are mapped to cleaner URLs with backwards-compatible redirects.

| Role           | Original Route               | Clean Target Route        | Responsibilities & Component Changes                                                         |
| :------------- | :--------------------------- | :------------------------ | :------------------------------------------------------------------------------------------- |
| **Hospital**   | `/member/hospital`           | `/hospital`               | Workspace split from `RoleWorkspace` kind `hospital` to `HospitalDetailsPage.tsx`            |
|                | `/member/hospital-address`   | `/hospital/address`       | Workspace split from `RoleWorkspace` kind `hospital-address` to `HospitalAddressPage.tsx`    |
|                | `/member/hospital-doctors`   | `/hospital/doctors`       | Workspace split from `RoleWorkspace` kind `hospital-doctors` to `HospitalDoctorsPage.tsx`    |
|                | `/member/hospital-patients`  | `/hospital/patients`      | Workspace split from `RoleWorkspace` kind `hospital-patients` to `HospitalPatientsPage.tsx`  |
|                | `/member/role-documents`     | `/hospital/documents`     | Workspace split from `RoleWorkspace` kind `role-documents` to `HospitalDocumentsPage.tsx`    |
| **Lab**        | `/member/lab`                | `/lab`                    | Workspace split from `RoleWorkspace` kind `lab` to `LaboratoryDetailsPage.tsx`               |
|                | `/member/lab-address`        | `/lab/address`            | Workspace split from `RoleWorkspace` kind `lab-address` to `LabAddressPage.tsx`              |
|                | `/member/lab-services`       | `/lab/services`           | Workspace split from `RoleWorkspace` kind `lab-services` to `LabServicesPage.tsx`            |
|                | `/member/lab-staff`          | `/lab/staff`              | Workspace split from `RoleWorkspace` kind `lab-staff` to `LabStaffPage.tsx`                  |
|                | `/member/role-documents`     | `/lab/documents`          | Workspace split from `RoleWorkspace` kind `role-documents` to `LabDocumentsPage.tsx`         |
| **Blood Bank** | `/member/blood-bank`         | `/blood-bank`             | Workspace split from `RoleWorkspace` kind `blood-bank` to `BloodBankDetailsPage.tsx`         |
|                | `/member/blood-bank-address` | `/blood-bank/address`     | Workspace split from `RoleWorkspace` kind `blood-bank-address` to `BloodBankAddressPage.tsx` |
|                | `/member/blood-inventory`    | `/blood-bank/inventory`   | Workspace split from `RoleWorkspace` kind `blood-inventory` to `BloodInventoryPage.tsx`      |
|                | `/member/blood-donors`       | `/blood-bank/donors`      | Workspace split from `RoleWorkspace` kind `blood-donors` to `BloodDonorsPage.tsx`            |
|                | `/member/role-documents`     | `/blood-bank/documents`   | Workspace split from `RoleWorkspace` kind `role-documents` to `BloodBankDocumentsPage.tsx`   |
| **Doctor**     | `/member/doctor`             | `/doctor`                 | Workspace split from `RoleWorkspace` kind `doctor` to `DoctorProfilePage.tsx`                |
|                | `/member/doctor-hospital`    | `/doctor/hospital`        | Workspace split from `RoleWorkspace` kind `doctor-hospital` to `DoctorHospitalPage.tsx`      |
|                | `/member/doctor-patients`    | `/doctor/patients`        | Workspace split from `RoleWorkspace` kind `doctor-patients` to `DoctorPatientsPage.tsx`      |
|                | `/member/role-documents`     | `/doctor/documents`       | Workspace split from `RoleWorkspace` kind `role-documents` to `DoctorDocumentsPage.tsx`      |
| **Retailer**   | `/member/profile`            | `/retailer/profile`       | Renders Retailer `ProfilePage.tsx`                                                           |
|                | `/member/owners`             | `/retailer/owners`        | Renders Retailer `OwnersPage.tsx`                                                            |
|                | `/member/pharmacists`        | `/retailer/pharmacists`   | Renders Retailer `PharmacistsPage.tsx`                                                       |
|                | `/member/employees`          | `/retailer/employees`     | Renders Retailer `EmployeesPage.tsx`                                                         |
|                | `/member/licences`           | `/retailer/licences`      | Renders Retailer `LicencesPage.tsx`                                                          |
|                | `/member/documents`          | `/retailer/documents`     | Renders Retailer `DocumentsPage.tsx`                                                         |
|                | `/member/alerts`             | `/retailer/alerts`        | Renders Retailer `AlertsPage.tsx`                                                            |
|                | `/member/settings`           | `/retailer/settings`      | Renders Retailer `SettingsPage.tsx`                                                          |
| **Wholesaler** | `/member/profile`            | `/wholesaler/profile`     | Renders Wholesaler `ProfilePage.tsx`                                                         |
|                | `/member/owners`             | `/wholesaler/owners`      | Renders Wholesaler `OwnersPage.tsx`                                                          |
|                | `/member/pharmacists`        | `/wholesaler/pharmacists` | Renders Wholesaler `PharmacistsPage.tsx`                                                     |
|                | `/member/employees`          | `/wholesaler/employees`   | Renders Wholesaler `EmployeesPage.tsx`                                                       |
|                | `/member/licences`           | `/wholesaler/licences`    | Renders Wholesaler `LicencesPage.tsx`                                                        |
|                | `/member/documents`          | `/wholesaler/documents`   | Renders Wholesaler `DocumentsPage.tsx`                                                       |
|                | `/member/alerts`             | `/wholesaler/alerts`      | Renders Wholesaler `AlertsPage.tsx`                                                          |
|                | `/member/settings`           | `/wholesaler/settings`    | Renders Wholesaler `SettingsPage.tsx`                                                        |

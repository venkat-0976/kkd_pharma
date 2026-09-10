# KKD Pharmacy — Frontend Architecture Documentation

This document serves as the guide for the organized, modular frontend architecture of the KKD Pharmacy project.

---

## 1. Overall Structure

The workspace follows a clean, module-based directory structure separating cross-cutting infrastructure concerns from self-contained business modules.

```text
src/
├── app/                  # Application bootstrap and global providers
├── routes/               # Flat route entries only (routing, guards, metadata)
├── modules/              # Self-contained business domains (pages, hooks, services, types)
│   ├── website/          # Public website marketing pages & directories
│   ├── auth/             # Session control & login pages
│   ├── retailer/         # Retailer portal pages & services
│   ├── wholesaler/       # Wholesaler portal pages & services
│   ├── admin/            # Union admin pages, tables, & services
│   ├── hospital/         # Hospital-specific portal pages & services
│   ├── lab/              # Laboratory-specific portal pages & services
│   ├── blood-bank/       # Blood bank portal pages & services
│   └── doctor/           # Doctor profile & patients portal pages & services
├── components/           # Truly global, application-wide reusable primitives
│   ├── ui/               # Generic primitive widgets (shadcn: Button, Input, Select)
│   └── common/           # Common components shared across multiple modules
├── layouts/              # Shared layouts (Website, Auth, and Role-specific layouts)
├── services/             # Common common API client & authentication service
├── hooks/                # App-wide utility hooks
├── types/                # Global domain type definitions
├── utils/                # Standard utility functions
├── config/               # App-wide configurations (e.g., union seeds, brand text)
├── lib/                  # Utilities (error page renderers, reporting captures)
└── validation/           # Zod validation schemas
```

---

## 2. Route Structure

All route files are placed in `src/routes/` as flat files. Route nesting is expressed using dot-separated notation.
- Files under `src/routes/` are thin handlers that perform authentication checks (guards), render the corresponding page component from its parent module, and supply page-level metadata.
- Route files do **NOT** contain large UI layouts, business logic, or raw API calls.

---

## 3. Website Module (`src/modules/website/`)

Owns all guest-facing landing areas:
- **Pages**: Home, About, Career, Contact, Services, Doctors, Hospitals, Labs, Insurance, Join, Retailers Directory, and Wholesalers Directory.
- **Components**: Directory grids, filtering widgets, and career/membership application forms.
- **Services**: Mock APIs that fetch directories and list jobs.

---

## 4. Auth Module (`src/modules/auth/`)

Handles authentication screens and session handling:
- **Pages**: Login, Forgot Password, and Password Reset entries.
- **Components**: Reusable, customizable LoginForm and ForgotPasswordForm. Contains the helper DemoCredentials widget.
- **Services**: Log in and password resets mock clients.

---

## 5. Retailer Module (`src/modules/retailer/`)

Provides workspace and tools for registered pharmacy retailers:
- **Pages**: Dashboard, Profile, Owners & Partners, Pharmacists, Employees, Licences, Documents, Expiry Alerts, and Settings.
- **Navigation**: Retailer-specific sidebar tabs configuration (`retailerNav.ts`).
- **Services**: Retailer profile updates, employees listings, and licence registrations.

---

## 6. Wholesaler Module (`src/modules/wholesaler/`)

Provides workspace and tools for registered wholesale distributor members:
- **Pages**: Dashboard, Profile, Owners & Partners, Employees, Licences, Documents, Expiry Alerts, and Settings (independent from Retailer pages).
- **Navigation**: Wholesaler-specific sidebar navigation config (`wholesalerNav.ts`).
- **Services**: Profile management, employee additions, and licences updates.

---

## 7. Admin Module (`src/modules/admin/`)

Provides the central management dashboard for union administrators:
- **Pages**: Dashboard, Overview, Approvals queue, Retailers list, Wholesalers list, Hospitals list, Labs list, Doctors list, Blood Banks list, and Facility detail audit.
- **Components**: MemberDirectoryTable and FacilityDirectoryTable.
- **Navigation**: Admin navigation list (`adminNav.ts`).
- **Services**: Application reviews, stats tallies, and facility credentials audits.

---

## 8. Hospital Module (`src/modules/hospital/`)

Provides workspace and tools for hospital members:
- **Pages**: Dashboard, Hospital Details, Address Details, Associated Doctors list, Patient Records, and Account Documents.
- **Navigation**: Hospital-specific sidebar navigation config (`hospitalNav.ts`).
- **Services**: Manage associated doctors lists and private patient registers.

---

## 9. Lab Module (`src/modules/lab/`)

Provides workspace and tools for laboratory members:
- **Pages**: Dashboard, Laboratory Details, Address Details, Tests & Services catalog, Staff roster, and Account Documents.
- **Navigation**: Lab-specific navigation tabs configuration (`labNav.ts`).
- **Services**: Diagnostic services catalogs and laboratory technicians logs.

---

## 10. Blood Bank Module (`src/modules/blood-bank/`)

Provides workspace and tools for blood bank members:
- **Pages**: Dashboard, Blood Bank Details, Address Details, Blood Inventory list, Registered Donors, and Account Documents.
- **Navigation**: Blood bank navigation configuration (`bloodBankNav.ts`).
- **Services**: Inventory unit tracking and donor registry logs.

---

## 11. Doctor Module (`src/modules/doctor/`)

Provides workspace and tools for registered consultants:
- **Pages**: Dashboard, Professional Profile, Hospital Affiliations, Patients listing, and Account Documents.
- **Navigation**: Doctor navigation tabs configuration (`doctorNav.ts`).
- **Services**: Medical affiliations registers and patient consultations databases.

---

## 12. Layout Architecture

Layout templates live in `src/layouts/`:
- `WebsiteLayout.tsx`: General footer, headers, and guest content width.
- `AuthLayout.tsx`: Split-screen layout.
- `AuthenticatedPortalLayout.tsx`: Common shell wrapper offering collapsible sidebars, top headers, user avatars, alerts notifications, and bottom mobile navigation tabs.
- **Role-specific wrappers**: `RetailerLayout.tsx`, `WholesalerLayout.tsx`, `AdminLayout.tsx`, `HospitalLayout.tsx`, `LabLayout.tsx`, `BloodBankLayout.tsx`, and `DoctorLayout.tsx` wrap `AuthenticatedPortalLayout` or `AdminShell` supplying the appropriate navigation configurations.

**Migration Progress:**
- [x] Step 1: Migrate Shared Layouts to `src/layouts/`
  - [x] Create `AuthenticatedPortalLayout.tsx` (generic member layout shell)
  - [x] Create role layouts: `RetailerLayout.tsx`, `WholesalerLayout.tsx`, `HospitalLayout.tsx`, `LabLayout.tsx`, `BloodBankLayout.tsx`, `DoctorLayout.tsx`
  - [x] Move & refactor admin layout to `AdminLayout.tsx`
  - [x] Move website layout to `WebsiteLayout.tsx`
  - [x] Move auth layout to `AuthLayout.tsx`
  - [x] Delete legacy layout files: `PublicLayout.tsx`, `AuthLayout.tsx`, `AdminShell.tsx`, `MemberShell.tsx`
- [x] Step 2: Migrate Shared UI Components
  - [x] Move shared files from `src/features/member/` to `src/components/common/`
  - [x] Update imports in moved components

---

## 13. Navigation Architecture

Navigation tabs are separated by business module:
- Navigation is defined locally under `src/modules/<role>/navigation/<role>Nav.ts`.
- There are **no global configurations** mapping all role paths in a single file. Each module operates as the single source of truth for its navigation list.

---

## 14. API Architecture

A strict request pipeline must be followed:

```text
UI Page Component -> React Hook -> Local Module Service -> API Client -> Backend Endpoints
```

- **Global client**: Found in `src/services/api/client.ts`. Custom error handling and pagination interfaces live in `src/services/api/errors.ts` and `src/services/api/types.ts`.
- **Local service**: API calls for specific routes live under `src/modules/<role>/services/` (e.g. `src/modules/hospital/services/hospitalDoctors.api.ts`).
- **No inline fetches**: Do not write raw `fetch` calls directly inside page components.

---

## 15. Shared Component Rules

- **Shadcn Primitives**: Shared UI controls (buttons, inputs, tables, sheets) reside in `src/components/ui/`.
- **Application Primitives**: Common cards and forms shared across multiple modules reside in `src/components/common/` (e.g., `DocumentUploadDialog`, `ShopAddressForm`).
- **Domain components**: Specific components (e.g. `HospitalDoctorTable`) must reside inside their respective domain folder (e.g. `src/modules/hospital/components/HospitalDoctorTable.tsx`). They must not be placed in the global components directory.

---

## 16. How to Add a Page

If adding a new page (e.g., `Hospital -> Appointments`):
1. **Create Component**: Create `src/modules/hospital/pages/Appointments/HospitalAppointmentsPage.tsx`.
2. **Define API**: Create `src/modules/hospital/services/appointments.api.ts`.
3. **Register Route**: Create route handler `src/routes/hospital.appointments.tsx`. It imports and renders `HospitalAppointmentsPage`.
4. **Update Navigation**: Add the route to `src/modules/hospital/navigation/hospitalNav.ts`.

---

## 17. How to Add a Tab

If adding a tab to a dashboard (e.g. adding a "Reviews" tab to Laboratory):
1. **Create Page**: Create `src/modules/lab/pages/Reviews/LaboratoryReviewsPage.tsx`.
2. **Create Route**: Create route entry `src/routes/lab.reviews.tsx`.
3. **Add Navigation Entry**: Append a navigation record to `src/modules/lab/navigation/labNav.ts`:
   ```ts
   { label: "Reviews", short: "Reviews", to: "/lab/reviews", icon: Star }
   ```

---

## 18. How to Add a Login Role

If registering an 8th login type (e.g., `Pharmacy Chain`):
1. **Create Module**: Create folder `src/modules/pharmacy-chain/` with nested `pages/`, `components/`, `navigation/`, `services/`, `hooks/`, and `types/` subdirectories.
2. **Register Type**: Append `"Pharmacy Chain"` to the `LoginType` enum and `"PHARMACY_CHAIN"` to `Role` in `src/services/auth/auth.service.ts`.
3. **Map credentials**: Add a demo credentials block inside `src/services/auth/auth.service.ts` for testing.
4. **Wire UI**: Add `Pharmacy Chain` to the grid array inside `src/modules/auth/components/LoginForm.tsx`.
5. **Establish Layout**: Create `src/layouts/PharmacyChainLayout.tsx`.
6. **Register Routes**: Create `src/routes/pharmacy-chain.tsx` (layout guard) and child pages like `src/routes/pharmacy-chain.index.tsx`.

---

## 19. How to Add an API

1. Create a service file `src/modules/<role>/services/<name>.api.ts`.
2. Implement your query/mutation calls:
   ```ts
   import { apiClient } from "@/services/api/client";
   export const fetchAppointments = async () => apiClient.get("/hospital/appointments");
   ```
3. Wrap in a React Query hook inside `src/modules/<role>/hooks/useAppointments.ts`:
   ```ts
   import { useQuery } from "@tanstack/react-query";
   export const useAppointments = () => useQuery({ queryKey: ["appointments"], queryFn: fetchAppointments });
   ```
4. Consume `useAppointments()` directly in your page component.

---

## 20. Developer Rules

- **Obvious Ownership**: Every file, page, service, and component must map to one owner. No "features" folder.
- **Route File Cleanliness**: Route files inside `src/routes/` are limited to metadata headers, route guards, and rendering modular page components.
- **Visual Integrity**: Refactoring imports or folders must not alter visual layouts, typography, button sizes, gradients, or CSS themes.
- **Auto-generated Route Tree**: Do not modify `src/routeTree.gen.ts` by hand. Let the Vite compiler automatically update it.

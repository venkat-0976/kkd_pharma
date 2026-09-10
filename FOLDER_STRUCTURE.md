# Kakinada Pharmacy — Organized Project Structure

This version keeps the existing application routes and URLs intact, while separating feature/domain code into clear folders.

## Main structure

```text
src/
├── assets/                 # Images and static imported assets
├── components/
│   ├── cards/              # Reusable business/job/service/stat cards
│   ├── common/             # Reusable app-wide components
│   ├── layout/             # Public site layout/header/footer
│   ├── navigation/         # Navigation components
│   └── ui/                 # Shadcn/Radix-style primitive UI components
│
├── features/
│   ├── auth/               # LOGIN / PASSWORD RECOVERY area
│   │   ├── forms/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── ForgotPasswordForm.tsx
│   │   │   └── DemoCredentials.tsx
│   │   └── AuthLayout.tsx
│   │
│   ├── admin/              # Admin dashboard and admin tables
│   ├── member/             # Member portal and member workspaces
│   ├── directory/          # Retailer/wholesaler directory UI
│   ├── home/               # Homepage sections
│   └── forms/              # Remaining public forms
│
├── portals/                # Role-specific portal definitions
│   ├── admin/
│   ├── blood-bank/
│   ├── doctor/
│   ├── hospital/
│   ├── lab/
│   ├── retailer/
│   └── wholesaler/
│
├── routes/                 # TanStack Router route files; URLs intentionally unchanged
├── services/               # Business/data service layer
├── config/                 # Navigation and application configuration
├── hooks/                  # React hooks
├── lib/                    # Utilities and infrastructure helpers
├── types/                  # Shared TypeScript types
└── validation/             # Form validation schemas
```

## Authentication is now isolated

All login-related UI is under:

`src/features/auth/`

The existing URLs remain:

- `/login`
- `/forgot-password`

The route files in `src/routes/` remain thin entry points so TanStack Router's generated route tree continues to work without changing the public URLs.

## Important separation

- `components/ui` = generic UI primitives only.
- `components/common` = reusable application-wide components.
- `features/auth` = login/authentication UI.
- `features/admin` = admin-only UI.
- `features/member` = member-only UI.
- `features/directory` = directory UI.
- `features/home` = homepage UI.
- `services` = business/data logic, not UI.
- `routes` = routing and route-level guards.
- `portals` = role-specific portal configuration/entry definitions.

This structure is intended to make future development easier: when adding a login feature, work inside `features/auth`; when adding member functionality, use `features/member`; when adding admin functionality, use `features/admin`.

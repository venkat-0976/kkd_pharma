/**
 * Auth service interface (Phase 1).
 *
 * The UI only talks to this interface. In Phase 2 the mock implementation is
 * replaced by a real backend session — no component changes required.
 * The frontend is NEVER the security boundary: every private read/write must
 * be authorised again on the server.
 */

export type MemberType = "Retailer" | "Wholesaler";
export type LoginType =
  "Admin" | "Retailer" | "Wholesaler" | "Hospital" | "Doctor" | "Lab" | "Blood bank";
export type Role =
  "MEMBER" | "ADMIN" | "SUPER_ADMIN" | "HOSPITAL" | "DOCTOR" | "LAB" | "BLOOD_BANK";

export interface Session {
  memberId: string;
  memberType: MemberType;
  shopName: string;
  role: Role;
  loginType?: LoginType;
}

export interface AuthService {
  getSession(): Session | null;
  login(input: { identifier: string; password: string; loginType?: LoginType }): Promise<Session>;
  requestPasswordReset(identifier: string): Promise<void>;
  logout(): Promise<void>;
}

const STORAGE_KEY = "ku.session.preview";

/**
 * Preview-only demo accounts.
 *
 * These exist purely so the member portal can be walked through before the
 * backend lands. They contain no real member data and grant no real access —
 * private records are still not available until Phase 2 adds server-side
 * authentication and ownership checks.
 */
export const demoCredentials = [
  {
    label: "Retailer member",
    identifier: "KU-00123",
    password: "demo1234",
    session: {
      memberId: "KU-00123",
      memberType: "Retailer",
      shopName: "Sri Sai Medical & General Stores",
      role: "MEMBER",
      loginType: "Retailer",
    } satisfies Session,
  },
  {
    label: "Wholesaler member",
    identifier: "KU-00456",
    password: "demo1234",
    session: {
      memberId: "KU-00456",
      memberType: "Wholesaler",
      shopName: "Kakinada Pharma Distributors",
      role: "MEMBER",
      loginType: "Wholesaler",
    } satisfies Session,
  },
  {
    label: "Union admin",
    identifier: "KU-ADMIN",
    password: "demo1234",
    session: {
      memberId: "KU-ADMIN",
      memberType: "Retailer",
      shopName: "Kakinada Union Office",
      role: "ADMIN",
      loginType: "Admin",
    } satisfies Session,
  },
  {
    label: "Hospital account",
    identifier: "KU-HOSPITAL",
    password: "demo1234",
    session: {
      memberId: "KU-HOSPITAL",
      memberType: "Retailer",
      shopName: "Kakinada General Hospital",
      role: "HOSPITAL",
      loginType: "Hospital",
    } satisfies Session,
  },
  {
    label: "Doctor account",
    identifier: "KU-DOCTOR",
    password: "demo1234",
    session: {
      memberId: "KU-DOCTOR",
      memberType: "Retailer",
      shopName: "Dr. Ananya Rao",
      role: "DOCTOR",
      loginType: "Doctor",
    } satisfies Session,
  },
  {
    label: "Laboratory account",
    identifier: "KU-LAB",
    password: "demo1234",
    session: {
      memberId: "KU-LAB",
      memberType: "Retailer",
      shopName: "Coastal Diagnostics Lab",
      role: "LAB",
      loginType: "Lab",
    } satisfies Session,
  },
  {
    label: "Blood bank account",
    identifier: "KU-BLOOD",
    password: "demo1234",
    session: {
      memberId: "KU-BLOOD",
      memberType: "Retailer",
      shopName: "Kakinada Red Cross Blood Bank",
      role: "BLOOD_BANK",
      loginType: "Blood bank",
    } satisfies Session,
  },
] as const;

export const authService: AuthService = {
  getSession() {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Session) : null;
    } catch {
      return null;
    }
  },
  async login({ identifier, password, loginType }) {
    // Phase 2 replaces this with a server call that verifies a hashed password.
    const match = demoCredentials.find(
      (account) =>
        account.identifier.toLowerCase() === identifier.trim().toLowerCase() &&
        account.password === password &&
        (!loginType || account.session.loginType === loginType),
    );

    if (!match) {
      throw new Error(
        "Invalid credentials. Real member accounts activate once the secure backend is connected — use a demo login for now.",
      );
    }

    const session: Session = { ...match.session };
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    }
    return session;
  },

  async requestPasswordReset() {
    // Phase 2: server sends an OTP / reset link to the registered mobile.
  },

  async logout() {
    if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
  },
};

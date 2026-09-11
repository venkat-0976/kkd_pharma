import { memberSeed, blankRecord } from "./member.seed";
import { authService } from "@/services/auth/auth.service";
import { expiryStatus, daysUntil } from "@/lib/expiry";
import { licenceKindByCategory } from "@/utils/licenceFields";
import type {
  ExpiryAlert,
  MemberDocument,
  MemberRecord,
  NotificationPreferences,
  Employee,
  Owner,
  Pharmacist,
  ShopAddress,
  BusinessProfile,
  LicenceKind,
  LicenceRecord,
} from "@/types/member";

/**
 * Member data service (Phase 2).
 *
 * SECURITY MODEL
 * --------------
 * Every method resolves the member id from the *session*, never from a URL
 * parameter, so member A can never read member B by editing an id. The current
 * implementation is a typed preview store; when the backend lands only the
 * bodies change — every call must then re-verify authentication AND ownership
 * server-side, and documents must be served from private object storage
 * through short-lived authorised URLs (never from /public).
 */

const STORE_KEY = "ku.member.store.preview.v2";

type Store = Record<string, MemberRecord>;

function readStore(): Store {
  if (typeof window === "undefined") return { ...memberSeed };
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return { ...memberSeed };
    return { ...memberSeed, ...(JSON.parse(raw) as Store) };
  } catch {
    return { ...memberSeed };
  }
}

function writeStore(store: Store) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

function currentMemberId(): string {
  const session = authService.getSession();
  if (!session) throw new Error("Not authenticated");
  return session.memberId;
}

function loadRecord(): MemberRecord {
  const session = authService.getSession();
  if (!session) throw new Error("Not authenticated");
  const store = readStore();
  const record =
    store[session.memberId] ?? blankRecord(session.memberId, session.shopName, session.memberType);
  const seedEmployees = memberSeed[session.memberId]?.employees ?? [];
  return {
    ...record,
    employees: record.employees?.length ? record.employees : seedEmployees,
  };
}

function saveRecord(record: MemberRecord): MemberRecord {
  const store = readStore();
  store[record.profile.memberId] = record;
  writeStore(store);
  return record;
}

const delay = (ms = 260) => new Promise((resolve) => setTimeout(resolve, ms));

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export interface MemberService {
  getRecord(): Promise<MemberRecord>;
  updateProfile(patch: Partial<BusinessProfile>): Promise<BusinessProfile>;
  saveOwner(owner: Omit<Owner, "memberId">): Promise<Owner[]>;
  deleteOwner(id: string): Promise<Owner[]>;
  savePharmacist(pharmacist: Omit<Pharmacist, "memberId">): Promise<Pharmacist[]>;
  deletePharmacist(id: string): Promise<Pharmacist[]>;
  saveEmployee(employee: Omit<Employee, "memberId">): Promise<Employee[]>;
  deleteEmployee(id: string): Promise<Employee[]>;
  saveLicence(kind: LicenceKind, patch: Partial<LicenceRecord>): Promise<LicenceRecord>;
  saveAddress(address: Omit<ShopAddress, "memberId">): Promise<ShopAddress>;
  uploadDocument(input: {
    name: string;
    category: MemberDocument["category"];
    fileType: MemberDocument["fileType"];
    sizeKb: number;
    expiryDate?: string | undefined;
    replaceId?: string | undefined;
    licenceValues?:
      | {
          number?: string | undefined;
          licenceType?: string | undefined;
          registrationInfo?: string | undefined;
          issueDate?: string | undefined;
          expiryDate?: string | undefined;
        }
      | undefined;
    pharmacistValues?:
      | {
          fullName: string;
          mobile: string;
          licenceNumber: string;
          licenceExpiry: string;
          address: string;
          photo?: string | undefined;
          id?: string | undefined;
        }
      | undefined;
  }): Promise<MemberDocument[]>;
  deleteDocument(id: string): Promise<MemberDocument[]>;
  savePreferences(
    prefs: Omit<NotificationPreferences, "memberId">,
  ): Promise<NotificationPreferences>;
  getAlerts(): Promise<ExpiryAlert[]>;
  changePassword(input: { currentPassword: string; newPassword: string }): Promise<void>;
}

export const memberService: MemberService = {
  async getRecord() {
    await delay(180);
    return loadRecord();
  },

  async updateProfile(patch) {
    await delay();
    const record = loadRecord();
    record.profile = { ...record.profile, ...patch, memberId: record.profile.memberId };
    saveRecord(record);
    return record.profile;
  },

  async saveOwner(owner) {
    await delay();
    const record = loadRecord();
    const memberId = currentMemberId();
    const existing = record.owners.findIndex((o) => o.id === owner.id);
    const next: Owner = { ...owner, memberId, id: owner.id || uid("own") };
    if (existing >= 0) record.owners[existing] = next;
    else record.owners = [...record.owners, next];
    saveRecord(record);
    return record.owners;
  },

  async deleteOwner(id) {
    await delay();
    const record = loadRecord();
    record.owners = record.owners.filter((o) => o.id !== id);
    saveRecord(record);
    return record.owners;
  },

  async savePharmacist(pharmacist) {
    await delay();
    const record = loadRecord();
    const memberId = currentMemberId();
    const next: Pharmacist = { ...pharmacist, memberId, id: pharmacist.id || uid("ph") };
    const idx = record.pharmacists.findIndex((p) => p.id === pharmacist.id);
    if (idx >= 0) record.pharmacists[idx] = next;
    else record.pharmacists = [...record.pharmacists, next];
    saveRecord(record);
    return record.pharmacists;
  },

  async deletePharmacist(id) {
    await delay();
    const record = loadRecord();
    record.pharmacists = record.pharmacists.filter((p) => p.id !== id);
    saveRecord(record);
    return record.pharmacists;
  },

  async saveEmployee(employee) {
    await delay();
    const record = loadRecord();
    const memberId = currentMemberId();
    const next: Employee = { ...employee, memberId, id: employee.id || uid("emp") };
    const idx = record.employees.findIndex((item) => item.id === employee.id);
    if (idx >= 0) record.employees[idx] = next;
    else record.employees = [...record.employees, next];
    saveRecord(record);
    return record.employees;
  },

  async deleteEmployee(id) {
    await delay();
    const record = loadRecord();
    record.employees = record.employees.filter((item) => item.id !== id);
    saveRecord(record);
    return record.employees;
  },

  async saveLicence(kind, patch) {
    await delay();
    const record = loadRecord();
    record.licences[kind] = {
      ...record.licences[kind],
      ...patch,
      kind,
      memberId: record.profile.memberId,
    };
    saveRecord(record);
    return record.licences[kind];
  },

  async saveAddress(address) {
    await delay();
    const record = loadRecord();
    record.address = { ...address, memberId: record.profile.memberId };
    saveRecord(record);
    return record.address;
  },

  async uploadDocument({
    name,
    category,
    fileType,
    sizeKb,
    expiryDate,
    replaceId,
    licenceValues,
    pharmacistValues,
  }) {
    await delay(600);
    const record = loadRecord();
    const memberId = currentMemberId();
    const doc: MemberDocument = {
      id: replaceId ?? uid("doc"),
      memberId,
      name,
      category,
      fileType,
      sizeKb,
      uploadedAt: new Date().toISOString().slice(0, 10),
      ...(expiryDate ? { expiryDate } : {}),
      storageKey: `private/${memberId}/${Date.now()}-${name}`,
    };
    const idx = record.documents.findIndex((d) => d.id === doc.id);
    if (idx >= 0) record.documents[idx] = doc;
    else record.documents = [...record.documents, doc];

    const kind = licenceKindByCategory[category];
    if (kind) {
      record.licences[kind] = {
        ...record.licences[kind],
        kind,
        memberId,
        documentId: doc.id,
        ...(licenceValues?.number !== undefined ? { number: licenceValues.number } : {}),
        ...(licenceValues?.licenceType !== undefined
          ? { licenceType: licenceValues.licenceType }
          : {}),
        ...(licenceValues?.registrationInfo !== undefined
          ? { registrationInfo: licenceValues.registrationInfo }
          : {}),
        ...(licenceValues?.issueDate !== undefined ? { issueDate: licenceValues.issueDate } : {}),
        ...(licenceValues?.expiryDate || expiryDate
          ? { expiryDate: licenceValues?.expiryDate || expiryDate }
          : {}),
      };
    }

    if (category === "Pharmacist Licence" && pharmacistValues) {
      const existing =
        (pharmacistValues.id
          ? record.pharmacists.find((p) => p.id === pharmacistValues.id)
          : record.pharmacists[0]) ?? record.pharmacists[0];
      const next: Pharmacist = {
        fullName: pharmacistValues.fullName,
        mobile: pharmacistValues.mobile,
        licenceNumber: pharmacistValues.licenceNumber,
        licenceExpiry: pharmacistValues.licenceExpiry,
        address: pharmacistValues.address,
        ...(pharmacistValues.photo !== undefined ? { photo: pharmacistValues.photo } : {}),
        memberId,
        id: existing?.id || pharmacistValues.id || uid("ph"),
        documentId: doc.id,
      };
      const phIdx = record.pharmacists.findIndex((p) => p.id === next.id);
      if (phIdx >= 0) record.pharmacists[phIdx] = next;
      else record.pharmacists = [...record.pharmacists, next];
    }

    saveRecord(record);
    return record.documents;
  },

  async deleteDocument(id) {
    await delay();
    const record = loadRecord();
    record.documents = record.documents.filter((d) => d.id !== id);

    (Object.keys(record.licences) as LicenceKind[]).forEach((kind) => {
      if (record.licences[kind].documentId !== id) return;
      const { documentId: _removed, ...licence } = record.licences[kind];
      record.licences[kind] = licence;
    });

    record.pharmacists = record.pharmacists.map((pharmacist) => {
      if (pharmacist.documentId !== id) return pharmacist;
      const { documentId: _removed, ...rest } = pharmacist;
      return rest;
    });

    saveRecord(record);
    return record.documents;
  },

  async savePreferences(prefs) {
    await delay();
    const record = loadRecord();
    record.preferences = { ...prefs, memberId: record.profile.memberId };
    saveRecord(record);
    return record.preferences;
  },

  async getAlerts() {
    await delay(120);
    return buildAlerts(loadRecord());
  },

  async changePassword() {
    await delay(500);
    // Backend: verify the current password against the stored hash, enforce
    // password history, re-hash with a slow KDF and write an audit log entry.
  },
};

export function buildAlerts(record: MemberRecord): ExpiryAlert[] {
  const days = record.preferences.reminderDays;
  const items: ExpiryAlert[] = [];

  const push = (
    label: string,
    category: ExpiryAlert["category"],
    expiryDate?: string,
    documentId?: string,
  ) => {
    if (!expiryDate) return;
    items.push({
      id: `${category}-${label}`,
      label,
      category,
      expiryDate,
      daysRemaining: daysUntil(expiryDate) ?? 0,
      status: expiryStatus(expiryDate, days),
      ...(documentId ? { documentId } : {}),
    });
  };

  push(
    "Drug Licence",
    "Drug Licence",
    record.licences.drug.expiryDate,
    record.licences.drug.documentId,
  );
  push(
    "Food Licence",
    "Food Licence",
    record.licences.food.expiryDate,
    record.licences.food.documentId,
  );
  push("Labour Registration", "Labour", record.licences.labour.expiryDate);
  push(
    "Healthcare Professional ID",
    "Healthcare Professional",
    record.licences.healthcare.expiryDate,
    record.licences.healthcare.documentId,
  );
  record.pharmacists.forEach((p) => {
    push(`Pharmacist Licence — ${p.fullName}`, "Pharmacist Licence", p.licenceExpiry, p.documentId);
  });

  return items
    .filter((item) => item.status !== "valid" || item.daysRemaining <= 400)
    .sort((a, b) => a.daysRemaining - b.daysRemaining);
}

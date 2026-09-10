import type { DocumentCategory, LicenceKind, MemberDocument, MemberRecord } from "@/types/member";
import type { LicenceValues } from "@/validation/memberForms";

export const DOCUMENT_CATEGORIES: DocumentCategory[] = [
  "Drug Licence",
  "Pharmacist Licence",
  "GST",
  "Food Licence",
  "Healthcare Professional",
  "Labour",
  "Godown Licence",
  "Rent Form",
  "Other",
];

export const licenceCategoryByKind: Record<LicenceKind, DocumentCategory> = {
  drug: "Drug Licence",
  gst: "GST",
  food: "Food Licence",
  labour: "Labour",
  healthcare: "Healthcare Professional",
};

export const licenceKindByCategory: Partial<Record<DocumentCategory, LicenceKind>> = {
  "Drug Licence": "drug",
  GST: "gst",
  "Food Licence": "food",
  Labour: "labour",
  "Healthcare Professional": "healthcare",
};

export type LicenceField = { key: keyof LicenceValues; label: string; type?: "text" | "date" };

export const licenceFieldConfig: Record<
  LicenceKind,
  { title: string; description: string; fields: LicenceField[] }
> = {
  drug: {
    title: "Drug Licence",
    description: "Retail / wholesale drug licence issued by the Drugs Control Administration.",
    fields: [
      { key: "number", label: "Licence number" },
      { key: "licenceType", label: "Licence type (20 / 21 / 20B / 21B)" },
      { key: "issueDate", label: "Issue date", type: "date" },
      { key: "expiryDate", label: "Expiry date", type: "date" },
    ],
  },
  gst: {
    title: "GST Registration",
    description: "GSTIN and registration details for your firm.",
    fields: [
      { key: "number", label: "GSTIN" },
      { key: "registrationInfo", label: "Registration type" },
      { key: "issueDate", label: "Registration date", type: "date" },
    ],
  },
  food: {
    title: "Food Licence (FSSAI)",
    description: "Required when you sell nutraceuticals, food or health supplements.",
    fields: [
      { key: "number", label: "FSSAI number" },
      { key: "issueDate", label: "Issue date", type: "date" },
      { key: "expiryDate", label: "Expiry date", type: "date" },
    ],
  },
  labour: {
    title: "Labour Registration",
    description: "Shops & Establishments / labour department registration.",
    fields: [
      { key: "number", label: "Registration number" },
      { key: "registrationInfo", label: "Issuing authority" },
      { key: "expiryDate", label: "Renewal due", type: "date" },
    ],
  },
  healthcare: {
    title: "Healthcare Professional Registration",
    description: "Pharmacy Council / healthcare professional registration for the firm.",
    fields: [
      { key: "number", label: "Registration number" },
      { key: "registrationInfo", label: "Council / board" },
      { key: "expiryDate", label: "Valid until", type: "date" },
    ],
  },
};

export const pharmacistUploadFields: {
  key: "fullName" | "mobile" | "licenceNumber" | "licenceExpiry" | "address";
  label: string;
  type?: "text" | "date";
  multiline?: boolean;
}[] = [
  { key: "fullName", label: "Pharmacist name" },
  { key: "mobile", label: "Mobile" },
  { key: "licenceNumber", label: "Licence number" },
  { key: "licenceExpiry", label: "Licence expiry", type: "date" },
  { key: "address", label: "Address", multiline: true },
];

/** Current/linked file first, then remaining files for that category newest-first. */
export function documentsForLicence(record: MemberRecord, kind: LicenceKind): MemberDocument[] {
  const category = licenceCategoryByKind[kind];
  const linkedId = record.licences[kind]?.documentId;
  const matches = record.documents.filter((doc) => doc.category === category);
  const olderNewestFirst = [...matches]
    .filter((doc) => doc.id !== linkedId)
    .sort((a, b) => {
      const byDate = (b.uploadedAt ?? "").localeCompare(a.uploadedAt ?? "");
      return byDate !== 0 ? byDate : b.id.localeCompare(a.id);
    });
  const linked = linkedId ? record.documents.find((doc) => doc.id === linkedId) : undefined;
  return linked ? [linked, ...olderNewestFirst] : olderNewestFirst;
}

function newestFirst(docs: MemberDocument[]): MemberDocument[] {
  return [...docs].sort((a, b) => {
    const byDate = (b.uploadedAt ?? "").localeCompare(a.uploadedAt ?? "");
    return byDate !== 0 ? byDate : b.id.localeCompare(a.id);
  });
}

export function isCurrentDocument(record: MemberRecord, documentId: string): boolean {
  const onLicence = Object.values(record.licences).some(
    (licence) => licence.documentId === documentId,
  );
  return onLicence || record.pharmacists.some((pharmacist) => pharmacist.documentId === documentId);
}

/** Current/linked files first, then remaining files newest-first. */
export function documentsForVault(record: MemberRecord): MemberDocument[] {
  const current = newestFirst(record.documents.filter((doc) => isCurrentDocument(record, doc.id)));
  const older = newestFirst(record.documents.filter((doc) => !isCurrentDocument(record, doc.id)));
  return [...current, ...older];
}

import type { MemberRecord } from "@/types/member";

const today = new Date();

function iso(offsetDays: number) {
  const d = new Date(today);
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

/**
 * Preview seed data. Replaced by real per-member backend reads in production.
 * Keyed by member id so no member ever sees another member's record.
 */
export const memberSeed: Record<string, MemberRecord> = {
  "KU-00123": {
    profile: {
      memberId: "KU-00123",
      shopName: "Sri Sai Medical & General Stores",
      memberType: "Retailer",
      firmNumber: "FIRM/KKD/2014/1187",
      email: "srisaimedicals@kakinadaunion.org",
      businessMobile: "9848012345",
      establishedYear: "2014",
      publicOwnerName: "M. Ramesh Babu",
      status: "Active",
    },
    owners: [
      {
        id: "own-1",
        memberId: "KU-00123",
        fullName: "M. Ramesh Babu",
        mobile: "9848012345",
        email: "ramesh@srisaimedicals.in",
        role: "Proprietor",
        isPublic: true,
      },
      {
        id: "own-2",
        memberId: "KU-00123",
        fullName: "M. Sridevi",
        mobile: "9701145566",
        role: "Partner",
        isPublic: false,
      },
    ],
    pharmacists: [
      {
        id: "ph-1",
        memberId: "KU-00123",
        fullName: "K. Naveen Kumar",
        mobile: "9989011223",
        licenceNumber: "APPC/RP/28841",
        licenceExpiry: iso(48),
        address: "12-4-89, Bhanugudi Junction, Kakinada",
        documentId: "doc-3",
      },
      {
        id: "ph-2",
        memberId: "KU-00123",
        fullName: "S. Lakshmi Prasanna",
        mobile: "9603377881",
        licenceNumber: "APPC/RP/31204",
        licenceExpiry: iso(11),
        address: "Sarpavaram Junction, Kakinada",
      },
    ],
    employees: [
      {
        id: "emp-1",
        memberId: "KU-00123",
        fullName: "P. Venkatesh",
        mobile: "9885123344",
        address: "14-8-22, Suryaraopeta, Kakinada",
      },
      {
        id: "emp-2",
        memberId: "KU-00123",
        fullName: "D. Keerthi",
        mobile: "9703312288",
        address: "8-3-16, Ramanayyapeta, Kakinada",
      },
      {
        id: "emp-3",
        memberId: "KU-00123",
        fullName: "R. Srinivas",
        mobile: "9848021190",
        address: "2-11-45, Bhanugudi Junction, Kakinada",
      },
      {
        id: "emp-4",
        memberId: "KU-00123",
        fullName: "K. Lavanya",
        mobile: "9010447782",
        address: "21-4-9, Sarpavaram, Kakinada",
      },
    ],
    licences: {
      drug: {
        kind: "drug",
        memberId: "KU-00123",
        number: "AP/KKD/20B/1187",
        licenceType: "Form 20B & 21B (Retail)",
        issueDate: "2021-09-01",
        expiryDate: iso(12),
        documentId: "doc-1",
      },
      gst: {
        kind: "gst",
        memberId: "KU-00123",
        number: "37ABCDE1234F1Z5",
        registrationInfo: "Regular scheme · Registered 12 Aug 2017",
        documentId: "doc-2",
      },
      food: {
        kind: "food",
        memberId: "KU-00123",
        number: "10121004000271",
        issueDate: "2023-04-02",
        expiryDate: iso(120),
      },
      labour: {
        kind: "labour",
        memberId: "KU-00123",
        number: "LAB/KKD/2019/4412",
        registrationInfo: "Shops & Establishments · 4 employees",
        expiryDate: iso(-6),
      },
      healthcare: {
        kind: "healthcare",
        memberId: "KU-00123",
        number: "HPID-4471-8821",
        issueDate: "2022-01-19",
        expiryDate: iso(310),
      },
    },
    documents: [
      {
        id: "doc-1",
        memberId: "KU-00123",
        name: "Drug Licence 20B-21B.pdf",
        category: "Drug Licence",
        fileType: "pdf",
        sizeKb: 812,
        uploadedAt: iso(-220),
        expiryDate: iso(12),
        storageKey: "private/KU-00123/drug-licence.pdf",
      },
      {
        id: "doc-2",
        memberId: "KU-00123",
        name: "GST Registration Certificate.pdf",
        category: "GST",
        fileType: "pdf",
        sizeKb: 402,
        uploadedAt: iso(-410),
        storageKey: "private/KU-00123/gst.pdf",
      },
      {
        id: "doc-3",
        memberId: "KU-00123",
        name: "Pharmacist Licence - K. Naveen.jpg",
        category: "Pharmacist Licence",
        fileType: "jpg",
        sizeKb: 1284,
        uploadedAt: iso(-95),
        expiryDate: iso(48),
        storageKey: "private/KU-00123/pharmacist-naveen.jpg",
      },
    ],
    address: {
      memberId: "KU-00123",
      doorNumber: "",
      street: "",
      area: "",
      mandal: "",
      city: "",
      district: "",
      state: "",
      pincode: "",
    },
    preferences: {
      memberId: "KU-00123",
      reminderDays: [30, 15, 7, 1],
      emailAlerts: true,
      smsAlerts: true,
    },
  },
  "KU-00456": {
    profile: {
      memberId: "KU-00456",
      shopName: "Kakinada Pharma Distributors",
      memberType: "Wholesaler",
      firmNumber: "FIRM/KKD/2009/0442",
      email: "accounts@kakinadapharma.in",
      businessMobile: "9866554433",
      establishedYear: "2009",
      publicOwnerName: "G. Satyanarayana",
      status: "Active",
    },
    owners: [
      {
        id: "own-1",
        memberId: "KU-00456",
        fullName: "G. Satyanarayana",
        mobile: "9866554433",
        email: "satya@kakinadapharma.in",
        role: "Managing Partner",
        isPublic: true,
      },
    ],
    pharmacists: [
      {
        id: "ph-1",
        memberId: "KU-00456",
        fullName: "B. Anil Kumar",
        mobile: "9573312299",
        licenceNumber: "APPC/WP/11983",
        licenceExpiry: iso(5),
        address: "Jagannaickpur, Kakinada",
      },
    ],
    employees: [
      {
        id: "emp-1",
        memberId: "KU-00456",
        fullName: "M. Harish",
        mobile: "9848122099",
        address: "Jagannaickpur, Kakinada",
      },
    ],
    licences: {
      drug: {
        kind: "drug",
        memberId: "KU-00456",
        number: "AP/KKD/20-21/0442",
        licenceType: "Form 20 & 21 (Wholesale)",
        issueDate: "2020-06-18",
        expiryDate: iso(240),
        documentId: "doc-1",
      },
      gst: {
        kind: "gst",
        memberId: "KU-00456",
        number: "37PQRSX9911K1Z2",
        registrationInfo: "Regular scheme · Registered 03 Jul 2017",
      },
      food: { kind: "food", memberId: "KU-00456", number: "" },
      labour: {
        kind: "labour",
        memberId: "KU-00456",
        number: "LAB/KKD/2016/1120",
        registrationInfo: "Shops & Establishments · 18 employees",
        expiryDate: iso(64),
      },
      healthcare: { kind: "healthcare", memberId: "KU-00456", number: "" },
    },
    documents: [
      {
        id: "doc-1",
        memberId: "KU-00456",
        name: "Wholesale Drug Licence.pdf",
        category: "Drug Licence",
        fileType: "pdf",
        sizeKb: 967,
        uploadedAt: iso(-320),
        expiryDate: iso(240),
        storageKey: "private/KU-00456/drug-licence.pdf",
      },
    ],
    address: {
      memberId: "KU-00456",
      doorNumber: "",
      street: "",
      area: "",
      mandal: "",
      city: "",
      district: "",
      state: "",
      pincode: "",
    },
    preferences: {
      memberId: "KU-00456",
      reminderDays: [15, 7],
      emailAlerts: true,
      smsAlerts: false,
    },
  },
};

export function blankRecord(
  memberId: string,
  shopName: string,
  memberType: MemberRecord["profile"]["memberType"],
): MemberRecord {
  return {
    profile: {
      memberId,
      shopName,
      memberType,
      firmNumber: "",
      email: "",
      businessMobile: "",
      establishedYear: "",
      publicOwnerName: "",
      status: "Active",
    },
    owners: [],
    pharmacists: [],
    employees: [],
    licences: {
      drug: { kind: "drug", memberId, number: "" },
      gst: { kind: "gst", memberId, number: "" },
      food: { kind: "food", memberId, number: "" },
      labour: { kind: "labour", memberId, number: "" },
      healthcare: { kind: "healthcare", memberId, number: "" },
    },
    documents: [],
    address: {
      memberId,
      doorNumber: "",
      street: "",
      area: "",
      mandal: "",
      city: "",
      district: "",
      state: "",
      pincode: "",
    },
    preferences: { memberId, reminderDays: [15], emailAlerts: true, smsAlerts: false },
  };
}

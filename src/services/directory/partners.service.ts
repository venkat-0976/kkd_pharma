import type { PublicOrganisation } from "@/types/directory";

/** Public partner directories: hospitals, doctors, labs, insurance. Public info only. */

const hospitals: PublicOrganisation[] = [
  {
    slug: "government-general-hospital",
    name: "Government General Hospital",
    category: "Multi-speciality",
    area: "Suryarao Peta",
    city: "Kakinada",
    description:
      "District referral hospital partnered with the union for emergency medicine supply.",
    specialities: ["Emergency", "General Medicine", "Surgery"],
  },
  {
    slug: "coastal-care-hospital",
    name: "Coastal Care Hospital",
    category: "Multi-speciality",
    area: "Bhanugudi",
    city: "Kakinada",
    description: "150-bed private hospital with 24x7 pharmacy tie-up.",
    specialities: ["Cardiology", "Orthopaedics", "ICU"],
  },
  {
    slug: "godavari-mother-child",
    name: "Godavari Mother & Child Centre",
    category: "Maternity",
    area: "Ramaraopeta",
    city: "Kakinada",
    description: "Maternity and paediatric care centre.",
    specialities: ["Obstetrics", "Paediatrics"],
  },
  {
    slug: "lifeline-multispeciality",
    name: "Lifeline Multispeciality",
    category: "Multi-speciality",
    area: "Sarpavaram",
    city: "Kakinada",
    description: "Community hospital with dialysis and day-care surgery units.",
    specialities: ["Nephrology", "Day Care Surgery"],
  },
];

const doctors: PublicOrganisation[] = [
  {
    slug: "dr-a-s-rao",
    name: "Dr. A. S. Rao",
    category: "General Physician",
    area: "Bhanugudi",
    city: "Kakinada",
    description: "Consulting general physician, associated clinic timings 10 AM – 1 PM.",
    specialities: ["General Medicine"],
  },
  {
    slug: "dr-k-padmaja",
    name: "Dr. K. Padmaja",
    category: "Paediatrician",
    area: "Ramaraopeta",
    city: "Kakinada",
    description: "Paediatric consultant associated with union awareness programmes.",
    specialities: ["Paediatrics", "Immunisation"],
  },
  {
    slug: "dr-m-suresh",
    name: "Dr. M. Suresh",
    category: "Cardiologist",
    area: "Main Road",
    city: "Kakinada",
    description: "Interventional cardiologist supporting cardiac-care awareness camps.",
    specialities: ["Cardiology"],
  },
  {
    slug: "dr-n-swathi",
    name: "Dr. N. Swathi",
    category: "Dermatologist",
    area: "Jagannaickpur",
    city: "Kakinada",
    description: "Dermatology consultant, skin and hair clinic.",
    specialities: ["Dermatology"],
  },
];

const labs: PublicOrganisation[] = [
  {
    slug: "kakinada-diagnostics",
    name: "Kakinada Diagnostics",
    category: "Diagnostic Laboratory",
    area: "Main Road",
    city: "Kakinada",
    description: "NABL-accredited pathology laboratory with home sample collection.",
    specialities: ["Pathology", "Biochemistry"],
  },
  {
    slug: "coastal-imaging-centre",
    name: "Coastal Imaging Centre",
    category: "Imaging",
    area: "Bhanugudi",
    city: "Kakinada",
    description: "Digital X-ray, ultrasound and CT imaging services.",
    specialities: ["Radiology"],
  },
  {
    slug: "godavari-path-labs",
    name: "Godavari Path Labs",
    category: "Diagnostic Laboratory",
    area: "Sarpavaram",
    city: "Kakinada",
    description: "Routine and specialised pathology testing for member pharmacies.",
    specialities: ["Pathology", "Microbiology"],
  },
];

const insurance: PublicOrganisation[] = [
  {
    slug: "member-health-cover",
    name: "Member Group Health Cover",
    category: "Health Insurance",
    area: "Association Programme",
    city: "Kakinada",
    description:
      "Group health insurance negotiated for registered retailer and wholesaler members and their families.",
    specialities: ["Family Floater", "Cashless Network"],
  },
  {
    slug: "shop-fire-cover",
    name: "Shop & Stock Protection",
    category: "General Insurance",
    area: "Association Programme",
    city: "Kakinada",
    description: "Fire, burglary and stock protection cover for pharmacy premises.",
    specialities: ["Fire", "Burglary", "Stock"],
  },
  {
    slug: "professional-indemnity",
    name: "Professional Indemnity",
    category: "Liability",
    area: "Association Programme",
    city: "Kakinada",
    description: "Indemnity cover guidance for pharmacists and pharmacy owners.",
    specialities: ["Liability"],
  },
];

export const listHospitals = (): PublicOrganisation[] => hospitals;
export const listDoctors = (): PublicOrganisation[] => doctors;
export const listLabs = (): PublicOrganisation[] => labs;
export const listInsurancePlans = (): PublicOrganisation[] => insurance;

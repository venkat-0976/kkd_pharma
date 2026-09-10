export interface AssociationStat {
  label: string;
  value: string;
}

export interface AssociationService {
  title: string;
  description: string;
  icon:
    | "pill"
    | "users"
    | "network"
    | "shield"
    | "graduation"
    | "newspaper";
}

export function listStats(): AssociationStat[] {
  return [
    { label: "Registered Members", value: "500+" },
    { label: "Retail Pharmacies", value: "380" },
    { label: "Wholesalers", value: "120" },
    { label: "Partner Hospitals", value: "24" },
    { label: "Associated Doctors", value: "150" },
    { label: "Diagnostic Labs", value: "32" },
    { label: "Healthcare Professionals", value: "900+" },
    { label: "Years of Service", value: "35" },
  ];
}

export function listServices(): AssociationService[] {
  return [
    {
      title: "Pharmacy Support",
      description:
        "Day-to-day operational guidance for retail and wholesale pharmacies, from stock practices to expiry handling.",
      icon: "pill",
    },
    {
      title: "Member Services",
      description:
        "Membership onboarding, renewals, welfare schemes and a secure digital record of every member firm.",
      icon: "users",
    },
    {
      title: "Healthcare Networking",
      description:
        "Connect with hospitals, doctors, laboratories and distributors across the Kakinada healthcare ecosystem.",
      icon: "network",
    },
    {
      title: "Regulatory Support",
      description:
        "Assistance with drug licence, food licence, GST and inspection readiness — with reminders before expiry.",
      icon: "shield",
    },
    {
      title: "Professional Development",
      description:
        "Continuing education sessions, pharmacist training and certification workshops through the year.",
      icon: "graduation",
    },
    {
      title: "Industry Updates",
      description:
        "Circulars, price notifications and statutory changes delivered to members as they happen.",
      icon: "newspaper",
    },
  ];
}

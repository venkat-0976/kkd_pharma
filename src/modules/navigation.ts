export interface NavItem {
  label: string;
  to: string;
}

export const primaryNav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  // Uncomment any line below to show that tab again:
  // { label: "Retailers", to: "/retailers" },
  // { label: "Wholesalers", to: "/wholesalers" },
  // { label: "Hospitals", to: "/hospitals" },
  // { label: "Doctors", to: "/doctors" },
  // { label: "Labs", to: "/labs" },
  { label: "Insurance", to: "/insurance" },
  { label: "Career", to: "/career" },
  { label: "Contact", to: "/contact" },
  { label: "Join", to: "/join" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Association",
    items: [
      { label: "About", to: "/about" },
      { label: "Services", to: "/services" },
      { label: "Career", to: "/career" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Directory",
    items: [
      { label: "Retailers", to: "/retailers" },
      { label: "Wholesalers", to: "/wholesalers" },
      { label: "Hospitals", to: "/hospitals" },
      { label: "Labs", to: "/labs" },
    ],
  },
  {
    title: "Members",
    items: [
      { label: "Member Login", to: "/login" },
      { label: "Apply for Membership", to: "/join" },
      { label: "Forgot Password", to: "/forgot-password" },
      { label: "Doctors", to: "/doctors" },
    ],
  },
];

export const brand = {
  name: "Kakinada Union",
  subtitle: "Pharmacy Healthcare Association",
  email: "office@kakinadaunion.org",
  phone: "+91 884 200 1180",
  address: "Union Bhavan, Main Road, Kakinada, Andhra Pradesh 533001",
};

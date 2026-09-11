/**
 * Union branding by member / shop ID prefix.
 *
 * Add a row here when another district union comes online. The member UI
 * only calls getUnionByMemberId — it does not hardcode union names.
 */
export type UnionSymbol = "plus-circle" | "building";

export interface UnionBrand {
  id: string;
  /** Case-insensitive prefix of the logged-in shop / member ID. */
  prefix: string;
  name: string;
  subtitle: string;
  symbol: UnionSymbol;
}

export const unions: UnionBrand[] = [
  {
    id: "kakinada",
    prefix: "KU",
    name: "Kakinada Pharmacy Union",
    subtitle: "Pharmacy Healthcare Association",
    symbol: "plus-circle",
  },
  // Future unions (uncomment and fill when ready):
  // { id: "visakhapatnam", prefix: "VU", name: "Visakhapatnam Union", subtitle: "Pharmacy Healthcare Association", symbol: "plus-circle" },
  // { id: "rajahmundry", prefix: "RU", name: "Rajahmundry Union", subtitle: "Pharmacy Healthcare Association", symbol: "plus-circle" },
  // { id: "guntur", prefix: "GU", name: "Guntur Union", subtitle: "Pharmacy Healthcare Association", symbol: "plus-circle" },
];

export function getUnionByMemberId(memberId?: string | null): UnionBrand | null {
  const compact = memberId?.trim();
  if (!compact) return null;
  const upper = compact.toUpperCase();
  return unions.find((union) => upper.startsWith(union.prefix.toUpperCase())) ?? null;
}

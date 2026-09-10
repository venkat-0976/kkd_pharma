import type { ExpiryStatus } from "@/types/member";

export function daysUntil(dateIso?: string): number | null {
  if (!dateIso) return null;
  const target = new Date(`${dateIso}T00:00:00`);
  if (Number.isNaN(target.getTime())) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - now.getTime()) / 86_400_000);
}

/** Status uses the member's own reminder window (largest configured day). */
export function expiryStatus(dateIso?: string, reminderDays: number[] = [15]): ExpiryStatus {
  const days = daysUntil(dateIso);
  if (days === null) return "missing";
  if (days < 0) return "expired";
  const threshold = Math.max(...(reminderDays.length ? reminderDays : [15]));
  return days <= threshold ? "expiring" : "valid";
}

export const statusLabel: Record<ExpiryStatus, string> = {
  valid: "Valid",
  expiring: "Expiring soon",
  expired: "Expired",
  missing: "Not provided",
};

export function formatDate(dateIso?: string) {
  if (!dateIso) return "—";
  const d = new Date(`${dateIso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
}

export function expiryPhrase(dateIso?: string) {
  const days = daysUntil(dateIso);
  if (days === null) return "No expiry recorded";
  if (days < 0) return `Expired ${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} ago`;
  if (days === 0) return "Expires today";
  return `Expires in ${days} day${days === 1 ? "" : "s"}`;
}

import { MessageCircle } from "lucide-react";
import { brand } from "@/utils/navigation";

/** Digits-only WhatsApp number for the union office. */
const WHATSAPP_NUMBER = "918842001180";

/**
 * Floating WhatsApp contact button.
 * Used on the public website and the admin console only — never inside the
 * private member portal.
 */
export function WhatsAppButton({ message }: { message?: string }) {
  const text = encodeURIComponent(message ?? `Hello ${brand.name}, I need assistance.`);
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Kakinada Union on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid size-11 place-items-center rounded-full bg-success text-success-foreground shadow-lg ring-1 ring-border transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <MessageCircle className="size-5" aria-hidden="true" />
    </a>
  );
}

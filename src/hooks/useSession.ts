import { useEffect, useState } from "react";
import { authService, type Session } from "@/services/auth/auth.service";

/** Client-side session read. Used for UI state only — never for authorisation. */
export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSession(authService.getSession());
    setLoading(false);
  }, []);

  return { session, loading };
}

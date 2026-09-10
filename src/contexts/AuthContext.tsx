import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  authService,
  type Session,
  type AuthCredentials,
  type Role,
  type LoginType,
} from "@/services/auth";

interface AuthContextType {
  session: Session | null;
  isAuthenticated: boolean;
  loading: boolean;
  userRole: Role | null;
  loginType: LoginType | null;
  login: (credentials: AuthCredentials) => Promise<Session>;
  logout: () => Promise<void>;
  refreshSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(() => authService.getSession());
  const [loading, setLoading] = useState(true);

  const refreshSession = useCallback(() => {
    const current = authService.getSession();
    setSession(current);
  }, []);

  useEffect(() => {
    // Initial sync
    refreshSession();
    setLoading(false);

    // Listen to storage events across tabs or window events
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "pharmaconnect_session_v1") {
        refreshSession();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [refreshSession]);

  const login = async (credentials: AuthCredentials): Promise<Session> => {
    const newSession = await authService.login(credentials);
    setSession(newSession);
    return newSession;
  };

  const logout = async (): Promise<void> => {
    await authService.logout();
    setSession(null);
  };

  const value: AuthContextType = {
    session,
    isAuthenticated: Boolean(session),
    loading,
    userRole: session?.role ?? null,
    loginType: session?.loginType ?? null,
    login,
    logout,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

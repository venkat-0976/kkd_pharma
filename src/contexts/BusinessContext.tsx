import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { memberService } from "@/services/member/member.service";
import type { MemberRecord, BusinessProfile, ExpiryAlert } from "@/types/member";
import { useAuth } from "./AuthContext";

interface BusinessContextType {
  record: MemberRecord | null;
  isLoading: boolean;
  error: Error | null;
  refreshRecord: () => Promise<void>;
  alerts: ExpiryAlert[];
  updateProfile: (values: Partial<BusinessProfile>) => Promise<void>;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export function BusinessProvider({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const [record, setRecord] = useState<MemberRecord | null>(null);
  const [alerts, setAlerts] = useState<ExpiryAlert[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshRecord = useCallback(async () => {
    if (!session) {
      setRecord(null);
      setAlerts([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const [fetchedRecord, fetchedAlerts] = await Promise.all([
        memberService.getRecord(),
        memberService.getAlerts(),
      ]);
      setRecord(fetchedRecord);
      setAlerts(fetchedAlerts);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load business data"));
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    void refreshRecord();
  }, [refreshRecord]);

  const updateProfile = async (values: Partial<BusinessProfile>) => {
    await memberService.updateProfile(values);
    await refreshRecord();
  };

  const value: BusinessContextType = {
    record,
    isLoading,
    error,
    refreshRecord,
    alerts,
    updateProfile,
  };

  return <BusinessContext.Provider value={value}>{children}</BusinessContext.Provider>;
}

export function useBusinessContext() {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error("useBusinessContext must be used within a BusinessProvider");
  }
  return context;
}

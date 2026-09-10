import { useBusinessContext } from "@/contexts/BusinessContext";
import { buildAlerts } from "@/services/member/member.service";

export function useMemberRecord() {
  const { record, isLoading, error, refreshRecord } = useBusinessContext();
  return {
    data: record,
    isLoading,
    error,
    refetch: refreshRecord,
  };
}

export function useInvalidateMember() {
  const { refreshRecord } = useBusinessContext();
  return () => refreshRecord();
}

export { buildAlerts };

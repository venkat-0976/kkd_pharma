import { useQuery, useQueryClient } from "@tanstack/react-query";
import { memberService } from "@/services/member/member.service";
import { buildAlerts } from "@/services/member/member.service";

export const memberRecordKey = ["member", "record"] as const;

export function useMemberRecord() {
  return useQuery({
    queryKey: memberRecordKey,
    queryFn: () => memberService.getRecord(),
    staleTime: 10_000,
  });
}

export function useInvalidateMember() {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({ queryKey: memberRecordKey }).then(() =>
      queryClient.refetchQueries({ queryKey: memberRecordKey }),
    );
}

export { buildAlerts };

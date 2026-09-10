import { memberService } from "./member/member.service";
import type { Pharmacist } from "@/types/member";

export const pharmacistService = {
  async getPharmacists(): Promise<Pharmacist[]> {
    const record = await memberService.getRecord();
    return record?.pharmacists ?? [];
  },

  async savePharmacist(
    input: Omit<Pharmacist, "memberId">,
  ): Promise<Pharmacist[]> {
    return memberService.savePharmacist(input);
  },

  async deletePharmacist(id: string): Promise<void> {
    return memberService.deletePharmacist(id);
  },
};

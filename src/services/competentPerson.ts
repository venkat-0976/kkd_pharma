import { memberService } from "./member/member.service";
import type { Pharmacist as CompetentPerson } from "@/types/member";

export const competentPersonService = {
  async getCompetentPersons(): Promise<CompetentPerson[]> {
    const record = await memberService.getRecord();
    return record?.pharmacists ?? [];
  },

  async saveCompetentPerson(input: Omit<CompetentPerson, "memberId">): Promise<CompetentPerson[]> {
    return memberService.savePharmacist(input);
  },

  async deleteCompetentPerson(id: string): Promise<void> {
    return memberService.deletePharmacist(id);
  },
};

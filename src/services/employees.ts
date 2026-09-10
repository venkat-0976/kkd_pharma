import { memberService } from "./member/member.service";
import type { Employee } from "@/types/member";

export const employeesService = {
  async getEmployees(): Promise<Employee[]> {
    const record = await memberService.getRecord();
    return record?.employees ?? [];
  },

  async saveEmployee(input: Omit<Employee, "memberId">): Promise<Employee[]> {
    return memberService.saveEmployee(input);
  },

  async deleteEmployee(employeeId: string): Promise<void> {
    return memberService.deleteEmployee(employeeId);
  },
};

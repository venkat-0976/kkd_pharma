export interface Employee {
  id: string;
  memberId: string;
  fullName: string;
  mobile: string;
  address: string;
  photo?: string;
  designation?: string;
  joiningDate?: string;
}

export type EmployeeInput = Omit<Employee, "memberId">;

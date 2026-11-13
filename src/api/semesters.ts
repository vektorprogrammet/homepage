import { trimTrailingSlashes } from "~/lib/url";

type Semester = {
  id: number;
  lastSemesterId: number;
  semesterStartDate: Date;
  semesterEndDate: Date;
  recruitmentStartDate: Date;
  recruitmentEndDate: Date;
  departmentId: number;
  name: string;
};

export async function fetchCurrentSemesterByDepartment(
  departmentId: number,
): Promise<Semester> {
  const baseUrl = import.meta.env.VITE_API_URL;

  if (!baseUrl) {
    throw new Error("VITE_API_URL is not configured");
  }

  const response = await fetch(`${trimTrailingSlashes(baseUrl)}/semesters/current/${departmentId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch semesters: ${response.status}`);
  }

  return await response.json();
}

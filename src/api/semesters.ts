import { trimTrailingSlashes } from "~/lib/url";

type Semester = {
  id: number;
  lastSemesterId: number | null;
  semesterStartDate: string;
  semesterEndDate: string;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  departmentId: number;
  name: string;
};

export async function fetchCurrentSemesterByDepartment(
  departmentId: number,
): Promise<Semester | null> {
  const baseUrl = import.meta.env.VITE_API_URL;

  if (!baseUrl) {
    throw new Error("VITE_API_URL is not configured");
  }

  const response = await fetch(
    `${trimTrailingSlashes(baseUrl)}/semesters/current/${departmentId}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch semesters: ${response.status}`);
  }

  return await response.json();
}

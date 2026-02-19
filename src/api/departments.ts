import { apiFetch } from "./client";

export interface Department {
  id: number;
  name: string;
  shortName: string;
  email: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  logoPath: string | null;
  active: boolean;
}

export interface DepartmentDetail extends Department {
  teams: Array<{
    id: number;
    name: string;
    email: string;
    shortDescription: string;
    active: boolean;
  }>;
}

export async function getDepartments(): Promise<Array<Department>> {
  try {
    return await apiFetch<Array<Department>>("/api/departments");
  } catch (error) {
    console.error("Failed to fetch departments:", error);
    return [];
  }
}

export async function getDepartment(id: number): Promise<DepartmentDetail | null> {
  try {
    return await apiFetch<DepartmentDetail>(`/api/departments/${id}`);
  } catch (error) {
    console.error(`Failed to fetch department ${id}:`, error);
    return null;
  }
}

export async function getDepartmentByCity(city: string): Promise<DepartmentDetail | null> {
  const departments = await getDepartments();
  const dept = departments.find((d) => d.city === city);
  if (!dept) return null;
  return getDepartment(dept.id);
}

export type Department = {
  id: number;
  city: string;
  slug: string;
};

export async function fetchDepartments(): Promise<Array<Department>> {
  const baseUrl = import.meta.env.VITE_API_URL;

  if (!baseUrl) {
    throw new Error("VITE_API_URL is not configured");
  }

  const response = await fetch(`${baseUrl.replace(/\/+$/, "")}/departments/`);

  if (!response.ok) {
    throw new Error(`Failed to fetch departments: ${response.status}`);
  }

  return await response.json();
}

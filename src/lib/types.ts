export const cities = {
  trondheim: "Trondheim",
  bergen: "Bergen",
  aas: "Ås",
} as const;
export type City = keyof typeof cities;
export type CityPretty = (typeof cities)[City];

export const departments = {
  bergen: "Bergen",
  trondheim: "Trondheim",
  aas: "Ås",
  hovedstyret: "Hovedstyret",
} as const;
export type Department = keyof typeof departments;
export type DepartmentPretty = (typeof departments)[Department];

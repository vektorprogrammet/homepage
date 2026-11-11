export const genders = ["male", "female", "other", "withheld"] as const;
export const yearsOfStudy = ["1", "2", "3", "4", "5", "6<="] as const;
export type Application = {
  firstName: string;
  lastName: string;
  email: string;
  gender: (typeof genders)[number];
  fieldOfStudyId: number;
  yearOfStudy: (typeof yearsOfStudy)[number];
  phonenumber: string;
  semester: number;
};
const ApplicationFields = [
  "yearOfStudy",
  "phonenumber",
  "fieldOfStudyId",
  "email",
  "gender",
  "firstName",
  "lastName",
  "semester",
] as const satisfies ReadonlyArray<keyof Application>;

export function isValidApplication(
  data: Partial<Application>,
): data is Application {
  return isValid(data, ApplicationFields);
}
export function isValidLiteral<T extends D, D>(array: ReadonlyArray<T>, data: D): data is T {
  return (array as ReadonlyArray<D>).includes(data);
}
function isValid<T extends object>(
  data: Partial<T>,
  requiredKeys: ReadonlyArray<keyof T>,
): data is T {
  return requiredKeys.every((key) => Object.hasOwn(data, key) && data[key]);
}

export async function sendAssistantApplication(newApplication: Application) {
  const response = await fetch("/api/assistantapplications/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newApplication),
  });

  return await response.json();
}

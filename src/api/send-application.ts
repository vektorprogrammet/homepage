export type Application = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  fieldOfStudyId: number;
  yearOfStudy: number;
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

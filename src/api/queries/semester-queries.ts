import { queryOptions } from "@tanstack/react-query";
import { fetchCurrentSemesterByDepartment } from "../semesters";

export function getCurrentSemesterByDepartmentOptions(departmentId: number) {
  return queryOptions({
    queryKey: ["currentSemester", departmentId],
    queryFn: () => fetchCurrentSemesterByDepartment(departmentId),
  });
}

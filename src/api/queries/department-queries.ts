import { queryOptions } from "@tanstack/react-query";
import { fetchDepartments } from "../departments";

export function getDepartmentOptions() {
  return queryOptions({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });
}

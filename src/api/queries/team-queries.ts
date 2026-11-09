import { queryOptions } from "@tanstack/react-query";
import { fetchFullTeam, fetchTeamOverviews } from "../team";

export function getTeamOptions() {
  return queryOptions({
    queryKey: ["teamOverviews"],
    queryFn: fetchTeamOverviews,
    initialData: [],
  });
}

export function getFullTeamOptions(departmentSlug: string, teamSlug: string) {
  return queryOptions({
    queryKey: ["fullTeam", departmentSlug, teamSlug],
    queryFn: () => fetchFullTeam(departmentSlug, teamSlug),
  });
}

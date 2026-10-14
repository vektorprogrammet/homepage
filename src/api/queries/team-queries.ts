import { queryOptions } from "@tanstack/react-query";
import { fetchTeamOverviews } from "../team";

export function getTeamOptions() {
  return queryOptions({
    queryKey: ["teamOverviews"],
    queryFn: fetchTeamOverviews,
    initialData: [],
  });
}

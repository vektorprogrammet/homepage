import { queryOptions } from "@tanstack/react-query";
import { fetchContactTeams, fetchHovedstyreMemberDetails } from "../kontakt";

export function getHovedstyreMemberOptions() {
  return queryOptions({
    queryKey: ["HovedstyreMembers"],
    queryFn: fetchHovedstyreMemberDetails,
    initialData: [],
  });
}

export function getContactTeamOptions() {
  return queryOptions({
    queryKey: ["contactTeams"],
    queryFn: fetchContactTeams,
  });
}

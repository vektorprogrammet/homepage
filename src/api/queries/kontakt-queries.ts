import { queryOptions } from "@tanstack/react-query";
import { fetchHovedstyreMemberDetails } from "../kontakt";

export function getHovedstyreMemberOptions() {
  return queryOptions({
    queryKey: ["HovedstyreMembers"],
    queryFn: fetchHovedstyreMemberDetails,
    initialData: [],
  });
}

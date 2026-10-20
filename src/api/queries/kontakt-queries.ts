import { queryOptions } from "@tanstack/react-query";
import { fetchHovedstyreMemberDetails } from "../kontakt";

export function getHovedstyreMemberOptions(teamId: number | undefined) {
  return queryOptions({
    queryKey: ["HovedstyreMembers", teamId],
    queryFn: () => {
      if (teamId === undefined) {
        throw new Error("Hovedstyre ID not found");
      }

      return fetchHovedstyreMemberDetails(teamId);
    },
    enabled: teamId !== undefined,
    initialData: [],
  });
}

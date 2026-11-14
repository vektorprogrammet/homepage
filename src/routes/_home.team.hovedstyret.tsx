import { TeamTemplate } from "@/components/team-template";

import { getFullTeamOptions } from "~/api/queries/team-queries";
import { getQueryClient } from "~/lib/query-client";

export async function clientLoader() {
  await getQueryClient().ensureQueryData(
    getFullTeamOptions("trondheim", "hovedstyret"),
  );
  return null;
}

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function Hovedstyret() {
  return (
    <div className="mx-auto mt-5 mb-20 flex w-full min-w-0 max-w-screen-lg flex-col px-4 sm:px-6">
      <TeamTemplate department="trondheim" team="hovedstyret" />
    </div>
  );
}

import { TeamTemplate } from "@/components/team-template";
import { getFullTeamOptions } from "~/api/queries/team-queries";
import { getQueryClient } from "~/lib/query-client";
import type { Route } from "./+types/_home.team.$department_.$team";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  await getQueryClient().ensureQueryData(
    getFullTeamOptions(params.department, params.team),
  );
  return null;
}

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function Team({ params }: Route.ComponentProps) {
  return (
    <div className="mx-auto mt-5 mb-20 flex w-full min-w-0 max-w-screen-lg flex-col px-4 sm:px-6">
      <TeamTemplate department={params.department} team={params.team} />
    </div>
  );
}

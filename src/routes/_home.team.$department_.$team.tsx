import { TeamTemplate } from "@/components/team-template";
import type { Route } from "./+types/_home.team.$department_.$team";

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function Team({ params }: Route.ComponentProps) {
  return (
    <div className="mx-auto mt-5 mb-20 flex max-w-screen-lg flex-col">
      <TeamTemplate department={params.department} team={params.team} />
    </div>
  );
}

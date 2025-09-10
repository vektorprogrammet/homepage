import { TeamTabs } from "~/components/team-tabs";
import { type DepartmentPretty, departments } from "~/lib/types";
import type { Route } from "./+types/_home.team.$department";

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function Team({ params }: Route.ComponentProps) {
  const activeDepartment: DepartmentPretty =
    params.department === "hovedstyret"
      ? departments.hovedstyret
      : params.department === "bergen"
        ? departments.bergen
        : params.department === "aas"
          ? departments.aas
          : departments.trondheim;

  return <TeamTabs department={activeDepartment} />;
}

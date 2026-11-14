import { useSearchParams } from "react-router";
import { TeamTabs } from "~/components/team-tabs";

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function Team() {
  const [searchParams] = useSearchParams();
  return (
    <TeamTabs departmentSlug={searchParams.get("department") ?? undefined} />
  );
}

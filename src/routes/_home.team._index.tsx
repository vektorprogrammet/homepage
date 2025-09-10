import { TeamTabs } from "~/components/team-tabs";

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function Team() {
  return <TeamTabs department="Trondheim" />;
}

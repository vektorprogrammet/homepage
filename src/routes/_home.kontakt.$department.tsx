import { ContactTabs } from "~/components/kontakt-tabs";
import type { Route } from "./+types/_home.kontakt.$department";

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function KontaktDepartment({ params }: Route.ComponentProps) {
  return <ContactTabs departmentSlug={params.department} />;
}

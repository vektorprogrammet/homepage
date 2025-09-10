import { ContactTabs } from "~/components/kontakt-tabs";

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function KontaktIndex() {
  return <ContactTabs department="Trondheim" />;
}

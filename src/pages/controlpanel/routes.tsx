import React from "react";
import Kontrollpanel from "pages/controlpanel/components/Kontrollpanel";
import { AppRoute } from "App";
import Skoler from "pages/controlpanel/components/Skoler";
import OpprettTeam from "./components/OpprettTeam";
import Teaminteresse from "pages/controlpanel/components/Teaminteresse";
import Teammedlemmer from "./components/Teammedlemmer";

// The route with the corresponding component to render in the route
const routes: AppRoute[] = [
  { path: "", element: <Kontrollpanel />, name: "Kontrollpanel" },
  { path: "/kontrollpanel/skoler", element: <Skoler />, name: "Skoler" },
  { path: "/kontrollpanel/opprett-team", element: <OpprettTeam/>, name: "Opprett nytt team" },
  { path: "/kontrollpanel/teams/:id", element: <Teammedlemmer />, name: "Teammedlemmer" },
  { path: "/kontrollpanel/teaminteresse", element: <Teaminteresse />, name: "Teaminteresse" },
];

export default routes;

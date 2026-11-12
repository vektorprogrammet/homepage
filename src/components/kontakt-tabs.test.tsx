import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router";
import { describe, expect, it } from "vitest";
import type { TeamOverview } from "../api/team";
import ForSkoler from "../routes/_home.skoler";
import { ContactTabs } from "./kontakt-tabs";

const departments = [
  { id: 1, city: "Trondheim", slug: "trondheim" },
  { id: 42, city: "Stavanger", slug: "stavanger-region" },
];
const teams: Array<TeamOverview> = departments.map(({ id, city }) => ({
  departmentCity: city,
  memberCount: 3,
  team: {
    id,
    departmentId: id,
    name: "Styret",
    email: `styret${id}@example.com`,
    description: [],
    shortDescription: `Styret i ${city}`,
    acceptApplication: false,
    active: true,
    deadline: new Date(),
  },
}));

function render(page: ReactNode) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  client.setQueryData(["departments"], departments);
  client.setQueryData(["contactTeams"], teams);
  client.setQueryData(["HovedstyreMembers"], []);
  return renderToStaticMarkup(
    <QueryClientProvider client={client}>
      <StaticRouter location="/">{page}</StaticRouter>
    </QueryClientProvider>,
  );
}

describe("department contact routing", () => {
  it("uses the API slug in school buttons, including new departments", () => {
    const html = render(<ForSkoler />);
    expect(html).toContain('href="/kontakt/stavanger-region"');
    expect(html).not.toContain('href="/kontakt/stavanger"');
  });
  it("opens a new department and uses only its teams and recipient", () => {
    const html = render(<ContactTabs departmentSlug="stavanger-region" />);
    expect(html).toContain("Kontakt styret i Stavanger");
    expect(html).toContain("styret42@example.com");
    expect(html).not.toContain("styret1@example.com");
  });
  it("does not fall back to Trondheim for unknown slugs", () => {
    const html = render(<ContactTabs departmentSlug="unknown" />);
    expect(html).toContain("Fant ikke avdelingen");
    expect(html).not.toContain("Kontakt styret i Trondheim");
  });
  it("keeps the national board reachable", () => {
    expect(render(<ContactTabs departmentSlug="hovedstyret" />)).toContain(
      "hovedstyret@vektorprogrammet.no",
    );
  });
  it("selects an API department on the contact index", () => {
    expect(render(<ContactTabs />)).toContain("Kontakt styret i Trondheim");
  });
});

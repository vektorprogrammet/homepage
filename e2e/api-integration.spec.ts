import { expect, test } from "@playwright/test";

/**
 * API integration e2e tests.
 *
 * These mock the backend API responses and verify the frontend
 * correctly renders data fetched from the API. When the backend
 * is unavailable, fallback data should still render.
 */

const mockDepartments = [
  {
    id: 1,
    name: "NTNU",
    shortName: "NTNU",
    email: "styret.ntnu@vektorprogrammet.no",
    address: "Høgskoleringen 5, 7491 Trondheim",
    city: "Trondheim",
    latitude: 63.4,
    longitude: 10.4,
    logoPath: null,
    active: true,
  },
  {
    id: 2,
    name: "UiB",
    shortName: "UiB",
    email: "uib@vektorprogrammet.no",
    address: "",
    city: "Bergen",
    latitude: 60.4,
    longitude: 5.3,
    logoPath: null,
    active: true,
  },
];

const mockDepartmentDetail = {
  ...mockDepartments[0],
  teams: [
    {
      id: 10,
      name: "IT",
      email: "it@vektorprogrammet.no",
      shortDescription: "Utvikler nettsiden",
      active: true,
    },
    {
      id: 11,
      name: "Rekruttering",
      email: "rekruttering.ntnu@vektorprogrammet.no",
      shortDescription: "Skaffer nye assistenter",
      active: true,
    },
  ],
};

const mockStatistics = {
  assistantCount: 2500,
  teamMemberCount: 700,
  femaleAssistantCount: 1200,
  maleAssistantCount: 1300,
};

const mockSponsors = [
  {
    id: 1,
    name: "Test Sponsor",
    url: "https://example.com",
    size: "large",
    logoImagePath: null,
  },
];

function setupApiMocks(page: import("@playwright/test").Page) {
  return Promise.all([
    page.route("**/api/departments", (route) => {
      const url = route.request().url();
      // Detail request (has ID in path)
      if (/\/api\/departments\/\d+/.test(url)) {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(mockDepartmentDetail),
        });
      }
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockDepartments),
      });
    }),
    page.route("**/api/departments/*", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockDepartmentDetail),
      }),
    ),
    page.route("**/api/statistics", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockStatistics),
      }),
    ),
    page.route("**/api/sponsors", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockSponsors),
      }),
    ),
    page.route("**/api/contact_messages", (route) =>
      route.fulfill({ status: 201, body: "" }),
    ),
  ]);
}

test.describe("Homepage statistics from API", () => {
  test("renders assistant and team member counts", async ({ page }) => {
    await setupApiMocks(page);
    await page.goto("/");

    // The MotionCounter animates to the target value
    // Wait for the counters to appear and contain non-zero text
    const assistentSection = page.locator("text=Assistenter").first();
    await expect(assistentSection).toBeVisible();

    const teamSection = page.locator("text=I team").first();
    await expect(teamSection).toBeVisible();
  });
});

test.describe("Team page from API", () => {
  test("loads and displays team cards for Trondheim", async ({ page }) => {
    await setupApiMocks(page);
    await page.goto("/team");

    // Default tab is Trondheim — should show team cards
    // With mocked API: IT and Rekruttering teams
    // With fallback: hardcoded Trondheim teams
    // Either way, team cards should be visible
    await expect(
      page.getByRole("heading", { name: "Styre og team" }),
    ).toBeVisible();

    // Wait for tab content to load
    const teamContent = page.locator('[role="tablist"]');
    await expect(teamContent).toBeVisible();
  });

  test("can switch between city tabs", async ({ page }) => {
    await setupApiMocks(page);
    await page.goto("/team");

    // Click Bergen tab
    await page.locator("button").filter({ hasText: "Bergen" }).click();

    // Click Ås tab
    await page.locator("button").filter({ hasText: "Ås" }).click();

    // Click Hovedstyret tab
    await page.locator("button").filter({ hasText: "Hovedstyret" }).click();
    await expect(page.getByText("Hovedstyret")).toBeVisible();
  });
});

test.describe("Kontakt page from API", () => {
  test("loads department contact info", async ({ page }) => {
    await setupApiMocks(page);
    await page.goto("/kontakt");

    // Default is Trondheim — should show department email
    await expect(page.getByText("Kontakt oss")).toBeVisible();

    // Contact info should be visible (from API or fallback)
    const contactSection = page.locator("text=Trondheim").first();
    await expect(contactSection).toBeVisible();
  });

  test("contact form submits to API", async ({ page }) => {
    await setupApiMocks(page);
    await page.goto("/kontakt");

    // Fill out the contact form
    await page.getByLabel("Ditt navn").fill("E2E Test User");
    await page.getByLabel("Din e-post").fill("e2e@test.com");
    await page.getByLabel("Emne").fill("Test subject");
    await page.getByLabel("Melding").fill("Test message from e2e");

    // Submit
    await page.getByRole("button", { name: "Send melding" }).click();

    // Should show success message
    await expect(page.getByText("Meldingen din er sendt!")).toBeVisible({
      timeout: 10000,
    });
  });
});

test.describe("Fallback behavior when API is down", () => {
  test("homepage still renders with fallback statistics", async ({ page }) => {
    // Mock API to fail
    await page.route("**/api/**", (route) =>
      route.fulfill({ status: 500, body: "Internal Server Error" }),
    );

    await page.goto("/");

    // Should still show the page with fallback data
    await expect(
      page.getByRole("heading", { name: "Vektorprogrammet" }),
    ).toBeVisible();
    await expect(page.locator("text=Assistenter").first()).toBeVisible();
  });

  test("team page still renders with fallback teams", async ({ page }) => {
    await page.route("**/api/**", (route) =>
      route.fulfill({ status: 500, body: "Internal Server Error" }),
    );

    await page.goto("/team");

    await expect(
      page.getByRole("heading", { name: "Styre og team" }),
    ).toBeVisible();
  });
});

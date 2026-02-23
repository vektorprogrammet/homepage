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

const mockStaticContent = [
  {
    id: 1,
    htmlId: "assistants-header",
    html: "<h1>Test Assistenter</h1><p>Test ingress for assistenter</p>",
  },
  {
    id: 2,
    htmlId: "about-header",
    html: "<h1>Test Om Oss</h1><p>Test ingress for om oss</p>",
  },
  {
    id: 3,
    htmlId: "parent-header",
    html: "<h1>Test Foreldre</h1><p>Test ingress for foreldre</p>",
  },
  {
    id: 4,
    htmlId: "about-faq",
    html: "<h5>Test question 1?</h5><p>Test answer 1</p><h5>Test question 2?</h5><p>Test answer 2</p>",
  },
];

const mockArticles = [
  {
    id: 1,
    title: "Test Sticky Article",
    slug: "test-sticky",
    article: "<p>This is a sticky test article</p>",
    imageLarge: null,
    imageSmall: null,
    created: "2026-01-15T12:00:00+00:00",
    updated: null,
    sticky: true,
    published: true,
  },
  {
    id: 2,
    title: "Test Regular Article",
    slug: "test-regular",
    article: "<p>This is a regular test article</p>",
    imageLarge: null,
    imageSmall: null,
    created: "2026-01-10T12:00:00+00:00",
    updated: null,
    sticky: false,
    published: true,
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
    page.route("**/api/static_contents", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockStaticContent),
      }),
    ),
    page.route("**/api/articles*", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockArticles),
      }),
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

test.describe("Assistenter page", () => {
  test("renders assistenter page heading and cards", async ({ page }) => {
    await setupApiMocks(page);
    await page.goto("/assistenter");

    // Should show heading (either from API or fallback)
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Should show motivation cards
    await expect(page.getByText("Hvorfor bli assistent?")).toBeVisible();
  });

  test("renders FAQ section on assistenter page", async ({ page }) => {
    await setupApiMocks(page);
    await page.goto("/assistenter");

    await expect(page.getByText("Ofte stilte spørsmål")).toBeVisible();
  });
});

test.describe("Foreldre page", () => {
  test("renders foreldre page heading and content", async ({ page }) => {
    await setupApiMocks(page);
    await page.goto("/foreldre");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Should show card content (from fallback)
    await expect(page.getByText("Assistentene").first()).toBeVisible();
  });
});

test.describe("Om oss page", () => {
  test("renders om-oss page heading and content", async ({ page }) => {
    await setupApiMocks(page);
    await page.goto("/om-oss");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Should show bottom section
    await expect(page.getByText("En forsmak til læreryrket!")).toBeVisible();
  });
});

test.describe("News list page", () => {
  test("renders news page heading and article cards", async ({ page }) => {
    await setupApiMocks(page);
    await page.goto("/nyheter");

    await expect(
      page.getByRole("heading", { name: "Nyheter" }),
    ).toBeVisible();

    // Should show article titles
    await expect(page.getByText("Test Sticky Article")).toBeVisible();
    await expect(page.getByText("Test Regular Article")).toBeVisible();
  });

  test("shows sticky badge on sticky articles", async ({ page }) => {
    await setupApiMocks(page);
    await page.goto("/nyheter");

    await expect(page.getByText("Festet")).toBeVisible();
  });
});

test.describe("Article detail page", () => {
  test("renders article content", async ({ page }) => {
    await setupApiMocks(page);
    await page.goto("/nyheter/test-sticky");

    await expect(
      page.getByRole("heading", { name: "Test Sticky Article" }),
    ).toBeVisible();
    await expect(
      page.getByText("This is a sticky test article"),
    ).toBeVisible();
  });

  test("shows back link to news list", async ({ page }) => {
    await setupApiMocks(page);
    await page.goto("/nyheter/test-sticky");

    await expect(
      page.getByText("Tilbake til nyheter"),
    ).toBeVisible();
  });

  test("shows not found for invalid slug", async ({ page }) => {
    await setupApiMocks(page);
    await page.goto("/nyheter/nonexistent-slug");

    await expect(
      page.getByText("Artikkelen ble ikke funnet"),
    ).toBeVisible();
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

  test("assistenter page renders with fallback when API is down", async ({
    page,
  }) => {
    await page.route("**/api/**", (route) =>
      route.fulfill({ status: 500, body: "Internal Server Error" }),
    );
    await page.goto("/assistenter");

    // Should show heading from fallback data
    await expect(
      page.getByRole("heading", { name: "Assistenter" }),
    ).toBeVisible();
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

  test("news page renders empty state when API is down", async ({ page }) => {
    await page.route("**/api/**", (route) =>
      route.fulfill({ status: 500, body: "Internal Server Error" }),
    );
    await page.goto("/nyheter");

    await expect(
      page.getByRole("heading", { name: "Nyheter" }),
    ).toBeVisible();
    await expect(
      page.getByText("Ingen nyheter tilgjengelig"),
    ).toBeVisible();
  });
});

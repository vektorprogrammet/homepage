import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Vektorprogrammet");
});

test.describe("Navbar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("can navigate to assistent page", async ({ page }) => {
    await page.getByRole("link", { name: "Assistenter" }).click();
    await expect(
      page.getByRole("heading", { name: "Assistenter" }),
    ).toBeVisible();
  });

  test("can navigate to parent page", async ({ page }) => {
    await page.getByRole("link", { name: "Foreldre" }).click();
    await expect(
      page.getByRole("heading", { name: "Informasjon for foreldre" }),
    ).toBeVisible();
  });

  test("can navigate to teams page", async ({ page }) => {
    await page.getByRole("link", { name: "Team" }).click();
    await expect(
      page.getByRole("heading", { name: "Styre og team" }),
    ).toBeVisible();
  });

  test("can navigate to school page", async ({ page }) => {
    await page.getByRole("link", { name: "Skoler" }).click();
    await expect(
      page.getByRole("heading", { name: "Vektorassistenter i skolen" }),
    ).toBeVisible();
  });
});

test.describe("Contact page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/kontakt");
  });

  test("has contact informations for Trondheim and contact", async ({
    page,
  }) => {
    await page.locator("button").filter({ hasText: "Trondheim" }).click();
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^styret\.ntnu@vektorprogrammet\.no$/ })
        .getByRole("link"),
    ).toBeVisible();
    await expect(page.getByText("Høgskoleringen 5 7491")).toBeVisible();
  });

  test("can submit message in contact form", async ({ page }) => {
    // Mock the contact API so the form can submit successfully
    await page.route("**/api/contact_messages", (route) =>
      route.fulfill({ status: 201, body: "" }),
    );
    // Mock departments API so the form gets a departmentId
    await page.route("**/api/departments", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([{
          id: 1, name: "NTNU", shortName: "NTNU",
          email: "styret.ntnu@vektorprogrammet.no",
          address: "Høgskoleringen 5, 7491 Trondheim",
          city: "Trondheim", latitude: 63.4, longitude: 10.4,
          logoPath: null, active: true,
        }]),
      }),
    );
    await page.route("**/api/departments/*", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: 1, name: "NTNU", shortName: "NTNU",
          email: "styret.ntnu@vektorprogrammet.no",
          address: "Høgskoleringen 5, 7491 Trondheim",
          city: "Trondheim", latitude: 63.4, longitude: 10.4,
          logoPath: null, active: true,
          teams: [{ id: 10, name: "Styret", email: "styret.ntnu@vektorprogrammet.no", shortDescription: "", active: true }],
        }),
      }),
    );

    await page.goto("/kontakt");

    const name = page.getByLabel("Ditt navn");
    const email = page.getByLabel("Din e-post");
    const subject = page.getByLabel("Emne");
    const message = page.getByLabel("Melding");
    const submitButton = page.getByRole("button", { name: "Send melding" });

    await expect(name).toBeVisible();
    await expect(email).toBeVisible();
    await expect(subject).toBeVisible();
    await expect(message).toBeVisible();
    await expect(submitButton).toBeVisible();

    await name.fill("John Doe");
    await email.fill("johndoe@gmail.com");
    await subject.fill("teams");
    await message.fill("How do I apply for teams?");

    await submitButton.click();

    // Form is replaced with success message after submission
    await expect(page.getByText("Meldingen din er sendt!")).toBeVisible({
      timeout: 10000,
    });
  });
});

test.describe("Assistent page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/assistenter");
  });

  test("can use button to scroll down to application form", async ({
    page,
  }) => {
    const scrollButton = await page.getByRole("button", {
      name: "Scroll ned for å søke!",
    });
    scrollButton.click();
    await expect(
      page.getByRole("button", { name: "Søk nå!" }),
    ).toBeInViewport();
  });

  test("can change city", async ({ page }) => {
    const trondheimButton = await page
      .locator("button")
      .filter({ hasText: "Trondheim" });
    const bergenButton = await page.getByRole("main").getByText("Bergen");
    const aasButton = await page.getByRole("main").getByText("Ås");

    await expect(trondheimButton).toBeVisible();
    await expect(bergenButton).toBeVisible();
    await expect(aasButton).toBeVisible();

    await trondheimButton.click();
    await expect(
      page.getByRole("heading", { name: "Trondheim" }),
    ).toBeVisible();

    await bergenButton.click();
    await expect(page.getByRole("heading", { name: "Bergen" })).toBeVisible();

    await aasButton.click();
    await expect(page.getByRole("heading", { name: "Ås" })).toBeVisible();
  });

  test("can submit application", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Trondheim" }),
    ).toBeVisible();
    const submit = page.getByRole("button", { name: "Søk nå!" });

    const firstname = page.getByPlaceholder("Fornavn");
    const surname = page.getByPlaceholder("Etternavn");
    const email = page.getByPlaceholder("E-post");
    const phone = page.getByPlaceholder("Telefon nr");
    const studyprogram = page.getByPlaceholder("Linje");

    await expect(firstname).toBeVisible();
    await expect(surname).toBeVisible();
    await expect(email).toBeVisible();
    await expect(phone).toBeVisible();
    await expect(studyprogram).toBeVisible();
    await expect(submit).toBeVisible();

    await firstname.fill("John");
    await surname.fill("Doe");
    await email.fill("johndoe@gmail.com");
    await phone.fill("00000000");
    await studyprogram.fill("mtdt");

    await submit.click();
    await expect(
      page.getByRole("heading", { name: "Assistenter" }),
    ).toBeInViewport();
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchDepartments } from "./departments";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("fetchDepartments", () => {
  it("preserves slugs returned by the API and handles trailing slashes", async () => {
    vi.stubEnv("VITE_API_URL", "https://api.example.com/");
    const departments = [{ id: 4, city: "Stavanger", slug: "custom-region" }];
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify(departments)));
    vi.stubGlobal("fetch", fetchMock);
    await expect(fetchDepartments()).resolves.toEqual(departments);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example.com/departments/",
    );
  });
  it("rejects failed backend requests", async () => {
    vi.stubEnv("VITE_API_URL", "https://api.example.com");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 503 })),
    );
    await expect(fetchDepartments()).rejects.toThrow("503");
  });
  it("rejects missing backend configuration", async () => {
    vi.stubEnv("VITE_API_URL", "");
    await expect(fetchDepartments()).rejects.toThrow("VITE_API_URL");
  });
});

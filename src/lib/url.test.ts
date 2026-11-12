import { describe, expect, it } from "vitest";
import { trimTrailingSlashes } from "./url";

describe("trimTrailingSlashes", () => {
  it.each([
    ["https://api.example.com", "https://api.example.com"],
    ["https://api.example.com/", "https://api.example.com"],
    ["https://api.example.com/api///", "https://api.example.com/api"],
    ["", ""],
    ["///", ""],
  ])("normalizes %s to %s", (value, expected) => {
    expect(trimTrailingSlashes(value)).toBe(expected);
  });
  it("handles long runs of slashes without changing internal slashes", () => {
    const baseUrl = "https://api.example.com/api/v1";
    expect(trimTrailingSlashes(baseUrl + "/".repeat(100_000))).toBe(baseUrl);
  });
});

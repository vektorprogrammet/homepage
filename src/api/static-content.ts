import { apiFetch } from "./client";

interface StaticContentRecord {
  id: number;
  htmlId: string;
  html: string;
}

let cachedContent: Map<string, string> | null = null;

export async function getStaticContent(): Promise<Map<string, string>> {
  if (cachedContent) return cachedContent;

  try {
    const records = await apiFetch<Array<StaticContentRecord>>(
      "/api/static_contents",
    );
    cachedContent = new Map(records.map((r) => [r.htmlId, r.html]));
    return cachedContent;
  } catch (error) {
    console.error("Failed to fetch static content:", error);
    return new Map();
  }
}

export async function getContentByPrefix(
  prefix: string,
): Promise<Map<string, string>> {
  const all = await getStaticContent();
  const entries = Array.from(all.entries()).filter(([key]) =>
    key.startsWith(prefix),
  );
  return new Map(entries);
}

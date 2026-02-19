const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export interface Sponsor {
  name: string;
  url: string;
  id: number;
  size: string | null;
  logoImagePath: string | null;
}

export async function getSponsors(): Promise<Array<Sponsor>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sponsors`, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      return getFallbackSponsors();
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch sponsors from API, using fallback:", error);
    return getFallbackSponsors();
  }
}

// Fallback data in case the API is unreachable
function getFallbackSponsors(): Array<Sponsor> {
  return [
    { id: 0, name: "Tekna", url: "https://www.tekna.no/", size: "medium", logoImagePath: null },
    { id: 0, name: "Abelprisen", url: "https://www.abelprisen.no/", size: "large", logoImagePath: null },
    { id: 0, name: "VisionTech", url: "https://www.visiontech.no/", size: "medium", logoImagePath: null },
  ];
}

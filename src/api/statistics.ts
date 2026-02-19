import { apiFetch } from "./client";

export interface Statistics {
  assistantCount: number;
  teamMemberCount: number;
  femaleAssistantCount: number;
  maleAssistantCount: number;
}

export async function getStatistics(): Promise<Statistics> {
  try {
    return await apiFetch<Statistics>("/api/statistics");
  } catch (error) {
    console.error("Failed to fetch statistics:", error);
    return getFallbackStatistics();
  }
}

function getFallbackStatistics(): Statistics {
  return {
    assistantCount: 2218,
    teamMemberCount: 608,
    femaleAssistantCount: 0,
    maleAssistantCount: 0,
  };
}

type Team = {
  id: string;
  departmentId: number;
  name: string;
  email: string;
  description: string;
  shortDescription: string;
  acceptApplication: boolean;
  active: boolean;
  deadline: Date;
};

export type TeamOverview = {
  team: Team;
  departmentCity: string;
  memberCount: number;
};

export async function fetchTeamOverviews(): Promise<Array<TeamOverview>> {
  const response = await fetch("http://localhost:8080/teams/active/overview", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

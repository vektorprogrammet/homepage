import type { SectionBlock } from "~/lib/team-description";

type Team = {
  id: number;
  departmentId: number;
  name: string;
  email: string;
  description: SectionBlock[];
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

export type PublicTeamMember = {
  id: number;
  firstName: string;
  lastName: string;
  teamId: number;
  username: string;
  profilePictureUrl: string | null;
  teamUserRoleId: string;
  teamUserRoleName: string;
  isTeamLeader: boolean;
};

export type FullTeam = {
  team: Team;
  departmentCity: string;
  members: Array<PublicTeamMember>;
};

export async function fetchTeamOverviews(): Promise<Array<TeamOverview>> {
  const response = await fetch("http://localhost:8080/teams/active/overview", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch team overviews: ${response.status}`);
  }

  return await response.json();
}

export async function fetchFullTeam(
  departmentSlug: string,
  teamSlug: string,
): Promise<FullTeam> {
  const response = await fetch(
    `http://localhost:8080/teams/active/full?department=${departmentSlug}&team=${teamSlug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch full team: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

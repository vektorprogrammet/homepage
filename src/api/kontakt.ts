import type { DepartmentPretty } from "~/lib/types";
import { trimTrailingSlashes } from "~/lib/url";
import type { Department } from "./departments";
import type { TeamOverview } from "./team";

interface KontaktCard {
  title: string;
  text: string;
  image: {
    url: URL;
    alt: string;
  };
}
interface KontaktContent {
  title: string;
  card: KontaktCard;
}

export function getKontakt(): KontaktContent {
  return {
    title: "Kontakt oss",
    card: {
      title: "Organisasjonen",
      text: "Vektorprogrammet er en stor organisasjon med assistenter i 4 norske byer. Under kan du kontakte vektorprogrammet i nærmeste by eller hovedstyret for generelle henvendelser.",
      image: {
        url: new URL(
          "https://vektorprogrammet.no/images/organizationstructure.png",
        ),
        alt: "Organisasjonsstruktur",
      },
    },
  };
}

//! Case sensitive
export function info(query: DepartmentPretty): TeamInfo | Error {
  switch (query) {
    case "Trondheim":
      return infoTrondheim();
    case "Ås":
      return infoAas();
    case "Bergen":
      return infoBergen();
    case "Hovedstyret":
      return infoHovedstyret();
    default:
      return new Error("Unknown team");
  }
}

type TeamInfo = {
  name: string;
  description: string;
  email: string;
  address?: string;
  members?: number;
  button?: boolean;
  contacts: Array<Contact>;
  openForContact: boolean;
};

type Contact = {
  name: string;
  title?: string;
  mail: string;
};

function infoTrondheim(): TeamInfo {
  return {
    name: "Trondheim",
    description: "Norges teknisk-naturvitenskapelige universitet",
    email: "styret.ntnu@vektorprogrammet.no",
    address: "Høgskoleringen 5, 7491 Trondheim",
    contacts: [
      { name: "Styret", mail: "styret.ntnu@vektorprogrammet.no" },
      { name: "Evaluering", mail: "evaluering.ntnu@vektorprogrammet.no" },
      {
        name: "Rekruttering",
        mail: "rekruttering.ntnu@vektorprogrammet.no",
      },
      {
        name: "Skolekoordinering",
        mail: "skolekoordinering.ntnu@vektorprogrammet.no",
      },
      { name: "Sponsor", mail: "sponsor.ntnu@vektorprogrammet.no" },
      { name: "Økonomi", mail: "okonomi@vektorprogrammet.no" },
      { name: "IT", mail: "it@vektorprogrammet.no" },
      { name: "Profilering", mail: "profilering.ntnu@vektorprogrammet.no" },
    ],
    openForContact: true,
  };
}

function infoAas(): TeamInfo {
  return {
    name: "Ås",
    description: "Norges miljø- og biovitenskapelige universitet",
    email: "nmbu@vektorprogrammet.no",
    contacts: [
      { name: "Styret", mail: "nmbu@vektorprogrammet.no" },
      {
        name: "Sponsor og økonomi",
        mail: "sponsor.nmbu@vektorprogrammet.no",
      },
      {
        name: "Skolekoordinering",
        mail: "skolekoordinering.nmbu@vektorprogrammet.no",
      },
      {
        name: "Evaluering, Rekruttering og Profilering",
        mail: "evaluering.nmbu@vektorprogrammet.no",
      },
    ],
    openForContact: true,
  };
}

function infoBergen(): TeamInfo {
  return {
    name: "Bergen",
    description: "Universitetet i Bergen",
    email: "uib@vektorprogrammet.no",
    contacts: [
      { name: "Styret", mail: "uib@vektorprogrammet.no" },
      {
        name: "Skolekoordinering",
        mail: "skolekoordinering.uib@vektorprogrammet.no",
      },
      {
        name: "Rekruttering",
        mail: "rekruttering.uib@vektorprogrammet.no",
      },
    ],
    openForContact: true,
  };
}

export type HovedstyreMemberOverview = {
  name: string;
  title: string;
  mail: string;
};

export async function fetchHovedstyreMemberDetails(): Promise<
  Array<HovedstyreMemberOverview>
> {
  const response = await fetch(
    `${trimTrailingSlashes(import.meta.env.VITE_API_URL)}/teams/hovedstyret/contacts`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Hovedstyret: ${response.status}`);
  }

  const members: Array<{
    firstName: string;
    lastName: string;
    mail: string | null;
    title: string;
  }> = await response.json();

  return members.map((member) => ({
    name: `${member.firstName} ${member.lastName}`,
    title: member.title,
    mail: member.mail ?? "",
  }));
}

function infoHovedstyret(): TeamInfo {
  return {
    name: "Hovedstyret",
    description:
      "Hovedstyret er det nasjonale styret i vektorprogrammet. De er et overordnet organ med ansvar for drifting av hele organisasjonen.",
    email: "hovedstyret@vektorprogrammet.no",
    button: true,
    contacts: [],
    openForContact: true,
  };
}

export async function fetchContactTeams(): Promise<Array<TeamOverview>> {
  const baseUrl = import.meta.env.VITE_API_URL;
  if (!baseUrl) throw new Error("VITE_API_URL is not configured");
  const response = await fetch(
    `${trimTrailingSlashes(baseUrl)}/teams/active/overview`,
  );
  if (!response.ok)
    throw new Error(`Failed to fetch contact teams: ${response.status}`);
  return await response.json();
}

export function getDepartmentContactInfo(
  department: Department,
  teamOverviews: Array<TeamOverview>,
): TeamInfo {
  const teams = teamOverviews.filter(
    ({ team }) =>
      team.departmentId === department.id && team.name !== "Hovedstyret",
  );
  const board = teams.find(({ team }) => team.name === "Styret");
  return {
    name: department.city,
    description: board?.team.shortDescription ?? "",
    email: board?.team.email ?? "",
    contacts: teams.map(({ team }) => ({ name: team.name, mail: team.email })),
    members: board?.memberCount,
    openForContact: Boolean(board?.team.email),
  };
}

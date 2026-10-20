import type { DepartmentPretty } from "~/lib/types";

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

export async function fetchHovedstyreMemberDetails(
  teamId: number,
): Promise<HovedstyreMemberOverview[]> {
  const response = await fetch(
    `http://localhost:8080/users/team-members/teamId/${teamId}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Hovedstyre: ${response.status}`);
  }

  const users: {
    firstName: string;
    lastName: string;
    teamUserRoleName: string;
    companyEmail: string | null;
  }[] = await response.json();

  return users.map((user) => ({
    name: `${user.firstName} ${user.lastName}`,
    title: user.teamUserRoleName,
    mail: user.companyEmail ?? "",
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

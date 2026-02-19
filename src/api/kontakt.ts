import { apiFetch } from "./client";
import type { Department, DepartmentDetail } from "./departments";
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

// Static header content — not in the API
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

export type TeamInfo = {
  name: string;
  description: string;
  email: string;
  address?: string;
  members?: number;
  button?: boolean;
  contacts: Array<Contact>;
  openForContact: boolean;
  departmentId?: number;
};

type Contact = {
  name: string;
  title?: string;
  mail: string;
};

export async function getContactInfo(
  query: DepartmentPretty,
): Promise<TeamInfo> {
  if (query === "Hovedstyret") {
    return getFallbackHovedstyret();
  }

  try {
    const departments = await apiFetch<Array<Department>>("/api/departments");
    const dept = departments.find((d) => d.city === query);
    if (!dept) return getFallbackInfo(query);

    const detail = await apiFetch<DepartmentDetail>(
      `/api/departments/${dept.id}`,
    );

    const contacts: Array<Contact> = detail.teams
      .filter((t) => t.active)
      .map((t) => ({ name: t.name, mail: t.email }));

    return {
      name: query,
      description: descriptionForCity(query),
      email: dept.email,
      address: dept.address || undefined,
      contacts: contacts.length > 0 ? contacts : getFallbackInfo(query).contacts,
      openForContact: true,
      departmentId: dept.id,
    };
  } catch (error) {
    console.error(`Failed to fetch contact info for ${query}:`, error);
    return getFallbackInfo(query);
  }
}

function descriptionForCity(city: string): string {
  switch (city) {
    case "Trondheim":
      return "Norges teknisk-naturvitenskapelige universitet";
    case "Ås":
      return "Norges miljø- og biovitenskapelige universitet";
    case "Bergen":
      return "Universitetet i Bergen";
    default:
      return "";
  }
}

// --- Fallback data ---

function getFallbackInfo(query: DepartmentPretty): TeamInfo {
  switch (query) {
    case "Trondheim":
      return getFallbackTrondheim();
    case "Ås":
      return getFallbackAas();
    case "Bergen":
      return getFallbackBergen();
    case "Hovedstyret":
      return getFallbackHovedstyret();
    default:
      return {
        name: query,
        description: "",
        email: "",
        contacts: [],
        openForContact: false,
      };
  }
}

function getFallbackTrondheim(): TeamInfo {
  return {
    name: "Trondheim",
    description: "Norges teknisk-naturvitenskapelige universitet",
    email: "styret.ntnu@vektorprogrammet.no",
    address: "Høgskoleringen 5, 7491 Trondheim",
    contacts: [
      { name: "Styret", mail: "styret.ntnu@vektorprogrammet.no" },
      { name: "Evaluering", mail: "evaluering.ntnu@vektorprogrammet.no" },
      { name: "Rekruttering", mail: "rekruttering.ntnu@vektorprogrammet.no" },
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

function getFallbackAas(): TeamInfo {
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

function getFallbackBergen(): TeamInfo {
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

function getFallbackHovedstyret(): TeamInfo {
  return {
    name: "Hovedstyret",
    description:
      "Hovedstyret er det nasjonale styret i vektorprogrammet. De er et overordnet organ med ansvar for drifting av hele organisasjonen.",
    email: "hovedstyret@vektorprogrammet.no",
    members: 8,
    button: true,
    contacts: [
      {
        name: "Inga Bordal",
        title: "Leder",
        mail: "inga.bordal@vektorprogrammet.no",
      },
      {
        name: "Emma Dyvesveen Myrbekk",
        title: "Nestleder",
        mail: "emma.dyvesveen@vektorprogrammet.no",
      },
      {
        name: "Andreas Hope Pedersen",
        title: "Ekspansjon",
        mail: "andreas.pedersen@vektorprogrammet.no",
      },
      {
        name: "Erlend Marius Ommundsen",
        title: "IT-ansvarlig",
        mail: "erlend.marius@vektorprogrammet.no",
      },
      {
        name: "David Ramsvik",
        title: "Mentor",
        mail: "david@vektorprogrammet.no",
      },
      {
        name: "Ingeborg Eldevik Rusaas",
        title: "Profilering",
        mail: "ingeborg.eldevik@vektorprogrammet.no",
      },
      {
        name: "Adrian Larsen",
        title: "Sponsor",
        mail: "adrian@vektorprogrammet.no",
      },
      {
        name: "Odin Nilsen",
        title: "Økonomi",
        mail: "odin@vektorprogrammet.no",
      },
    ],
    openForContact: false,
  };
}

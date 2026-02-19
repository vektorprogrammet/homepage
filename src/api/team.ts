import { href } from "react-router";
import { apiFetch } from "./client";
import type { Department, DepartmentDetail } from "./departments";

export interface TeamCard {
  title: string;
  text1: string;
  text2: string;
  text3: string;
  image: {
    url: URL;
    alt: string;
  };
}
export interface TeamContent {
  title: string;
  card: TeamCard;
}

// Static header content — not in the API
export function getTeam(): TeamContent {
  return {
    title: "Våre team",
    card: {
      title: "Styre og team",
      text1:
        "Vektorprogrammet er en stor organisasjon med assistenter i 4 norske byer. Vi trenger derfor mange frivillige bak kulissene som kan få hjulene til å gå rundt. Uten Vektorprogrammets 15 team hadde dette aldri gått an! ",
      text2: "Kunne du tenkt deg et team-verv hos oss?",
      text3: "Les mer om de ulike teamene nedenfor!",
      image: {
        url: new URL("https://vektorprogrammet.no/images/departments_map.png"),
        alt: "Team",
      },
    },
  };
}

interface ApiTeam {
  id: number;
  name: string;
  email: string;
  shortDescription: string;
  active: boolean;
}

export interface TeamListItem {
  title: string;
  text: string;
  mail: string;
  numberOfMembers: number;
  buttonName: string;
  url: string;
}

export interface HovedstyretData {
  title: string;
  text: string;
  email: string;
  numberOfMembers: number;
  url: string;
  buttonName: string;
  image: { src: string; alt: string };
}

// Map city name to the route prefix for team detail pages
const citySlugMap: Record<string, string> = {
  Trondheim: "trondheim",
  Bergen: "bergen",
  Ås: "aas",
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/ø/g, "o")
    .replace(/æ/g, "ae")
    .replace(/å/g, "aa")
    .replace(/,\s*/g, "-")
    .replace(/\s+og\s+/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function teamUrl(citySlug: string, teamName: string): string {
  const slug = slugify(teamName);
  return `/team/${citySlug}/${slug}`;
}

async function fetchDepartments(): Promise<Array<Department>> {
  return apiFetch<Array<Department>>("/api/departments");
}

async function fetchDepartmentDetail(id: number): Promise<DepartmentDetail> {
  return apiFetch<DepartmentDetail>(`/api/departments/${id}`);
}

export async function getTeamsByCity(city: string): Promise<Array<TeamListItem>> {
  try {
    const departments = await fetchDepartments();
    const dept = departments.find((d) => d.city === city);
    if (!dept) return getFallbackTeams(city);

    const detail = await fetchDepartmentDetail(dept.id);
    const citySlug = citySlugMap[city] ?? slugify(city);

    return detail.teams
      .filter((t) => t.active)
      .map((t) => ({
        title: t.name,
        text: t.shortDescription || "",
        mail: t.email,
        numberOfMembers: 0, // Member count not available in collection view
        buttonName: "Les mer",
        url: teamUrl(citySlug, t.name),
      }));
  } catch (error) {
    console.error(`Failed to fetch teams for ${city}:`, error);
    return getFallbackTeams(city);
  }
}

export async function getHovedstyret(): Promise<HovedstyretData> {
  try {
    const departments = await fetchDepartments();
    // Hovedstyret may be a department with no city or a special name
    const dept = departments.find(
      (d) => d.name === "Hovedstyret" || d.shortName === "HS",
    );
    if (!dept) return getFallbackHovedstyret();

    const detail = await fetchDepartmentDetail(dept.id);
    return {
      title: "Hovedstyret",
      text: "Hovedstyret er det nasjonale styret i vektorprogrammet. De er et overordnet organ med ansvar for drifting av hele organisasjonen.",
      email: dept.email,
      numberOfMembers: detail.teams.reduce((acc) => acc, 0) || 8,
      url: href("/team/hovedstyret"),
      buttonName: "Les mer om hovedstyret",
      image: {
        src: "https://vektorprogrammet.no/images/HS_22.jpg?v=1664622616",
        alt: "Hovedstyret",
      },
    };
  } catch {
    return getFallbackHovedstyret();
  }
}

// --- Fallback data (current hardcoded values) ---

function getFallbackTeams(city: string): Array<TeamListItem> {
  switch (city) {
    case "Trondheim":
      return fallbackTrondheim;
    case "Ås":
      return fallbackAas;
    case "Bergen":
      return fallbackBergen;
    default:
      return [];
  }
}

function getFallbackHovedstyret(): HovedstyretData {
  return {
    title: "Hovedstyret",
    text: "Hovedstyret er det nasjonale styret i vektorprogrammet. De er et overordnet organ med ansvar for drifting av hele organisasjonen.",
    email: "hovedstyret@vektorprogrammet.no",
    numberOfMembers: 8,
    url: href("/team/hovedstyret"),
    buttonName: "Les mer om hovedstyret",
    image: {
      src: "https://vektorprogrammet.no/images/HS_22.jpg?v=1664622616",
      alt: "Hovedstyret",
    },
  };
}

const fallbackTrondheim: Array<TeamListItem> = [
  { title: "Styret", text: "Ansvarlig for driften av Vektorprogrammet i Trondheim.", mail: "styret.ntnu@vektorprogrammet.no", numberOfMembers: 9, buttonName: "Les mer", url: href("/team/trondheim/styret") },
  { title: "Evaluering", text: "Vi sender ut spørreundersøkelser, lager statistikk av dem og skriver så semester- og årsrapporter.", mail: "evaluering.ntnu@vektorprogrammet.no", numberOfMembers: 5, buttonName: "Les mer", url: href("/team/trondheim/evaluering") },
  { title: "Rekruttering", text: "I rekruttering jobber vi med å skaffe nye vektorassistenter.", mail: "rekruttering.ntnu@vektorprogrammet.no", numberOfMembers: 11, buttonName: "Les mer", url: href("/team/trondheim/rekruttering") },
  { title: "Skolekoordinering", text: "Skolekoordinering fungerer som et bindeledd mellom skolene og vektorassistentene gjennom semesteret.", mail: "skolekoordinering.ntnu@vektorprogrammet.no", numberOfMembers: 8, buttonName: "Les mer", url: href("/team/trondheim/skolekoordinering") },
  { title: "Sponsor", text: "Vektorprogrammets bindeledd til næringslivet, samarbeidspartnere og sponsorer.", mail: "sponsor.ntnu@vektorprogrammet.no", numberOfMembers: 6, buttonName: "Les mer", url: href("/team/trondheim/sponsor") },
  { title: "Økonomi", text: "Økonomiteamet har ansvaret for Vektorprogrammets økonomi.", mail: "okonomi@vektorprogrammet.no", numberOfMembers: 9, buttonName: "Les mer", url: href("/team/trondheim/okonomi") },
  { title: "IT", text: "IT-teamet utvikler og drifter Vektorprogrammets nettside og interne datasystemer.", mail: "it@vektorprogrammet.no", numberOfMembers: 10, buttonName: "Les mer", url: href("/team/trondheim/it") },
  { title: "Profilering", text: "Profileringsteamet jobber for å gjøre Vektorprogrammet mer synlig gjennom sosiale medier.", mail: "profilering.ntnu@vektorprogrammet.no", numberOfMembers: 7, buttonName: "Les mer", url: href("/team/trondheim/profilering") },
];

const fallbackAas: Array<TeamListItem> = [
  { title: "Styret", text: "Ansvarlig for driften av Vektorprogrammet i Ås.", mail: "nmbu@vektorprogrammet.no", numberOfMembers: 5, buttonName: "Les mer", url: href("/team/aas/styret") },
  { title: "Sponsor", text: "Har ansvaret for økonomien og sponsorene til Vektorprogrammet Ås.", mail: "sponsor.nmbu@vektorprogrammet.no", numberOfMembers: 4, buttonName: "Les mer", url: href("/team/aas/sponsor-okonomi") },
  { title: "Skolekoordinering", text: "Skolekoordinering har ansvaret for kontakten med skolene og organisering av assistentene.", mail: "skolekoordinering.nmbu@vektorprogrammet.no", numberOfMembers: 5, buttonName: "Les mer", url: href("/team/aas/skolekoordinering") },
  { title: "Evaluering", text: "Vi rekrutterer nye assistenter, styrer sosiale medier, arrangerer sosiale aktiviteter og følger opp at alle trives i vervet.", mail: "evaluering.nmbu@vektorprogrammet.no", numberOfMembers: 8, buttonName: "Les mer", url: href("/team/aas/evaluering-rekruttering-profilering") },
  { title: "Sosialt", text: "Vi arrangerer sosiale arrangementer for assistenter og sørger for at alle trives i vervet.", mail: "sosialt.nmbu@vektorprogrammet.no", numberOfMembers: 6, buttonName: "Les mer", url: href("/team/aas/sosialt") },
];

const fallbackBergen: Array<TeamListItem> = [
  { title: "Styret", text: "Ansvarlig for driften av Vektorprogrammet i Bergen.", mail: "uib@vektorprogrammet.no", numberOfMembers: 2, buttonName: "Les mer", url: href("/team/bergen/styret") },
  { title: "Skolekoordinering", text: "Skolekoordinering fungerer som et bindeledd mellom skolene og vektorassistentene gjennom semesteret.", mail: "skolekoordinering.uib@vektorprogrammet.no", numberOfMembers: 2, buttonName: "Les mer", url: href("/team/bergen/skolekoordinering") },
  { title: "Rekruttering", text: "I rekruttering jobber vi med å skaffe nye vektorassistenter!", mail: "rekruttering.uib@vektorprogrammet.no", numberOfMembers: 2, buttonName: "Les mer", url: href("/team/bergen/rekruttering") },
];

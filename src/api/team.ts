import { href } from "react-router";

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

export function teamsTrondheim() {
  return [
    {
      title: "Styret",
      text: "Ansvarlig for driften av Vektorprogrammet i Trondheim.",
      mail: "styret.ntnu@vektorprogrammet.no",
      numberOfMembers: 9,
      buttonName: "Les mer",
      url: href("/team/trondheim/styret"),
    },
    {
      title: "Evaluering",
      text: "Vi sender ut spørreundersøkelser, lager statistikk av dem og skriver så semester- og årsrapporter.",
      mail: "evaluering.ntnu@vektorprogrammet.no",
      numberOfMembers: 5,
      buttonName: "Les mer",
      url: href("/team/trondheim/evaluering"),
    },
    {
      title: "Rekruttering",
      text: "I rekruttering jobber vi med å skaffe nye vektorassistenter.",
      mail: "rekruttering.ntnu@vektorprogrammet.no",
      numberOfMembers: 11,
      buttonName: "Les mer",
      url: href("/team/trondheim/rekruttering"),
    },
    {
      title: "Skolekoordinering",
      text: "Skolekoordinering fungerer som et bindeledd mellom skolene og vektorassistentene gjennom semesteret.",
      mail: "skolekoordinering.ntnu@vektorprogrammet.no",
      numberOfMembers: 8,
      buttonName: "Les mer",
      url: href("/team/trondheim/skolekoordinering"),
    },
    {
      title: "Sponsor",
      text: "Vektorprogrammets bindeledd til næringslivet, samarbeidspartnere og sponsorer.",
      mail: "sponsor.ntnu@vektorprogrammet.no",
      numberOfMembers: 6,
      buttonName: "Les mer",
      url: href("/team/trondheim/sponsor"),
    },
    {
      title: "Økonomi",
      text: "Økonomiteamet har ansvaret for Vektorprogrammets økonomi.",
      mail: "okonomi@vektorprogrammet.no",
      numberOfMembers: 9,
      buttonName: "Les mer",
      url: href("/team/trondheim/okonomi"),
    },
    {
      title: "IT",
      text: "IT-teamet utvikler og drifter Vektorprogrammets nettside og interne datasystemer.",
      mail: "it@vektorprogrammet.no",
      numberOfMembers: 10,
      buttonName: "Les mer",
      url: href("/team/trondheim/it"),
    },
    {
      title: "Profilering",
      text: "Profileringsteamet jobber for å gjøre Vektorprogrammet mer synlig gjennom sosiale medier.",
      mail: "profilering.ntnu@vektorprogrammet.no",
      numberOfMembers: 7,
      buttonName: "Les mer",
      url: href("/team/trondheim/profilering"),
    },
  ];
}

export function teamsAas() {
  return [
    {
      title: "Styret",
      text: "Ansvarlig for driften av Vektorprogrammet i Ås.",
      mail: "nmbu@vektorprogrammet.no",
      numberOfMembers: 5,
      buttonName: "Les mer",
      url: href("/team/aas/styret"),
    },
    {
      title: "Sponsor",
      text: "Har ansvaret for økonomien og sponsorene til Vektorprogrammet Ås.",
      mail: "sponsor.nmbu@vektorprogrammet.no",
      numberOfMembers: 4,
      buttonName: "Les mer",
      url: href("/team/aas/sponsor-okonomi"),
    },
    {
      title: "Skolekoordinering",
      text: "Skolekoordinering har ansvaret for kontakten med skolene og organisering av assistentene.",
      mail: "skolekoordinering.nmbu@vektorprogrammet.no",
      numberOfMembers: 5,
      buttonName: "Les mer",
      url: href("/team/aas/skolekoordinering"),
    },
    {
      title: "Evaluering",
      text: "Vi rekrutterer nye assistenter, styrer sosiale medier, arrangerer sosiale aktiviteter og følger opp at alle trives i vervet.",
      mail: "evaluering.nmbu@vektorprogrammet.no",
      numberOfMembers: 8,
      buttonName: "Les mer",
      url: href("/team/aas/evaluering-rekruttering-profilering"),
    },
    {
      title: "Sosialt",
      text: "Vi arrangerer sosiale arrangementer for assistenter og sørger for at alle trives i vervet.",
      mail: "sosialt.nmbu@vektorprogrammet.no",
      numberOfMembers: 6,
      buttonName: "Les mer",
      url: href("/team/aas/sosialt"),
    },
  ];
}

export function teamsBergen() {
  return [
    {
      title: "Styret",
      text: "Ansvarlig for driften av Vektorprogrammet i Bergen.",
      mail: "uib@vektorprogrammet.no",
      numberOfMembers: 2,
      buttonName: "Les mer",
      url: href("/team/bergen/styret"),
    },
    {
      title: "Skolekoordinering",
      text: "Skolekoordinering fungerer som et bindeledd mellom skolene og vektorassistentene gjennom semesteret.",
      mail: "skolekoordinering.uib@vektorprogrammet.no",
      numberOfMembers: 2,
      buttonName: "Les mer",
      url: href("/team/bergen/skolekoordinering"),
    },
    {
      title: "Rekruttering",
      text: "I rekruttering jobber vi med å skaffe nye vektorassistenter!",
      mail: "rekruttering.uib@vektorprogrammet.no",
      numberOfMembers: 2,
      buttonName: "Les mer",
      url: href("/team/bergen/rekruttering"),
    },
  ];
}

export function teamsHovedstyret() {
  return {
    title: "Hovedstyret",
    text: `Hovedstyret er det nasjonale styret i vektorprogrammet.
      De er et overordnet organ med ansvar for drifting av hele organisasjonen.`,
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

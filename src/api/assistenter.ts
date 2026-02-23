import { getContentByPrefix } from "./static-content";

interface AssistentMotivationCard {
  title: string;
  text: string;
  image: {
    url: URL;
    alt: string;
  };
}

interface ForAssistenterContent {
  title: string;
  ingress: string;
  cards: Array<AssistentMotivationCard>;
}

function extractText(html: string, tag: string): string | null {
  const match = html.match(new RegExp(`<${tag}[^>]*>(.*?)</${tag}>`, "s"));
  return match ? match[1].replace(/<[^>]*>/g, "").trim() : null;
}

export async function getAssistenter(): Promise<ForAssistenterContent> {
  try {
    const content = await getContentByPrefix("assistants-");
    if (content.size === 0) return getFallbackAssistenter();

    const headerHtml = content.get("assistants-header") ?? "";
    const title = extractText(headerHtml, "h1") ?? "Assistenter";
    const ingress =
      extractText(headerHtml, "p") ?? getFallbackAssistenter().ingress;

    return {
      title,
      ingress,
      cards: getFallbackAssistenter().cards,
    };
  } catch (error) {
    console.error("Failed to fetch assistenter content:", error);
    return getFallbackAssistenter();
  }
}

function getFallbackAssistenter(): ForAssistenterContent {
  return {
    title: "Assistenter",
    ingress: `Vektorassistent er et frivillig verv der du reiser til en ungdomsskole
       én dag i uka for å hjelpe til som lærerassistent i matematikk.
       En stilling som vektorassistent varer i 4 eller 8 uker, og du kan selv velge
       hvilken ukedag som passer best for deg.`,

    cards: [
      {
        title: "Vær et forbilde",
        text:
          "Som vektorassistent er du med på å gjøre matte gøy." +
          " Ditt engasjement kan bidra til økt motivasjon og lærelyst. Bli med og gjør en forskjell!",
        image: {
          url: new URL(
            "https://vektorprogrammet.no/images/graduation.svg?v=1598900041",
          ),
          alt: "vær et forbilde",
        },
      },

      {
        title: "Sosialt",
        text:
          "Alle assistenter blir invitert til arrangementer som f.eks. fester," +
          " populærforedrag, bowling, grilling i parken, gokart og paintball.",
        image: {
          url: new URL(
            "https://vektorprogrammet.no/images/calendar.svg?v=1598900041",
          ),
          alt: "Sosiale",
        },
      },

      {
        title: "Fint å ha på CVen",
        text: "Erfaring som arbeidsgivere setter pris på. Alle assistenter får en attest.",
        image: {
          url: new URL(
            "https://vektorprogrammet.no/images/certificate.svg?v=1598900041",
          ),
          alt: "fint å ha på cven",
        },
      },
    ],
  };
}

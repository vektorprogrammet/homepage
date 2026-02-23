import { getContentByPrefix } from "./static-content";
import type { TextPictureParagraphApiProps } from "~/components/text-picture-paragraph";

interface OmOssContent {
  title: string;
  ingress: string;
  bottomText: string;
  bottomHeader: string;
  bottomImage: {
    url: URL;
    alt: string;
  };
  cards: Array<TextPictureParagraphApiProps>;
}

export async function getOmOss(): Promise<OmOssContent> {
  try {
    const content = await getContentByPrefix("about-");
    if (content.size === 0) return getFallbackOmOss();
    return getFallbackOmOss(); // HTML parsing deferred — structured data not yet available from API
  } catch (error) {
    console.error("Failed to fetch om-oss content:", error);
    return getFallbackOmOss();
  }
}

function getFallbackOmOss(): OmOssContent {
  return {
    title: "Om Vektorprogrammet",
    ingress: `Vektorprogrammet arbeider for å øke interessen for matematikk
        og realfag blant elever i grunnskolen. Vi er en nasjonal studentorganisasjon
        som sender studenter med god realfagskompetanse til skoler
        for å hjelpe elevene i matematikktimene. Disse
        studentene har også gode pedagogiske evner og
        er gode rollemodeller - de er Norges realfagshelter.`,
    bottomHeader: "En forsmak til læreryrket!",
    bottomText: `Siden studentene er tilstede i
          undervisningen får de en introduksjon til
          læreryrket. Mange som studerer realfag
          vurderer en fremtid som lærer,
          og får gjennom oss muligheten til
          å få reell erfaring.`,
    bottomImage: {
      url: new URL("https://vektorprogrammet.no/images/nett.jpg?v=1598900041"),
      alt: "",
    },
    cards: [
      {
        title: "Motivere elever",
        text: `Vektorprogrammet ønsker å øke
       matematikkforståelsen blant elever i grunnskolen. Forståelse
        gir mestringsfølelse som fører til videre motivasjon. Siden
         matematikk er grunnlaget for alle realfag er målet at dette
          også skal føre til motivasjon og videre utforskning av realfagene.`,
        image: {
          url: new URL(
            "https://vektorprogrammet.no/images/tormedmer.jpg?v=1598900041",
          ),
          alt: "Kosing med Tor.",
        },
      },
      {
        title: "Motivere studenter",
        text: `Vi har som mål at alle studentene skal
          sitte igjen mer motivert for videre studier
          etter å ha vært vektorassistent. Av erfaring
          vet vi at muligheten til å formidle egen kunnskap
           og se at deres arbeid gir elevene
           mestringsfølelse er en sterk motivasjonsfaktor. Videre arrangerer
            vi både sosiale og faglige arrangementer for å
             forsterke denne motivasjonen.`,
        image: {
          url: new URL(
            "https://vektorprogrammet.no/images/membersV18.JPG?v=1598900041",
          ),
          alt: "Samlede vektormedlemmer.",
        },
      },
    ],
  };
}

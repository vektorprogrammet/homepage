import { TeamTemplate } from "@/components/team-template";

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function Sponsor() {
  return (
    <div className="mx-auto mt-5 mb-20 flex max-w-screen-lg flex-col items-center">
      <TeamTemplate
        name="Sponsor"
        mail="sponsor.ntnu@vektorprogrammet.no"
        text="Vektorprogrammets bindeledd til næringslivet, samarbeidspartnere og sponsorer."
        members={[
          {
            name: "Ole Gunnar Røsholt Hovland",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/6261456bbbea9.jpeg",
            role: "Leder",
          },
          {
            name: "Ingeborg Aarnes",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/6356cd46ce6f9.jpeg",
            role: "Medlem",
          },
          {
            name: "Erik Mathisen",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/6356cd087286f.jpeg",
            role: "Medlem",
          },
          {
            name: "Frøya Kjepso",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/6356cd903dc7f.jpeg",
            role: "Medlem",
          },
          {
            name: "Sukrit Baral",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/6407157190b92.jpeg",
            role: "Medlem",
          },
          {
            name: "Harishsan Arumugadas",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/64071542a96d0.jpeg",
            role: "Medlem",
          },
        ]}
      />

      <div className="mt-20 text-center font-sans text-3xl text-bold text-vektor-darblue">
        Arbeidet vårt
      </div>

      <div className="m-5 text-left font-sans text-black text-lg">
        Samarbeidskoordinatorene har ansvaret for å skaffe midler til å drive
        Vektorprogrammet videre. Vi har kontakt med alt fra sjefer i
        næringslivet til studenter i andre organisasjoner. Vervet består både av
        møter/samarbeid og selvstendig ringing/mailing til bedriftene.
      </div>

      <div className="m-3">
        {/*! TODO: FIX */}
        {/* biome-ignore lint/a11y/useAltText: Temporary ignore for ci/cd */}
        <img
          className="mx-auto h-auto content-center md:max-w-2xl"
          src="https://vektorprogrammet.no/images/team_images/20221005_163558.jpg"
        />
      </div>

      <div className="mt-10 text-center font-sans text-3xl text-bold text-vektor-darblue">
        Sosialt i Sponsor
      </div>

      <div className="m-5 text-left font-sans text-black text-lg">
        Vi har hyggelige og spennende arrangementer både innad i teamet og
        sammen med de andre teamene i Vektorprogrammet. I Sponsor har vi vært
        ute og spist sammen, hatt hjemmelaget sushi og vært på Escape Room. Det
        skjer også mye sosial på tvers av team, blant annet hytteturer, fester,
        tacokveld, 17.mai-feiring, åpent kontor, gokart, minigolf, bumperballs
        og LazerTag. Jevnlig utover semesteret arrangeres det TeamSosialt, der
        hvert team inviterer to andre team til en sosial sammenkomst. Som medlem
        i teamet får du:
      </div>

      <div className="mt-10 text-center font-sans text-3xl text-bold text-vektor-darblue">
        Opptak
      </div>

      <div className="mx-5 mt-5 mb-3 text-left font-sans text-black text-lg">
        Arbeidsmengden i Sponsorteamet ligger på rundt 2-3 timer i uka, utenom
        eksamensperioden - da er det selvfølgelig ingen arbeidsoppgaver, kun
        frivillige sosiale arrangementer.
      </div>

      <div className="mx-5 place-self-start text-left font-sans text-black text-lg">
        Som medlem i teamet får du:
      </div>

      <div className="mt-5 mr-4 mb-2 ml-4 grid items-center md:grid-cols-2">
        <div className="place-content-start font-sans text-black text-lg">
          <ul className="ml-10 list-disc">
            <li>
              Ansvaret for noen bedrifter eller organisasjoner som du skal
              kontakte eller opprettholde kontakten med.
            </li>
            <li>
              Utfordringen med å overbevise disse om at Vektorprogrammet er
              verdt å støtte.
            </li>
            <li>Skrive søknader til fond og legater.</li>
            <li>
              Delta på ukentlige møter med resten av teamet for å diskutere
              aktuelle saker.
            </li>
            <li>
              Delta på konferanser for å promotere Vektorprogrammet for
              næringslivet.
            </li>
            <li>
              Oppdatere resten av Vektorprogrammet når du får en ny avtale.
            </li>
            <li>
              Oppdatere sponsorer om hvordan det går med Vektorprogrammet.
            </li>
            <li>Muligheten til å påvirke Vektorprogrammet videre.</li>
            <li>Et meningsfylt og viktig verv.</li>
            <li>En ny sosial arena.</li>
          </ul>
        </div>
        {/*! TODO: FIX */}
        {/* biome-ignore lint/a11y/useAltText: Temporary ignore for ci/cd */}
        <img
          className="m-5 mx-auto h-auto max-h-96 content-center sm:max-w-sm"
          src="/images/team/SponsorTor.png"
        />
      </div>

      <div className="m-5 place-self-start text-left font-sans text-black text-lg">
        Vi ser hele tiden etter nye engasjerte medlemmer. Er du interessert, ta
        kontakt på{" "}
        <a
          className="break-all text-vektor-darblue hover:underline"
          href="mailto:sponsor.ntnu@vektorprogrammet.no"
        >
          sponsor.ntnu@vektorprogrammet.no.
        </a>
      </div>
    </div>
  );
}

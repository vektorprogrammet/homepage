import { TeamTemplate } from "@/components/team-template";

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function Evaluering() {
  return (
    <div className="mx-auto mt-5 mb-20 flex max-w-screen-lg flex-col items-center">
      <TeamTemplate
        name="Evaluering"
        mail="evaluering.ntnu@vektorprogrammet.no"
        text="Vi sender ut spørreundersøkelser, lager statistikk av dem og skriver så semester- og årsrapporter."
        members={[
          {
            name: "Hannes Witt",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/634926da1a3a6.jpeg",
            role: "Leder",
          },
          {
            name: "Emma Dyvesveen Myrbekk",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/634926c5a6400.jpeg",
            role: "Medlem",
          },
          {
            name: "Tinus Øen",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/63492623842a1.jpeg",
            role: "Medlem",
          },
          {
            name: "Maja Christine Stahl",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/640714155162e.jpeg",
            role: "Medlem",
          },
        ]}
      />

      <div className="m-3">
        {/*! TODO: FIX */}
        {/* biome-ignore lint/a11y/useAltText: Temporary ignore for ci/cd */}
        <img
          src="https://vektorprogrammet.no/images/team_images/Evaluering/Teambildet.jpg"
          className="m-3 mx-auto mt-20 h-auto content-center sm:max-w-2xl"
        />
      </div>

      <div className="mt-10 text-center font-sans text-3xl text-bold text-vektor-darblue">
        Arbeidet vårt
      </div>

      <div className="m-5 text-left font-sans text-black text-lg">
        Evalueringsteamet lager hovedsaklig spørreundersøkelser for
        vektorassistenter, elever, lærere, samt foreldre som deltok på
        semesterets foreldrekurs. Å få tilbakemeldinger gjennom disse
        undersøkelsene er viktig for å kunne forbedre Vektorprogrammet. Når vi
        får svar på undersøkelsene, bruker vi statistikken fra undersøkelsene
        til å skrive rapporter. På denne måten får vi en god oversikt over hva
        som fungerer bra ved Vektorprogrammet og hva som bør forbedres til neste
        semester. På slutten av hvert semester skriver vi en rapport som
        oppsummerer arbeidet til Vektorprogrammet gjort foregående semester og
        mål for det neste semesteret. Vi skriver også en promorapport som sendes
        til sponsorer av Vektorprogrammet for å vise hva vi har oppnådd gjennom
        året. Når denne rapporten lages bruker vi InDesign.
      </div>

      <div className="mr-4 ml-4 flex flex-wrap justify-center sm:space-x-8">
        <div className="m-auto object-contain">
          {/*! TODO: FIX */}
          {/* biome-ignore lint/a11y/useAltText: Temporary ignore for ci/cd */}
          <img
            src="https://vektorprogrammet.no/images/team_images/trapp_bygg.jpg"
            className="m-5 mx-auto mt-15 max-h-80 content-center sm:max-w-md"
          />
        </div>

        <div className="m-auto object-contain">
          {/*! TODO: FIX */}
          {/* biome-ignore lint/a11y/useAltText: Temporary ignore for ci/cd */}
          <img
            src="https://vektorprogrammet.no/images/team_images/trapp_park.jpg"
            className="m-5 mx-auto mt-15 max-h-96 content-center sm:max-w-xs"
          />
        </div>
      </div>

      <div className="mt-10 text-center font-sans text-3xl text-bold text-vektor-darblue">
        Sosialt i evaluering
      </div>

      <div className="m-5 text-left font-sans text-black text-lg">
        Vi har hyggelige og spennende arrangementer både innad i teamet og
        sammen med de andre teamene i Vektorprogrammet. Vi i evaluering har vært
        ute og spist sammen, og arrangert pizza- og spillkveld. Det skjer også
        mye sosialt på tvers av team, blant annet hytteturer, tema-fester,
        17.mai-feiring, Gokart og LazerTag. Jevnlig utover semesteret arrangeres
        det TeamSosial, der hvert team inviterer to andre team til en sosial
        sammenkomst.
      </div>

      <div className="m-3">
        {/*! TODO: FIX */}
        {/* biome-ignore lint/a11y/useAltText: Temporary ignore for ci/cd */}
        <img
          src="https://vektorprogrammet.no/images/team_images/20200831_175600.jpg"
          className="m-3 mx-auto mt-3 h-auto content-center sm:max-w-2xl"
        />
      </div>

      <div className="mt-10 text-center font-sans text-3xl text-bold text-vektor-darblue">
        Opptak
      </div>

      <div className="m-5 font-sans text-black text-lg">
        Et verv i evalueringsteamet innebærer ca. 2 timer arbeid i uka. Vi blir
        enige innad i teamet om et fast ukentlig møtetidspunkt som passer for
        alle medlemmene, og vi har ikke møter i eksamensperioden. Gjennom hele
        året arrangeres det mange sosiale aktiviteter man kan være med på, og
        man står på stand minst to gang si rekrutteringsperiodene.
      </div>

      <div className="mt-4 mr-4 ml-4 grid md:grid-cols-2">
        <div className="place-content-start font-sans text-black text-lg">
          <div className="mt-4 mb-2">Appellerer punktene under til deg?</div>
          <ul className="ml-10 list-disc">
            <li>
              Være en del av Vektorprogrammet og bidra til å inspirere ungdom
              til å studere realfag
            </li>
            <li>Ta del i studentfrivilligheten</li>
            <li>Utforme undersøkelser, lage statistikk og skrive rapporter</li>
            <li>
              Skrive i tekstbehandlingssystemet LaTeX (ingen forkunnskaper
              nødvendig)
            </li>
            <li>
              Ha et sosialt verv der man får venner fra ulike linjer og kull
            </li>
            <li>Få en relevant attest til senere jobbsøking</li>
          </ul>
          <div className="my-6">Da er evalueringsteamet stedet for deg!</div>
        </div>

        {/*! TODO: FIX */}
        {/* biome-ignore lint/a11y/useAltText: Temporary ignore for ci/cd */}
        <img
          className="mx-auto h-auto max-h-96 content-center sm:max-w-sm"
          src="/images/team/EvalueringTor.png"
        />
      </div>

      <div className="mt-10 ml-4 place-self-start font-sans text-black text-lg">
        Dersom du har noen spørsmål er det bare å ta kontakt med oss på{" "}
        <a
          className="break-all text-vektor-darblue hover:underline"
          href="mailto:evaluering.ntnu@vektorprogrammet.no"
        >
          evaluering.ntnu@vektorprogrammet.no.
        </a>
      </div>
    </div>
  );
}

import { TeamTemplate } from "@/components/team-template";

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function Profilering() {
  return (
    <div className="mx-auto mt-5 mb-20 flex max-w-screen-lg flex-col">
      <TeamTemplate
        name="Profilering"
        mail="profilering.ntnu@vektorprogrammet.no"
        text="Profileringsteamet jobber for å gjøre Vektorprogrammet mer synlig gjennom sosiale medier."
        members={[
          {
            name: "Per Hjelle Solheim",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/6172aab7e0211.jpeg",
            role: "Leder",
          },
          {
            name: "David Ramsvik",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/6370f59dcadc0.jpeg",
            role: "Medlem",
          },
          {
            name: "Ingeborg Eldevik Rusaas",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/6336cca326080.jpeg",
            role: "Medlem",
          },
          {
            name: "Gaute Eng Simonsen",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/6232f4b08ace7.jpeg",
            role: "Medlem",
          },
          {
            name: "Nora Yttri",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/6336d96dc66e2.jpeg",
            role: "Medlem",
          },
          {
            name: "Swati Soosaipillai",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/6336b44383a84.jpeg",
            role: "Medlem",
          },
          {
            name: "Andreas Gidske",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/63615c4a25116.jpeg",
            role: "Medlem",
          },
          {
            name: "Hege Sæther",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/63ed048e0bb38.jpeg",
            role: "Medlem",
          },
          {
            name: "Malene Ytterdahl-Karlengen",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/64089ffa85abe.jpeg",
            role: "Medlem",
          },
        ]}
      />

      <div className="mt-20 text-center font-sans text-3xl text-bold text-vektor-darblue">
        Arbeidet vårt
      </div>

      <div className="m-5 text-left font-sans text-black text-lg">
        Profileringsteamet har ansvar for å representere Vektorprogrammet utad.
        Dette innebærer å lage innhold og innlegg til sosiale medier, samt å nå
        ut til andre medier. Arbeidsoppgaver kan være å ta bilder på
        arrangementer, redigere bilder og videoer, intervjue vektorassistenter
        og teammedlemmer, lage promofilm og starte prosjekter man selv synes er
        spennende. Det som er spesielt for profileringsteamet er at det er åpent
        for individuell kreativitet, slik at vi kan ha en stor rolle i å forme
        hvordan Vektorprogrammet profileres. Du trenger ikke å ha noe erfaring
        med profileringsarbeid, film eller foto fra før.
      </div>

      <div className="mt-10 text-center font-sans text-3xl text-bold text-vektor-darblue">
        Sosialt i profilering
      </div>

      <div className="m-5 text-left font-sans text-black text-lg">
        Vi har hyggelige og spennende arrangementer både innad i teamet og
        sammen med de andre teamene i Vektorprogrammet. Vi i profileringsteamet
        er spesielt gode på tacokvelder, minigolf og hygge på kontoret. Det
        skjer også mye sosial på tvers av team, blant annet hytteturer, fester,
        tacokveld, 17.mai-feiring, åpent kontor, gokart, minigolf, bumperballs
        og LazerTag. Jevnlig utover semesteret arrangeres det TeamSosialt, der
        hvert team inviterer to andre team til en sosial sammenkomst.
      </div>

      <div className="m-3 mt-5">
        {/*! TODO: FIX */}
        {/* biome-ignore lint/a11y/useAltText: Temporary ignore for ci/cd */}
        <img
          src="https://vektorprogrammet.no/images/team_images/Profilering/IMG_9785.jpeg"
          className="mx-auto h-auto content-center md:max-w-3xl"
        />
      </div>

      <div className="mt-10 text-center font-sans text-3xl text-bold text-vektor-darblue">
        Opptak
      </div>

      <div className="mx-5 mt-5 text-left font-sans text-black text-lg">
        Arbeidsmengden som teammedlem i profileringsteamet er ca. 2 timer i
        uken. Den største delen av arbeidet gjøres under de møter med teamet.
        Det er ikke noe arbeid i eksamensperioden, men en del sosiale
        arrangementer man kan være med på hvis man ønsker det.
      </div>

      <div className="mx-5 mt-5 place-content-start text-left font-sans text-black text-lg">
        Som medlem i teamet får du:
      </div>

      <div className="mx-3 flex flex-wrap justify-center sm:flex-nowrap sm:justify-between">
        <div className="mt-3 flex-grow-1 place-content-start font-sans text-black text-lg">
          <ul className="ml-10 list-disc">
            <li>
              Ansvar for et område du selv velger, innen profileringen. Dette
              kan være, feks:
              <ul className="ml-10 list-disc">
                <li>Sosiale medier</li>
                <li>Promofilm</li>
                <li>
                  Innhold til sosiale medier (intervjuer av assistenter og
                  teammedlemmer)
                </li>
                <li>Nå ut til andre medier, feks lokale studentaviser</li>
                <li>Utforming av flyers og plakater</li>
              </ul>
            </li>
            <li>Bli med på å forme Vektorprogrammets ansikt utad</li>
            <li>Bli del av et sosialt og kreativt team</li>
            <li>Gode venner på tvers av linjer og team</li>
            <li>Gode erfaringer innen teamarbeid</li>
            <li>Et meningsfylt verv</li>
            <li>Få en relevant attest til senere jobbsøking</li>
          </ul>
        </div>
        {/*! TODO: FIX */}
        {/* biome-ignore lint/a11y/useAltText: Temporary ignore for ci/cd */}
        <img
          className="mt-5 h-auto max-h-96 place-content-center content-center sm:ml-10 sm:max-w-sm"
          src="/images/team/ProfileringTor.png"
        />
      </div>

      <div className="m-5 place-self-start font-sans text-black text-lg">
        Søk profilering hvis du har lyst til å påvirke organsisajonen og bli del
        av en fantastisk gjeng!
      </div>

      <div className="mx-5 place-self-start font-sans text-black text-lg">
        Hvis du har noen spørsmål, er det bare å ta kontakt på{" "}
        <a
          className="break-all text-vektor-darblue hover:underline"
          href="mailto:profilering.ntnu@vektorprogrammet.no"
        >
          profilering.ntnu@vektorprogrammet.no.
        </a>
      </div>
    </div>
  );
}

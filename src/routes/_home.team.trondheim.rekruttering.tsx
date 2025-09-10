import { TeamTemplate } from "@/components/team-template";

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function Rekruttering() {
  return (
    <div className="mx-auto mt-5 mb-20 flex max-w-screen-lg flex-col items-center">
      <TeamTemplate
        name="Rekruttering"
        mail="rekruttering.ntnu@vektorprogrammet.no"
        text="I rekruttering jobber vi med å skaffe nye vektorassistenter."
        members={[
          {
            name: "Astrid Bugge",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/63f4de1b4f69f.jpeg",
            role: "Leder",
          },
          {
            name: "David Ramsvik",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/6370f59dcadc0.jpeg",
            role: "Medlem",
          },
          {
            name: "Andreas Hope Pedersen",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/63626f2ba192b.jpeg",
            role: "Medlem",
          },
          {
            name: "Sander Nicolai Andersen",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/63606f1344a57.jpeg",
            role: "Medlem",
          },
          {
            name: "Andreas Gidske",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/63615c4a25116.jpeg",
            role: "Medlem",
          },
          {
            name: "Jeanette Fjeldstad",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/623208c0b7cff.jpeg",
            role: "Medlem",
          },
          {
            name: "Odin Nilsen",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/63615c0f67d3a.jpeg",
            role: "Medlem",
          },
          {
            name: "Christian Bjørnaas",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/63f4df5c666ec.jpeg",
            role: "Medlem",
          },
          {
            name: "Marcus Espås",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/63f4de8dc156f.jpeg",
            role: "Medlem",
          },
          {
            name: "Varvara Subbotina",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/63f4e0222a371.jpeg",
            role: "Medlem",
          },
          {
            name: "Kristine Hamre",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/63f4eefce7706.jpeg",
            role: "Medlem",
          },
        ]}
      />

      <div className="mt-20 text-center font-sans text-3xl text-bold text-vektor-darblue">
        Arbeidet vårt
      </div>

      <div className="mr-4 ml-4 grid items-center md:grid-cols-2">
        <div className="my-5 place-content-start font-sans text-black text-lg">
          <ul className="ml-10 list-disc">
            <li>Stå på stand</li>
            <li>Bleste i forelesninger</li>
            <li>Intervjue nye søkere</li>
            <li>Planlegge forberedelse-kurs</li>
            <li>Planlegge sosiale arrangementer</li>
            <li>Planlegge faglige arrangementer</li>
          </ul>
        </div>

        {/*! TODO: FIX */}
        {/* biome-ignore lint/a11y/useAltText: Temporary ignore for ci/cd */}
        <img
          className="mx-auto my-5 max-h-80 content-right md:max-w-l"
          src="/images/team/RekrutteringTor.png"
        />
      </div>

      <div className="m-5 place-self-start text-left font-sans text-black text-lg">
        Det at vi er i rekrutteringsteamet betyr at vi har en mer intens periode
        i januar og august, men har det roligere resten av semesteret. I tillegg
        til rekrutteringsperioden har vi også ansvar for de sosiale og faglige
        arrangementene Vektorprogrammet arrangerer. De sosiale arrangementene
        kan være alt fra assistentfesten til go-cart eller grilling i parken.
        Blant de faglige arrangementene vi har hatt er foredrag med James Grime,
        Colin Wright, Newton programleder og Farmen-kjendisdeltager Stian Sandø.
      </div>

      <div className="mt-10 text-center font-sans text-3xl text-bold text-vektor-darblue">
        Sosialt i Rekruttering
      </div>
      <div className="m-5 place-self-start text-left font-sans text-black text-lg">
        Vi er kanskje det teamet som liker å møtes oftest utenom vervet. Her
        finner vi på mye sprell og fanteri. Dette strekker seg fra fantastiske
        vors og uforglemmelige hytteturer til litt mer rolige og avslappede
        sushikvelder. Vi har også mye kontakt via vår gruppechat på snap hvor
        dagens (og nattens) festligheter deles hyppig.
      </div>

      <div className="m-3 object-contains">
        {/*! TODO: FIX */}
        {/* biome-ignore lint/a11y/useAltText: Temporary ignore for ci/cd */}
        <img
          className="mx-auto h-auto content-center md:max-w-2xl"
          src="https://vektorprogrammet.no/images/team_images/313096245_1158050458440674_2660066729317743376_n.jpg"
        />
      </div>

      <div className="mt-10 text-center font-sans text-3xl text-bold text-vektor-darblue">
        Opptak
      </div>

      <div className="m-3 mt-5 place-self-start text-left font-sans text-black text-lg">
        Vi i rekrutteringsteamet trenger stadig nye medlemmer. Så er du blid,
        hyggelig og utadvent, og har lyst på et givende og sosialt verv ved
        siden av studiene, ikke nøl med å ta kontakt!
      </div>

      <div className="m-3 place-self-start text-left font-sans text-black text-lg">
        Er det noe mer du lurer på er det bare å sende mail til{" "}
        <a
          className="break-all text-vektor-darblue hover:underline"
          href="mailto:rekruttering.ntnu@vektorprogrammet.no"
        >
          rekruttering.ntnu@vektorprogrammet.no
        </a>
      </div>

      <div className="m-3 place-self-start text-left font-sans text-black text-lg">
        Hilsen oss i rekruttering!
      </div>
    </div>
  );
}

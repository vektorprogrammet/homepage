import { Link, href } from "react-router";
import { Divider } from "~/components/divider";
import { Button } from "~/components/ui/button";
import { cities } from "~/lib/types";

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function ForSkoler() {
  return (
    <main>
      <div className="mx-5 mt-10 flex flex-col items-center justify-center gap-3 font-sans leading-relaxed md:gap-5 dark:text-text-dark">
        <div className="flex flex-col gap-3 md:gap-5">
          <h1 className="max-w-3xl text-center font-bold text-2xl text-vektor-DARKblue md:text-4xl dark:text-text-dark">
            {"Vektorassistenter i skolen"}
          </h1>
          <div className="max-w-3xl text-md md:text-lg">
            {/* alle p's arver className fra div */}
            <p className="max-w-3xl text-md md:text-lg">
              {`Vektorprogrammet er en frivillig organisasjon som tilbyr
              ungdomsskoler i Norge hjelpelærere i matematikktimene. Her kan du
              enkelt søke om å få studenter til å hjelpe og motivere elevene i
              dine timer.`}
            </p>
            <Divider />
            <br />
            <p>
              {`Vektorprogrammet er Norges største organisasjon som arbeider for å
              øke interessen for matematikk og realfag blant elever i
              grunnskolen. Vi er en studentorganisasjon som sender ut dyktige og
              motiverte studenter til ungdomsskoler i Norge.`}
            </p>
            <br />
            <img
              src="/images/teacher2.png"
              alt="Teacher"
              className="mx-auto w-1/2 flex-wrap items-center justify-center gap-5 md:flex-nowrap md:justify-between md:gap-14"
            />
            <br />
            <p>
              {`Studentene fungerer som lærerens assistenter og kan dermed bidra
              til at elevene raskere får hjelp i timen, og at undervisningen
              blir mer tilpasset de ulike elevgruppene. Vi har erfart at lærerne
              ofte har mye å gjøre i timene, og ofte ikke rekker å hjelpe alle
              elevene som står fast. Derfor er vi overbevist om at to
              assistenter kan forhindre mye hodebry for både lærere og elever.`}
            </p>
            <br />
            <p>
              {`Hvert år gjennomfører vi evalueringsundersøkelser, og i
              gjennomsnitt sier over 95% av lærerne at de er fornøyde med
              prosjektet og ønsker å delta videre.`}
            </p>
            <br />
            <p>
              {`Alle assistentene har vært gjennom en intervjuprossess som gjør
              oss sikre på at de vil passe som assistentlærere og kan være gode
              forbilder for elevene. Dette er en unik mulighet til å få inn
              rollemodeller i klasserommet som kan være med å gi elevene mer
              motivasjon.`}
            </p>
            <br />
          </div>
        </div>
      </div>
      <div className="info-background mx-auto mb-20 flex flex-col items-center gap-5 p-5 py-48 text-vektor-bg md:gap-5">
        <h2 className="max-w-3xl text-center font-bold text-2xl text-vektor-bg md:text-4xl">
          {"Enkelt å bruke assistenter i undervisningen"}
        </h2>
        <p className="mt-5 max-w-3xl text-md md:max-w-2xl md:text-xl">
          {
            "Assistentene kan brukes som hjelp i undervisningen. Her er noen forslag vi har gode erfaringer med:"
          }
        </p>
        <div className="md:w-full md:max-w-2xl">
          <ul className="ml-5 list-disc text-md md:text-xl">
            <li className="py-1">
              {"Hjelpe til med oppgaveløsing i klasserom"}
            </li>
            <li className="py-1">
              {"Utfordre de sterkeste elevene med vanskeligere oppgaver"}
            </li>
            <li className="py-1">
              {"Engasjere elever med matteleker, gåter og spill"}
            </li>
            <li className="py-1">{"Arbeid med elever på grupperom"}</li>
          </ul>
        </div>
      </div>
      <section className="mx-auto mt-40 mb-20 flex max-w-80 flex-col items-center gap-10 p-5 md:max-w-none md:gap-10 dark:text-text-dark">
        <div className="flex flex-col gap-3 md:gap-5">
          <h2 className="max-w-3xl text-center font-bold text-2xl text-vektor-DARKblue md:text-4xl dark:text-text-dark">
            {"Søk om å få assistenter til din skole"}
          </h2>
          <p className="max-w-3xl text-md md:text-lg">
            {
              "Ta kontakt med ansvarlig for skolekoordinering i din by for å sende inn en søknad om å få vektorassistenter til din skole."
            }
          </p>
        </div>
        <nav className="flex flex-col md:flex-row">
          {Object.entries(cities)
            .map((city) => {
              const key = city[0];
              const value = city[1];
              return {
                city: value,
                url: href("/kontakt/:department", { department: key }),
              };
            })
            .map(({ city, url }) => {
              return (
                <Button
                  variant="green"
                  className="my-2 min-w-48 px-4 py-2 md:mx-6"
                  key={city}
                  asChild
                >
                  <Link to={url}>{city}</Link>
                </Button>
              );
            })}
        </nav>
        <div>
          <h3 className="max-w-3xl text-center font-bold text-vektor-DARKblue text-xl md:text-2xl dark:text-text-dark">
            {"Har ikke Vektorprogrammet etablert seg i din by enda?"}
          </h3>
          <p className="my-4 max-w-3xl text-md md:text-center md:text-lg">
            {"Ta kontakt med "}
            <Link to={href("/team/hovedstyret")}>
              <span className="hover:underline">{"hovedstyret"}</span>
            </Link>
            {" for å melde din interesse!"}
          </p>
        </div>
      </section>
    </main>
  );
}

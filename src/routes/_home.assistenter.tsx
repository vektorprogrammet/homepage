import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useRef, useState } from "react";
import { getAssistenter } from "~/api/assistenter";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import type { CityPretty } from "~/lib/types";
import { cities } from "~/lib/types";

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function Assistenter() {
  const { title, ingress, cards } = getAssistenter();

  const cardElement = useRef<HTMLDivElement>(null);
  const scrollToCard = () =>
    cardElement.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

  return (
    <div className="mt-10 flex flex-col items-center justify-center font-sans leading-relaxed dark:text-text-dark">
      <h1 className="mx-3 mt-10 max-w-2xl text-center font-bold font-sans text-4xl text-vektor-DARKblue dark:text-text-dark">
        {title}
      </h1>
      <div className="mt-8 mb-20 w-3/5 text-xl">{ingress}</div>
      <div className="mb-14 w-full space-y-20 border-secondary p-10 text-center">
        <div className="conte mx-8 bg-center font-bold font-sans text-secondary dark:text-text-dark">
          Disse avdelingene har opptak nå:
        </div>
        <Button variant="green" onClick={scrollToCard}>
          Scroll ned for å søke!
        </Button>
      </div>
      <div className="info-background mb-16 flex w-full flex-col items-center space-y-10 pt-72 pb-72">
        <div className="w-fit font-bold text-3xl text-accent">
          Hvorfor bli assistent?
        </div>
        <div className="flex justify-evenly space-x-10 text-accent">
          {cards.map(({ title, text, image }) => (
            <div
              key={title}
              className="mx-auto flex w-full flex-wrap justify-between leading-relaxed"
            >
              <div className="max-w-6xl ">
                <img
                  src={image.url.href}
                  alt={image.alt}
                  className="mx-auto mt-6 mb-2 h-24 rounded-lg"
                />
                <div className="p-1 text-center font-bold font-sans text-primary text-xl">
                  {title}
                </div>
                <div className="my-1 text-center font-sans dark:text-text-dark">
                  {text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="mb-16 flex flex-col items-center dark:text-text-dark"
        id="tc"
      >
        <div className="my-2 mb-2 w-fit font-bold text-2xl text-secondary dark:text-text-dark">
          Lærerassistent i matematikk
        </div>
        <div className="mb-4 w-3/5 dark:text-text-dark">
          Vektorprogrammet er en studentorganisasjon som sender realfagssterke
          studenter til grunnskolen for å hjelpe elevene med matematikk i
          skoletiden. Vi ser etter deg som lengter etter en mulighet til å lære
          bort kunnskapene du sitter med og ønsker å ta del i et sterkt sosialt
          fellesskap. Etter å ha vært vektorassistent kommer du til å sitte
          igjen med mange gode erfaringer og nye venner på tvers av trinn og
          linje.
        </div>

        <img
          src="https://vektorprogrammet.no/images/teacher.png?v=1598900041"
          className="mx-auto mt-6 h-80 rounded-lg"
          alt="vektorbilde"
        />
        <div className="mt-4 w-3/5 dark:text-text-dark">
          I tillegg vil du få muligheten til å delta på mange sosiale
          arrangementer, alt fra fest og grilling til go-kart, laser tag og
          spillkvelder. Samtidig arrangerer vi populærforedrag som er til for å
          øke motivasjonen din for videre studier. Vi har hatt besøk av blant
          annet Andreas Wahl, Jo Røislien, Knut Jørgen Røed Ødegaard og James
          Grime.
        </div>
      </div>

      <div className="mb-16 flex flex-col items-center dark:text-text-dark">
        <div className="my-2 mb-3 text-center font-bold text-2xl text-vektor-darblue dark:text-text-dark">
          Arbeidsoppgaver
        </div>

        <div className="w-3/5">
          Som vektorassistent er du ute én dag i uka, i 4 eller 8 uker, på en
          ungdomsskole i nærområdet. Vi tilpasser timeplanen slik at du selv kan
          bestemme hvilken dag som passer best. Vektorassistenter blir sendt ut
          i par, slik at du alltid kan ha noen å støtte deg på. Oppgavene dine
          vil variere fra å gå rundt i klasserommet og hjelpe elever med
          oppgaver, til å gjennomgå utvalgte temaer i mindre grupper. Det er
          læreren som bestemmer hva som skal bli gjennomgått. Dette arbeidet
          blir satt stor pris på av både barn og lærere!
        </div>
      </div>
      <div className="my-8 text-center font-bold text-2xl text-vektor-DARKblue dark:text-text-dark">
        Hvordan blir jeg Vektorassistent?
      </div>
      <div className="flex flex-row space-x-16 dark:text-text-dark">
        <div className="flex-1">
          <ul className="list-disc whitespace-normal leading-loose md:whitespace-pre ">
            <div className="my-3 font-bold text-lg text-vektor-darblue dark:text-text-dark">
              Opptakskrav
            </div>

            <li>Du studerer på høgskole/universitet</li>
            <li>Du har hatt R1/S2 på videregående</li>
            <li>
              Du har tid til å dra til en ungdomsskole én dag i uka (kl. 8-14)
              <br />i en periode på 4 eller 8 uker
            </li>
          </ul>
        </div>

        <div className="flex-2">
          <div className="my-3 font-bold text-lg text-vektor-DARKblue dark:text-text-dark">
            Opptaksprosessen
          </div>
          <ol className="list-decimal whitespace-normal leading-loose md:whitespace-pre">
            <li>
              Vektorprogrammet tar opp nye assistenter i starten av hvert
              semester
            </li>
            <li>Send inn søknad fra skjemaet lengre ned på denne siden</li>
            <li>Møt opp på intervju slik at vi kan bli bedre kjent med deg</li>
            <li>
              Dra på et gratis forberedelseskurs arrangert av Vektorprogrammet
            </li>
            <li>
              Få tildelt en ungdomsskole som du og din vektorpartner skal dra
              til
            </li>
          </ol>
        </div>
      </div>

      <div className="mt-16 mb-8 font-bold text-3xl text-vektor-DARKblue dark:text-text-dark">
        Søk nå!
      </div>

      <div className="mb-16 h-full" ref={cardElement}>
        {" "}
        {/* ikke helt dynamisk høyde her */}
        <Citycard />
      </div>
      <div className="mb-16 font-bold text-vektor-DARKblue">
        Har du noen spørsmål? Sjekk ut ofte stilte spørsmål og svar.
      </div>
    </div>
  );
}

function Citycard() {
  const [openTab, setOpenTab] = useState<CityPretty>("Trondheim");
  const [position, setPosition] = React.useState("bottom");
  function Tab({
    city,
    onTabClick,
    open,
  }: {
    onTabClick: () => void;
    city: CityPretty;
    open: boolean;
  }) {
    const chosenStyle = open
      ? "tab-active dark:text-vektor-darblue"
      : "text-vektor-darblue dark:text-gray-300";
    return (
      <button
        type="button"
        className={`tab tab-lifted w-1/3 border-white font-bold text-base dark:hover:bg-neutral-700 ${chosenStyle}`}
        onClick={onTabClick}
        data-toggle="tab"
      >
        {city}
      </button>
    );
  }
  return (
    <Tabs
      defaultValue={Object.values(cities)[0]}
      className="h-full sm:w-[200px] lg:w-[600px]"
    >
      <TabsList className={"grid w-full grid-cols-3"}>
        {/* Eventuelt dynamisk antall kolonner med ${Object.keys(Cities).length}` */}
        {Object.values(cities).map((city) => (
          <TabsTrigger className="w-full" key={city} value={city}>
            {city}
          </TabsTrigger>
        ))}
      </TabsList>
      {Object.values(cities).map((city) => (
        <TabsContent value={city} key={city}>
          <Card>
            <CardHeader>
              <CardTitle>{city}</CardTitle>
              <CardDescription>Søknadsfrist: ???</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="fornavn">Fornavn</Label>
                <Input id="fornavn" defaultValue="Ola" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="etternavn">Etternavn</Label>
                <Input id="etternavn" defaultValue="Nordmann" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">E-post</Label>
                <Input id="email" defaultValue="Skriv inn epost" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Telefonnummer</Label>
                <Input id="phone" defaultValue="Skriv inn telefonnummer" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="study">Studieretning</Label>
                <Input
                  id="study"
                  defaultValue="Bruk forkortelsen, f.eks. MTDT"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="gender">Kjønn</Label>
                <Select>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue className="w-full" placeholder="Velg kjønn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Mann</SelectItem>
                    <SelectItem value="female">Kvinne</SelectItem>
                    <SelectItem value="other">Annet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="grade">Årstrinn</Label>
                <Select>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue
                      className="w-full"
                      placeholder="Velg årstrinn"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="firstGrade">1. klasse</SelectItem>
                    <SelectItem value="secondGrade">2. klasse</SelectItem>
                    <SelectItem value="thirdGrade">3. klasse</SelectItem>
                    <SelectItem value="fourthGrade">4. klasse</SelectItem>
                    <SelectItem value="fifthGrade">5. klasse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-[150px]">Søk nå!</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}

function NoApplyCard({ cities }: { cities: CityPretty }) {
  return (
    <form>
      <h1 className="my-8 font-bold text-vektor-darblue text-xl"> {cities}</h1>

      <div className="mt-3 block">
        <Input className="form-input inline-flex items-center border-2 border-grey border-solid">
          E-post
        </Input>
      </div>

      <div className="block">
        <div className="mt-2">
          <div className="inline-flex items-center text-left">
            <div className="flex items-center space-x-2">
              <Checkbox id="reminder" />
              <label
                htmlFor="reminder"
                className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Få påminnelse når opptaket starter
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex ">
        <div className="flex items-center" />
      </div>

      <button
        type="submit"
        className="m-8 rounded border border-blue-700 bg-vektor-darkblue px-4 py-2 font-bold text-white hover:bg-vektor-blue"
      >
        Send
      </button>
    </form>
  );
}

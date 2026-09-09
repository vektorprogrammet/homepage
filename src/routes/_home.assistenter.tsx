import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { TabsContent } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router";
import { getAssistenter } from "~/api/assistenter";
import { getAssistantFaqs } from "~/api/faq";
import { Divider } from "~/components/divider";
import { TabMenu } from "~/components/tab-menu";
import { Button } from "~/components/ui/button";
import { type City, type CityPretty, cities } from "~/lib/types";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { ArrowRight, CalendarDays, Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import React from "react";
import { studyOptions } from "~/lib/studies";

const studies = studyOptions.map((value) => ({ value, label: value }));

/* Placeholder values for application period until it can retrieve it from the database. Will be removed by a logic test checking whether the current date is between the RecruitmentStartDate and RecruitmentStopDate for the current semester and chosen city, or not. */
const cityApplicationOpen: Record<City, boolean> = {
  trondheim: true,
  bergen: false,
  aas: false,
};

/* Should be updated when cityApplicationOpen is changed. */
const isApplicationOpen = (cityPretty: CityPretty) => {
  // convert pretty label back to the City key
  const cityKey = (Object.keys(cities) as Array<City>).find(
    (key) => cities[key] === cityPretty,
  );
  return cityKey ? cityApplicationOpen[cityKey] : false;
};

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function Assistenter() {
  const { title, ingress, cards } = getAssistenter();

  const cardElement = useRef<HTMLDivElement>(null);
  const scrollToCard = () =>
    cardElement.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

  const assistantFaqs = getAssistantFaqs();

  return (
    <div className="mt-20 mb-20 flex w-full flex-col items-center gap-10 self-center pt-5 pb-5 font-sans leading-relaxed dark:text-text-dark">
      <div className="flex max-w-full flex-col gap-3 md:gap-5">
        <h1 className="max-w-3xl text-center font-bold text-2xl text-vektor-DARKblue md:text-4xl dark:text-text-dark">
          {title}
        </h1>
        <p className="max-w-3xl p-5 text-md md:text-lg">{ingress}</p>
        <div className="w-full space-y-20 border-secondary p-10 text-center">
          <div className="mx-8 bg-center font-bold font-sans text-vektor-DARKblue dark:text-text-dark">
            {"Disse avdelingene har opptak nå: "}
          </div>
          <Button variant="green" onClick={scrollToCard}>
            {"Scroll ned for å søke!"}
          </Button>
        </div>
      </div>
      {/* upper end */}
      {/* middle start */}
      <div className="info-background mb-0 flex w-full max-w-full flex-col flex-wrap items-center justify-center gap-24 pt-96 pb-96 text-center md:mt-20 md:gap-40 md:pt-72 md:pb-72">
        <div className="w-fit font-bold text-3xl text-accent">
          {"Hvorfor bli assistent?"}
        </div>
        <div className="info-background flex w-full flex-wrap items-center justify-center gap-10 text-center md:flex-row">
          {cards.map(({ title, text, image }) => (
            <div
              key={title}
              className="flex w-full max-w-xs flex-col gap-5 text-vektor-bg md:w-1/3"
            >
              <div>
                <img
                  src={image.url.href}
                  alt={image.alt}
                  className="mx-auto mt-6 mb-2 h-24 rounded-lg"
                />
                <div className="p-1 text-center font-bold font-sans text-secondary text-xl">
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
      {/* middle end */}
      <div className="mb-16 flex flex-col items-center dark:text-text-dark">
        <div className="my-2 mb-2 w-fit font-bold text-2xl text-vektor-DARKblue dark:text-text-dark">
          {"Lærerassistent i matematikk"}
        </div>
        <div className="max-w-3xl p-5 text-md md:text-lg dark:text-text-dark">
          {`Vektorprogrammet er en studentorganisasjon som sender realfagssterke
          studenter til grunnskolen for å hjelpe elevene med matematikk i
          skoletiden. Vi ser etter deg som lengter etter en mulighet til å lære
          bort kunnskapene du sitter med og ønsker å ta del i et sterkt sosialt
          fellesskap. Etter å ha vært vektorassistent kommer du til å sitte
          igjen med mange gode erfaringer og nye venner på tvers av trinn og
          linje.`}
        </div>

        <img
          src="https://vektorprogrammet.no/images/teacher.png?v=1598900041"
          className="mx-auto mt-6 h-80 rounded-lg"
          alt="vektorbilde"
        />
        <div className="max-w-3xl p-5 text-md md:text-lg dark:text-text-dark">
          {`I tillegg vil du få muligheten til å delta på mange sosiale
          arrangementer, alt fra fest og grilling til go-kart, laser tag og
          spillkvelder. Samtidig arrangerer vi populærforedrag som er til for å
          øke motivasjonen din for videre studier. Vi har hatt besøk av blant
          annet Andreas Wahl, Jo Røislien, Knut Jørgen Røed Ødegaard og James
          Grime.`}
        </div>
      </div>
      <Divider />
      <div className="mb-16 flex flex-col items-center dark:text-text-dark">
        <div className="my-2 mb-3 text-center font-bold text-2xl text-vektor-darblue dark:text-text-dark">
          {"Arbeidsoppgaver"}
        </div>

        <div className="max-w-3xl p-5 text-md md:text-lg">
          {`Som vektorassistent er du ute én dag i uka, i 4 eller 8 uker, på en
          ungdomsskole i nærområdet. Vi tilpasser timeplanen slik at du selv kan
          bestemme hvilken dag som passer best. Vektorassistenter blir sendt ut
          i par, slik at du alltid kan ha noen å støtte deg på. Oppgavene dine
          vil variere fra å gå rundt i klasserommet og hjelpe elever med
          oppgaver, til å gjennomgå utvalgte temaer i mindre grupper. Det er
          læreren som bestemmer hva som skal bli gjennomgått. Dette arbeidet
          blir satt stor pris på av både barn og lærere!`}
        </div>
      </div>
      <Divider />
      <div className="mx-auto w-4/5">
        <div className="my-8 text-center font-bold text-2xl text-vektor-DARKblue dark:text-text-dark">
          {"Hvordan blir jeg Vektorassistent?"}
        </div>

        <div className="flex flex-col space-y-8 md:flex-row md:space-x-16 md:space-y-0 dark:text-text-dark">
          {/* Left section */}
          <div className="flex-1">
            <ul className="list-disc whitespace-normal px-4 leading-loose md:px-0">
              <div className="my-3 font-bold text-lg text-vektor-darblue dark:text-text-dark">
                {"Opptakskrav"}
              </div>

              <li>{"Du studerer på høgskole/universitet"}</li>
              <li>{"Du har hatt R1/S2 på videregående"}</li>
              <li>
                {
                  "Du har tid til å dra til en ungdomsskole én dag i uka (kl. 8-14)"
                }
                <br />
                {"i en periode på 4 eller 8 uker"}
              </li>
            </ul>
          </div>

          {/* Right section */}
          <div className="flex-1">
            <div className="my-3 font-bold text-lg text-vektor-DARKblue dark:text-text-dark">
              {"Opptaksprosessen"}
            </div>
            <ol className="list-decimal whitespace-normal px-4 leading-loose md:px-0">
              <li>
                {
                  "Vektorprogrammet tar opp nye assistenter i starten av hvert semester"
                }
              </li>
              <li>
                {"Send inn søknad fra skjemaet lengre ned på denne siden"}
              </li>
              <li>
                {"Møt opp på intervju slik at vi kan bli bedre kjent med deg"}
              </li>
              <li>
                {
                  "Dra på et gratis forberedelseskurs arrangert av Vektorprogrammet"
                }
              </li>
              <li>
                {
                  "Få tildelt en ungdomsskole som du og din vektorpartner skal dra til"
                }
              </li>
            </ol>
          </div>
        </div>
      </div>
      <Divider />
      <div className="mt-16 mb-8 font-bold text-3xl text-vektor-DARKblue dark:text-text-dark">
        {"Søk nå!"}
      </div>
      <div className="mb-16 h-full w-full px-5" ref={cardElement}>
        <CityTabs city="Trondheim" />
      </div>
      <Divider />

      {/* FAQ Section */}
      <div className="flex w-4/5 max-w-4xl flex-col items-center gap-10 self-center dark:text-text-dark">
        <h2 className="w-full text-center font-bold text-2xl text-vektor-DARKblue md:text-4xl dark:text-text-dark">
          {"Ofte stilte spørsmål"}
        </h2>

        <div className="flex w-full flex-col items-center">
          <Accordion type="single" collapsible className="w-full">
            {assistantFaqs.map(({ question, answer }) => (
              <AccordionItem key={question} value={question}>
                <AccordionTrigger>
                  <p className="text-left">{question}</p>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-left">{answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
function CityTabs({ city }: { city: CityPretty }) {
  const [active, setActive] = useState<CityPretty>(city);

  return (
    <div className="relative mx-auto w-full max-w-6xl" role="tablist">
      <div className="mb-5 w-full lg:absolute lg:top-0 lg:left-0 lg:mb-0 lg:w-36">
        <TabMenu
          className="w-full"
          tabs={Object.values(cities)}
          activeTab={active}
          setActiveTab={setActive}
        />
      </div>
      <div className="mx-auto w-full min-w-0 max-w-3xl">
        <CityApplyCard city={active} />
      </div>
    </div>
  );
}

function CityApplyCard({ city }: { city: CityPretty }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const openNow = isApplicationOpen(city);

  return (
    <Tabs value={city} className="w-full">
      <TabsContent value={city} key={city} className="mt-0">
        <Card className="overflow-hidden border-0 bg-vektor-darkblue text-white shadow-[0_20px_55px_-24px_rgba(2,35,70,0.7)]">
          <div className="h-2 bg-vektor-blue" aria-hidden="true" />
          <CardHeader className="space-y-3 px-5 pt-8 text-center sm:px-8 sm:pt-10">
            <p className="font-semibold text-sm text-vektor-blue uppercase tracking-[0.16em]">
              Ny søknad
            </p>
            <CardTitle className="text-2xl text-white md:text-3xl">
              Vektorassistent i {city}
            </CardTitle>
          </CardHeader>
          {openNow /* CardContent when the application period for the current city is closed */ ? (
            <>
              <CardDescription className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 md:text-base">
                <CalendarDays className="h-4 w-4 text-vektor-blue" />
                Søknadsfrist publiseres snart
              </CardDescription>
              <CardContent className="px-5 pb-8 text-white sm:px-8">
                <form
                  id="assistant-application-form"
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <div className="space-y-2">
                    <Label htmlFor="fornavn" className="text-base text-white">
                      Fornavn
                    </Label>
                    <Input
                      id="fornavn"
                      name="firstName"
                      autoComplete="given-name"
                      placeholder="Ola"
                      maxLength={100}
                      required
                      className="h-12 rounded-lg border-white/15 bg-white text-base text-gray-950 placeholder:text-gray-500 focus-visible:ring-vektor-blue"
                      onChange={(e) => {
                        const cleanedValue = e.target.value.replace(
                          /[^a-zA-ZæøåÆØÅ\s-]/g,
                          "",
                        );
                        e.target.value = cleanedValue;
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="etternavn" className="text-base text-white">
                      Etternavn
                    </Label>
                    <Input
                      id="etternavn"
                      name="lastName"
                      autoComplete="family-name"
                      placeholder="Nordmann"
                      maxLength={100}
                      required
                      className="h-12 rounded-lg border-white/15 bg-white text-base text-gray-950 placeholder:text-gray-500 focus-visible:ring-vektor-blue"
                      onChange={(e) => {
                        const cleanedValue = e.target.value.replace(
                          /[^a-zA-ZæøåÆØÅ\s-]/g,
                          "",
                        );
                        e.target.value = cleanedValue;
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base text-white">
                      E-post
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="navn@eksempel.no"
                      maxLength={100}
                      required
                      className="h-12 rounded-lg border-white/15 bg-white text-base text-gray-950 placeholder:text-gray-500 focus-visible:ring-vektor-blue"
                      onChange={(e) => {
                        const cleanedValue = e.target.value.replace(
                          /[^a-zA-Z0-9@._-]/g, // allows letters, numbers, @, dot, underscore, and dash
                          "",
                        );
                        e.target.value = cleanedValue;
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base text-white">
                      Telefonnummer
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="12345678"
                      maxLength={8}
                      required
                      className="h-12 rounded-lg border-white/15 bg-white text-base text-gray-950 placeholder:text-gray-500 focus-visible:ring-vektor-blue"
                      onChange={(e) => {
                        const cleanedValue = e.target.value.replace(
                          /[^0-9]/g,
                          "",
                        );
                        e.target.value = cleanedValue;
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="study" className="text-base text-white">
                      Studieretning
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          id="study"
                          type="button"
                          variant="outline"
                          aria-expanded={open}
                          className="h-12 w-full justify-between rounded-lg border-white/15 bg-white px-3 font-normal text-gray-950 text-sm hover:bg-gray-50 hover:text-gray-950 focus-visible:ring-vektor-blue"
                        >
                          {value
                            ? studies.find((studies) => studies.value === value)
                                ?.label
                            : "Velg studieretning"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                        <Command>
                          <CommandInput placeholder="Finn studieretning" />
                          <CommandList>
                            <CommandEmpty>
                              Fant ikke studieretningen.
                            </CommandEmpty>
                            <CommandGroup>
                              {studies.map((studies) => (
                                <CommandItem
                                  key={studies.value}
                                  value={studies.value}
                                  onSelect={(currentValue) => {
                                    setValue(
                                      currentValue === value
                                        ? ""
                                        : currentValue,
                                    );
                                    setOpen(false);
                                  }}
                                >
                                  {studies.label}
                                  <Check
                                    className={cn(
                                      value === studies.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-base text-white">
                      Kjønn
                    </Label>
                    <Select name="gender">
                      <SelectTrigger
                        id="gender"
                        className="h-12 rounded-lg border-white/15 bg-white text-gray-950 focus:ring-vektor-blue"
                      >
                        <SelectValue placeholder="Velg kjønn" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Mann</SelectItem>
                        <SelectItem value="female">Kvinne</SelectItem>
                        <SelectItem value="other">Annet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 sm:col-span-2 sm:max-w-[calc(50%-0.625rem)]">
                    <Label htmlFor="grade" className="text-base text-white">
                      Årstrinn
                    </Label>
                    <Select name="grade">
                      <SelectTrigger
                        id="grade"
                        className="h-12 rounded-lg border-white/15 bg-white text-gray-950 focus:ring-vektor-blue"
                      >
                        <SelectValue placeholder="Velg årstrinn" />
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
                </form>
              </CardContent>
              <CardFooter className="flex flex-col items-center border-white/10 border-t bg-black/10 px-5 py-6 text-white sm:px-8">
                <Button
                  type="submit"
                  form="assistant-application-form"
                  variant="green"
                  className="group h-12 w-full rounded-lg font-semibold shadow-black/15 shadow-lg sm:w-auto sm:min-w-56"
                >
                  Send søknad
                  <ArrowRight
                    className="transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
                <p className="mt-5 text-center text-sm text-white/75 sm:text-base">
                  Har du vært vektorassistent tidligere?{" "}
                  <RouterLink
                    to="/eksisterendeopptak"
                    className="font-semibold text-vektor-blue underline-offset-4 hover:underline"
                  >
                    Logg inn for å søke på nytt
                  </RouterLink>
                  .
                </p>
              </CardFooter>
            </>
          ) : (
            /* CardContent when the application period for the current city is closed */
            <CardContent className="flex w-full flex-col items-center px-5 pt-2 pb-10 text-white sm:px-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-vektor-blue/20 text-vektor-blue">
                <CalendarDays className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="mx-auto max-w-xl text-center text-base text-white/80 md:text-lg">
                Søknadsperioden for {city} er dessverre stengt for semesteret.
                Vennligst kom tilbake senere for oppdateringer om fremtidige
                søknadsperioder.
              </p>
            </CardContent>
          )}
        </Card>
      </TabsContent>
    </Tabs>
  );
}

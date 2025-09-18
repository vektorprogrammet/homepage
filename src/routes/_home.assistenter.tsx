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
import { getAssistenter } from "~/api/assistenter";
import { getAssistantFaqs } from "~/api/faq";
import { Divider } from "~/components/divider";
import { TabMenu } from "~/components/tab-menu";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { type CityPretty, cities } from "~/lib/types";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { studyOptions } from "~/lib/studies";

const studies = studyOptions.map((value) => ({ value, label: value }));

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
      <div className="mb-16 h-full s:w-[100%] md:w-[75%]" ref={cardElement}>
        {" "}
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
    <div
      className="items-center justify-center sm:w-[100%] sm:min-w-[300px] md:w-auto"
      role="tablist"
    >
      <div className="md:absolute md:left-10">
        <TabMenu
          className="w-full md:w-auto"
          tabs={Object.values(cities)}
          activeTab={active}
          setActiveTab={setActive}
        />
      </div>
      <div className="mx-auto flex w-[100%] max-w-[800px] items-center justify-center md:w-[70%]">
        {<CityApplyCard city={active} />}
      </div>
    </div>
  );
}

function CityApplyCard({ city }: { city: CityPretty }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <Tabs value={city} className="space-y- w-[300px] md:w-[90%]">
      <TabsContent value={city} key={city} className="">
        <Card className="bg-vektor-darkblue">
          <CardHeader className=" text-white">
            <CardTitle className="flex items-center justify-center">
              {city}
            </CardTitle>
            <CardDescription className=" flex items-center justify-center text-white">
              Søknadsfrist: ???
            </CardDescription>
          </CardHeader>
          <CardContent className=" space-y-3 text-white">
            <div className="flex w-full flex-col md:flex-row md:space-x-4">
              <div className="w-full space-y-1 md:w-1/2">
                <Label htmlFor="fornavn">Fornavn</Label>
                <Input className="text-black" id="fornavn" placeholder="Ola" />
              </div>
              <div className="w-full space-y-1 md:w-1/2">
                <Label htmlFor="etternavn">Etternavn</Label>
                <Input
                  id="etternavn"
                  className="text-black"
                  placeholder="Nordmann"
                />
              </div>
            </div>
            <div className="flex w-full flex-col md:flex-row md:space-x-4">
              <div className="w-full space-y-1 md:w-1/2">
                <Label htmlFor="email">E-post</Label>
                <Input
                  id="email"
                  placeholder="Skriv inn epost"
                  className="text-black"
                />
              </div>
              <div className="w-full space-y-1 md:w-1/2">
                <Label htmlFor="phone">Telefonnummer</Label>
                <Input
                  id="phone"
                  placeholder="Skriv inn telefonnummer"
                  className="text-black"
                />
              </div>
            </div>
            <div className="flex w-full flex-col md:flex-row md:space-x-4">
              <div className="w-full space-y-1 md:w-1/2">
                <Label htmlFor="fornavn">Studieretning</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full rounded-md border border-gray-300 text-left text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {value
                        ? studies.find((studies) => studies.value === value)
                            ?.label
                        : "Velg studieretning"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full">
                    <Command>
                      <CommandInput
                        placeholder="Finn studiekode"
                        className=""
                      />
                      <CommandList>
                        <CommandEmpty>Studiekode ikke funnet.</CommandEmpty>
                        <CommandGroup>
                          {studies.map((studies) => (
                            <CommandItem
                              key={studies.value}
                              value={studies.value}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value ? "" : currentValue,
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
              <div className="w-full space-y-1 md:w-1/2">
                <div className="flex w-full flex-col md:flex-row md:space-x-4">
                  <div className="w-full space-y-1 md:w-1/2">
                    <Label htmlFor="gender">Kjønn</Label>
                    <Select>
                      <SelectTrigger className="w-full text-black">
                        <SelectValue
                          className="w-full"
                          placeholder="Velg kjønn"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Mann</SelectItem>
                        <SelectItem value="female">Kvinne</SelectItem>
                        <SelectItem value="other">Annet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full space-y-1 md:w-1/2">
                    <Label htmlFor="grade">Årstrinn</Label>
                    <Select>
                      <SelectTrigger className="w-full text-black">
                        <SelectValue
                          className="w-full text-black"
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
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end text-white">
            <Button
              variant="green"
              className="w-[100%] md:w-[48%] lg:w-[22.5%]"
            >
              Søk nå!
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

//! TODO: Remove this component when the form is done
// biome-ignore lint/correctness/noUnusedVariables: Tempoarily ignore for ci/cd
function NoApplyCard({ cities }: { cities: CityPretty }) {
  return (
    <form>
      <h1 className="my-8 font-bold text-vektor-darblue text-xl"> {cities}</h1>
      <div className="mt-3 block">
        <Input className="form-input inline-flex items-center border-2 border-grey border-solid">
          {"E-post"}
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
                {"Få påminnelse når opptaket starter"}
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
        {"Send"}
      </button>
    </form>
  );
}

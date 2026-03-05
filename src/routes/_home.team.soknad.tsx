import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { studyOptions } from "~/lib/studies";
import { cn } from "~/lib/utils";

const studies = studyOptions.map((value) => ({ value, label: value }));

const cityLabels = {
  trondheim: "Trondheim",
  bergen: "Bergen",
  aas: "Ås",
} as const;

const teamLabels: Record<string, string> = {
  styret: "Styret",
  it: "IT",
  evaluering: "Evaluering",
  okonomi: "Økonomi",
  profilering: "Profilering",
  rekruttering: "Rekruttering",
  skolekoordinering: "Skolekoordinering",
  sponsor: "Sponsor",
  sosialt: "Sosialt",
  "sponsor-okonomi": "Sponsor og Økonomi",
  "evaluering-rekruttering-profilering":
    "Evaluering, Rekruttering og Profilering",
};

/* Placeholder values until application status can be fetched from backend. */
const applicationOpenByCityAndTeam: Record<string, Record<string, boolean>> = {
  trondheim: {
    styret: false,
    it: true,
    evaluering: false,
    okonomi: false,
    profilering: true,
    rekruttering: false,
    skolekoordinering: false,
    sponsor: false,
  },
  bergen: {
    styret: false,
    skolekoordinering: false,
    rekruttering: false,
  },
  aas: {
    styret: false,
    "sponsor-okonomi": false,
    skolekoordinering: false,
    "evaluering-rekruttering-profilering": false,
    sosialt: false,
  },
};

function normalizeSelection(value: string | null, fallback: string) {
  if (!value) return fallback;
  const normalized = value.trim().toLowerCase();
  return normalized === "ås" ? "aas" : normalized;
}

function formatTeamLabel(team: string) {
  return (
    teamLabels[team] ??
    team
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  );
}

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function TeamApplicationPage() {
  const [grade, setGrade] = useState("firstGrade");
  const [lineOpen, setLineOpen] = useState(false);
  const [lineValue, setLineValue] = useState("");
  const { search } = useLocation();

  // Reads the selected city/team from URL, e.g. /team/soknad?city=trondheim&team=it
  const searchParams = new URLSearchParams(search);
  const selectedCity = normalizeSelection(
    searchParams.get("city"),
    "trondheim",
  );
  const selectedTeam = normalizeSelection(
    searchParams.get("team"),
    "profilering",
  );
  const selectedCityLabel =
    cityLabels[selectedCity as keyof typeof cityLabels] ?? selectedCity;
  const selectedTeamLabel = formatTeamLabel(selectedTeam);
  const isApplicationOpen =
    applicationOpenByCityAndTeam[selectedCity]?.[selectedTeam] ?? false;

  return (
    <section className="mx-auto mb-20 w-full max-w-5xl px-4">
      <h2 className="text-center font-bold text-3xl text-vektor-DARKblue md:text-4xl">
        {"Søk team-verv"}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-md md:text-lg">
        {
          "Fyll ut skjemaet under for å søke om å bli med i et team i Vektorprogrammet."
        }
      </p>
      <p className="mx-auto mt-2 max-w-2xl text-center text-slate-700 text-sm md:text-base">
        {`Valgt avdeling: ${selectedCityLabel} • Valgt team: ${selectedTeamLabel}`}
      </p>

      {isApplicationOpen ? (
        <form className="mx-[clamp(1rem,4vw,3rem)] mt-8 space-y-5 rounded-xl border border-vektor-darkblue bg-vektor-darkblue p-6 text-white shadow-lg md:p-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fornavn">{"Fornavn"}</Label>
              <Input
                id="fornavn"
                name="fornavn"
                placeholder="Ola"
                className="text-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="etternavn">{"Etternavn"}</Label>
              <Input
                id="etternavn"
                name="etternavn"
                placeholder="Nordmann"
                className="text-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">{"Email"}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="navn@eksempel.no"
                className="text-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{"Telefon"}</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Skriv inn telefonnummer"
                className="text-black"
                maxLength={8}
                onChange={(e) => {
                  const cleanedValue = e.target.value.replace(/[^0-9]/g, "");
                  e.target.value = cleanedValue;
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade">{"Årstrinn"}</Label>
            <input type="hidden" name="grade" value={grade} />
            <Select defaultValue={grade} onValueChange={setGrade}>
              <SelectTrigger id="grade" className="w-full text-black">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="firstGrade">{"1. klasse"}</SelectItem>
                <SelectItem value="secondGrade">{"2. klasse"}</SelectItem>
                <SelectItem value="thirdGrade">{"3. klasse"}</SelectItem>
                <SelectItem value="fourthGrade">{"4. klasse"}</SelectItem>
                <SelectItem value="fifthGrade">{"5. klasse"}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="line">{"Linje"}</Label>
            <input type="hidden" name="line" value={lineValue} />
            <Popover open={lineOpen} onOpenChange={setLineOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  aria-expanded={lineOpen}
                  className="w-full justify-between border-gray-300 bg-white text-left font-normal text-black hover:bg-gray-100"
                >
                  {lineValue
                    ? studies.find((study) => study.value === lineValue)?.label
                    : "Velg studieretning"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                  <CommandInput
                    placeholder="Finn studiekode"
                    className="text-black"
                  />
                  <CommandList>
                    <CommandEmpty>{"Studiekode ikke funnet."}</CommandEmpty>
                    <CommandGroup>
                      {studies.map((study) => (
                        <CommandItem
                          key={study.value}
                          value={study.value}
                          onSelect={(currentValue) => {
                            setLineValue(
                              currentValue === lineValue ? "" : currentValue,
                            );
                            setLineOpen(false);
                          }}
                        >
                          {study.label}
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              lineValue === study.value
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
            <Label htmlFor="aboutYourself">{"Skriv litt om deg selv"}</Label>
            <Textarea
              id="aboutYourself"
              name="aboutYourself"
              placeholder="Fortell litt om bakgrunnen din og hva du liker å jobbe med."
              rows={6}
              className="text-black"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivation">
              {"Skriv kort om din motivasjon for vervet"}
            </Label>
            <Textarea
              id="motivation"
              name="motivation"
              placeholder="Hvorfor ønsker du dette vervet?"
              rows={6}
              className="text-black"
            />
          </div>

          <Button
            type="submit"
            variant="green"
            className="mt-8 w-full text-base uppercase"
          >
            {"Send"}
          </Button>
        </form>
      ) : (
        <div className="mx-[clamp(1rem,4vw,3rem)] mt-8 rounded-xl border border-vektor-darkblue bg-vektor-darkblue p-6 text-center text-white shadow-lg md:p-8">
          <h3 className="font-bold text-2xl md:text-3xl">
            {"Søknadsskjema stengt"}
          </h3>
          <p className="mt-3 text-lg">
            {`Søknad for ${selectedTeamLabel} i ${selectedCityLabel} er stengt akkurat nå.`}
          </p>
          <p className="mt-2 text-slate-200">
            {"Prøv igjen senere eller kontakt teamleder for mer informasjon."}
          </p>
        </div>
      )}
    </section>
  );
}

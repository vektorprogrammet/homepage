import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { getDepartmentOptions } from "~/api/queries/department-queries";
import { getTeamOptions } from "~/api/queries/team-queries";
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

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function TeamApplicationPage() {
  const [grade, setGrade] = useState("firstGrade");
  const [lineOpen, setLineOpen] = useState(false);
  const [lineValue, setLineValue] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const {
    data: departments = [],
    isPending: departmentsPending,
    isError: departmentsError,
  } = useQuery(getDepartmentOptions());

  const {
    data: teamOverviews = [],
    isFetching: teamsFetching,
    isError: teamsError,
  } = useQuery(getTeamOptions());

  const availableTeams = teamOverviews.filter(
    ({ team }) =>
      team.departmentId === Number(selectedDepartmentId) &&
      team.name !== "Hovedstyret" &&
      team.name !== "Styret",
  );

  const teamsLoading = teamsFetching && teamOverviews.length === 0;

  return (
    <section className="mx-auto mb-20 w-full max-w-5xl px-4">
      <h2 className="text-center font-bold text-3xl text-vektor-DARKblue md:text-4xl">
        {"Søk team-verv"}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-md md:text-lg">
        {
          "Fyll ut skjemaet under for å søke om å bli med i et team i Vektorprogrammet!"
        }
      </p>

      <form
        onSubmit={(event) => event.preventDefault()}
        className="mx-[clamp(1rem,4vw,3rem)] mt-8 space-y-5 rounded-xl border border-vektor-darkblue bg-vektor-darkblue p-6 text-white shadow-lg md:p-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="department">Avdeling</Label>
            <Select
              name="department"
              value={selectedDepartmentId}
              onValueChange={(departmentId) => {
                setSelectedDepartmentId(departmentId);
                setSelectedTeamId("");
              }}
              disabled={departmentsPending || departmentsError}
              required
            >
              <SelectTrigger
                id="department"
                className="w-full bg-white text-black data-[placeholder]:text-gray-500"
              >
                <SelectValue
                  placeholder={
                    departmentsPending
                      ? "Henter avdelinger ..."
                      : "Velg avdeling"
                  }
                />
              </SelectTrigger>

              <SelectContent className="bg-white text-vektor-darkblue">
                {departments.map((department) => (
                  <SelectItem
                    key={department.id}
                    value={String(department.id)}
                  >
                    {department.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {departmentsError && (
              <p role="alert" className="text-sm">
                Kunne ikke hente avdelingene. Prøv igjen senere.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="team">Team</Label>
            <Select
              name="team"
              value={selectedTeamId}
              onValueChange={setSelectedTeamId}
              disabled={!selectedDepartmentId || teamsLoading || teamsError}
              required
            >
              <SelectTrigger
                id="team"
                className="w-full bg-white text-black data-[placeholder]:text-gray-500"
              >
                <SelectValue
                  placeholder={
                    selectedDepartmentId
                      ? teamsLoading
                        ? "Henter team ..."
                        : "Velg team"
                      : "Velg avdeling først"
                  }
                />
              </SelectTrigger>

              <SelectContent className="bg-white text-vektor-darkblue">
                {availableTeams.map(({ team }) => {
                  const deadline = team.deadline
                    ? new Date(team.deadline)
                    : null;

                  const isOpen =
                    team.acceptApplication &&
                    deadline !== null &&
                    deadline.getTime() >= Date.now();

                  const deadlineLabel = deadline?.toLocaleDateString(
                    "nb-NO",
                    {
                      day: "numeric",
                      month: "long",
                    },
                  );

                  return (
                    <SelectItem
                      key={team.id}
                      value={String(team.id)}
                      disabled={!isOpen}
                    >
                      {team.name} —{" "}
                      {isOpen ? `frist ${deadlineLabel}` : "opptak stengt"}
                    </SelectItem>
                  );
                })}{" "}
              </SelectContent>
            </Select>

            {teamsError && (
              <p role="alert" className="text-sm">
                Kunne ikke hente teamene. Prøv igjen senere.
              </p>
            )}
          </div>
        </div>
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
                const cleanedValue = e.target.value.replaceAll(/\D/g, "");
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
              <SelectItem value="firstGrade">{"1. årstrinn"}</SelectItem>
              <SelectItem value="secondGrade">{"2. årstrinn"}</SelectItem>
              <SelectItem value="thirdGrade">{"3. årstrinn"}</SelectItem>
              <SelectItem value="fourthGrade">{"4. årstrinn"}</SelectItem>
              <SelectItem value="fifthGrade">{"5. årstrinn"}</SelectItem>
              <SelectItem value="sixthOrMore">{"6. årstrinn eller mer"}</SelectItem>
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
    </section>
  );
}

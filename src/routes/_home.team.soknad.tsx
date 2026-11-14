import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { href, Link, useSearchParams } from "react-router";
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
  const [searchParams] = useSearchParams();
  const handledSearch = useRef<string | null>(null);
  const search = searchParams.toString();
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
    isFetched: teamsFetched,
  } = useQuery(getTeamOptions());

  const availableTeams = teamOverviews.filter(
    ({ team }) =>
      team.departmentId === Number(selectedDepartmentId) &&
      team.name !== "Hovedstyret" &&
      team.name !== "Styret",
  );

  useEffect(() => {
    if (
      departmentsPending ||
      departmentsError ||
      !teamsFetched ||
      teamsError ||
      handledSearch.current === search
    ) {
      return;
    }

    const params = new URLSearchParams(search);

    const department = departments.find(
      (item) => String(item.id) === params.get("department"),
    );

    const team = teamOverviews.find(
      (item) => String(item.team.id) === params.get("team"),
    )?.team;

    const isValid =
      department !== undefined &&
      team !== undefined &&
      team.departmentId === department.id &&
      team.name !== "Hovedstyret" &&
      team.name !== "Styret" &&
      team.acceptApplication &&
      team.deadline !== null &&
      new Date(team.deadline).getTime() >= Date.now();

    handledSearch.current = search;

    if (isValid && department && team) {
      setSelectedDepartmentId(String(department.id));
      setSelectedTeamId(String(team.id));
    } else {
      setSelectedDepartmentId("");
      setSelectedTeamId("");
    }
  }, [
    search,
    departments,
    departmentsPending,
    departmentsError,
    teamOverviews,
    teamsFetched,
    teamsError,
  ]);

  const teamsLoading = teamsFetching && teamOverviews.length === 0;

  const selectedDepartment = departments.find(
    (department) => String(department.id) === selectedDepartmentId,
  );

  const overviewUrl = selectedDepartment
    ? href("/team/:department", {
      department: selectedDepartment.slug,
    })
    : href("/team");

  return (
    <section className="mx-auto mb-20 w-full max-w-5xl px-4">
      <div className="mb-4 flex justify-center md:justify-start">
        <Link
          to={overviewUrl}
          preventScrollReset
          className="inline-flex items-center gap-2 rounded-md px-2 py-2 font-medium text-sm text-vektor-darkblue transition-colors hover:text-vektor-blue hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vektor-darkblue dark:text-white"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
          Tilbake til teamoversikten
        </Link>
      </div>
      <div className="mx-[clamp(1rem,4vw,3rem)] mt-8 overflow-hidden rounded-lg bg-vektor-darkblue text-white shadow-[0_20px_55px_-24px_rgba(2,35,70,0.7)]">
        <div className="h-2 bg-vektor-blue" aria-hidden="true" />
        <header className="space-y-3 px-5 pt-8 text-center sm:px-8 sm:pt-10">
          <p className="font-semibold text-sm text-vektor-blue uppercase tracking-[0.16em]">
            Ny søknad
          </p>
          <h2 className="font-bold text-2xl text-white md:text-3xl">
            Søk team-verv
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-white/80 sm:text-base">
            Fyll ut skjemaet under for å søke om å bli med i et team i Vektorprogrammet!
          </p>
        </header>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="space-y-5 px-5 pt-6 pb-8 sm:px-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="department">Avdeling</Label>
              <Select
                name="department"
                value={selectedDepartmentId}
                onValueChange={(departmentId) => {
                  if (!departmentId || departmentId === selectedDepartmentId) {
                    return;
                  }

                  handledSearch.current = search;
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
                onValueChange={(teamId) => {
                  if (teamId) {
                    setSelectedTeamId(teamId);
                  }
                }}
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

          <div className="grid grid-cols-1 items-end gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <Label htmlFor="email">{"E-post"}</Label>
                <span id="email-hint" className="text-white/80 text-xs">
                  Helst ikke bruk en skole e-post
                </span>
              </div>
              <Input
                id="email"
                aria-describedby="email-hint"
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
            <Label htmlFor="gender">Kjønn</Label>
            <Select name="gender">
              <SelectTrigger
                id="gender"
                className="w-full bg-white text-black data-[placeholder]:text-gray-500"
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
      </div>
    </section>
  );
}

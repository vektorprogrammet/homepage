import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Eye,
  EyeOff,
  Layers3,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { Link } from "react-router";
import { Divider } from "~/components/divider";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function ExistingRecordingLayout() {
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const showApplication = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsAuthenticated(true);
  };

  return (
    <main className="mt-20 mb-20 flex w-full flex-grow flex-col items-center gap-10 self-center px-5 pt-5 pb-10 font-sans leading-relaxed dark:text-text-dark">
      <div className="flex w-full max-w-3xl flex-col items-center gap-5 text-center">
        <p className="font-bold text-sm text-vektor-darkblue uppercase tracking-[0.18em] dark:text-vektor-blue">
          For tidligere assistenter
        </p>
        <h1 className="font-bold text-3xl text-vektor-DARKblue md:text-4xl dark:text-text-dark">
          {isAuthenticated
            ? "Ny søknad som vektorassistent"
            : "Søk på nytt som vektorassistent"}
        </h1>
        <p className="max-w-2xl text-base text-gray-700 md:text-lg dark:text-gray-200">
          {isAuthenticated
            ? "Fortell oss når du kan delta og hvor lang periode som passer best."
            : "Har du vært vektorassistent før? Logg inn med kontoen din for å åpne søknaden for tidligere assistenter."}
        </p>
        <Divider />
      </div>

      {isAuthenticated ? (
        <PreviousAssistantApplication
          onBack={() => setIsAuthenticated(false)}
        />
      ) : (
        <Card className="w-full max-w-3xl overflow-hidden border-0 bg-vektor-darkblue text-white shadow-[0_20px_55px_-24px_rgba(2,35,70,0.7)]">
          <div className="h-2 bg-vektor-blue" aria-hidden="true" />
          <CardHeader className="space-y-3 px-6 pt-8 text-center sm:px-10 sm:pt-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-vektor-blue/20 text-vektor-blue">
              <LockKeyhole className="h-6 w-6" aria-hidden="true" />
            </div>
            <CardTitle className="text-2xl md:text-3xl">Logg inn</CardTitle>
            <CardDescription className="mx-auto max-w-lg text-base text-white/75">
              Bruk samme e-postadresse som da du søkte sist. Kontakt{" "}
              <a
                href="mailto:webansvarlig@vektorprogrammet.no"
                className="text-vektor-blue hover:underline"
              >
                webansvarlig@vektorprogrammet.no
              </a>{" "}
              hvis du ikke har blitt registrert i systemet vårt.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pt-2 sm:px-10">
            <form
              className="mx-auto max-w-xl space-y-5"
              onSubmit={showApplication}
            >
              <div className="space-y-2">
                <Label
                  htmlFor="existing-email"
                  className="text-base text-white"
                >
                  E-post
                </Label>
                <div className="relative">
                  <Mail
                    className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-4 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Input
                    id="existing-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="navn@eksempel.no"
                    required
                    className="h-12 rounded-lg border-white/15 bg-white pl-12 text-base text-gray-950 placeholder:text-gray-500 focus-visible:ring-vektor-blue"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <Label
                    htmlFor="existing-password"
                    className="text-base text-white"
                  >
                    Passord
                  </Label>
                  <Link
                    to="/kontakt"
                    className="font-medium text-sm text-vektor-blue underline-offset-4 hover:underline"
                  >
                    Glemt passord?
                  </Link>
                </div>
                <div className="relative">
                  <LockKeyhole
                    className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-4 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Input
                    id="existing-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Skriv inn passordet ditt"
                    required
                    className="h-12 rounded-lg border-white/15 bg-white pr-12 pl-12 text-base text-gray-950 placeholder:text-gray-500 focus-visible:ring-vektor-blue"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="-translate-y-1/2 absolute top-1/2 right-2 flex h-9 w-9 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-vektor-DARKblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vektor-blue"
                    aria-label={showPassword ? "Skjul passord" : "Vis passord"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Eye className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="green"
                className="group h-12 w-full rounded-lg font-semibold shadow-black/15 shadow-lg"
              >
                Fortsett til søknaden
                <ArrowRight
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
            </form>
          </CardContent>

          <CardFooter className="mt-2 flex justify-center border-white/10 border-t bg-black/10 px-6 py-5 text-center">
            <p className="text-sm text-white/75 sm:text-base">
              Første gang du søker?{" "}
              <Link
                to="/assistenter"
                className="font-semibold text-vektor-blue underline-offset-4 hover:underline"
              >
                Gå til den ordinære søknaden
              </Link>
            </p>
          </CardFooter>
        </Card>
      )}
    </main>
  );
}

const blockOptions = ["Blokk 1", "Blokk 2", "Begge blokker"];
const weekdays = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag"];
const durationOptions = [
  { value: "4", label: "4 uker" },
  { value: "8", label: "8 uker" },
];

function PreviousAssistantApplication({ onBack }: { onBack: () => void }) {
  const [selectedDays, setSelectedDays] = useState<Array<string>>([]);
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");

  const isComplete =
    selectedBlock !== "" && selectedDays.length > 0 && selectedDuration !== "";

  const toggleDay = (day: string) => {
    setSelectedDays((current) =>
      current.includes(day)
        ? current.filter((selectedDay) => selectedDay !== day)
        : [...current, day],
    );
  };

  return (
    <Card className="w-full max-w-4xl overflow-hidden border-0 bg-white text-vektor-DARKblue shadow-[0_20px_55px_-24px_rgba(2,35,70,0.45)] dark:bg-gray-900 dark:text-white">
      <div className="h-2 bg-vektor-blue" aria-hidden="true" />
      <CardHeader className="space-y-3 bg-vektor-darkblue px-6 pt-8 pb-9 text-center text-white sm:px-10 sm:pt-10">
        <p className="font-semibold text-sm text-vektor-blue uppercase tracking-[0.16em]">
          For tidligere assistenter
        </p>
        <CardTitle className="text-2xl md:text-3xl">
          Velg perioden din
        </CardTitle>
        <CardDescription className="mx-auto max-w-2xl text-base text-white/75">
          Velg alternativene som passer deg.
        </CardDescription>
      </CardHeader>

      <form onSubmit={(event) => event.preventDefault()}>
        <CardContent className="space-y-10 px-5 pt-8 pb-9 sm:px-10 sm:pt-10">
          <fieldset className="space-y-4">
            <legend className="flex items-center gap-3 font-bold text-lg">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-vektor-bg text-vektor-darkblue dark:bg-vektor-blue/15 dark:text-vektor-blue">
                <Layers3 className="h-5 w-5" aria-hidden="true" />
              </span>
              Hvilken blokk ønsker du?
            </legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {blockOptions.map((option) => (
                <label key={option} className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="block"
                    value={option}
                    checked={selectedBlock === option}
                    onChange={() => setSelectedBlock(option)}
                    required
                    className="peer sr-only"
                  />
                  <span className="flex min-h-16 items-center justify-center rounded-xl border-2 border-gray-200 bg-gray-50 px-10 text-center font-semibold transition-all hover:border-vektor-blue hover:bg-vektor-bg/50 peer-checked:border-vektor-darkblue peer-checked:bg-vektor-bg peer-checked:text-vektor-DARKblue peer-checked:ring-4 peer-checked:ring-vektor-blue/35 peer-focus-visible:ring-4 peer-focus-visible:ring-vektor-blue/40 dark:border-gray-700 dark:bg-gray-800 dark:peer-checked:border-vektor-blue dark:peer-checked:bg-vektor-blue/15 dark:peer-checked:text-white dark:hover:border-vektor-blue">
                    {option}
                  </span>
                  <span className="pointer-events-none absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-vektor-darkblue text-white opacity-0 shadow-sm transition-opacity peer-checked:opacity-100 dark:bg-vektor-blue dark:text-vektor-DARKblue">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="flex items-center gap-3 font-bold text-lg">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-vektor-bg text-vektor-darkblue dark:bg-vektor-blue/15 dark:text-vektor-blue">
                <CalendarDays className="h-5 w-5" aria-hidden="true" />
              </span>
              Hvilke dager passer?
            </legend>
            <p
              id="day-help"
              className="text-gray-600 text-sm dark:text-gray-300"
            >
              Velg alle dagene du har mulighet til å være på skolen.
            </p>
            <div
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5"
              aria-describedby="day-help"
            >
              {weekdays.map((day) => (
                <label key={day} className="relative cursor-pointer">
                  <input
                    type="checkbox"
                    name="availableDays"
                    value={day}
                    checked={selectedDays.includes(day)}
                    onChange={() => toggleDay(day)}
                    className="peer sr-only"
                  />
                  <span className="flex min-h-16 items-center justify-center rounded-xl border-2 border-gray-200 bg-gray-50 px-7 text-center font-semibold transition-all hover:border-vektor-blue hover:bg-vektor-bg/50 peer-checked:border-vektor-darkblue peer-checked:bg-vektor-bg peer-checked:text-vektor-DARKblue peer-checked:ring-4 peer-checked:ring-vektor-blue/35 peer-focus-visible:ring-4 peer-focus-visible:ring-vektor-blue/40 dark:border-gray-700 dark:bg-gray-800 dark:peer-checked:border-vektor-blue dark:peer-checked:bg-vektor-blue/15 dark:peer-checked:text-white dark:hover:border-vektor-blue">
                    {day}
                  </span>
                  <span className="pointer-events-none absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-vektor-darkblue text-white opacity-0 shadow-sm transition-opacity peer-checked:opacity-100 dark:bg-vektor-blue dark:text-vektor-DARKblue">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="flex items-center gap-3 font-bold text-lg">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-vektor-bg text-vektor-darkblue dark:bg-vektor-blue/15 dark:text-vektor-blue">
                <Clock3 className="h-5 w-5" aria-hidden="true" />
              </span>
              Hvor lenge ønsker du å delta?
            </legend>
            <div className="grid max-w-md gap-3 sm:grid-cols-2">
              {durationOptions.map(({ value, label }) => (
                <label key={value} className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="duration"
                    value={value}
                    checked={selectedDuration === value}
                    onChange={() => setSelectedDuration(value)}
                    required
                    className="peer sr-only"
                  />
                  <span className="flex min-h-16 items-center justify-center rounded-xl border-2 border-gray-200 bg-gray-50 px-10 text-center font-semibold transition-all hover:border-vektor-blue hover:bg-vektor-bg/50 peer-checked:border-vektor-darkblue peer-checked:bg-vektor-bg peer-checked:text-vektor-DARKblue peer-checked:ring-4 peer-checked:ring-vektor-blue/35 peer-focus-visible:ring-4 peer-focus-visible:ring-vektor-blue/40 dark:border-gray-700 dark:bg-gray-800 dark:peer-checked:border-vektor-blue dark:peer-checked:bg-vektor-blue/15 dark:peer-checked:text-white dark:hover:border-vektor-blue">
                    {label}
                  </span>
                  <span className="pointer-events-none absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-vektor-darkblue text-white opacity-0 shadow-sm transition-opacity peer-checked:opacity-100 dark:bg-vektor-blue dark:text-vektor-DARKblue">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <aside
            className="rounded-xl border border-vektor-blue bg-vektor-bg p-5 dark:bg-vektor-blue/10"
            aria-live="polite"
          >
            <p className="mb-3 font-bold text-vektor-DARKblue dark:text-white">
              Dine valg
            </p>
            <div className="grid gap-3 text-sm sm:grid-cols-3">
              <SelectionSummary
                label="Blokk"
                value={selectedBlock || "Ikke valgt"}
              />
              <SelectionSummary
                label="Dager"
                value={
                  selectedDays.length > 0
                    ? selectedDays.join(", ")
                    : "Ingen valgt"
                }
              />
              <SelectionSummary
                label="Varighet"
                value={
                  selectedDuration ? `${selectedDuration} uker` : "Ikke valgt"
                }
              />
            </div>
          </aside>
        </CardContent>

        <CardFooter className="flex flex-col-reverse justify-between gap-4 border-gray-200 border-t bg-gray-50 px-5 py-6 sm:flex-row sm:px-10 dark:border-gray-700 dark:bg-gray-800/60">
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            className="w-full text-vektor-darkblue hover:bg-vektor-bg hover:text-vektor-DARKblue sm:w-auto dark:text-white dark:hover:bg-white/10 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Tilbake
          </Button>
          <Button
            type="submit"
            variant="green"
            disabled={!isComplete}
            className="group h-12 w-full rounded-lg font-semibold shadow-black/15 shadow-lg sm:w-auto sm:min-w-56"
          >
            Send søknad
            <ArrowRight
              className="transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function SelectionSummary({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-semibold text-gray-500 text-xs uppercase tracking-wide dark:text-gray-300">
        {label}
      </p>
      <p className="mt-1 font-semibold text-vektor-DARKblue dark:text-white">
        {value}
      </p>
    </div>
  );
}

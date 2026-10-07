import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function LoginLayout() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="relative flex flex-grow items-center justify-center overflow-hidden bg-vektor-bg px-4 pb-20 sm:px-6 md:pt-20 md:pb-24">
      <section className="relative grid w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_70px_-24px_rgba(2,35,70,0.35)] md:min-h-[560px] md:grid-cols-[0.9fr_1.1fr] dark:bg-gray-900">
        <div className="relative hidden overflow-hidden bg-vektor-DARKblue p-10 text-white md:flex md:flex-col lg:p-12">
          <div
            className="-top-16 -right-20 absolute h-64 w-64 rounded-full border-[42px] border-vektor-blue/10"
            aria-hidden="true"
          />
          <img
            src="/images/vektor-logo-white.svg"
            alt="Vektorprogrammet"
            className="relative z-10 w-32"
          />
          <img
            src="/images/TorPekerPåTekst1.png"
            alt="Maskoten Tor peker mot innloggingen"
            className="-right-8 -bottom-16 lg:-right-6 absolute w-[330px] drop-shadow-2xl lg:w-[340px]"
          />
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-16">
          <div className="mb-8 md:hidden">
            <img
              src="/images/vektor-logo.svg"
              alt="Vektorprogrammet"
              className="w-48"
            />
          </div>
          <div className="mb-9">
            <h1 className="font-bold text-3xl text-vektor-DARKblue sm:text-4xl dark:text-white">
              Innlogging
            </h1>
          </div>
          <form className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="font-semibold text-vektor-DARKblue dark:text-gray-100"
              >
                E-post
              </Label>
              <div className="relative">
                <Mail
                  className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-4 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="navn@eksempel.no"
                  required
                  className="h-12 rounded-xl border-gray-200 bg-gray-50 pl-12 text-base focus-visible:border-vektor-blue focus-visible:ring-vektor-blue/30 dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="font-semibold text-vektor-DARKblue dark:text-gray-100"
              >
                Passord
              </Label>
              <div className="relative">
                <LockKeyhole
                  className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-4 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Skriv inn passordet ditt"
                  required
                  className="h-12 rounded-xl border-gray-200 bg-gray-50 pr-12 pl-12 text-base focus-visible:border-vektor-blue focus-visible:ring-vektor-blue/30 dark:border-gray-700 dark:bg-gray-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="-translate-y-1/2 absolute top-1/2 right-2 flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-200/70 hover:text-vektor-DARKblue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vektor-blue dark:hover:bg-gray-700 dark:hover:text-white"
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
            {/* <label className="flex w-fit cursor-pointer items-center gap-3 text-gray-600 text-sm dark:text-gray-300">
              <input
                type="checkbox"
                name="remember"
                className="h-4 w-4 rounded border-gray-300 text-vektor-darkblue accent-vektor-darkblue focus:ring-vektor-blue"
              />
              Husk meg på denne enheten
            </label> */}
            <Button
              type="submit"
              variant="green"
              className="group h-12 w-full rounded-xl font-semibold shadow-lg shadow-vektor-green/20"
            >
              Logg inn
              <ArrowRight
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>
          </form>
          <p className="mt-8 text-center text-gray-500 text-sm dark:text-gray-400">
            Problemer med innlogging?{" "}
            <Link
              to="/kontakt"
              className="font-semibold text-vektor-darkblue underline-offset-4 hover:underline dark:text-vektor-blue"
            >
              Kontakt oss
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

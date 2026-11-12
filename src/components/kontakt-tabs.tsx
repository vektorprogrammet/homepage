import { useQuery } from "@tanstack/react-query";
import { Mail, MapPin, Users } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Link, href, useNavigate } from "react-router";
import type { Department } from "~/api/departments";
import { getDepartmentContactInfo, info } from "~/api/kontakt";
import { getDepartmentOptions } from "~/api/queries/department-queries";
import {
  getContactTeamOptions,
  getHovedstyreMemberOptions,
} from "~/api/queries/kontakt-queries";
import { TabMenu } from "~/components/tab-menu";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { trimTrailingSlashes } from "~/lib/url";

const emailLinkClassName =
  "rounded-sm text-blue-800 underline underline-offset-4 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 dark:text-gray-200 dark:hover:text-white dark:focus-visible:ring-gray-200";

export function ContactTabs({
  departmentSlug,
}: { readonly departmentSlug?: string }) {
  const navigate = useNavigate();
  const {
    data: departments = [],
    isPending,
    isError,
  } = useQuery(getDepartmentOptions());
  const isHovedstyret = departmentSlug === "hovedstyret";
  const department = departmentSlug
    ? departments.find((item) => item.slug === departmentSlug)
    : departments[0];
  if (isPending) return <output>Henter avdelinger …</output>;
  if (isError)
    return <p role="alert">Kunne ikke hente avdelingene. Prøv igjen senere.</p>;
  if (!(isHovedstyret || department)) return <p>Fant ikke avdelingen.</p>;
  const active = isHovedstyret ? "Hovedstyret" : (department?.city ?? "");
  const tabs = [...departments.map((item) => item.city), "Hovedstyret"];

  return (
    <div className="mb-6 flex w-full flex-col items-start md:mb-auto md:max-w-6xl lg:flex-row">
      <div className="mx-auto w-full px-5 sm:w-[440px] md:w-[400px] lg:absolute lg:left-10 lg:w-auto lg:px-0">
        <TabMenu
          className="w-full lg:w-auto"
          tabs={tabs}
          activeTab={active}
          setActiveTab={(city) => {
            const slug =
              city === "Hovedstyret"
                ? "hovedstyret"
                : departments.find((item) => item.city === city)?.slug;
            if (slug)
              navigate(href("/kontakt/:department", { department: slug }));
          }}
        />
      </div>
      <main className="mx-auto mb-6 flex min-h-[500px] w-[calc(100%-1rem)] flex-col items-start overflow-visible break-words rounded-md px-5 pt-0 pb-5 sm:w-[440px] md:w-[400px] lg:w-[480px] xl:w-[920px]">
        <div className="w-full flex-grow">
          <DepartmentCard
            key={isHovedstyret ? "hovedstyret" : department?.id}
            department={isHovedstyret ? undefined : department}
          />
        </div>
      </main>
    </div>
  );
}

function DepartmentCard({ department }: { readonly department?: Department }) {
  const isHovedstyret = department === undefined;
  const [sendStatus, setSendStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const {
    data: teamOverviews = [],
    isPending: teamsPending,
    isError: teamsError,
  } = useQuery(getContactTeamOptions());

  const {
    data: hovedstyreMembers,
    isPending: membersPending,
    isError: membersError,
  } = useQuery({
    ...getHovedstyreMemberOptions(),
    enabled: isHovedstyret,
  });

  const result = department
    ? getDepartmentContactInfo(department, teamOverviews)
    : info("Hovedstyret");
  if (!isHovedstyret && teamsPending)
    return <output>Henter kontaktopplysninger …</output>;
  if (!isHovedstyret && teamsError)
    return <p role="alert">Kunne ikke hente kontaktopplysninger.</p>;

  if (result instanceof Error) return <span>{result.message}</span>;

  async function sendContactForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const replyTo = formData.get("email") as string;
    const about = formData.get("about") as string;
    const message = formData.get("message") as string;

    try {
      setSendStatus("sending");
      const response = await fetch(
        `${trimTrailingSlashes(import.meta.env.VITE_API_URL)}/contact/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            replyTo: replyTo,
            receivingEmail: email,
            about: about,
            text: `Fra: ${name}\n\n${message}`,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Could not send message");
      }

      setSendStatus("success");
    } catch {
      setSendStatus("error");
    }
  }

  const { name, description, email, address, button, openForContact } = result;

  const contacts = isHovedstyret ? hovedstyreMembers : result.contacts;

  const members = isHovedstyret ? hovedstyreMembers.length : result.members;

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-10 sm:p-6 lg:pt-0 xl:grid-cols-2">
        <div className="min-w-0">
          <h3 className="font-bold text-2xl text-blue-800 dark:text-neutral-200">
            {name}
          </h3>
          <div className="text-base">{description}</div>
          {email && (
            <div className="mt-3 flex items-start gap-2 md:mt-5">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-black" />
              <a
                href={`mailto:${email}`}
                className={`${emailLinkClassName} min-w-0 break-words text-left text-sm md:text-base`}
              >
                {email}
              </a>
            </div>
          )}
          {address && (
            <div className="mt-2 flex gap-1 text-sm">
              <MapPin className="h-5 w-5 text-black" />
              <span>
                <a
                  className="hover:underline"
                  href="https://maps.app.goo.gl/qQAVLGGFnzMo721g6"
                  target="_blank"
                  rel="noreferrer"
                >
                  {address}
                </a>
              </span>
            </div>
          )}
          {members && (
            <div className="flex gap-1 whitespace-nowrap text-sm">
              <Users className="h-5 w-5 text-black" />
              <span>{`${members} medlemmer`}</span>
            </div>
          )}
          {button && (
            <div className="py-5">
              <Button
                asChild
                className="bg-vektor-darkblue hover:bg-vektor-blue"
              >
                <Link to="/team/hovedstyret">Les mer om hovedstyret</Link>
              </Button>
            </div>
          )}
        </div>
        <div className="min-w-0 divide-y divide-solid">
          {isHovedstyret && membersPending && <p>Laster medlemmer...</p>}

          {isHovedstyret && membersError && <p>Kunne ikke hente medlemmene.</p>}
          {!isHovedstyret && contacts.length === 0 && (
            <p>
              Kontaktopplysninger er ikke lagt inn for denne avdelingen ennå.
            </p>
          )}
          {contacts.map((contact) => {
            return (
              <div className="mb-3 md:mb-4" key={contact.name}>
                <div className="mt-1">
                  {contact.title && (
                    <span className="text-blue-800 dark:text-gray-200">
                      {contact.title}:{" "}
                    </span>
                  )}
                  <span>{contact.name}</span>
                </div>

                {contact.mail && (
                  <a
                    href={`mailto:${contact.mail}`}
                    className={`${emailLinkClassName} mt-1 block w-fit break-all text-sm md:text-base`}
                  >
                    {contact.mail}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {openForContact && (
        <div className="mx-auto max-w-[600px] dark:bg-neutral-800">
          <div className="pt-10 text-center font-bold text-2xl text-blue-800 dark:text-gray-200">
            {isHovedstyret ? "Kontakt Hovedstyret" : `Kontakt styret i ${name}`}
          </div>
          <form onSubmit={sendContactForm}>
            <div className="mt-7 mb-5 grid xl:grid-cols-2 xl:gap-6">
              <div className="mb-5 md:mb-0">
                <Label htmlFor="name">{"Ditt navn"}</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Skriv inn navn"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">{"Din e-post"}</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Skriv inn epost"
                  required
                />
              </div>
            </div>
            <div className="mb-5">
              <div>
                <Label htmlFor="topic">{"Emne"}</Label>
                <Input
                  id="about"
                  name="about"
                  placeholder="Skriv inn emnet for meldingen"
                  required
                />
              </div>
            </div>
            <div className="mb-5">
              <div>
                <Label htmlFor="message">{"Melding"}</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Skriv inn meldingen din"
                  rows={6}
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                type="submit"
                disabled={sendStatus === "sending"}
                className="bg-vektor-darkblue hover:bg-vektor-blue"
              >
                {sendStatus === "sending" ? "Sender..." : "Send melding"}
              </Button>

              {sendStatus === "success" && (
                <p className="text-green-600">Sendt!</p>
              )}

              {sendStatus === "error" && (
                <p className="text-red-600">
                  Kunne ikke sende epost, prøv igjen senere.
                </p>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
}

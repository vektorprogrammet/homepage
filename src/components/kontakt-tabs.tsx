import { Mail, MapPin, Users } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useOutletContext } from "react-router";
import { sendContactMessage } from "~/api/contact";
import type { TeamInfo } from "~/api/kontakt";
import { TabMenu } from "~/components/tab-menu";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { type DepartmentPretty, departments } from "~/lib/types";

export interface ContactData {
  Trondheim: TeamInfo;
  Bergen: TeamInfo;
  Ås: TeamInfo;
  Hovedstyret: TeamInfo;
}

export function useContactData() {
  return useOutletContext<ContactData>();
}

export function ContactTabs({ department }: { department: DepartmentPretty }) {
  const [active, setActive] = useState<DepartmentPretty>(department);
  const contactData = useContactData();

  return (
    <div className="mb-6 flex flex-col items-start md:mb-auto md:max-w-6xl md:flex-row">
      <div className="md:absolute md:left-10">
        <TabMenu
          className="w-full md:w-auto"
          tabs={Object.values(departments)}
          activeTab={active}
          setActiveTab={setActive}
        />
      </div>
      <main className="mx-auto mb-6 flex h-[500px] w-full flex-col items-start overflow-y-scroll break-words rounded-md px-5 py-5 sm:w-[440px] md:w-[720px] lg:w-[820px] xl:w-[920px]">
        <div className="w-full flex-grow">
          <DepartmentCard info={contactData[active]} />
        </div>
      </main>
    </div>
  );
}

function DepartmentCard({ info }: { info: TeamInfo }) {
  const {
    name,
    description,
    email,
    address,
    members,
    button,
    contacts,
    openForContact,
  } = info;

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-10 sm:p-6 md:grid-cols-2">
        <div className="min-w-0">
          <h3 className="font-bold text-2xl text-blue-800 dark:text-neutral-200">
            {name}
          </h3>
          <div className="text-base">{description}</div>
          <div className="mt-3 flex items-center gap-1 md:mt-8">
            <Mail className="h-5 w-5 text-black" />
            <Button
              onClick={async () => {
                await navigator.clipboard.writeText(email);
              }}
              variant="link"
            >
              {email}
            </Button>
          </div>
          {address && (
            <div className="flex gap-1 text-sm">
              <MapPin className="h-5 w-5 text-black" />
              <span>{address}</span>
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
              <Button className="bg-vektor-darkblue hover:bg-vektor-blue">
                {"Les mer om hovedstyret"}
              </Button>
            </div>
          )}
        </div>
        <div className="min-w-0 divide-y divide-solid">
          {contacts.map((contact) => {
            return (
              <div className="mt-5 py-2" key={contact.name}>
                <div className="text-blue-800 dark:text-gray-200">
                  {contact.name}
                </div>
                <div className="mt-3 flex items-center gap-1 md:mt-8">
                  {contact.title && <span>{contact.title}</span>}
                  <button
                    onClick={async () => {
                      await navigator.clipboard.writeText(contact.mail);
                    }}
                    className="hover:underline"
                    type="button"
                  >
                    {contact.mail}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {openForContact && (
        <ContactForm departmentName={name} departmentId={info.departmentId} />
      )}
    </>
  );
}

function ContactForm({
  departmentName,
  departmentId,
}: {
  departmentName: string;
  departmentId?: number;
}) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!departmentId) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    try {
      await sendContactMessage({
        name: data.get("name") as string,
        email: data.get("email") as string,
        departmentId,
        subject: data.get("subject") as string,
        message: data.get("message") as string,
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mx-auto max-w-[600px] pt-10 text-center">
        <p className="font-bold text-lg text-green-700 dark:text-green-400">
          Meldingen din er sendt!
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[600px] dark:bg-neutral-800">
      <div className="pt-10 text-center font-bold text-2xl text-blue-800 dark:text-gray-200">
        {`Kontakt styret i ${departmentName}`}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-7 mb-6 grid xl:grid-cols-2 xl:gap-6">
          <div>
            <Label htmlFor="contact-name">{"Ditt navn"}</Label>
            <Input
              id="contact-name"
              name="name"
              placeholder="Skriv inn navn"
              required
            />
          </div>
          <div>
            <Label htmlFor="contact-email">{"Din e-post"}</Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              placeholder="Skriv inn epost"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <div>
            <Label htmlFor="contact-subject">{"Emne"}</Label>
            <Input
              id="contact-subject"
              name="subject"
              placeholder="Skriv inn emnet for meldingen"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <div>
            <Label htmlFor="contact-message">{"Melding"}</Label>
            <Textarea
              placeholder="Skriv inn meldingen din"
              rows={6}
              required
              id="contact-message"
              name="message"
            />
          </div>
        </div>
        {status === "error" && (
          <p className="mb-4 text-red-600 dark:text-red-400">
            Kunne ikke sende meldingen. Prøv igjen senere.
          </p>
        )}
        <Button
          type="submit"
          className="bg-vektor-darkblue hover:bg-vektor-blue"
          disabled={status === "sending" || !departmentId}
        >
          {status === "sending" ? "Sender..." : "Send melding"}
        </Button>
      </form>
    </div>
  );
}

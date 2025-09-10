import { Mail, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { info } from "~/api/kontakt";
import { TabMenu } from "~/components/tab-menu";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { type DepartmentPretty, departments } from "~/lib/types";

export function ContactTabs({ department }: { department: DepartmentPretty }) {
  const [active, setActive] = useState<DepartmentPretty>(
    department,
    // ! ugly ass solution
    /*     department === "hovedstyret"
      ? departments.hovedstyret
      : department === "aas"
        ? departments.aas
        : department === "bergen"
          ? departments.bergen
          : "Trondheim", */
    // ! for some reason this doesn't work
    /* department === undefined
      ? "Trondheim"
      : department in Object.keys(departments)
        ? departments[department as keyof typeof departments]
        : "Trondheim", */
  );

  return (
    <div className="mb-6 flex flex-col items-start md:mb-auto md:max-w-6xl md:flex-row">
      <div className="ml-3 w-1/5">
        <TabMenu
          tabs={Object.values(departments)}
          activeTab={active}
          setActiveTab={setActive}
        />
      </div>
      <main className="mx-auto mb-6 flex h-[500px] w-full flex-col items-start overflow-y-scroll break-words rounded-md px-5 py-5 sm:w-[440px] md:w-[720px] lg:ml-16 lg:w-[820px] xl:ml-20 xl:w-[1100px]">
        <div className="flex-grow">
          {<DepartmentCard department={active} />}
        </div>
      </main>
    </div>
  );
}

function DepartmentCard({ department }: { department: DepartmentPretty }) {
  const result = info(department);

  if (result instanceof Error) return <span>{result.message}</span>;

  const {
    name,
    description,
    email,
    address,
    members,
    button,
    contacts,
    openForContact,
  } = result;

  return (
    <>
      <div className="grid grid-cols-1 gap-10 sm:p-6 md:grid-cols-2">
        <div>
          <h3 className="font-bold text-2xl text-blue-800 dark:text-neutral-200">
            {name}
          </h3>
          <div className="text-base">{description}</div>
          <div className="mt-3 flex gap-1 md:mt-8">
            <Mail className="h-5 w-5 text-black" />
            <a
              className="block truncate text-sm hover:underline"
              href={`mailto:${email}`}
            >
              {email}
            </a>
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
        <div className="divide-y divide-solid">
          {contacts.map((contact) => {
            return (
              <div className="mt-5 py-2" key={contact.name}>
                <div className="text-blue-800 dark:text-gray-200">
                  {contact.name}
                </div>
                {contact.title && <span>{contact.title}</span>}
                <a
                  className="block truncate text-sm hover:underline"
                  href={`mailto:${contact.mail}`}
                >
                  {contact.mail}
                </a>
              </div>
            );
          })}
        </div>
      </div>
      {openForContact && (
        <div className="max-w-[600px] dark:bg-neutral-800">
          <div className="pt-10 text-center font-bold text-2xl text-blue-800 dark:text-gray-200">
            {`Kontakt styret i ${name}`}
          </div>
          <form>
            <div className="mt-7 mb-6 grid xl:grid-cols-2 xl:gap-6">
              <div>
                <Label htmlFor="name">{"Ditt navn"}</Label>
                <Input placeholder="Skriv inn navn" required />
              </div>
              <div>
                <Label htmlFor="email">{"Din e-post"}</Label>
                <Input placeholder="Skriv inn epost" required />
              </div>
            </div>
            <div className="mb-6">
              <div>
                <Label htmlFor="topic">{"Emne"}</Label>
                <Input placeholder="Skriv inn emnet for meldingen" required />
              </div>
            </div>
            <div className="mb-6">
              <div>
                <Label htmlFor="message">{"Melding"}</Label>
                <Textarea
                  placeholder="Skriv inn meldingen din"
                  rows={6}
                  required
                  id="message"
                />
              </div>
            </div>
            <Button className="bg-vektor-darkblue hover:bg-vektor-blue">
              {"Send melding"}
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

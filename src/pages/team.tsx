import { Tabs } from "@/components/Tabs";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

const teamInfo = {
  title: "Våre team",
  card: {
    title: "Styre og team",
    text1:
      "Vektorprogrammet er en stor organisasjon med assistenter i 4 norske byer. Vi trenger derfor mange frivillige bak kulissene som kan få hjulene til å gå rundt. Uten Vektorprogrammets 15 team hadde dette aldri gått an! ",
    text2: "Kunne du tenkt deg et team-verv hos oss?",
    text3: "Les mer om de ulike teamene nedenfor!",
    image: {
      url: new URL("https://vektorprogrammet.no/images/departments_map.png"),
      alt: "Team",
    },
  },
};

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function Team() {
  return (
    <div className="mx-auto mt-10 mb-20 flex w-full max-w-6xl flex-col items-center">
      <TeamCard
        key={teamInfo.card.title}
        title={teamInfo.card.title}
        text1={teamInfo.card.text1}
        text2={teamInfo.card.text2}
        text3={teamInfo.card.text3}
        alt={teamInfo.card.image.alt}
        imgPath={teamInfo.card.image.url}
      />
      <h1 className="mx-auto mt-10 mb-10 max-w-lg text-center font-bold text-5xl text-gray-600 dark:text-gray-200">
        {teamInfo.title}
      </h1>
      <TeamTabs
        divisions={[
          { name: "Trondheim", number: 1 },
          { name: "Ås", number: 2 },
          { name: "Bergen", number: 3 },
          { name: "Hovedstyret", number: 4 },
        ]}
      />
    </div>
  );
}

/* Team Card */

const TeamCard = ({
  title,
  text1,
  text2,
  text3,
  alt,
  imgPath,
}: {
  title: string;
  text1: string;
  text2: string;
  text3: string;
  imgPath: URL;
  alt: string;
}) => {
  return (
    <div className="mx-auto flex w-full flex-wrap justify-around">
      <div className="mt-5 flex max-w-6xl flex-col">
        <h1 className="mx-3 font-bold text-4xl text-gray-600 dark:text-gray-200">
          {title}
        </h1>
        <div className="mx-3 mt-4 mb-20 max-w-md text-xl dark:text-gray-300">
          <span className="mb-4">{text1}</span>
          {text2}
          <div className="mt-6">
            <strong>{text3}</strong>
          </div>
        </div>
      </div>
      <div className="relative mt-10">
        <div className="absolute top-20 w-full overflow-visible">
          <svg className="overflow-visible">
            <polyline
              fill="none"
              strokeWidth="2"
              stroke="#2b69b0"
              points="-60,51 30,51 90,101"
            />
          </svg>
        </div>
        <img
          src={imgPath.href}
          alt={alt}
          className="mx-auto mr-25 max-h-80 w-auto max-w-full object-contain"
        />
      </div>
    </div>
  );
};

/* Team Tabs */

interface DivisionList {
  name: string;
  number: number;
}

const TrondheimTab = ({ open }: { open: boolean }) => {
  return (
    <div
      className={`grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 xl:grid-cols-3 ${
        open ? "block" : "hidden"
      }`}
    >
      <Division
        title="Styret"
        text="Ansvarlig for driften av Vektorprogrammet i Trondheim."
        mail="styret.ntnu@vektorprogrammet.no"
        numberOfMembers={9}
        buttonName="Les mer"
        url="trondheim/styret"
      />
      <Division
        title="Evaluering"
        text="Vi sender ut spørreundersøkelser, lager statistikk av dem og skriver så semester- og årsrapporter."
        mail="evaluering.ntnu@vektorprogrammet.no"
        numberOfMembers={5}
        buttonName="Les mer"
        url="trondheim/evaluering"
      />
      <Division
        title="Rekruttering"
        text="I rekruttering jobber vi med å skaffe nye vektorassistenter."
        mail="rekruttering.ntnu@vektorprogrammet.no"
        numberOfMembers={11}
        buttonName="Les mer"
        url="trondheim/rekruttering"
      />
      <Division
        title="Skolekoordinering"
        text="Skolekoordinering fungerer som et bindeledd mellom skolene og vektorassistentene gjennom semesteret."
        mail="skolekoordinering.ntnu@vektorprogrammet.no"
        numberOfMembers={8}
        buttonName="Les mer"
        url="trondheim/skolekoordinering"
      />
      <Division
        title="Sponsor"
        text="Vektorprogrammets bindeledd til næringslivet, samarbeidspartnere og sponsorer."
        mail="sponsor.ntnu@vektorprogrammet.no"
        numberOfMembers={6}
        buttonName="Les mer"
        url="trondheim/sponsor"
      />
      <Division
        title="Økonomi"
        text="Økonomiteamet har ansvaret for Vektorprogrammets økonomi."
        mail="okonomi@vektorprogrammet.no"
        numberOfMembers={9}
        buttonName="Les mer"
        url="trondheim/okonomi"
      />
      <Division
        title="IT"
        text="IT-teamet utvikler og drifter Vektorprogrammets nettside og interne datasystemer."
        mail="it@vektorprogrammet.no"
        numberOfMembers={10}
        buttonName="Les mer"
        url="trondheim/IT"
      />
      <Division
        title="Profilering"
        text="Profileringsteamet jobber for å gjøre Vektorprogrammet mer synlig gjennom sosiale medier."
        mail="profilering.ntnu@vektorprogrammet.no"
        numberOfMembers={7}
        buttonName="Les mer"
        url="trondheim/profilering"
      />
    </div>
  );
};

const AasTab = ({ open }: { open: boolean }) => {
  return (
    <div
      className={`grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 xl:grid-cols-3 ${
        open ? "block" : "hidden"
      }`}
    >
      <Division
        title="Styret"
        text="Ansvarlig for driften av Vektorprogrammet i Ås."
        mail="nmbu@vektorprogrammet.no"
        numberOfMembers={5}
        buttonName="Les mer"
        url="aas/styret"
      />
      <Division
        title="Sponsor"
        text="Har ansvaret for økonomien og sponsorene til Vektorprogrammet Ås."
        mail="sponsor.nmbu@vektorprogrammet.no"
        numberOfMembers={4}
        buttonName="Les mer"
        url="aas/sponsor-okonomi"
      />
      <Division
        title="Skolekoordinering"
        text="Skolekoordinering har ansvaret for kontakten med skolene og organisering av assistentene."
        mail="skolekoordinering.nmbu@vektorprogrammet.no"
        numberOfMembers={5}
        buttonName="Les mer"
        url="aas/skolekoordinering"
      />
      <Division
        title="Evaluering"
        text="Vi rekrutterer nye assistenter, styrer sosiale medier, arrangerer sosiale aktiviteter og følger opp at alle trives i vervet."
        mail="evaluering.nmbu@vektorprogrammet.no"
        numberOfMembers={8}
        buttonName="Les mer"
        url="aas/evaluering-rekruttering-profilering"
      />
      <Division
        title="Sosialt"
        text="Vi arrangerer sosiale arrangementer for assistenter og sørger for at alle trives i vervet."
        mail="sosialt.nmbu@vektorprogrammet.no"
        numberOfMembers={6}
        buttonName="Les mer"
        url="aas/sosialt"
      />
    </div>
  );
};

const BergenTab = ({ open }: { open: boolean }) => {
  return (
    <div
      className={`grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 xl:grid-cols-3 ${
        open ? "block" : "hidden"
      }`}
    >
      <Division
        title="Styret"
        text="Ansvarlig for driften av Vektorprogrammet i Bergen."
        mail="uib@vektorprogrammet.no"
        numberOfMembers={2}
        buttonName="Les mer"
        url="bergen/styret"
      />
      <Division
        title="Skolekoordinering"
        text="Skolekoordinering fungerer som et bindeledd mellom skolene og vektorassistentene gjennom semesteret."
        mail="skolekoordinering.uib@vektorprogrammet.no"
        numberOfMembers={2}
        buttonName="Les mer"
        url="bergen/skolekoordinering"
      />
      <Division
        title="Rekruttering"
        text="I rekruttering jobber vi med å skaffe nye vektorassistenter!"
        mail="rekruttering.uib@vektorprogrammet.no"
        numberOfMembers={2}
        buttonName="Les mer"
        url="bergen/rekruttering"
      />
    </div>
  );
};

const HovedstyretTab = ({ open }: { open: boolean }) => {
  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } flex flex-col md:ml-24 md:max-w-2xl md:flex-row lg:ml-16 xl:ml-auto`}
    >
      <div className="flex-1 object-contain">
        <h1 className="font-bold text-2xl text-gray-600 sm:text-4xl dark:text-gray-200">
          Hovedstyret
        </h1>
        <p className="mt-4 mb-4 text-md sm:text-lg dark:text-gray-300">
          Hovedstyret er det nasjonale styret i vektorprogrammet. De er et
          overordnet organ med ansvar for drifting av hele organisasjonen.
        </p>
        <div className="flex items-center space-x-1">
          <svg
            className="h-4 w-4 text-black dark:text-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <polyline points="3 7 12 13 21 7" />
          </svg>
          <a
            className="truncate text-sm hover:underline dark:text-white"
            href="mailto:hovedstyret@vektorprogrammet.no"
          >
            hovedstyret@vektorprogrammet.no
          </a>
        </div>
        <div className="mt-2 flex items-center space-x-1">
          <svg
            className="h-4 w-4 text-black dark:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <div className="top-0 dark:text-white">{`${8} medlemmer`}</div>
        </div>
        <br />
        <NavLink
          type="button"
          to="/team/hovedstyret"
          className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 transition duration-300 hover:border-transparent hover:bg-blue-500 hover:text-white dark:bg-vektor-darkblue dark:text-white dark:hover:bg-blue-600"
        >
          Les mer om hovedstyret
        </NavLink>
      </div>
      <div className="mt-6 flex max-h-80 items-center justify-center md:col-span-1 md:mt-auto md:p-4">
        <img
          src="https://vektorprogrammet.no/images/HS_22.jpg?v=1664622616"
          alt="Hovedstyret"
          className="max-h-80 object-contain"
        />
      </div>
    </div>
  );
};

const TeamTabs = ({
  divisions,
}: {
  divisions: Array<DivisionList>;
}) => {
  const initialTabState = () => {
    const storedTab = sessionStorage.getItem("teamTab");
    return storedTab ? Number.parseInt(storedTab, 10) : 1;
  };
  const [openTab, setOpenTab] = useState<number>(initialTabState);

  useEffect(() => {
    sessionStorage.setItem("teamTab", openTab.toString());
  }, [openTab]);

  return (
    <div
      className="mb-6 flex max-w-[256px] flex-col items-start sm:max-w-[544px] md:mb-auto md:max-w-6xl md:flex-row"
      role="tablist"
    >
      <div className="md:absolute md:left-3 lg:left-12">
        <Tabs
          divisions={divisions}
          tabstate={openTab}
          setOpenTab={setOpenTab}
        />
      </div>
      <div className="flex w-full max-w-5xl flex-col items-start">
        <TrondheimTab open={openTab === 1} />
        <AasTab open={openTab === 2} />
        <BergenTab open={openTab === 3} />
        <HovedstyretTab open={openTab === 4} />
      </div>
    </div>
  );
};

/* Division */

const Division = ({
  title,
  text,
  mail,
  numberOfMembers,
  buttonName,
  url,
}: {
  title: string;
  text: string;
  mail: string;
  numberOfMembers: number;
  buttonName: string;
  url: string;
}) => {
  const chosenStyle = title === "Styret" ? "w-64" : "w-64";

  return (
    <NavLink
      className={`flex h-48 flex-col justify-between rounded-md bg-vektor-light-blue shadow-md dark:bg-gray-600 dark:text-white ${chosenStyle}`}
      to={`/team/${url}`}
    >
      <div className="h-20 content-center rounded-t-md bg-vektor-blue dark:bg-vektor-darblue">
        <h1 className="text-center font-medium text-lg text-vektor-darblue dark:text-white">
          {title}
        </h1>
      </div>
      <div className="mx-3 my-2 h-full text-sm">
        <p>{text}</p>
      </div>
      <div className="mx-3 flex flex-row content-end space-x-1 text-sm">
        <svg
          className="h-4 w-4 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <div>{`${numberOfMembers} medlemmer`}</div>
      </div>
      <div className="mr-1.5 mb-1.5 flex w-full justify-end self-end">
        <NavLink
          type="button"
          to={`/team/${url}`}
          className="btn btn-success btn-sm rounded-full text-white"
        >
          {buttonName}
        </NavLink>
      </div>
    </NavLink>
  );
};

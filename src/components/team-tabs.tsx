import { useQuery } from "@tanstack/react-query";
import { Mail, Users } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, type To } from "react-router";
import { getTeamOptions } from "~/api/queries/team-queries";
import type { TeamOverview } from "~/api/team";
import { TabMenu } from "~/components/tab-menu";
import { Button } from "~/components/ui/button";
import { type DepartmentPretty, departments } from "~/lib/types";

export function TeamTabs({ department }: { department: DepartmentPretty }) {
  const [activeTab, setActive] = useState<DepartmentPretty>(department);
  const { data: teamOverviews } = useQuery(getTeamOptions());

  return (
    <div
      className="mb-6 flex max-w-[256px] flex-col items-start sm:max-w-[544px] md:mb-auto md:max-w-6xl md:flex-row"
      role="tablist"
    >
      <div className="md:absolute md:left-3 lg:left-12">
        <TabMenu
          tabs={Object.values(departments)}
          activeTab={activeTab}
          setActiveTab={setActive}
        />
      </div>
      <div className="flex w-full max-w-5xl flex-col items-start">
        {activeTab === "Hovedstyret" ? (
          <HovedstyretTab
            overview={teamOverviews.find(
              (teamOverview) => teamOverview.team.name === "Hovedstyret",
            )}
          />
        ) : (
          <TeamTab
            overviews={teamOverviews.filter(
              (teamOverview) =>
                teamOverview.departmentCity === activeTab &&
                teamOverview.team.name !== "Hovedstyret",
            )}
          />
        )}
      </div>
    </div>
  );
}

function HovedstyretTab({ overview }: { overview?: TeamOverview }) {
  return (
    <div className="flex flex-col md:ml-24 md:max-w-2xl md:flex-row lg:ml-16 xl:ml-auto">
      <div className="flex-1 object-contain">
        <h2 className="font-bold text-2xl text-gray-600 sm:text-4xl dark:text-gray-200">
          {overview?.team.name ?? "Hovedstyret"}
        </h2>
        <p className="mt-4 mb-4 text-md sm:text-lg dark:text-gray-300">
          {overview?.team.shortDescription}
        </p>
        <div className="flex items-center space-x-1">
          <Mail className="h-5 w-5 text-black" />
          <a
            className="truncate text-sm hover:underline dark:text-white"
            href={`mailto:${overview?.team.email}`}
          >
            <span>{overview?.team.email}</span>
          </a>
        </div>
        <div className="mt-2 flex items-center space-x-1">
          <Users className="h-5 w-5 text-black" />
          <span>{`${overview?.memberCount ?? "???"} medlemmer`}</span>
        </div>
        <br />
        <NavLink
          type="button"
          to={`/team/${overview?.team.name.toLowerCase()}`}
          className="rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 transition duration-300 hover:border-transparent hover:bg-blue-500 hover:text-white dark:bg-vektor-darkblue dark:text-white dark:hover:bg-blue-600"
          prefetch="intent"
        >
          Les mer
        </NavLink>
      </div>
      <div className="mt-6 flex max-h-80 items-center justify-center md:col-span-1 md:mt-auto md:p-4">
        <img
          src={"https://vektorprogrammet.no/images/HS_22.jpg"}
          alt={overview?.team.name}
          className="max-h-80 object-contain"
        />
      </div>
    </div>
  );
}

function TeamTab({ overviews }: { overviews: Array<TeamOverview> }) {
  return (
    <div className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {overviews.map((overview) => (
        <Division
          key={overview.team.id}
          title={overview.team.name}
          text={overview.team.shortDescription}
          mail={overview.team.email}
          numberOfMembers={overview.memberCount}
          buttonName="Les mer"
          url={`/team/${overview.departmentCity === "Ås" ? "aas" : overview.departmentCity}/${overview.team.name === "Økonomi" ? "okonomi" : overview.team.name}`.toLowerCase()}
        />
      ))}
    </div>
  );
}

/* Division */

function Division({
  title,
  text,
  numberOfMembers,
  buttonName,
  url,
}: {
  title: string;
  text: string;
  mail: string;
  numberOfMembers: number;
  buttonName: string;
  url: To;
}) {
  return (
    <NavLink
      className={
        "flex h-48 w-64 flex-col justify-between rounded-md bg-vektor-light-blue shadow-md dark:bg-gray-600 dark:text-white"
      }
      to={url}
      prefetch="intent"
    >
      <div className="h-20 content-center rounded-t-md bg-vektor-blue dark:bg-vektor-darblue">
        <h3 className="text-center font-medium text-lg text-vektor-darblue dark:text-white">
          {title}
        </h3>
      </div>
      <div className="mx-3 my-2 h-full text-sm">
        <p>{text}</p>
      </div>
      <div className="mx-3 flex flex-row content-end gap-1 text-sm">
        <Users className="h-5 w-5 text-black" />
        <span>{`${numberOfMembers} medlemmer`}</span>
      </div>
      <div className="mr-1.5 mb-1.5 flex w-full justify-end self-end">
        <Button
          className="overflow-clip rounded-full"
          size="sm"
          variant="green"
          asChild
        >
          <Link to={url} prefetch="intent">
            {buttonName}
          </Link>
        </Button>
      </div>
    </NavLink>
  );
}

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, href } from "react-router";
import { getFullTeamOptions } from "~/api/queries/team-queries";
import { TeamTemplateDescription } from "./team-template-description";

export function TeamTemplate({
  department,
  team,
}: {
  department: string;
  team: string;
}) {
  const {
    data: fullTeam,
    isPending,
    isError,
  } = useQuery(getFullTeamOptions(department, team));

  if (isPending) {
    return <p>Laster teammedlemmer...</p>;
  }

  if (isError) {
    return <p>Kunne ikke hente teammedlemmer.</p>;
  }

  const overviewUrl = team === "hovedstyret"
    ? `${href("/team")}?department=hovedstyret`
    : href("/team/:department", { department });

  return (
    <div className="w-full min-w-0 [overflow-wrap:anywhere]">
      <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <Link
          to={overviewUrl}
          preventScrollReset
          className="inline-flex items-center justify-self-center md:justify-self-start gap-2 rounded-md px-2 py-2 font-medium text-sm text-vektor-darkblue transition-colors hover:text-vektor-blue hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vektor-darkblue dark:text-white"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
          Tilbake til oversikten
        </Link>
        <h1 className="min-w-0 break-words text-center font-bold text-3xl text-vektor-darblue sm:text-4xl md:col-start-2 md:row-start-1">
          {fullTeam.team.name}
        </h1>
      </div>
      <div className="mt-5 text-center font-bold text-base text-vektor-darblue">
        {"Epost: "}
        <a
          className="overflow-hidden break-all font-normal text-base hover:underline"
          href={`mailto:${fullTeam.team.email}`}
        >
          {fullTeam.team.email}
        </a>
      </div>
      <div className="m-3 my-5 text-center font-sans text-vektor-darblue text-xl">
        {fullTeam.team.shortDescription}
      </div>
      <div className="mt-10 mb-10 grid grid-cols-2 justify-items-center gap-x-4 gap-y-8 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-6">
        {fullTeam.members.map((member) => {
          const name = `${member.firstName} ${member.lastName}`.trim();

          return (
            <div key={member.id} className="w-full min-w-0 max-w-40 sm:w-40">
              <div className="max-w-6xl content-center justify-between">
                <img
                  alt={`Bilde av ${name}`}
                  src={
                    member.profilePictureUrl ??
                    "https://vektorprogrammet.no/media/cache/profile_img_small/images/defaultProfile.png"
                  }
                  className="mx-auto mt-6 mb-2 h-32 max-w-full rounded-full object-contain grayscale"
                />
                <div className="mt-3 text-center font-bold font-sans text-vektor-darblue">
                  {name}
                </div>
                <div className="text-center font-sans">
                  {member.teamUserRoleName}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <TeamTemplateDescription descriptionBlocks={fullTeam.team.description} />
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
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

  return (
    <div>
      <h1 className="text-center font-bold text-4xl text-vektor-darblue">
        {fullTeam.team.name}
      </h1>
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
      <div className="mt-10 mb-10 flex flex-wrap justify-center gap-x-6 gap-y-8">
        {fullTeam.members.map((member) => {
          const name = `${member.firstName} ${member.lastName}`.trim();

          return (
            <div key={member.id} className="w-40">
              <div className="max-w-6xl content-center justify-between">
                <img
                  alt={`Bilde av ${name}`}
                  src={
                    member.profilePictureUrl ??
                    "https://vektorprogrammet.no/media/cache/profile_img_small/images/defaultProfile.png"
                  }
                  className="mx-auto mt-6 mb-2 h-32 rounded-full grayscale"
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

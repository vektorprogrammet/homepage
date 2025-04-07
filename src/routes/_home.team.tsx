import { Outlet } from "react-router";
import { getTeam } from "~/api/team";

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function Team() {
  const teamInfo = getTeam();
  return (
    <div className="mx-auto mt-10 mb-20 flex w-full max-w-6xl flex-col items-center">
      <header className="mx-auto flex w-full flex-wrap justify-around">
        <div className="mt-5 flex max-w-6xl flex-col">
          <h2 className="mx-3 font-bold text-4xl text-gray-600 dark:text-gray-200">
            {teamInfo.card.title}
          </h2>
          <div className="mx-3 mt-4 mb-20 max-w-md text-xl dark:text-gray-300">
            <span className="mb-4">{teamInfo.card.text1}</span>
            {teamInfo.card.text2}
            <div className="mt-6">
              <strong>{teamInfo.card.text3}</strong>
            </div>
          </div>
        </div>
        <div className="relative mt-10">
          <div className="absolute top-20 w-full overflow-visible">
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: Decorative icon */}
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
            src={teamInfo.card.image.url.href}
            alt={teamInfo.card.image.alt}
            className="mx-auto mr-25 max-h-80 w-auto max-w-full object-contain"
          />
        </div>
      </header>
      <h1 className="mx-auto mt-10 mb-10 max-w-lg text-center font-bold text-5xl text-gray-600 dark:text-gray-200">
        {teamInfo.title}
      </h1>
      <Outlet />
    </div>
  );
}

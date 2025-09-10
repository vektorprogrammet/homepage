import { Outlet } from "react-router";
import { getKontakt } from "~/api/kontakt";

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function KontaktLayout() {
  const kontaktInfo = getKontakt();
  return (
    <div className="mx-auto mt-10 mb-20 flex max-w-6xl flex-col items-center">
      <header className="mx-auto flex w-full flex-wrap justify-around">
        <div className="mt-5 flex max-w-6xl flex-col">
          <h2 className=" mx-3 font-bold text-4xl text-gray-600 dark:text-gray-200">
            {kontaktInfo.card.title}
          </h2>
          <p className="mx-3 mt-4 mb-20 max-w-md text-xl dark:text-gray-300">
            {kontaktInfo.card.text}
          </p>
        </div>
        <img
          src={kontaktInfo.card.image.url.href}
          alt={kontaktInfo.card.image.alt}
          className="mx-auto mt-5 mr-auto ml-auto w-full max-w-xs rounded-lg sm:mt-8 sm:max-w-sm md:mt-10 md:max-w-md lg:mt-12 lg:max-w-lg xl:mt-16 xl:max-w-xl dark:invert dark:saturate-0"
        />
      </header>
      <h1 className="mx-auto mt-10 mb-10 max-w-lg text-center font-bold text-5xl text-gray-600 dark:text-gray-200">
        {kontaktInfo.title}
      </h1>
      <Outlet />
    </div>
  );
}

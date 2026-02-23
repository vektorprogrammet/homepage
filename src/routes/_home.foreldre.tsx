import { getForeldre } from "@/api/foreldre";
import { useLoaderData } from "react-router";
import { Divider } from "~/components/divider";
import { TextPictureParagraph } from "~/components/text-picture-paragraph";

export async function loader() {
  return await getForeldre();
}

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function ForForeldre() {
  const { title, ingress, cards, bottomText } = useLoaderData<typeof loader>();
  return (
    <div className="mt-20 mb-20 flex max-w-4xl flex-col items-center gap-10 self-center p-5 md:gap-28 dark:text-text-dark">
      <div className="flex max-w-full flex-col gap-3 md:gap-5">
        <h1 className="max-w-3xl text-center font-bold text-2xl text-vektor-DARKblue md:text-4xl dark:text-text-dark">
          {title}
        </h1>
        <p className="max-w-3xl text-md md:text-lg">{ingress}</p>
        <Divider />
      </div>
      {cards.map((card, index) => (
        <TextPictureParagraph
          key={card.title}
          title={card.title}
          text={card.text}
          image={card.image}
          pictureOnLeft={index % 2 === 0}
        />
      ))}
      <p className="max-w-3xl text-md md:text-lg">{bottomText}</p>
    </div>
  );
}

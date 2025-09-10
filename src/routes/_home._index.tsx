import { buttonVariants } from "@/components/ui/button";
import { useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { Link, type To, href } from "react-router";
import { Button } from "~/components/ui/button";
import Abelprisen from "/images/mainPage/sponsor/Abelprisen.png";
import ksBergen from "/images/mainPage/sponsor/KSBergen.png";
import Matematikksenteret from "/images/mainPage/sponsor/Matematikksenteret.png";
import NTNUIE from "/images/mainPage/sponsor/NTNUIE.png";
import NTNUIV from "/images/mainPage/sponsor/NTNUIV.png";
import Samarbeidsforum from "/images/mainPage/sponsor/SamarbeidsForum.png";
import sparebankstiftelsenDnb from "/images/mainPage/sponsor/SparebankstiftelsenDNB.png";
import Tekna from "/images/mainPage/sponsor/Tekna.png";
import UiB from "/images/mainPage/sponsor/UIB.png";
import VisionTech from "/images/mainPage/sponsor/VisionTech.png";
import vektorForsidebilde from "/images/mainPage/vektor-forsidebilde.png";
import vektorLogo from "/images/vektor-logo.svg";

const hovedsponsor = [
  {
    name: "Abelprisen",
    image: Abelprisen,
  },
  {
    name: "Sparebankstiftelsen DNB",
    image: sparebankstiftelsenDnb,
  },
];

const sponsorer = [
  {
    name: "Tekna",
    image: Tekna,
  },
  {
    name: "NTNU - Fakultet for ingeniørvitenskap",
    image: NTNUIV,
  },
  {
    name: "NTNU - Fakultet for informasjonsteknologi og elektronikk",
    image: NTNUIE,
  },
  {
    name: "Samarbeidsforum",
    image: Samarbeidsforum,
  },
  {
    name: "Universitetet i Bergen - Det matematisk-naturvitenskapelige fakultet",
    image: UiB,
  },
  {
    name: "Matematikksenteret",
    image: Matematikksenteret,
  },
  {
    name: "VisionTech",
    image: VisionTech,
  },
  {
    name: "Kulturstyret Bergen",
    image: ksBergen,
  },
];
interface MainPageProps {
  number: number;
  title: string;
  text: string;
  route: {
    path: To;
    text: string;
  };
}

const cards: Array<MainPageProps> = [
  {
    number: 2218,
    title: "Assistenter",
    text: "Over 2218 studenter har hatt et verv som vektorassistent i Vektorprogrammet",
    route: {
      path: href("/assistenter"),
      text: "Les mer om assistenter",
    },
  },
  {
    number: 608,
    title: "I team",
    text: "Over 608 studenter har hatt et verv i et av Vektorprogrammets mange team",
    route: {
      path: href("/team"),
      text: "Les mer om verv i team",
    },
  },
];

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function mainPage() {
  return (
    <main className="flex-grow">
      {/* Use component when the rendered component needs no props */}
      {/* Getting the routes from the defined route file in pages */}
      <div className="bg-vektor-index-blue md:flex md:h-[80vh] md:pt-14">
        {/*Upper start*/}
        <div className="flex w-full flex-col items-center text-center md:h-[26rem] md:w-1/2 md:p-8 lg:h-[31rem] xl:h-[35rem]">
          <img
            className="w-2/4 pt-12 pb-14 md:hidden"
            src={vektorLogo}
            alt="Vektorprogrammet"
          />
          <img
            className="mx-auto my-auto h-full w-full p-5 pt-14 md:mr-0 md:ml-auto md:w-auto md:pt-0"
            src={vektorForsidebilde}
            alt="Vektorprogrammet bildet"
          />
        </div>
        <div className="w-full p-6 text-center md:mt-24 md:mr-auto md:w-1/2 md:p-10 md:text-left">
          <h1 className="mb-4 hidden font-bold text-4xl md:block dark:text-text-dark">
            {"Vektorprogrammet"}
          </h1>
          <div className="mt-6 mb-4 flex justify-center md:block">
            <p className="text-left text-md md:w-4/5 md:text-xl dark:text-text-dark">
              {`- sender studenter til ungdomsskoler for å hjelpe til som lærerens
              assistent i matematikkundervisningen`}
            </p>
          </div>
          <Button variant="green">{"Les mer og bli assistent"}</Button>
        </div>
      </div>
      {/*Upper end*/}
      <div className="info-background mb-0 flex max-w-full flex-row flex-wrap items-center justify-center gap-24 pt-72 pb-72 text-center md:mt-20 md:gap-40">
        {/*Middle start*/}
        {cards.map(({ number, title, text, route }) => (
          <div
            key={title}
            className="flex max-w-96 flex-col gap-5 text-vektor-bg"
          >
            <div>
              <div className="font-bold text-4xl">
                <MotionCounter value={number} />
              </div>
              <p className="text-xl md:text-2xl">{title}</p>
            </div>
            <p className="max-w-80 text-sm md:max-w-96 md:text-xl">{text}</p>
            <div>
              <Link
                to={route.path}
                className={buttonVariants({ variant: "green" })}
                prefetch="intent"
              >
                {route.text}
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/*Middle end*/}
      <div className="flex justify-center">
        <div className="flex max-w-4xl flex-col md:gap-32">
          <div className="flex flex-row flex-wrap justify-around md:justify-between">
            {hovedsponsor.map((sponsor) => (
              <div
                className="flex h-72 w-72 items-center md:h-96 md:w-96"
                key={sponsor.name}
              >
                <img
                  className="h-auto w-auto"
                  src={sponsor.image}
                  alt={sponsor.name}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-row flex-wrap justify-around md:justify-between">
            {sponsorer.map((sponsor) => (
              <div
                className="flex h-36 w-36 items-center md:h-64 md:w-64"
                key={sponsor.name}
              >
                <img
                  className="h-auto w-auto"
                  src={sponsor.image}
                  alt={sponsor.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

// * Inspired by https://github.com/driaug/animated-counter under the Unlicense
function MotionCounter({
  value,
  direction = "up",
  className,
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 80,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value);
    }
  }, [motionValue, isInView, value, direction]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("nb-NO").format(
            Number(latest.toFixed(0)),
          );
        }
      }),
    [springValue],
  );

  return <span className={className} ref={ref} />;
}

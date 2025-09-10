import { TeamTemplate } from "@/components/team-template";

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function Styret() {
  return (
    <div className="mx-auto mt-5 mb-20 flex max-w-screen-lg flex-col">
      <TeamTemplate
        name="Styret"
        mail="styret.ntnu@vektorprogrammet.no"
        text="Ansvarlig for driften av Vektorprogrammet i Trondheim."
        members={[
          {
            name: "David Ramsvik",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/6370f59dcadc0.jpeg",
            role: "Leder",
          },
          {
            name: "Ragna Vårli Håland",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/633f033cb4d48.jpeg",
            role: "Nestleder",
          },
          {
            name: "Hannes Witt",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/634926da1a3a6.jpeg",
            role: "Evaluering",
          },
          {
            name: "Per Hjelle Solheim",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/6172aab7e0211.jpeg",
            role: "Profilering",
          },
          {
            name: "Astrid Bugge",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/63f4de1b4f69f.jpeg",
            role: "Rekruttering",
          },
          {
            name: "Sander Nicolai Andersen",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/63606f1344a57.jpeg",
            role: "Sekretær",
          },
          {
            name: "Tina Jota",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/633f04baf19bc.jpeg",
            role: "Skolekoordinering",
          },
          {
            name: "Ole Gunnar Røsholt Hovland",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/6261456bbbea9.jpeg",
            role: "Sponsor",
          },
          {
            name: "Elise Johnsrud",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/634068f19fa01.jpeg",
            role: "Økonomi",
          },
        ]}
      />

      <div className="m-5 mt-20 text-left font-sans text-black text-lg">
        Styret består av leder, nestleder, sekretær og alle teamlederne. I løpet
        av de ukentlige møtene gjennomgåes ukens og fremtidige saker, som kan
        være alt fra å organisere sosiale aktiviteter til å løse problemer som
        oppstår under driften av Vektorprogrammet i Trondheim. På denne måten
        får alle team oppdatert informasjon om hverandre, slik at effektivt
        sammarbeid muliggjøres.
      </div>
      <div className="m-3">
        {/*! TODO: FIX */}
        {/* biome-ignore lint/a11y/useAltText: Temporary ignore for ci/cd */}
        <img
          src="https://vektorprogrammet.no/images/team_images/Profilering/IMG_6571.jpg"
          className="m-5 mx-auto h-auto content-center sm:max-w-2xl"
        />
      </div>
    </div>
  );
}

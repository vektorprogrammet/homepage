import { TeamTemplate } from "@/components/team-template";

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function Skolekoordinering() {
  return (
    <div className="mx-auto mt-5 mb-20 flex max-w-screen-lg flex-col">
      <TeamTemplate
        name="Skolekoordinering"
        mail="skolekoordinering.uib@vektorprogrammet.no"
        text="Skolekoordinering fungerer som et bindeledd mellom skolene og vektorassistentene gjennom semesteret."
        members={[
          {
            name: "Balder Hopp-Haugstvedt",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img_small/images/Profile%20photos/63d0175742e04.jpeg",
            role: "Leder",
          },
          {
            name: "Hrolfur Olafsson",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img_small/images/Profile%20photos/63d3c8214b847.jpeg",
            role: "Medlem",
          },
          {
            name: "Nicolai Ramsvik Andersen",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img_small/images/Profile%20photos/64f996a5938da.jpeg",
            role: "Medlem",
          },
          {
            name: "Filip Asklien",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img_small/images/Profile%20photos/6432eb2c55a69.jpeg",
            role: "Medlem",
          },
        ]}
      />

      <div className="m-5 mt-20 text-left font-sans text-black text-lg">
        Skolekoordineringsteamet har ansvaret for å fordele vektorassistentene
        på samarbeidsskolene våre, og opprettholde kontakten med disse
        semesteret gjennom. I praksis vil det si å være tilgjengelig på mail,
        skaffe eventuelle vikarer for vektorassistenter som ikke kan møte, og
        videreformidle informasjon. Skulle det oppstå noe vektorassistentene har
        behov for å si i fra om, skal det være lav terskel for å kontakte
        skolekoordineringsteamet.
      </div>
    </div>
  );
}

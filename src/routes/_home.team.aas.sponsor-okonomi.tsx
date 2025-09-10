import { TeamTemplate } from "@/components/team-template";

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function SponsorOkonomi() {
  return (
    <div className="mx-auto mt-5 mb-20 flex max-w-screen-lg flex-col">
      <TeamTemplate
        name="Sponsor og økonomi"
        mail="sponsor.nmbu@vektorprogrammet.no"
        text="Har ansvaret for økonomien og sponsorene til Vektorprogrammet Ås."
        members={[
          {
            name: "Vasilii Anderson",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/644435c0abfa7.jpeg",
            role: "Leder",
          },
          {
            name: "Elinor Smedstad",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/636c0467baba3.jpeg",
            role: "Medlem",
          },
          {
            name: "Kamilla Kleppang",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/636c058bdf4de.jpeg",
            role: "Medlem",
          },
          {
            name: "Iftikhar Amiri",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/defaultProfile.png",
            role: "Medlem",
          },
        ]}
      />

      <div className="m-5 mt-20 text-left font-sans text-black text-lg">
        Teamet har ansvar for å holde oversikt over økonomien til
        Vektorprogrammet på Ås. I tillegg jobber de også med å skaffe sponsorer
        i løpet av semesteret ved å ta kontakt med bedrifter i nærområdet.
      </div>
      <div className="m-3">
        {/*! TODO: FIX */}
        {/* biome-ignore lint/a11y/useAltText: Temporary ignore for ci/cd */}
        <img
          src="https://vektorprogrammet.no/images/team_images/%C3%85s%20h%C3%B8st%202022/okonomi_spons.jpg"
          className="m-5 mx-auto h-auto content-center sm:max-w-2xl"
        />
      </div>
    </div>
  );
}

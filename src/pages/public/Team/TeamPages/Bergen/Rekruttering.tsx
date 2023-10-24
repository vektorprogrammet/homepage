import React from "react";
import TeamTemplate from "../TeamTemplate";

const Rekruttering = (): JSX.Element => {
  return (
    <div className="max-w-screen-lg mt-5 mb-20 mx-auto flex flex-col">
      <TeamTemplate
        name="Rekruttering"
        mail="Rekruttering.uib@vektorprogrammet.no"
        text="I rekruttering jobber vi med å skaffe nye vektorassistenter!"
        members={[
          { name: "Erik Bjordal", image: "https://vektorprogrammet.no/media/cache/profile_img_small/images/Profile%20photos/63d00e000503f.jpeg", role: "Leder" },
          { name: "Emma Karoline Aase Skålevik", image: "https://vektorprogrammet.no/media/cache/profile_img_small/images/Profile%20photos/652a6aa8427cd.jpeg", role: "Medlem" },
          { name: "Hrolfur Olafsson", image: "https://vektorprogrammet.no/media/cache/profile_img_small/images/Profile%20photos/63d3c8214b847.jpeg", role: "Medlem" },
          { name: "Mathias Torstensen", image: "https://vektorprogrammet.no/media/cache/profile_img_small/images/Profile%20photos/64258e1f08402.jpeg", role: "Medlem" },
          { name: "Lukas Reidar Knudsen", image: "https://vektorprogrammet.no/media/cache/profile_img_small/images/Profile%20photos/64187be859f08.jpeg", role: "Medlem" },
          { name: "Yao Yun Jackie Zhang", image: "https://vektorprogrammet.no/media/cache/profile_img_small/images/Profile%20photos/63dad15ab90b2.jpeg", role: "Medlem" },
          { name: "Snorre Thomsen", image: "https://vektorprogrammet.no/media/cache/profile_img_small/images/Profile%20photos/6425847085add.jpeg", role: "Medlem" },
          { name: "Nicolai Ramsvik Andersen", image: "https://vektorprogrammet.no/media/cache/profile_img_small/images/Profile%20photos/64f996a5938da.jpeg", role: "Medlem" },
          { name: "Helle Isaksen", image: "https://vektorprogrammet.no/media/cache/profile_img_small/images/Profile%20photos/63c9b51fb556d.jpeg", role: "Profilering" },
        ]}
      />
      <div className="font-sans text-lg text-black text-left m-5 mt-20">
        I rekrutteringsteamet har vi ansvaret for å skaffe nye og gode
        vektorassistenter. Hovedoppgavene som medlem av rekrutteringsteamet
        består av å stå på stand, bleste i forelesninger og intervjue nye
        søkere. I tillegg har vi også ansvar de sosiale og faglige
        arrangementene vektorprogrammet arrangerer.
      </div>
    </div>
  );
};

export default Rekruttering;

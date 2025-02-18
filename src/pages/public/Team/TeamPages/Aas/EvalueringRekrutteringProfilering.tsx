import TeamTemplate from "../TeamTemplate";

const EvalueringRekrutteringProfilering = () => {
  return (
    <div className="max-w-screen-lg mt-5 mb-20 mx-auto flex flex-col">
      <TeamTemplate
        name="Evaluering, Rekruttering og Profilering"
        mail="evaluering.nmbu@vektorprogrammet.no"
        text="Vi rekrutterer nye assistenter, styrer sosiale medier og sender ut evalueringers-undersøkelser."
        members={[
          {
            name: "Ingrid Iselin Male Østern",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/6443b33e254ba.jpeg",
            role: "Leder",
          },
          {
            name: "Rikke Vegstein",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/defaultProfile.png",
            role: "Profilering",
          },
          {
            name: "Julie Blohm Christensen",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/defaultProfile.png",
            role: "Profilering",
          },
          {
            name: "Aurora Røyseth",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/defaultProfile.png",
            role: "Rekruttering",
          },
          {
            name: "Tina Moen",
            image:
              "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/636c01c40740a.jpeg",
            role: "Rekruttering",
          },
        ]}
      />

      <div className="font-sans text-lg text-black text-start mx-5 mt-20">
        Dette er teamet med de mest varierende arbeidsoppgavene. Teamet har
        ansvar for rekrutteringen av nye assistenter i starten av hvert semester
        ved å arrangere stand, holde infomøte, blestinger og henge opp plakater.
        I tillegg har de ansvar for å sende ut evalueringsskjemaer ved slutten
        av hvert semester og følge opp både ris og ros som kommer inn på disse.
        Teamet styrer også Vektorprogrammet Ås sine sosiale medier, og sørger
        for at organisasjonen er synlige rundt på campus.
      </div>

      <div className="m-3">
        <img
          src="https://vektorprogrammet.no/images/team_images/%C3%85s%20h%C3%B8st%202022/rekruttering.jpg"
          className="sm:max-w-2xl h-auto content-center mx-auto m-5"
        />
      </div>
    </div>
  );
};

export default EvalueringRekrutteringProfilering;

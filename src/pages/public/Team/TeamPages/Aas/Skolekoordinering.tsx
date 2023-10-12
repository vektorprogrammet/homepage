import React from "react";
import TeamTemplate from "../TeamTemplate";

const Skolekoordinering = (): JSX.Element => {
  return (
    <div className="max-w-screen-lg mt-5 mb-20 mx-auto flex flex-col">
      <TeamTemplate
        name="Skolekoordinering"
        mail="skolekoordinering.nmbu@vektorprogrammet.no"
        text="Skolekoordinering har ansvaret for kontakten med skolene og organisering av assistentene."
        members={[{ name: "Ingvild Hefte", image: "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/644435db96beb.jpeg", role: "Leder" },
          { name: "Lars Thomassen", image: "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/62653f9b48d6c.jpeg", role: "Medlem" },
          { name: "Aud Johanne Aaserud", image: "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/636c05bf259ea.jpeg", role: "Medlem" },
          { name: "Boglarka Mate", image: "https://vektorprogrammet.no/media/cache/profile_img/images/defaultProfile.png", role: "Medlem" },
          { name: "Celina Che Phan", image: "https://vektorprogrammet.no/media/cache/profile_img/images/defaultProfile.png", role: "Medlem" },
          { name: "Thilde Marås", image: "https://vektorprogrammet.no/media/cache/profile_img/images/Profile%20photos/6443b4f8aab15.jpeg", role: "Medlem" }]}
      />

      <div className="font-sans text-lg text-black text-start mx-5 mt-20">
        Team skolekoordinering er et bindeledd mellom vektorprogrammet, ungdomsskolene vi samarbeider med og våre assistenter. Gjennom semestert har teamet tett kontakt
        med skolene og assistentene. De har ansvar for å fordele våre assistenter på skolene vi samarbeider med, og har ansvar for å følge opp assistentene underveis i
        perioden de er ute på skolene. I løpet av et semester inngår de samarbeid med skolene og lager timeplan til assistentene. De er tilgjengelig på mail for å formidle
        informasjon mellom vektorproggrammet, samarbeidsskolene og assistentene. De er også med å har intervjuer og står på stand sammen med de andre teamene i
        rekrutteringsperioden. Det skal være lav terskel for vektorassistentene å ta kontakt med en skolekoordinator dersom det er noe de ønsker å si i fra om.
      </div>

      <div className="font-sans text-lg text-black text-start mx-5 mt-5">
        Det er også lagt opp til sosiale arrangementer i løpet av et semester slik at man blir kjent innad i teamet, men også kjent med medlemmene i de andre teamene i
        vektorprogrammet. I eksamensperioden vil det ikke være noen arbeidsoppgaver for noen i vektorprogrammet, så dette er et verv som fint kan kombineres med skole.
      </div>

      <div className="m-3">
        <img
          src="https://vektorprogrammet.no/images/team_images/%C3%85s%20h%C3%B8st%202022/20_g_pp.jpeg"
          className="sm:max-w-2xl h-auto content-center mx-auto m-5"
        />
      </div>
    </div>
  );
};

export default Skolekoordinering;

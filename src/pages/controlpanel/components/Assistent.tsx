import React, { useState } from "react";

  // interface Selected {
  //   aktiveSkoler: boolean;
  //   inaktiveSkoler: boolean;
  // }

const Assistent = (): JSX.Element => {
  const [active, setActive] = useState<boolean>(true);
  const mapToTable = (skoler: School[]) => {
    return skoler.map((school, index) => (
      <tr key={index.valueOf()} className="even:bg-white odd:bg-table-grey">
        <td className="text-center py-3 px-6">{school.name}</td>
        <td className="text-center py-3 px-6">{school.contactPerson}</td>
        <td className="text-center py-3 px-6">{school.email}</td>
        <td className="text-center py-3 px-6">{school.phone}</td>
        <td className="text-center py-3 px-6">{school.language}</td>
      </tr>
    ));
  };

  interface School {
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
    language: string;
  }

  const aktiveSkolerListe: School[] = [
    {
      name: "Amalie Skram",
      contactPerson: "Aaryan",
      email: "Aaryan.er.kul@hotmail.com",
      phone: "12345678",
      language: "Arabisk",
    },
    {
      name: "Blussuvoll",
      contactPerson: "Maurice",
      email: "email@domene.com",
      phone: "12345678",
      language: "Norsk",
    },
    {
      name: "Charlottenlund",
      contactPerson: "Ola",
      email: "email@email.com",
      phone: "12345678",
      language: "Norsk",
    },
  ];

  const inaktiveSkolerListe: School[] = [
    {
      name: "St. Olav VGS",
      contactPerson: "Ola Nordmann",
      email: "testmail@gmail.com",
      phone: "87654321",
      language: "Nynorsk",
    },
  ];

  return (
  <div className="w-screen">
    <div className="pt-10 pr-10 pl-10 mt-50 shadow grid-rows-2 grid-cols-2 flex flex-col items-center">
      <h1 className="text-2xl row-start-1 row-end-1">Assistenter</h1>
      <div className="flex">
        <button
          className={`row-start-2 col-start-1 pr-2 pl-2 pt-8 pb-2 ${
            active ? "border-vektor-blue-hover border-b-4 pb-1" : ""
          }`}
          onClick={() => setActive(true)}
          type="button"
        >
          Assistenter
        </button>
        <button
          className={`row-start-2 col-start-1 pr-2 pl-2 pt-8 pb-2 ${
            !active ? "border-vektor-blue-hover border-b-4 pb-1" : ""
          }`}
          onClick={() => setActive(false)}
          type="button"
        >
          Vikarer
        </button>
      </div>
    </div>
  </div>
  )
}

export default Assistent;
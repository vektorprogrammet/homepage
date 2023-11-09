import react, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const Teammedlemmer = (): JSX.Element => {

  const select = ["Aktive medlemmer", "Inaktive medlemmer", "Søkere"];
  const [selected, setSelected] = useState<string>(select[0]);

  const { id } = useParams();

  const mapToTable = (person: Person[]) => {
    return person.map((person, index) => (
      <tr key={index.valueOf()} className="even:bg-white odd:bg-table-grey">
        <td className="text-center py-3 px-6">{person.name}</td>
        <td className="text-center py-3 px-6">{person.position}</td>
        <td className="text-center py-3 px-6">{person.start}</td>
      </tr>
    ));
  };

  const mapToTableSoker = (soker: Soker[]) => {
    return soker.map((soker, index) => (
      <tr key={index.valueOf()} className="even:bg-white odd:bg-table-grey">
        <td className="text-center py-3 px-6">{soker.name}</td>
        <td className="text-center py-3 px-6">{soker.epost}</td>
      </tr>
    ));
  };

  interface Person {
    name: string;
    position: string;
    start: string;
  }

  interface Soker {
    name: string;
    epost: string;
  }

  const itListe: Person[] = [
    {
      name: "Aaryan Potet",
      position: "IT-leder",
      start: "Vår 2022",
    },
    {
      name: "Filipicus Manus",
      position: "Utvikler",
      start: "Vår 2023",
    },
    {
      name: "OJ Spiderman",
      position: "Utvikler",
      start: "Vår 2023",
    },
  ];

  const inactiveitListe: Person[] = [
    {
      name: "Kaja Potet",
      position: "Utvikler",
      start: "Vår 2023"
    }
  ];

  const sokere: Soker[] = [
    {
      name: "Donald Duck",
      epost: "donald.duck@gmail.com"
    }
  ];

  return (
    <div className="w-full">
      <div className="pt-10 pr-10 pl-10 mt-50 shadow grid-rows-2 grid-cols-2 flex flex-col items-center">
        <h1 className="text-2xl row-start-1 row-end-1">{id}</h1>
        <div className="flex flex-wrap ml-16">
          <Navbar select={select} selected={selected} setSelected={setSelected} />
        </div>
      </div>
      <div className="p-10 flex justify-center items-center ml-6">
        <div className="w-10/12 border-2 mt-100 shadow overflow-x-scroll">
          <table className="w-full">
            <thead>
              {selected === select[2] ?
                <tr className="bg-white">
                  <th className="text-center w-1/5 py-3 px-6 text-vektor-darblue">
                    Navn
                  </th>
                  <th className="text-center w-1/5 py-3 px-6 text-vektor-darblue">
                    Epost
                  </th>
                </tr> :
                 <tr className="bg-white">
                  <th className="text-center w-1/5 py-3 px-6 text-vektor-darblue">
                    Navn
                  </th>
                  <th className="text-center w-1/5 py-3 px-6 text-vektor-darblue">
                    Stilling
                  </th>
                  <th className="text-center w-1/5 py-3 px-6 text-vektor-darblue">
                    Start
                  </th>
                </tr> }
            </thead>
            <tbody>
              {mapToTable(
                (selected === select[0]
                  && itListe)
                || (selected === select[1]
                  && inactiveitListe) || ([]),
              )}
              {mapToTableSoker(
                (selected === select[2]
                  && sokere) || ([]),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Teammedlemmer;
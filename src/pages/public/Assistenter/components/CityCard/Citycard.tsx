import React from "react";
import ApplyReg from "../ApplyReg";

interface TabProps {
  divisions: DivisionList[];
}

interface DivisionList {
  name: string;
  number: number;
}

const Tabs = ({
  divisions,
}:TabProps): JSX.Element => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="w-full flex flex-wrap">
        <div className="w-full">
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" role="tablist">
            {divisions.map((data) => {
              return (
                <li className="-mb-px mr-0 last:mr-0 flex-auto text-center">
                  <a
                    className={`text-base font-bold px-1 py-3 block line leading-normal hover:border-t-2 hover:border-r-2 hover:border-l-2 hover:text-vektor-blue ${openTab === data.number ? `text-vektor-darblue bg-white border-t-2 border-r-2 border-l-2` : `text-vektor-darblue `}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(data.number);
                    }}
                    data-toggle="tab"
                    href={`#link${data.number}`}
                    role="tablist"
                  >
                    <i className="fas fa-space-shuttle text-base mr-1 " />
                    {" "}
                    {data.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border-b-2 border-r-2 border-l-2">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                {divisions.map((data) => {
                  return (
                    <>
                      <div className={openTab === data.number ? "block" : "hidden"} id="link1">
                        <p>
                          <ApplyReg cities={data.name} />
                        </p>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;

/*
const Citycard = () => {
  const [city, setCity] = useState<City>(City.TRONDHEIM);

  return (
    <div className="my-8 flex-col w-screen flex items-center justify-center w-1/2 mx-auto">
      <span className="border-solid border-2 border-vektor-darblue align-items-center">
        <div className="divide-y divide-vektor-darblue bg-white">
          <div className="text-vektor-darblue">

            <span className="flex justify-center">
              {Object.values(City).map((cityValue) => (
                <CityButton
                  onChooseCity={setCity}
                  city={cityValue}
                  isActive={city === cityValue}
                />
              ))}
            </span>
          </div>
          <div className="text-center">

            <ApplyReg cities={city} />
          </div>
        </div>
      </span>
    </div>
  );
};
export default Citycard;
*/

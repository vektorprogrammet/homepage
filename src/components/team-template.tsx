interface Member {
  name: string;
  image: string;
  role: string;
}

export function TeamTemplate({
  name,
  mail,
  text,
  members,
}: {
  name: string;
  mail: string;
  text: string;
  members: Array<Member>;
}) {
  return (
    <div>
      <h1 className="mt-10 text-center font-bold text-4xl text-vektor-darblue">
        {name}
      </h1>
      <div className="mt-5 text-center font-bold text-base text-vektor-darblue">
        {"Epost: "}
        <a
          className="overflow-hidden break-all font-normal text-base hover:underline"
          href={`mailto:${mail}`}
        >
          {mail}
        </a>
      </div>
      <div className="m-3 my-5 text-center font-sans text-vektor-darblue text-xl">
        {text}
      </div>
      <div className="mt-10 flex flex-wrap justify-center">
        {members.map((data) => {
          return (
            <div key={data.image} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
              <div className="max-w-6xl content-center justify-between">
                <img
                  alt={`Bilde av ${data.name}`}
                  src={data.image}
                  className="mx-auto mt-6 mb-2 h-32 rounded-full grayscale"
                />
                <div className="mt-3 text-center font-bold font-sans text-vektor-darblue">
                  {data.name}
                </div>
                <div className="text-center font-sans">{data.role}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

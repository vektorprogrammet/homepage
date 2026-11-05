import type { Components } from "react-markdown";

export const markdownComponents: Components = {
  h1({ children }) {
    return (
      <h1 className="text-center font-sans text-4xl text-vektor-darblue">
        {children}
      </h1>
    );
  },
  h2({ children }) {
    return (
      <h2 className="text-center font-sans text-3xl text-vektor-darblue">
        {children}
      </h2>
    );
  },
  h3({ children }) {
    return (
      <h3 className="font-sans text-2xl text-vektor-darblue">{children}</h3>
    );
  },
  h4({ children }) {
    return (
      <h4 className="font-sans text-vektor-darblue text-xl">{children}</h4>
    );
  },
  h5({ children }) {
    return (
      <h5 className="font-sans font-semibold text-lg text-vektor-darblue">
        {children}
      </h5>
    );
  },
  h6({ children }) {
    return (
      <h6 className="font-sans font-semibold text-vektor-darblue">
        {children}
      </h6>
    );
  },
  p({ children }) {
    return <p className="text-left leading-relaxed">{children}</p>;
  },
  ul({ children }) {
    return <ul className="ml-6 list-disc space-y-2 text-left">{children}</ul>;
  },
  ol({ children }) {
    return (
      <ol className="ml-6 list-decimal space-y-2 text-left">{children}</ol>
    );
  },
  a({ children, href, title }) {
    return (
      <a
        className="text-vektor-darblue hover:underline"
        href={href}
        title={title}
      >
        {children}
      </a>
    );
  },
  img({ alt, src, title }) {
    return (
      <img
        alt={alt ?? ""}
        className="mx-1 inline-block h-auto max-h-96 max-w-full align-middle"
        src={src}
        title={title}
      />
    );
  },
};

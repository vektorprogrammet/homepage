import type { ReactNode } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "~/index.css";
import icon from "/images/vektor-logo-circle.svg";
import logo from "/images/vektor-logo.svg";

export function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href={icon} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#E2F4FA" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://vektorprogrammet.no/" />
        <meta property="og:image" content={logo} />
        <meta
          property="og:description"
          content="Vektorprogrammet er Norges største organisasjon som jobber for å øke interessen for matematikk og realfag blant elever i grunnskolen. Vi sender realfagssterke studenter til barne- og ungdomsskoler hvor de fungerer som lærerens assistent."
        />
        <meta property="og:site_name" content="Vektorprogrammet" />

        <meta
          name="description"
          content="Vektorprogrammet er Norges største organisasjon som jobber for å øke interessen for matematikk og realfag blant elever i grunnskolen. Vi sender realfagssterke studenter til barne- og ungdomsskoler hvor de fungerer som lærerens assistent."
        />

        <link rel="manifest" href="/manifest.json" />
        <title>{"Vektorprogrammet"}</title>
        <Meta />
        <Links />
      </head>
      <body className="bg-vektor-bg">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// biome-ignore lint/style/noDefaultExport: Route Modules require default export https://reactrouter.com/start/framework/route-module
export default function Root() {
  return <Outlet />;
}

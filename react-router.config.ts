import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  ssr: false,
  async prerender({ getStaticPaths }) {
    return [
      "/team/bergen",
      "/team/trondheim",
      "/team/aas",
      "/team/hovedstyret",
      "/kontakt/bergen",
      "/kontakt/trondheim",
      "/kontakt/aas",
      "/kontakt/hovedstyret",
      ...getStaticPaths(),
    ];
  },
} satisfies Config;

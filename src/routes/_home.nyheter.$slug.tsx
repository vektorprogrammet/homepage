import { getArticleBySlug } from "@/api/articles";
import { imageUrl } from "@/api/client";
import { Link, useLoaderData } from "react-router";
import type { Route } from "./+types/_home.nyheter.$slug";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function loader({ params }: Route.LoaderArgs) {
  const article = await getArticleBySlug(params.slug);
  return { article };
}

// biome-ignore lint/style/noDefaultExport: Route Modules require default export
export default function ArticleDetail() {
  const { article } = useLoaderData<typeof loader>();

  if (!article) {
    return (
      <div className="mt-20 mb-20 flex max-w-4xl flex-col items-center gap-10 self-center p-5">
        <Link
          to="/nyheter"
          className="self-start text-vektor-DARKblue hover:underline dark:text-blue-400"
        >
          &larr; Tilbake til nyheter
        </Link>
        <h1 className="font-bold text-2xl text-vektor-DARKblue md:text-4xl dark:text-text-dark">
          Artikkelen ble ikke funnet
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Artikkelen du leter etter finnes ikke eller har blitt fjernet.
        </p>
        <Link
          to="/nyheter"
          className="rounded bg-vektor-DARKblue px-4 py-2 text-white hover:opacity-90"
        >
          Se alle nyheter
        </Link>
      </div>
    );
  }

  const largeImage = imageUrl(article.imageLarge);

  return (
    <div className="mt-20 mb-20 flex max-w-4xl flex-col gap-6 self-center p-5">
      <Link
        to="/nyheter"
        className="self-start text-vektor-DARKblue hover:underline dark:text-blue-400"
      >
        &larr; Tilbake til nyheter
      </Link>

      <header className="flex flex-col gap-3">
        <h1 className="font-bold text-2xl text-vektor-DARKblue md:text-4xl dark:text-text-dark">
          {article.title}
        </h1>
        <time className="text-gray-500 text-sm dark:text-gray-400">
          {formatDate(article.created)}
        </time>
      </header>

      {largeImage && (
        <img
          src={largeImage}
          alt={article.title}
          className="w-full rounded-lg object-cover"
        />
      )}

      <div
        className="prose max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: article.article }}
      />
    </div>
  );
}

import { type Article, getArticles } from "@/api/articles";
import { imageUrl } from "@/api/client";
import { Link, useLoaderData } from "react-router";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function excerpt(html: string, maxLength = 150): string {
  const text = html.replace(/<[^>]*>/g, "").trim();
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

export async function loader() {
  const articles = await getArticles();
  return { articles };
}

function ArticleCard({ article }: { article: Article }) {
  const smallImage = imageUrl(article.imageSmall);

  return (
    <Link
      to={`/nyheter/${article.slug}`}
      className={`flex flex-col gap-4 rounded-lg border p-5 transition-shadow hover:shadow-md sm:flex-row ${
        article.sticky
          ? "border-vektor-DARKblue bg-blue-50 dark:border-blue-400 dark:bg-blue-950"
          : "border-gray-200 dark:border-gray-700"
      }`}
    >
      {smallImage && (
        <img
          src={smallImage}
          alt={article.title}
          className="h-40 w-full rounded object-cover sm:h-32 sm:w-48 sm:shrink-0"
        />
      )}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {article.sticky && (
            <span className="rounded bg-vektor-DARKblue px-2 py-0.5 font-medium text-white text-xs dark:bg-blue-600">
              Festet
            </span>
          )}
          <time className="text-gray-500 text-sm dark:text-gray-400">
            {formatDate(article.created)}
          </time>
        </div>
        <h2 className="font-semibold text-lg text-vektor-DARKblue dark:text-text-dark">
          {article.title}
        </h2>
        <p className="text-gray-600 text-sm dark:text-gray-300">
          {excerpt(article.article)}
        </p>
      </div>
    </Link>
  );
}

// biome-ignore lint/style/noDefaultExport: Route Modules require default export
export default function Nyheter() {
  const { articles } = useLoaderData<typeof loader>();

  if (articles.length === 0) {
    return (
      <div className="mt-20 mb-20 flex max-w-4xl flex-col items-center gap-10 self-center p-5">
        <h1 className="font-bold text-2xl text-vektor-DARKblue md:text-4xl dark:text-text-dark">
          Nyheter
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Ingen nyheter tilgjengelig
        </p>
      </div>
    );
  }

  return (
    <div className="mt-20 mb-20 flex max-w-4xl flex-col items-center gap-10 self-center p-5">
      <h1 className="font-bold text-2xl text-vektor-DARKblue md:text-4xl dark:text-text-dark">
        Nyheter
      </h1>
      <div className="flex w-full flex-col gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

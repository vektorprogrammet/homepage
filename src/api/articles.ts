import { apiFetch } from "./client";

export interface Article {
  id: number;
  title: string;
  slug: string;
  article: string; // HTML content
  imageLarge: string | null;
  imageSmall: string | null;
  created: string; // ISO datetime
  updated: string | null;
  sticky: boolean;
  published: boolean;
}

export async function getArticles(): Promise<Array<Article>> {
  try {
    const articles = await apiFetch<Array<Article>>("/api/articles");
    return articles.filter((a) => a.published);
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return [];
  }
}

export async function getArticleBySlug(
  slug: string,
): Promise<Article | null> {
  try {
    const articles = await getArticles();
    return articles.find((a) => a.slug === slug) ?? null;
  } catch (error) {
    console.error(`Failed to fetch article ${slug}:`, error);
    return null;
  }
}

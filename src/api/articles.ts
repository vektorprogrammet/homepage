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

export async function getArticles(page = 1): Promise<Array<Article>> {
  try {
    return await apiFetch<Array<Article>>(
      `/api/articles?published=true&page=${page}`,
    );
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return [];
  }
}

export async function getArticleBySlug(
  slug: string,
): Promise<Article | null> {
  try {
    const articles = await apiFetch<Array<Article>>(
      `/api/articles?slug=${encodeURIComponent(slug)}&published=true`,
    );
    return articles.length > 0 ? articles[0] : null;
  } catch (error) {
    console.error(`Failed to fetch article ${slug}:`, error);
    return null;
  }
}

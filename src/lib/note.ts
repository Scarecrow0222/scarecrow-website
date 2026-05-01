import { XMLParser } from "fast-xml-parser";

export const DEFAULT_NOTE_RSS_URL = "https://note.com/scarecorow0222/rss";
export const NOTE_RSS_REVALIDATE_SECONDS = 600;

export type NoteArticle = {
  title: string;
  link: string;
  publishedAt: string;
  excerpt: string;
  image?: string;
};

type RssItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
  "media:thumbnail"?: MediaValue;
  "media:content"?: MediaValue;
  enclosure?: { "@_url"?: string };
};

type MediaValue = string | { "@_url"?: string; "#text"?: string };

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_"
});

function asArray<T>(value: T | T[] | undefined): T[] {
  if (!value) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function resolveImageValue(value: MediaValue | undefined): string | undefined {
  if (typeof value === "string") {
    return value.trim() || undefined;
  }

  return value?.["@_url"]?.trim() || value?.["#text"]?.trim();
}

function getImage(item: RssItem): string | undefined {
  return (
    resolveImageValue(item["media:thumbnail"]) ||
    resolveImageValue(item["media:content"]) ||
    item.enclosure?.["@_url"]
  );
}

export function parseNoteRss(xml: string): NoteArticle[] {
  const parsed = parser.parse(xml) as { rss?: { channel?: { item?: RssItem | RssItem[] } } };
  const items = asArray(parsed.rss?.channel?.item);

  return items
    .map((item) => ({
      title: item.title?.trim() || "Untitled",
      link: item.link?.trim() || DEFAULT_NOTE_RSS_URL,
      publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : "",
      excerpt: stripHtml(item.description || "").slice(0, 140),
      image: getImage(item)
    }))
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export async function getNoteArticles(limit?: number): Promise<NoteArticle[]> {
  const rssUrl = process.env.NOTE_RSS_URL || DEFAULT_NOTE_RSS_URL;

  try {
    const response = await fetch(rssUrl, {
      next: { revalidate: NOTE_RSS_REVALIDATE_SECONDS }
    });

    if (!response.ok) {
      return [];
    }

    const articles = parseNoteRss(await response.text());
    return typeof limit === "number" ? articles.slice(0, limit) : articles;
  } catch {
    return [];
  }
}

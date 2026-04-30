import { XMLParser } from "fast-xml-parser";

export const DEFAULT_NOTE_RSS_URL = "https://note.com/scarecorow0222/rss";

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
  "media:thumbnail"?: { "@_url"?: string };
  "media:content"?: { "@_url"?: string };
  enclosure?: { "@_url"?: string };
};

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

function getImage(item: RssItem): string | undefined {
  return (
    item["media:thumbnail"]?.["@_url"] ||
    item["media:content"]?.["@_url"] ||
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
      next: { revalidate: 3600 }
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

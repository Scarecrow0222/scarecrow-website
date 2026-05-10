import { describe, expect, it, vi } from "vitest";
import {
  DEFAULT_NOTE_RSS_URL,
  NOTE_RSS_REVALIDATE_SECONDS,
  getNoteArticles,
  parseNoteRss
} from "./note";

describe("note RSS", () => {
  it("RSSを新しい順に整形し、本文HTMLとエンティティを読みやすい抜粋へ変換する", () => {
    const articles = parseNoteRss(`
      <rss>
        <channel>
          <item>
            <title> 古い記事 </title>
            <link> https://note.com/scarecorow0222/n/old </link>
            <pubDate>Mon, 01 Jan 2024 00:00:00 GMT</pubDate>
            <description><![CDATA[<p>古い&nbsp;本文 &amp; 補足</p>]]></description>
            <media:thumbnail url="https://assets.example/old.jpg" />
          </item>
          <item>
            <title>新しい記事</title>
            <link>https://note.com/scarecorow0222/n/new</link>
            <pubDate>Tue, 02 Jan 2024 00:00:00 GMT</pubDate>
            <description><![CDATA[<p>新しい<br />本文</p>]]></description>
            <media:thumbnail>https://assets.example/new.jpg</media:thumbnail>
          </item>
        </channel>
      </rss>
    `);

    expect(articles.map((article) => article.title)).toEqual(["新しい記事", "古い記事"]);
    expect(articles[0]).toMatchObject({
      excerpt: "新しい 本文",
      image: "https://assets.example/new.jpg"
    });
    expect(articles[1]).toMatchObject({
      excerpt: "古い 本文 & 補足",
      image: "https://assets.example/old.jpg"
    });
  });

  it("必須項目が欠けても既定値で記事として扱う", () => {
    const [article] = parseNoteRss(`
      <rss>
        <channel>
          <item>
            <description>本文だけの記事</description>
          </item>
        </channel>
      </rss>
    `);

    expect(article).toMatchObject({
      title: "Untitled",
      link: DEFAULT_NOTE_RSS_URL,
      publishedAt: "",
      excerpt: "本文だけの記事"
    });
  });

  it("記事取得時にRSS URLと再検証秒数を指定し、limitで件数を絞る", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      text: async () => `
        <rss>
          <channel>
            <item><title>1件目</title><pubDate>Tue, 02 Jan 2024 00:00:00 GMT</pubDate></item>
            <item><title>2件目</title><pubDate>Mon, 01 Jan 2024 00:00:00 GMT</pubDate></item>
          </channel>
        </rss>
      `
    } as Response);

    const articles = await getNoteArticles(1);

    expect(fetchMock).toHaveBeenCalledWith(DEFAULT_NOTE_RSS_URL, {
      next: { revalidate: NOTE_RSS_REVALIDATE_SECONDS }
    });
    expect(articles.map((article) => article.title)).toEqual(["1件目"]);
  });
});

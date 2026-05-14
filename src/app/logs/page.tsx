import Image from "next/image";
import Link from "next/link";
import { getNoteArticles } from "@/lib/note";

export default async function LogsPage() {
  const articles = await getNoteArticles();

  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <div className="intro-scene mb-10" data-reveal>
        <div className="intro-copy">
          <p className="text-sm text-[#d49c5f]">制作メモと考えたこと</p>
          <h1 className="mt-3 font-serif text-4xl text-[#f3e5d0]">Logs</h1>
          <p className="mt-4 max-w-2xl leading-7 text-[#d8c6ad]">
            制作の判断やAIを使った試行錯誤を、夜の作業メモとして残しています。うまくいったことだけでなく、迷ったことも含めて、相談時の考え方が見える場所です。
          </p>
        </div>
        <div className="intro-visual">
          <Image
            src="/images/lanthanum.jpg"
            alt="Lantern artwork"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 320px, 100vw"
          />
        </div>
      </div>
      <div className="mt-8 divide-y divide-[#6f5a42]/35 border-y border-[#6f5a42]/35">
        {articles.length > 0 ? (
          articles.map((article) => (
            <article key={article.link} data-reveal>
              <Link
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-6 transition hover:bg-[#2a2118]/45 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6"
              >
                <div className="note-article-media">
                  <p className="text-xs text-[#b7a58d]">{article.publishedAt.slice(0, 10)}</p>
                  {article.image ? (
                    <div className="relative mt-3 aspect-[16/9] overflow-hidden border border-[#6f5a42]/35">
                      <Image
                        src={article.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 220px, 100vw"
                      />
                    </div>
                  ) : null}
                </div>
                <div>
                  <h2 className="mt-2 font-serif text-2xl text-[#f3e5d0] transition group-hover:text-[#d49c5f] md:mt-0">
                    {article.title}
                  </h2>
                  <p className="mt-3 leading-7 text-[#d8c6ad]">{article.excerpt}</p>
                </div>
              </Link>
            </article>
          ))
        ) : (
          <p className="py-6 text-[#d8c6ad]">
            まだ記事を取得できませんでした。
          </p>
        )}
      </div>
    </section>
  );
}

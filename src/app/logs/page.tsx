import Image from "next/image";
import Link from "next/link";
import { getNoteArticles } from "@/lib/note";

export default async function LogsPage() {
  const articles = await getNoteArticles();

  return (
    <section className="mx-auto max-w-5xl px-5 py-14">
      <div className="intro-scene mb-10">
        <div className="intro-copy">
          <p className="text-sm text-[#d49c5f]">noteの記事</p>
          <h1 className="mt-3 font-serif text-4xl text-[#f3e5d0]">Logs</h1>
          <p className="mt-4 leading-7 text-[#d8c6ad]">
            考えたこと、試したこと、うまくいかなかったことも含めて、
            <br />
            夜の作業メモを積み上げています。
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
            <article key={article.link} className="py-6 md:grid md:grid-cols-[128px_1fr] md:gap-6">
              <p className="text-xs text-[#b7a58d]">{article.publishedAt.slice(0, 10)}</p>
              <h2 className="mt-2 font-serif text-2xl text-[#f3e5d0]">
                <Link href={article.link}>{article.title}</Link>
              </h2>
              <p className="mt-3 leading-7 text-[#d8c6ad] md:col-start-2">{article.excerpt}</p>
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

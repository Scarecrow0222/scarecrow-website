import Image from "next/image";
import Link from "next/link";
import { getNoteArticles } from "@/lib/note";

export default async function LogsPage() {
  const articles = await getNoteArticles();

  return (
    <section className="responsive-section mx-auto max-w-6xl px-5 py-14">
      <div className="intro-scene mb-10" data-reveal>
        <div className="intro-copy">
          <p className="text-sm text-[var(--primary-deep)]">
            制作メモと考えたこと
          </p>
          <h1 className="mt-3 font-serif text-4xl text-[var(--text)]">記事</h1>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
            制作の判断やAIを使った試行錯誤を、制作メモとして残しています。うまくいったことだけでなく、迷ったことも含めて、相談時の考え方が見える場所です。
          </p>
        </div>
        <div className="intro-visual">
          <Image
            src="/images/generated-logs.png"
            alt="制作ログのイメージ"
            fill
            className="object-cover"
            priority
            sizes="(min-width: 768px) 320px, 100vw"
          />
        </div>
      </div>
      <div className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {articles.length > 0 ? (
          articles.map((article) => (
            <article key={article.link} data-reveal>
              <Link
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-6 transition hover:bg-[var(--primary-soft)] md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6"
              >
                <div className="note-article-media">
                  <p className="text-xs text-[var(--muted)]">
                    {article.publishedAt.slice(0, 10)}
                  </p>
                  <div className="relative mt-3 aspect-[16/9] overflow-hidden border border-[var(--border)]">
                    <Image
                      src={article.image || "/images/generated-logs.png"}
                      alt={
                        article.image
                          ? article.title
                          : `${article.title}のログイメージ`
                      }
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 220px, 100vw"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="mt-2 font-serif text-2xl text-[var(--text)] transition group-hover:text-[var(--primary-deep)] md:mt-0">
                    {article.title}
                  </h2>
                  <p className="mt-3 leading-7 text-[var(--muted)]">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            </article>
          ))
        ) : (
          <p className="py-6 text-[var(--muted)]">
            まだ記事を取得できませんでした。
          </p>
        )}
      </div>
    </section>
  );
}

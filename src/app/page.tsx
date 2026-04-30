import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { getNoteArticles } from "@/lib/note";

export default async function HomePage() {
  const articles = await getNoteArticles(3);

  return (
    <>
      <section className="hero-scene mx-auto max-w-6xl overflow-hidden px-5">
        <div className="image-wash" />
        <div className="hero-copy">
          <p className="mb-4 text-sm font-semibold text-[#d49c5f]">AIと共に、静かに作り続ける。</p>
          <h1 className="max-w-xl font-serif text-4xl leading-[1.45] text-[#f3e5d0] md:text-5xl">
            深夜の作業部屋から、
            <br />
            記録を残していく。
          </h1>
          <p className="mt-5 max-w-lg leading-8 text-[#d8c6ad]">
            個人開発の記録、考えたこと、作ったものを静かに積み上げるScarecrowのWebサイトです。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className="border border-[#a87742] bg-[#a87742] px-6 py-3 text-sm font-semibold text-[#1a1816] shadow-[0_0_28px_rgba(168,119,66,0.22)] transition hover:bg-[#c09257]" href="/logs">
              最新のログを見る
            </Link>
            <Link className="border border-[#a87742] bg-[#1a1816]/35 px-6 py-3 text-sm font-semibold text-[#f3e5d0] transition hover:bg-[#a87742]/18" href="/projects">
              プロジェクトを見る
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <Image
            src="/images/top.jpg"
            alt="Scarecrow hero artwork"
            fill
            className="object-cover object-center"
            priority
            sizes="(min-width: 1024px) 520px, 100vw"
          />
        </div>
      </section>

      <section className="section-band px-5 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="font-serif text-3xl text-[#f3e5d0]">Latest Logs</h2>
            <Link href="/logs" className="text-sm text-[#d49c5f]">すべてのログを見る</Link>
          </div>
          <div className="divide-y divide-[#6f5a42]/35 border-y border-[#6f5a42]/35">
            {articles.length > 0 ? (
              articles.map((article) => (
                <article key={article.link} className="py-5 md:grid md:grid-cols-[120px_1fr] md:gap-6">
                  <p className="text-xs text-[#b7a58d]">{article.publishedAt.slice(0, 10)}</p>
                  <div>
                    <h3 className="mt-2 font-serif text-xl text-[#f3e5d0] md:mt-0">{article.title}</h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#d8c6ad]">{article.excerpt}</p>
                  </div>
                </article>
              ))
            ) : (
              <p className="py-5 text-[#d8c6ad]">まだ記事を取得できませんでした。</p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="mb-6 font-serif text-3xl text-[#f3e5d0]">Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.title} className="border border-[#6f5a42]/35 bg-[#1d1916]/90 p-5 transition hover:bg-[#282019]/90">
              <h3 className="font-serif text-xl text-[#f3e5d0]">{project.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#d8c6ad]">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="border border-[#6f5a42]/40 px-2 py-1 text-xs text-[#c9bba7]">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="philosophy-scene">
          <div className="philosophy-copy">
            <h2 className="font-serif text-3xl text-[#f3e5d0]">Philosophy</h2>
            <p className="mt-4 leading-8 text-[#d8c6ad]">
              AIは道具でもあり、対話相手でもある。
              <br />
              効率だけを追わず、丁寧に考えることを大切にしたい。
              <br />
              小さくても、自分の世界を作り続ける。
            </p>
          </div>
          <div className="philosophy-visual">
            <Image
              src="/images/philosophy.jpg"
              alt="Scarecrow philosophy artwork"
              fill
              className="object-cover object-[62%_center]"
              sizes="(min-width: 1024px) 420px, 100vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}

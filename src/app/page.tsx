import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { servicePlans } from "@/data/servicePlans";
import { getNoteArticles } from "@/lib/note";

export default async function HomePage() {
  const articles = await getNoteArticles(3);

  return (
    <>
      <section className="hero-scene mx-auto max-w-6xl overflow-hidden px-5" data-reveal>
        <div className="image-wash" />
        <div className="hero-copy">
          <p className="mb-4 text-sm font-semibold text-[#d49c5f]">LP制作・Webサイト制作・運用保守</p>
          <h1 className="hero-title max-w-xl font-serif text-4xl leading-[1.45] text-[#f3e5d0] md:text-5xl">
            <span className="keep-phrase">Web制作と運用を、</span>
            <span className="keep-phrase">相談しやすい形で。</span>
          </h1>
          <p className="mt-5 max-w-lg leading-8 text-[#d8c6ad]">
            小さなLPから、計測や外部サービス連携を含む事業サイトまで。AIを使った開発の進め方も活かしながら、目的、予算、公開後の運用に合わせて必要な範囲を整理します。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className="rounded-[0.85rem] border border-[#a87742] bg-[#a87742] px-6 py-3 text-sm font-semibold text-[#1a1816] shadow-[0_0_28px_rgba(168,119,66,0.22)] transition hover:bg-[#c09257]" href="#service-plans">
              制作プランを見る
            </Link>
            <Link className="rounded-[0.85rem] border border-[#a87742] bg-[#1a1816]/35 px-6 py-3 text-sm font-semibold text-[#f3e5d0] transition hover:bg-[#a87742]/18" href="/projects">
              プロジェクトを見る
            </Link>
            <Link className="rounded-[0.85rem] border border-[#6f5a42] bg-[#1a1816]/25 px-6 py-3 text-sm font-semibold text-[#d8c6ad] transition hover:border-[#a87742] hover:text-[#f3e5d0]" href="/works">
              制作実績を見る
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

      <section id="service-plans" className="section-band px-5 py-14" data-reveal>
        <div className="mx-auto max-w-6xl">
          <div className="service-heading">
            <div>
              <p className="text-sm font-semibold text-[#d49c5f]">Web制作のご相談</p>
              <h2 className="mt-3 font-serif text-3xl text-[#f3e5d0]">制作依頼プラン</h2>
            </div>
            <p className="max-w-2xl leading-7 text-[#d8c6ad]">
              予算と公開後の運用に合わせて、3つの入口を用意しています。内容は固定ではなく、目的に合わせて必要な範囲を調整します。
            </p>
          </div>
          <div className="service-plan-grid mt-8">
            {servicePlans.map((plan) => (
              <article key={plan.slug} className="service-plan-card" data-reveal>
                <div>
                  <h3 className="font-serif text-2xl text-[#f3e5d0]">{plan.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#d8c6ad]">{plan.summary}</p>
                </div>
                <div>
                  <p className="font-serif text-4xl text-[#f5c987]">{plan.price}</p>
                  <p className="mt-2 text-sm text-[#b7a58d]">{plan.monthlyCost}</p>
                </div>
                <ul className="service-list">
                  {plan.includes.slice(0, 3).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link className="service-detail-link" href={`/services/${plan.slug}`}>
                  {plan.name}の詳細
                </Link>
              </article>
            ))}
          </div>
          <div className="service-running mt-7">
            <p className="font-semibold text-[#f3e5d0]">ランニングコスト</p>
            <p className="mt-2 leading-7 text-[#d8c6ad]">
              月額3,000円から12,000円程度を目安に、必要最低限の保守から、更新、保守運用まで対応します。15万円プランではDB構築・DB管理は含めず、DBやCMS管理が必要な場合は30万円から個別に設計します。
            </p>
          </div>
        </div>
      </section>

      <section className="section-band px-5 py-12" data-reveal>
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl text-[#f3e5d0]">Latest Logs</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#d8c6ad]">
                制作の判断、AIを使った開発の試行錯誤、運用で考えたことを記録しています。
              </p>
            </div>
            <Link href="/logs" className="text-sm text-[#d49c5f]">すべてのログを見る</Link>
          </div>
          <div className="divide-y divide-[#6f5a42]/35 border-y border-[#6f5a42]/35">
            {articles.length > 0 ? (
              articles.map((article) => (
                <article key={article.link} data-reveal>
                  <Link
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block py-5 transition hover:bg-[#2a2118]/45 md:grid md:grid-cols-[176px_minmax(0,1fr)] md:gap-6"
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
                            sizes="(min-width: 768px) 160px, 100vw"
                          />
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <h3 className="mt-2 font-serif text-xl text-[#f3e5d0] transition group-hover:text-[#d49c5f] md:mt-0">
                        {article.title}
                      </h3>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#d8c6ad]">{article.excerpt}</p>
                    </div>
                  </Link>
                </article>
              ))
            ) : (
              <p className="py-5 text-[#d8c6ad]">まだ記事を取得できませんでした。</p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12" data-reveal>
        <div className="mb-6 flex flex-col gap-2">
          <h2 className="font-serif text-3xl text-[#f3e5d0]">Projects</h2>
          <p className="max-w-2xl text-sm leading-6 text-[#d8c6ad]">
            個人開発で試している技術、設計、AIを使った開発の進め方を、Web制作の提案にも活かしています。
          </p>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.title} className="border border-[#6f5a42]/35 bg-[#1d1916]/90 p-5 transition hover:bg-[#282019]/90" data-reveal>
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

      <section className="mx-auto max-w-6xl px-5 pb-16" data-reveal>
        <div className="philosophy-scene">
          <div className="philosophy-copy">
            <h2 className="font-serif text-3xl text-[#f3e5d0]">Philosophy</h2>
            <p className="philosophy-text mt-4 leading-8 text-[#d8c6ad]">
              AIは道具でもあり、対話相手でもある。
              <br />
              <span className="keep-phrase">効率だけを追わず、</span>
              <span className="keep-phrase">目的に合う形を</span>
              <span className="keep-phrase">丁寧に考えたい。</span>
              <br />
              小さな制作も、事業の入口も、静かに長く使えるものにしていく。
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

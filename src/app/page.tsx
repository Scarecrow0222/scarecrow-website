import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { projects } from "@/data/projects";
import { servicePlans } from "@/data/servicePlans";
import { getNoteArticles } from "@/lib/note";
import { Link2 } from "lucide-react";

const generatedImages = {
  hero: "/images/generated-hero-terminal.png",
  philosophy: "/images/generated-philosophy.png",
  logs: "/images/generated-logs.png",
};

export default async function ホームPage() {
  const articles = await getNoteArticles(3);

  return (
    <>
      <section
        className="hero-scene mx-auto max-w-6xl overflow-hidden px-5"
        data-reveal
      >
        <div className="image-wash" />
        <div className="hero-copy">
          <p className="mb-4 text-sm font-semibold text-[var(--primary-deep)]">
            Scarecrow Web Studio
          </p>
          <h1 className="hero-title max-w-xl font-serif text-4xl leading-[1.45] text-[var(--text)] md:text-5xl">
            <span className="keep-phrase">想いをカタチにする</span>
            <span className="keep-phrase">“育てられるWebサイト”</span>
            <span className="keep-phrase">を一緒につくる。</span>
          </h1>
          <p className="mt-5 max-w-lg leading-8 text-[var(--muted)]">
            相談しやすいAI時代の個人開発スタジオとして、小さなLPから計測や外部サービス連携を含む事業サイトまで。目的、予算、公開後の運用に合わせて、必要な範囲を一緒に整理します。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              className="glass-button glass-button-primary"
              href="https://forms.gle/XDLLPyPV4hwgCNLK6"
              target="_blank"
              rel="noopener noreferrer"
            >
              制作相談をする
            </Link>
            <Link className="glass-button" href="/works">
              制作実績を見る
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <Image
            src={generatedImages.hero}
            alt="ガラスカード内のターミナルイメージ"
            fill
            className="object-cover object-center"
            priority
            sizes="(min-width: 1024px) 520px, 100vw"
          />
          <div
            className="terminal-panel typing-terminal"
            aria-label="Scarecrow deployment terminal"
            data-testid="hero-terminal"
          >
            <div className="terminal-header">
              <span />
              <span />
              <span />
            </div>
            <div className="terminal-body terminal-code">
              <p
                className="terminal-line"
                style={
                  {
                    "--typing-width": "43ch",
                    "--typing-delay": "0ms",
                    "--line-index": 0,
                  } as CSSProperties
                }
              >
                import {`{ WebPage }`} from "@/WebPage";
              </p>
              <p
                className="terminal-line"
                style={
                  {
                    "--typing-width": "40ch",
                    "--typing-delay": "1100ms",
                    "--line-index": 1,
                  } as CSSProperties
                }
              >
                export default function WebPage() {"{"}
              </p>
              <p
                className="terminal-line terminal-indent"
                style={
                  {
                    "--typing-width": "20ch",
                    "--typing-delay": "1900ms",
                    "--line-index": 2,
                  } as CSSProperties
                }
              >
                return (
              </p>
              <p
                className="terminal-line terminal-indent"
                style={
                  {
                    "--typing-width": "50ch",
                    "--typing-delay": "2500ms",
                    "--line-index": 3,
                  } as CSSProperties
                }
              >
                &lt;webPage /&gt;
              </p>
              <p
                className="terminal-line terminal-indent"
                style={
                  {
                    "--typing-width": "10ch",
                    "--typing-delay": "1900ms",
                    "--line-index": 4,
                  } as CSSProperties
                }
              >
                {")}"}
              </p>
              <p className="terminal-log">
                <span className="terminal-ok">✓</span> Build complete
              </p>
              <p className="terminal-log">
                <span className="terminal-ok">✓</span> Responsive checked
              </p>
              <p className="terminal-log">
                <span className="terminal-ai">✓</span> SEO configured
              </p>
              <p className="terminal-log">
                <span className="terminal-ai">✓</span> Analytics connected
              </p>
              <p className="terminal-log terminal-status">
                <span className="terminal-ok">✓</span> Deploy success
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="service-plans"
        className="section-band service-service-plans-section px-5 py-14"
        data-reveal
      >
        <div className="service-service-plans-inner mx-auto max-w-6xl">
          <div className="service-heading">
            <div>
              <p className="text-sm font-semibold text-[var(--primary-deep)]">
                Web制作のご相談
              </p>
              <h2 className="mt-3 font-serif text-3xl text-[var(--text)]">
                制作依頼
              </h2>
            </div>
            <p className="max-w-2xl leading-7 text-[var(--muted)]">
              予算と公開後の運用に合わせて、3つの入口を用意しています。内容は固定ではなく、目的に合わせて必要な範囲を調整します。
            </p>
          </div>
          <div className="service-plan-grid mt-8">
            {servicePlans.map((plan) => (
              <article
                key={plan.slug}
                className="service-plan-card"
                data-reveal
              >
                <div>
                  <h3 className="font-serif text-2xl text-[var(--text)]">
                    {plan.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    {plan.summary}
                  </p>
                </div>
                <div>
                  <p className="font-serif text-4xl text-[var(--primary)]">
                    {plan.price}
                  </p>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    {plan.monthlyCost}
                  </p>
                </div>
                <ul className="service-list">
                  {plan.includes.slice(0, 3).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link
                  className="service-detail-link"
                  href={`/services/${plan.slug}`}
                >
                  {plan.name}の詳細
                </Link>
              </article>
            ))}
          </div>
          <div className="service-running mt-7">
            <p className="font-semibold text-[var(--text)]">ランニングコスト</p>
            <p className="mt-2 leading-7 text-[var(--muted)]">
              月額3,000円から12,000円程度を目安に、必要最低限の保守から、更新、保守運用まで対応します。15万円プランではDB構築・DB管理は含めず、DBやCMS管理が必要な場合は30万円から個別に設計します。
            </p>
          </div>
        </div>
      </section>

      <section className="section-band px-5 py-12" data-reveal>
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl text-[var(--text)]">
                最新記事
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                制作の判断、AIを使った開発の試行錯誤、運用で考えたことを記録しています。
              </p>
            </div>
            <Link href="/logs" className="text-sm text-[var(--primary-deep)]">
              <span className="flex items-center gap-1 whitespace-nowrap">
                全ての記事
                <Link2 className="w-5 h-5" />
              </span>
            </Link>
          </div>
          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {articles.length > 0 ? (
              articles.map((article) => (
                <article key={article.link} data-reveal>
                  <Link
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-5 transition hover:bg-[var(--primary-soft)] md:grid md:grid-cols-[176px_minmax(0,1fr)] md:gap-6"
                  >
                    <div className="note-article-media">
                      <p className="text-xs text-[var(--muted)]">
                        {article.publishedAt.slice(0, 10)}
                      </p>
                      <div className="relative mt-3 aspect-[16/9] overflow-hidden border border-[var(--border)]">
                        <Image
                          src={article.image || generatedImages.logs}
                          alt={
                            article.image
                              ? article.title
                              : `${article.title}のログイメージ`
                          }
                          fill
                          className="object-cover"
                          sizes="(min-width: 768px) 160px, 100vw"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="mt-2 font-serif text-xl text-[var(--text)] transition group-hover:text-[var(--primary-deep)] md:mt-0">
                        {article.title}
                      </h3>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--muted)]">
                        {article.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              ))
            ) : (
              <p className="py-5 text-[var(--muted)]">
                まだ記事を取得できませんでした。
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12" data-reveal hidden>
        <div className="mb-6 flex flex-col gap-2">
          <h2 className="font-serif text-3xl text-[var(--text)]">Projects</h2>
          <p className="max-w-2xl text-sm leading-6 text-[var(--muted)]">
            個人開発で試している技術、設計、AIを使った開発の進め方を、Web制作の提案にも活かしています。
          </p>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <article
              key={project.title}
              className="border border-[var(--border)] bg-white/75 p-5 transition hover:bg-[var(--primary-soft)]"
              data-reveal
            >
              <h3 className="font-serif text-xl text-[var(--text)]">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[var(--border)] px-2 py-1 text-xs text-[var(--muted)]"
                  >
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
            <h2 className="font-serif text-3xl text-[var(--text)]">
              理念・価値観
            </h2>
            <p className="philosophy-text mt-4 leading-8 text-[var(--muted)]">
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
              src={generatedImages.philosophy}
              alt="AIとWeb制作の哲学イメージ"
              fill
              className="object-cover object-[62%_center]"
              sizes="(min-width: 1024px) 420px, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16" data-reveal>
        <div className="consultation-band">
          <div>
            <h2 className="font-serif text-2xl text-white md:text-3xl">
              Web制作・相談・お見積もりは無料です
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/82">
              まずはお気軽にご相談ください。目的やご予算に合わせて、最適なプランをご提案します。
            </p>
          </div>
          <Link
            className="consultation-button"
            href="https://forms.gle/XDLLPyPV4hwgCNLK6"
            target="_blank"
            rel="noopener noreferrer"
          >
            今すぐ相談する
          </Link>
        </div>
      </section>
    </>
  );
}

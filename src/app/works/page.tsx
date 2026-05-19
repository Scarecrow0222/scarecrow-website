import Image from "next/image";

export default function WorksPage() {
  return (
    <section className="responsive-section mx-auto max-w-6xl px-5 py-14">
      <div className="intro-scene mb-8" data-reveal data-testid="works-intro">
        <div className="intro-copy">
          <p className="text-sm text-[var(--primary-deep)]">WebサイトやLP</p>
          <h1 className="mt-3 font-serif text-4xl text-[var(--text)]">
            制作実績
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
            制作したWebサイトやLPを、許可をいただいた範囲で掲載していきます。
          </p>
        </div>
        <div className="intro-visual">
          <Image
            src="/images/generated-works.png"
            alt="制作実績のイメージ"
            fill
            className="object-cover"
            priority
            sizes="(min-width: 768px) 360px, 100vw"
          />
        </div>
      </div>
      <div className="detail-panel" data-reveal>
        <p className="text-xl font-semibold text-[var(--text)]">
          現在準備中です。
        </p>
        <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">
          現在準備中です。納品後に、許可をいただいた制作事例を順次掲載します。
        </p>
      </div>
    </section>
  );
}

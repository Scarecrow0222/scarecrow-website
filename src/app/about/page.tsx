import Image from "next/image";
import Link from "next/link";

const skills = [
  {
    name: "TypeScript",
    description: "型を活かしたフロントエンド・バックエンド実装",
    position: "left top",
  },
  {
    name: "Next.js / React",
    description: "UI設計から画面実装、App Router構成まで",
    position: "right top",
  },
  {
    name: "NestJS",
    description: "API、認証、業務ロジックを見通しよく設計",
    position: "left bottom",
  },
  {
    name: "Spring Boot / Kotlin",
    description: "堅めの業務アプリやバックエンド開発",
    position: "right bottom",
  },
];

const serviceStacks = [
  {
    name: "AWS",
    description: "クラウドインフラの設計・構築・運用まで一通り経験",
    position: "left top",
  },
  {
    name: "Vercel",
    description: "Next.js アプリの公開、プレビュー、継続的なデプロイ",
    position: "right top",
  },
  {
    name: "Supabase",
    description: "DB、認証、API連携を含む小〜中規模アプリのバックエンド",
    position: "left bottom",
  },
  {
    name: "Render",
    description: "WebサービスやAPIサーバーのホスティング・運用",
    position: "right bottom",
  },
];

const profileLinks = [
  {
    href: "https://note.com/scarecorow0222",
    icon: "note",
    label: "noteを開く",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    href: "https://x.com/Scarecrow0222",
    icon: "x",
    label: "Xを開く",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    href: "https://forms.gle/XDLLPyPV4hwgCNLK6",
    icon: "form",
    label: "お問い合わせフォームを開く",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    href: "/",
    icon: "ホーム",
    label: "ホームへ戻る",
  },
];

function ProfileLinkIcon({ icon }: { icon: string }) {
  if (icon === "note") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M7.2 7.1h3.15l.16 1.18a4.18 4.18 0 0 1 3.36-1.52c2.47 0 3.93 1.62 3.93 4.35v5.8h-3.32v-5.35c0-1.23-.55-1.9-1.63-1.9-1.28 0-2.2.96-2.2 2.36v4.89H7.2V7.1Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (icon === "x") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6.2 5.75h3.3l3.05 4.05 3.52-4.05h1.94l-4.56 5.24 4.97 6.61h-3.3l-3.35-4.45-3.86 4.45H5.98l4.9-5.65-4.68-6.2Zm2.28 1.03 7.2 9.78h.47L8.95 6.78h-.47Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (icon === "form") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M7 4.75h7.35L18 8.4v10.85H7V4.75Zm6.8 1.9v2.3h2.3l-2.3-2.3ZM9.2 10.4h6v-1.1h-6v1.1Zm0 3.1h6v-1.1h-6v1.1Zm0 3.1h4.15v-1.1H9.2v1.1Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5.25 11.3 12 5.45l6.75 5.85-.94 1.08-.93-.8v6.97h-3.9v-4.28h-1.96v4.28h-3.9v-6.97l-.93.8-.94-1.08Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <section className="about-scene mx-auto grid max-w-5xl gap-10 px-5 py-14 md:grid-cols-[320px_1fr] md:items-start">
      <div
        className="relative flex flex-col items-center px-6 py-8 text-center"
        data-reveal
      >
        <div className="relative h-48 w-48 overflow-hidden rounded-full bg-white shadow-[0_18px_60px_rgba(139,92,246,0.18)]">
          <Image
            src="/images/new-icon.png"
            alt="Scarecrow icon"
            fill
            className="scale-[1.18] object-contain"
            sizes="192px"
          />
        </div>
        <p className="mt-5 font-serif text-2xl text-[var(--text)]">Scarecrow</p>
        <div className="profile-links mt-6 flex flex-wrap justify-center gap-2">
          {profileLinks.map((link) => (
            <Link
              className="profile-icon-link"
              href={link.href}
              key={link.href}
              target={link.target}
              rel={link.rel}
              aria-label={link.label}
            >
              <ProfileLinkIcon icon={link.icon} />
            </Link>
          ))}
        </div>
      </div>
      <div className="py-8 md:px-8" data-reveal>
        <p className="text-sm text-[var(--primary-deep)]">About</p>
        <h1 className="mt-3 font-serif text-4xl text-[var(--text)]">
          Scarecrowについて
        </h1>
        <p className="mt-6 leading-8 text-[var(--muted)]">
          Web制作や業務アプリの経験を活かして、LP制作、サイト改善、運用しやすい仕組みづくりを相談できます。AIを使った開発の進め方も取り入れながら、必要な範囲を一緒に整理します。
        </p>
        <section className="mt-10" aria-labelledby="skills-heading" data-reveal>
          <p className="text-sm text-[var(--primary-deep)]" id="skills-heading">
            主に使える技術
          </p>
          <div className="skills-grid mt-4">
            {skills.map((skill) => (
              <article className="skill-card" key={skill.name} data-reveal>
                <span
                  className="skill-icon"
                  aria-hidden="true"
                  data-testid={`skill-icon-${skill.name}`}
                  style={{
                    backgroundImage: "url('/images/about-tech-icons-v2.png')",
                    backgroundPosition: skill.position,
                  }}
                />
                <div>
                  <h2 className="text-base font-semibold text-[var(--text)]">
                    {skill.name}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {skill.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section
          className="service-stack mt-10"
          aria-labelledby="services-heading"
          data-reveal
        >
          <p
            className="text-sm text-[var(--primary-deep)]"
            id="services-heading"
          >
            公開・運用で使うサービス
          </p>
          <div className="skills-grid mt-4">
            {serviceStacks.map((service) => (
              <article className="skill-card" key={service.name} data-reveal>
                <span
                  className="skill-icon"
                  aria-hidden="true"
                  data-testid={`service-icon-${service.name}`}
                  style={{
                    backgroundImage:
                      "url('/images/about-service-icons-v2.png')",
                    backgroundPosition: service.position,
                  }}
                />
                <div>
                  <h2 className="text-base font-semibold text-[var(--text)]">
                    {service.name}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {service.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

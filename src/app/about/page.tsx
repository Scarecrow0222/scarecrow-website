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
    icon: "home",
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
        <div className="relative h-48 w-48 overflow-hidden rounded-full bg-[#2b241d] shadow-[0_0_70px_rgba(210,149,81,0.2)]">
          <Image
            src="/images/icon.png"
            alt="Scarecrow icon"
            fill
            className="scale-[1.18] object-contain"
            sizes="192px"
          />
        </div>
        <p className="mt-5 font-serif text-2xl text-[#f3e5d0]">Scarecrow</p>
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
        <p className="text-sm text-[#d49c5f]">About</p>
        <h1 className="mt-3 font-serif text-4xl text-[#f3e5d0]">
          Scarecrowについて
        </h1>
        <p className="mt-6 leading-8 text-[#d8c6ad]">
          会社員をしながら本業では、webアプリ制作、
          <br /> 趣味で深夜の作業部屋で、AIと対話しながら
          <br />
          個人開発を続けています。
          <br />
          考えたこと、作ったもの、途中で迷ったことを、
          <br />
          静かに記録していきます。
        </p>
        <section className="mt-10" aria-labelledby="skills-heading" data-reveal>
          <p className="text-sm text-[#d49c5f]" id="skills-heading">
            主に使える技術・サービス
          </p>
          <div className="skills-grid mt-4">
            {skills.map((skill) => (
              <article className="skill-card" key={skill.name} data-reveal>
                <span
                  className="skill-icon"
                  aria-hidden="true"
                  style={{
                    backgroundImage: "url('/images/about-tech-icons.png')",
                    backgroundPosition: skill.position,
                  }}
                />
                <div>
                  <h2 className="text-base font-semibold text-[#f3e5d0]">
                    {skill.name}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#bfae98]">
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
          <p className="text-sm text-[#d49c5f]" id="services-heading">
            デプロイ・DB・インフラ
          </p>
          <div className="skills-grid mt-4">
            {serviceStacks.map((service) => (
              <article className="skill-card" key={service.name} data-reveal>
                <span
                  className="skill-icon"
                  aria-hidden="true"
                  style={{
                    backgroundImage: "url('/images/about-service-icons.png')",
                    backgroundPosition: service.position,
                  }}
                />
                <div>
                  <h2 className="text-base font-semibold text-[#f3e5d0]">
                    {service.name}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#bfae98]">
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

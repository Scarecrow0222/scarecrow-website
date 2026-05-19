import Image from "next/image";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <section className="responsive-section mx-auto max-w-6xl px-5 py-14">
      <div className="intro-scene mb-8" data-reveal>
        <div className="intro-copy">
          <p className="text-sm text-[var(--primary-deep)]">制作と検証の記録</p>
          <h1 className="mt-3 font-serif text-4xl text-[var(--text)]">Projects</h1>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
            Web制作で使える技術や考え方を、個人開発の中で試しながら形にしています。AIを使った開発の進め方も含めて、設計や運用の判断を積み上げている場所です。
          </p>
        </div>
        <div className="intro-visual">
          <Image
            src="/images/generated-projects.png"
            alt="個人開発プロジェクトのイメージ"
            fill
            className="object-cover"
            priority
            sizes="(min-width: 768px) 360px, 100vw"
          />
        </div>
      </div>
      <div className="projects-grid mt-8">
        {projects.map((project) => (
          <article key={project.title} className="border border-[var(--border)] bg-white/75 p-6 transition hover:bg-[var(--primary-soft)]" data-reveal>
            <h2 className="font-serif text-2xl text-[var(--text)]">{project.title}</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="border border-[var(--border)] px-2 py-1 text-xs text-[var(--muted)]">
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

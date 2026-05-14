import Image from "next/image";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <div className="intro-scene mb-8" data-reveal>
        <div className="intro-copy">
          <p className="text-sm text-[#d49c5f]">制作と検証の記録</p>
          <h1 className="mt-3 font-serif text-4xl text-[#f3e5d0]">Projects</h1>
          <p className="mt-4 max-w-2xl leading-7 text-[#d8c6ad]">
            Web制作で使える技術や考え方を、個人開発の中で試しながら形にしています。AIを使った開発の進め方も含めて、設計や運用の判断を積み上げている場所です。
          </p>
        </div>
        <div className="intro-visual">
          <Image
            src="/images/projects.png"
            alt="Projects artwork"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 360px, 100vw"
          />
        </div>
      </div>
      <div className="projects-grid mt-8">
        {projects.map((project) => (
          <article key={project.title} className="border border-[#6f5a42]/35 bg-[#1d1916]/90 p-6 transition hover:bg-[#282019]/90" data-reveal>
            <h2 className="font-serif text-2xl text-[#f3e5d0]">{project.title}</h2>
            <p className="mt-3 leading-7 text-[#d8c6ad]">{project.description}</p>
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
  );
}

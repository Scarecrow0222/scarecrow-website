import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="about-scene mx-auto grid max-w-5xl gap-10 px-5 py-14 md:grid-cols-[320px_1fr] md:items-start">
      <div className="relative flex flex-col items-center px-6 py-8 text-center">
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
      </div>
      <div className="py-8 md:px-8">
        <p className="text-sm text-[#d49c5f]">About</p>
        <h1 className="mt-3 font-serif text-4xl text-[#f3e5d0]">Scarecrowについて</h1>
        <p className="mt-6 leading-8 text-[#d8c6ad]">
          会社員をしながら深夜の作業部屋で、AIと対話しながら<br />個人開発を続けています。考えたこと、作ったもの、<br />
          途中で迷ったことも含めて、静かに記録していきます。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="rounded border border-[#a87742] px-4 py-2 text-sm text-[#f3e5d0]"
            href="https://note.com/scarecorow0222"
            target="_blank"
            rel="noopener noreferrer"
          >
            note
          </Link>
          <Link
            className="rounded border border-[#a87742] px-4 py-2 text-sm text-[#f3e5d0]"
            href="https://x.com/Scarecrow0222"
            target="_blank"
            rel="noopener noreferrer"
          >
            X
          </Link>
          <Link
            className="rounded border border-[#a87742] px-4 py-2 text-sm text-[#f3e5d0]"
            href="https://forms.gle/XDLLPyPV4hwgCNLK6"
            target="_blank"
            rel="noopener noreferrer"
          >
            お問い合わせ
          </Link>
          <Link className="rounded border border-[#a87742] px-4 py-2 text-sm text-[#f3e5d0]" href="/">
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnalyticsTracker } from "./analytics-tracker";
import { MobileNav } from "./MobileNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scarecrow Web",
  description: "静かな夜の作業部屋から、記録を残していく個人Webサイト。",
  icons: {
    icon: "/images/icon.png"
  }
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/logs", label: "Logs" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  {
    href: "https://forms.gle/XDLLPyPV4hwgCNLK6",
    label: "Contact",
    target: "_blank",
    rel: "noopener noreferrer"
  }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div className="grain" />
        <AnalyticsTracker />
        <header className="sticky top-0 z-20 border-b border-[#6f5a42]/40 bg-[#1a1816]/88 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <Link href="/" className="flex items-center gap-3 text-[#f3e5d0]">
              <span className="relative h-10 w-10 overflow-hidden rounded-full border border-[#8f6d45]/60 bg-[#211c17] shadow-[0_0_34px_rgba(210,149,81,0.18)]">
                <Image
                  src="/images/icon.png"
                  alt="Scarecrow icon"
                  fill
                  className="scale-[1.28] object-contain"
                  sizes="40px"
                />
              </span>
              <span className="font-serif text-xl">Scarecrow</span>
            </Link>
            <MobileNav items={navItems} />
            <div className="desktop-nav flex items-center gap-5 text-sm text-[#d8c6ad]">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="nav-link" target={item.target} rel={item.rel}>
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        <main className="relative z-10">{children}</main>
        <footer className="relative z-10 mt-10 overflow-hidden border-t border-[#6f5a42]/40 px-5 py-12 text-[#b7a58d]">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/footer.jpg"
              alt="Books and notes footer artwork"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#171310] via-[#171310]/88 to-[#171310]/70" />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div></div>
            <p className="text-sm">Still building quietly.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

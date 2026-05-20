import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "./MobileNav";
import { PageLoader } from "./PageLoader";
import { ScrollReveal } from "./ScrollReveal";
import { isGoogleAnalyticsEnabled } from "./analytics";
import { ArrowUp } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scarecrow Web",
  description: "Web制作、LP制作、運用保守の相談ができるScarecrowのWebサイト。",
  icons: {
    icon: "/images/new-icon.png",
    apple: "/images/new-icon.png",
  },
};

const navItems = [
  { href: "/", label: "ホーム" },
  { href: "/#service-plans", label: "制作依頼" },
  { href: "/works", label: "制作実績" },
  { href: "/logs", label: "記事" },
  { href: "/about", label: "プロフィール" },
  {
    href: "https://forms.gle/XDLLPyPV4hwgCNLK6",
    label: "お問い合わせ",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

const footerLinks = [
  { href: "/privacy-policy", label: "プライバシーポリシー" },
  { href: "/legal-notice", label: "特定商取引法に基づく表記" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.GA_ID;

  return (
    <html lang="ja">
      <body id="top">
        <div className="grain" />
        <PageLoader />
        <ScrollReveal />
        <header className="site-header fixed inset-x-0 top-0 z-30 border-b border-[var(--border)] bg-white/82 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <Link
              href="/"
              className="flex items-center gap-3 text-[var(--text)]"
            >
              <span className="font-serif text-xl">Scarecrow</span>
            </Link>
            <MobileNav items={navItems} />
            <div className="desktop-nav flex items-center gap-5 text-sm text-[var(--muted)]">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  target={item.target}
                  rel={item.rel}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        <main className="site-main relative z-10">{children}</main>
        <footer className="relative z-10 mt-10 overflow-hidden border-t border-[var(--border)] px-5 py-12 text-[var(--muted)]">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/generated-footer-contact.png"
              alt="お問い合わせ背景イメージ"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4f1f8] via-[#f4f1f8]/92 to-white/78" />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <nav
              aria-label="フッターリンク"
              className="flex flex-wrap gap-x-5 gap-y-2 text-sm"
            >
              {footerLinks.map((item) => (
                <Link
                  className="transition hover:text-[var(--primary-deep)]"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <p className="text-sm">Still building quietly.</p>
          </div>
        </footer>
        <Link className="back-to-top" href="#top" aria-label="ページ上部へ戻る">
          <ArrowUp size={20} strokeWidth={2.2} aria-hidden="true" />
        </Link>
      </body>
      {isGoogleAnalyticsEnabled(gaId) ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavItem = {
  href: string;
  label: string;
  target?: string;
  rel?: string;
};

type MobileNavProps = {
  items: NavItem[];
};

export function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="mobile-nav" ref={rootRef}>
      <button
        className="mobile-nav-toggle"
        type="button"
        aria-label="メニューを開く"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav
        id="mobile-nav-menu"
        className="mobile-nav-accordion"
        data-open={isOpen}
        aria-hidden={!isOpen}
        aria-label="スマートフォン用メニュー"
      >
        <div className="mobile-nav-panel text-sm text-[var(--muted)]">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              target={item.target}
              rel={item.rel}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

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
      <button
        className="mobile-nav-backdrop"
        type="button"
        aria-label="メニューを閉じる"
        data-open={isOpen}
        onClick={() => setIsOpen(false)}
      />
      <div id="mobile-nav-menu" className="mobile-nav-menu" data-open={isOpen}>
        <div className="mobile-nav-panel text-sm text-[#d8c6ad]">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              target={item.target}
              rel={item.rel}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

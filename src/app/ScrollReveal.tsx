"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const targets = Array.from(document.querySelectorAll("[data-reveal]"));

    root.classList.add("reveal-ready");

    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let revealIndex = 0;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          if (entry.target instanceof HTMLElement) {
            entry.target.style.setProperty("--reveal-delay", `${Math.min(revealIndex * 70, 210)}ms`);
          }

          entry.target.classList.add("is-visible");
          revealIndex += 1;
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.14 }
    );

    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

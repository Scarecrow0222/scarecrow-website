import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const css = fs.readFileSync(
  path.join(process.cwd(), "src/app/globals.css"),
  "utf8",
);

describe("global responsive styles", () => {
  it("keeps the service plans centered and readable on mobile", () => {
    expect(css).toContain(".service-plans-section");
    expect(css).toContain("overflow-x: hidden");
    expect(css).toContain("overflow-x: clip");
    expect(css).toContain("padding-inline: clamp(1rem, 5.5vw, 1.35rem)");
    expect(css).toContain("overflow-wrap: anywhere");
    expect(css).toContain("min-width: 0");
  });

  it("uses a softer scroll reveal motion", () => {
    expect(css).toContain("translate3d(0, 1.4rem, 0)");
    expect(css).toContain("scale(0.985)");
    expect(css).toContain("opacity 620ms ease");
    expect(css).toContain("transform 760ms cubic-bezier(0.22, 1, 0.36, 1)");
    expect(css).toContain("transition-delay: var(--reveal-delay, 0ms)");
  });

  it("defines the Soft Purple Tech design tokens", () => {
    expect(css).toContain("--bg: #f4f1f8");
    expect(css).toContain("--surface: #ffffff");
    expect(css).toContain("--border: #e8def5");
    expect(css).toContain("--primary: #8b5cf6");
    expect(css).toContain("--primary-deep: #6d4aff");
    expect(css).toContain("--primary-soft: #f3ecff");
    expect(css).toContain("--glow: #b993ff");
    expect(css).toContain("rgba(139, 92, 246, 0.25)");
  });

  it("adds typing terminal animation styles", () => {
    expect(css).toContain(".typing-terminal");
    expect(css).toContain(".terminal-code");
    expect(css).toContain("@keyframes terminal-type");
    expect(css).toContain("@keyframes terminal-sequence");
    expect(css).toContain("@keyframes terminal-fade-loop");
    expect(css).toContain("animation-iteration-count: infinite");
    expect(css).not.toContain("@keyframes terminal-caret");
  });

  it("keeps glass buttons and mobile accordion in the purple system", () => {
    expect(css).toContain(".glass-button");
    expect(css).toContain("border: 1px solid rgba(139, 92, 246, 0.28)");
    expect(css).toContain(".mobile-nav-accordion");
    expect(css).toContain("grid-template-rows: 0fr");
    expect(css).toContain("left: calc(50% - 50vw)");
    expect(css).toContain("width: 100vw");
    expect(css).toContain("visibility: hidden");
    expect(css).toContain("--font-serif: var(--font-sans)");
  });

  it("keeps about icons aligned on mobile", () => {
    expect(css).toContain("@media (max-width: 640px)");
    expect(css).toContain("grid-template-columns: 3.75rem minmax(0, 1fr)");
    expect(css).toContain("align-items: start");
    expect(css).toContain("width: 3.75rem");
  });

  it("adds the free consultation band and padded philosophy panel", () => {
    expect(css).toContain(".philosophy-scene");
    expect(css).toContain("padding: clamp(1.35rem, 4vw, 3rem)");
    expect(css).toContain(".consultation-band");
    expect(css).toContain("linear-gradient(135deg, #7c3aed, #a855f7");
  });
});

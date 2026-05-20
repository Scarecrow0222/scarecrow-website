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
    expect(css).toContain(".service-plans-inner");
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

  it("animates the hero title accent in the purple system", () => {
    expect(css).toContain(".hero-title-accent");
    expect(css).toContain("font-weight: 700");
    expect(css).toContain("background-size: 220% 100%");
    expect(css).toContain("background-clip: text");
    expect(css).toContain("animation: hero-accent-flow 4.8s ease-in-out infinite");
    expect(css).toContain("@keyframes hero-accent-flow");
    expect(css).toContain("background-position: 0% 50%");
    expect(css).toContain("background-position: 100% 50%");
    expect(css).not.toContain("animation: hero-accent-shift 5.8s ease-in-out infinite");
    expect(css).not.toContain("@keyframes hero-accent-shift");
  });

  it("keeps glass buttons and mobile accordion in the purple system", () => {
    expect(css).toContain(".glass-button");
    expect(css).toContain("border: 1px solid rgba(255, 255, 255, 0.35)");
    expect(css).toContain("border-radius: 0.5rem");
    expect(css).toContain("color: white");
    expect(css).toContain(".glass-button-primary");
    expect(css).toContain("background: rgba(109, 74, 255, 0.78)");
    expect(css).toContain(".glass-button:hover");
    expect(css).toContain("background: rgba(124, 58, 237, 0.88)");
    expect(css).toContain("color: white");
    expect(css).not.toContain(".glass-button:hover {\n  transform: translateY(-2px);\n  border-color: rgba(255, 255, 255, 0.48);\n  background: rgba(255, 255, 255, 0.18)");
    expect(css).toContain("backdrop-filter: blur(14px)");
    expect(css).toContain(".mobile-nav-accordion");
    expect(css).toContain("grid-template-rows: 0fr");
    expect(css).toContain("left: calc(50% - 50vw)");
    expect(css).toContain("width: 100vw");
    expect(css).toContain("visibility: hidden");
    expect(css).toContain("--font-serif: var(--font-sans)");
  });

  it("keeps mobile hero glass buttons readable over the adjusted hero tone", () => {
    expect(css).toContain("@media (max-width: 767px)");
    expect(css).toContain(".hero-scene {\n    grid-template-columns: 1fr;");
    expect(css).toContain("linear-gradient(180deg, rgba(250, 247, 255, 0.88), rgba(243, 236, 255, 0.62))");
    expect(css).toContain(".hero-scene .glass-button");
    expect(css).toContain(".hero-actions {\n    order: 3;");
    expect(css).toContain(".hero-visual {\n    order: 2;");
    expect(css).toContain("grid-column: 1;");
    expect(css).toContain("grid-row: auto;");
    expect(css).toContain("background: rgba(109, 74, 255, 0.82)");
    expect(css).toContain("border-color: rgba(255, 255, 255, 0.42)");
    expect(css).toContain("box-shadow: 0 14px 30px rgba(109, 74, 255, 0.22)");
  });

  it("keeps the consultation CTA radius aligned with the hero buttons", () => {
    expect(css).toContain(".consultation-button");
    expect(css).toContain("border-radius: 0.5rem");
    expect(css).not.toContain(".consultation-button {\n  display: inline-flex;\n  width: fit-content;\n  align-items: center;\n  justify-content: center;\n  justify-self: start;\n  border: 1px solid rgba(255, 255, 255, 0.48);\n  border-radius: 999px");
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
    expect(css).toContain("grid-template-columns: 1fr");
    expect(css).toContain("padding: clamp(1rem, 5vw, 1.25rem)");
    expect(css).toContain("min-height: clamp(170px, 52vw, 220px)");
    expect(css.indexOf(".philosophy-visual {\n  position: relative")).toBeLessThan(
      css.lastIndexOf(".philosophy-visual {\n    min-height: clamp(170px, 52vw, 220px)"),
    );
    expect(css).toContain(".consultation-band");
    expect(css).toContain("linear-gradient(135deg, #7c3aed, #a855f7");
  });

  it("keeps every page resilient on phone-sized viewports", () => {
    expect(css).toContain(".responsive-section");
    expect(css).toContain(".responsive-actions");
    expect(css).toContain(".section-heading-row");
    expect(css).toContain(".intro-scene");
    expect(css).toContain("padding: clamp(1rem, 5vw, 1.25rem)");
    expect(css).toContain("top: auto");
    expect(css).toContain("max-height: calc(100% - 2rem)");
    expect(css).toContain("width: min(var(--typing-width), 100%)");
    expect(css).toContain("flex-direction: column");
    expect(css).toContain("align-items: flex-start");
  });

  it("keeps the hero terminal readable on mobile", () => {
    expect(css).toContain(".terminal-line-mobile");
    expect(css).toContain("font-size: clamp(0.54rem, 2.25vw, 0.68rem)");
    expect(css).toContain("overflow-x: visible");
    expect(css).toContain("margin-left: 0.55rem !important");
  });

  it("centers about icon artwork inside each frame", () => {
    expect(css).toContain(".skill-icon");
    expect(css).toContain("background-position: center");
    expect(css).toContain("background-size: contain");
    expect(css).toContain("place-self: center");
  });
});

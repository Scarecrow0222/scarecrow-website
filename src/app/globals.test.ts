import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const css = fs.readFileSync(path.join(process.cwd(), "src/app/globals.css"), "utf8");

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
});

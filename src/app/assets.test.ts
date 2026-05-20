import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const imageDir = path.join(process.cwd(), "public/images");

describe("public image assets", () => {
  it("does not keep unused placeholder or old composite icon assets", () => {
    const files = fs.readdirSync(imageDir);

    expect(files).not.toContain("no-image.png");
    expect(files).not.toContain("about-tech-icons.png");
    expect(files).not.toContain("about-tech-icons-v2.png");
    expect(files).not.toContain("about-service-icons.png");
    expect(files).not.toContain("about-service-icons-v2.png");
    expect(files).not.toContain("about-tech-nestjs.png");
    expect(files).not.toContain("about-tech-kotlin.png");
    expect(files).not.toContain("about-service-render.png");
  });
});

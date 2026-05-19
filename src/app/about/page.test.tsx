import fs from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "./page";

const iconFiles = [
  "about-tech-typescript.png",
  "about-tech-react.png",
  "about-tech-nestjs.png",
  "about-tech-kotlin.png",
  "about-service-aws.png",
  "about-service-vercel.png",
  "about-service-supabase.png",
  "about-service-render.png",
];

describe("AboutPage", () => {
  it("Web制作を相談できるプロフィールとして表示する", () => {
    render(<AboutPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Scarecrowについて",
    );
    expect(
      screen.getByText(/AIを使った開発の進め方も取り入れながら/),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "制作プランを見る" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("主に使える技術")).toBeInTheDocument();
    expect(screen.getByText("公開・運用で使うサービス")).toBeInTheDocument();
    expect(screen.getByTestId("skill-icon-TypeScript")).toHaveStyle({
      backgroundImage: "url('/images/about-tech-typescript.png')",
      backgroundPosition: "center",
    });
    expect(screen.getByTestId("service-icon-AWS")).toHaveStyle({
      backgroundImage: "url('/images/about-service-aws.png')",
      backgroundPosition: "center",
    });
  });

  it("uses individually generated transparent icon images", () => {
    for (const fileName of iconFiles) {
      const file = path.join(process.cwd(), "public/images", fileName);
      const png = fs.readFileSync(file);

      expect(png.subarray(1, 4).toString("ascii")).toBe("PNG");
      expect(png[25]).toBe(6);
      expect(png.includes(Buffer.from("white-purple-original-icons-v2"))).toBe(
        true,
      );
    }
  });
});

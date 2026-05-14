import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "./page";

describe("AboutPage", () => {
  it("Web制作を相談できるプロフィールとして表示する", () => {
    render(<AboutPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Scarecrowについて");
    expect(screen.getByText(/AIを使った開発の進め方も取り入れながら/)).toBeInTheDocument();
    expect(screen.getByText(/深夜の作業部屋でAIと対話しながら個人開発を続けています/)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "制作プランを見る" })).not.toBeInTheDocument();
    expect(screen.getByText("主に使える技術")).toBeInTheDocument();
    expect(screen.getByText("公開・運用で使うサービス")).toBeInTheDocument();
  });
});

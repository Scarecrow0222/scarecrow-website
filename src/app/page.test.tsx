import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "./page";

vi.mock("@/lib/note", () => ({
  getNoteArticles: vi.fn(async () => [
    {
      title: "テスト用ログ",
      link: "https://note.com/scarecorow0222/n/test",
      publishedAt: "2024-01-02T00:00:00.000Z",
      excerpt: "テスト用の抜粋です。",
      image: "https://assets.example/log.jpg"
    }
  ])
}));

vi.mock("@/data/projects", () => ({
  projects: [
    {
      title: "Scarecrow Web",
      description: "個人Webサイト",
      tags: ["Next.js", "TypeScript"]
    }
  ]
}));

describe("HomePage", () => {
  it("ヒーロー、制作依頼プラン、ログ、プロジェクト、哲学セクションを表示する", async () => {
    render(await HomePage());

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Web制作と運用を、相談しやすい形で。");
    expect(screen.getByText(/AIを使った開発の進め方も活かしながら/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "制作プランを見る" })).toHaveAttribute("href", "#service-plans");
    expect(screen.getByRole("link", { name: "制作実績を見る" })).toHaveAttribute("href", "/works");
    expect(screen.getByRole("heading", { name: "制作依頼プラン" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "ライトLPプラン" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "スタンダード制作プラン" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "ビジネス運用プラン" })).toBeInTheDocument();
    expect(screen.getByText("5万円から")).toBeInTheDocument();
    expect(screen.getByText("15万円から")).toBeInTheDocument();
    expect(screen.getByText("30万円から")).toBeInTheDocument();
    expect(screen.getByText(/15万円プランではDB構築・DB管理は含めず/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ライトLPプランの詳細" })).toHaveAttribute("href", "/services/light-lp");
    expect(screen.getByRole("link", { name: "スタンダード制作プランの詳細" })).toHaveAttribute("href", "/services/standard");
    expect(screen.getByRole("link", { name: "ビジネス運用プランの詳細" })).toHaveAttribute("href", "/services/business");
    expect(screen.getByRole("heading", { name: "Latest Logs" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /テスト用ログ/ })).toHaveAttribute(
      "href",
      "https://note.com/scarecorow0222/n/test"
    );
    expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Scarecrow Web" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Philosophy" })).toBeInTheDocument();
  });
});

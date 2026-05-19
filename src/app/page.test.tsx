import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ホームPage from "./page";

vi.mock("@/lib/note", () => ({
  getNoteArticles: vi.fn(async () => [
    {
      title: "テスト用ログ",
      link: "https://note.com/scarecorow0222/n/test",
      publishedAt: "2024-01-02T00:00:00.000Z",
      excerpt: "テスト用の抜粋です。",
      image: "https://assets.example/log.jpg",
    },
  ]),
}));

vi.mock("@/data/projects", () => ({
  projects: [
    {
      title: "Scarecrow Web",
      description: "個人Webサイト",
      tags: ["Next.js", "TypeScript"],
    },
  ],
}));

describe("ホームPage", () => {
  it("ヒーロー、制作依頼、ログ、プロジェクト、哲学セクションを表示する", async () => {
    render(await ホームPage());

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "想いをカタチにする“育てられるWebサイト”を一緒につくる。",
    );
    expect(
      screen.getByText(/相談しやすいAI時代の個人開発スタジオとして/),
    ).toBeInTheDocument();
    expect(screen.getByTestId("hero-terminal")).toHaveClass("typing-terminal");
    expect(screen.queryByTestId("terminal-cursor")).not.toBeInTheDocument();
    // expect(
    //   screen.getByText('import { WebPage } from "@/WebPage"'),
    // ).toBeInTheDocument();
    expect(screen.getByText("Responsive checked")).toBeInTheDocument();
    expect(screen.getByText("Deploy success")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "制作プランを見る" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "制作相談をする" }),
    ).toHaveAttribute("href", "https://forms.gle/XDLLPyPV4hwgCNLK6");
    expect(
      screen.getByRole("link", { name: "制作実績を見る" }),
    ).toHaveAttribute("href", "/works");
    expect(
      screen.queryByRole("link", { name: "プロジェクトを見る" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByAltText("ガラスカード内のターミナルイメージ"),
    ).toHaveAttribute("src", "/images/generated-hero-terminal.png");
    expect(
      screen.getByRole("heading", { name: "制作依頼" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "ライトLPプラン" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "スタンダード制作プラン" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "ビジネス運用プラン" }),
    ).toBeInTheDocument();
    expect(screen.getByText("5万円から")).toBeInTheDocument();
    expect(screen.getByText("15万円から")).toBeInTheDocument();
    expect(screen.getByText("30万円から")).toBeInTheDocument();
    expect(
      screen.getByText(/15万円プランではDB構築・DB管理は含めず/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "ライトLPプランの詳細" }),
    ).toHaveAttribute("href", "/services/light-lp");
    expect(
      screen.getByRole("link", { name: "スタンダード制作プランの詳細" }),
    ).toHaveAttribute("href", "/services/standard");
    expect(
      screen.getByRole("link", { name: "ビジネス運用プランの詳細" }),
    ).toHaveAttribute("href", "/services/business");
    expect(
      screen.getByRole("heading", { name: "最新記事" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /テスト用ログ/ })).toHaveAttribute(
      "href",
      "https://note.com/scarecorow0222/n/test",
    );
    expect(screen.getByAltText("テスト用ログ")).toHaveAttribute(
      "src",
      "https://assets.example/log.jpg",
    );

    expect(
      screen.getByRole("heading", { name: "理念・価値観" }),
    ).toBeInTheDocument();
    expect(screen.getByAltText("AIとWeb制作の哲学イメージ")).toHaveAttribute(
      "src",
      "/images/generated-philosophy.png",
    );
    expect(
      screen.getByRole("heading", {
        name: "Web制作・相談・お見積もりは無料です",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "今すぐ相談する" }),
    ).toHaveAttribute("href", "https://forms.gle/XDLLPyPV4hwgCNLK6");
  });
});

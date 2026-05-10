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
  it("ヒーロー、ログ、プロジェクト、哲学セクションを表示する", async () => {
    render(await HomePage());

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("深夜の作業部屋から、記録を残していく。");
    expect(screen.getByRole("link", { name: "最新のログを見る" })).toHaveAttribute("href", "/logs");
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

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LogsPage from "./page";

vi.mock("@/lib/note", () => ({
  getNoteArticles: vi.fn(async () => [
    {
      title: "制作メモ",
      link: "https://note.com/scarecorow0222/n/test",
      publishedAt: "2024-01-02T00:00:00.000Z",
      excerpt: "制作過程のメモです。",
      image: ""
    }
  ])
}));

describe("LogsPage", () => {
  it("制作の姿勢が伝わる説明でログ一覧を表示する", async () => {
    render(await LogsPage());

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Logs");
    expect(screen.getByText(/制作の判断やAIを使った試行錯誤を/)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "制作の相談をする" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "制作プランを見る" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /制作メモ/ })).toBeInTheDocument();
  });
});

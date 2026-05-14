import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProjectsPage from "./page";

vi.mock("@/data/projects", () => ({
  projects: [
    {
      title: "Scarecrow Web",
      description: "個人Webサイト",
      tags: ["Next.js", "TypeScript"]
    }
  ]
}));

describe("ProjectsPage", () => {
  it("制作相談につながる文脈でプロジェクト一覧を表示する", () => {
    render(<ProjectsPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Projects");
    expect(screen.getByText(/AIを使った開発の進め方も含めて/)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "制作プランを見る" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Scarecrow Web" })).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import WorksPage from "./page";

describe("WorksPage", () => {
  it("制作実績の準備中ページを表示する", () => {
    render(<WorksPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("制作実績");
    expect(screen.getByText("現在準備中です。")).toBeInTheDocument();
    expect(screen.getByTestId("works-intro")).toHaveClass("intro-scene");
    expect(screen.getByAltText("制作実績のイメージ")).toHaveAttribute("src", "/images/generated-works.png");
    expect(screen.queryByRole("link", { name: "制作の相談をする" })).not.toBeInTheDocument();
  });
});

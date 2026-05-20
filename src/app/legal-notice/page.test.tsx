import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LegalNoticePage from "./page";

describe("LegalNoticePage", () => {
  it("特定商取引法に基づく表記を表示する", () => {
    render(<LegalNoticePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "特定商取引法に基づく表記",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("販売価格")).toBeInTheDocument();
    expect(screen.getByText("お支払い方法")).toBeInTheDocument();
    expect(screen.getByText("キャンセル・返金")).toBeInTheDocument();
    expect(screen.getByText("事業者情報の開示")).toBeInTheDocument();
  });
});

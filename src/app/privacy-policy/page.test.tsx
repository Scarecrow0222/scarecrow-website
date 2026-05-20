import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PrivacyPolicyPage from "./page";

describe("PrivacyPolicyPage", () => {
  it("プライバシーポリシーを表示する", () => {
    render(<PrivacyPolicyPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "プライバシーポリシー" }),
    ).toBeInTheDocument();
    expect(screen.getByText("個人情報の利用目的")).toBeInTheDocument();
    expect(screen.getByText("アクセス解析ツールについて")).toBeInTheDocument();
    expect(screen.getByText("お問い合わせ窓口")).toBeInTheDocument();
  });
});

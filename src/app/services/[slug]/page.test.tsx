import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ServicePlanPage, { generateStaticParams } from "./page";

describe("ServicePlanPage", () => {
  it("ライトLPプランの詳細を表示する", async () => {
    const { container } = render(await ServicePlanPage({ params: Promise.resolve({ slug: "light-lp" }) }));

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("ライトLPプラン");
    expect(screen.getByText("5万円から")).toBeInTheDocument();
    expect(screen.getByText("月額 3,000円から")).toBeInTheDocument();
    expect(screen.getByText("1ページ構成のシンプルなLP制作")).toBeInTheDocument();
    expect(container.querySelector("section")).toHaveClass("responsive-section");
    expect(container.querySelector(".responsive-actions")).toBeInTheDocument();
  });

  it("スタンダード制作プランはDBを含めない前提を表示する", async () => {
    render(await ServicePlanPage({ params: Promise.resolve({ slug: "standard" }) }));

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("スタンダード制作プラン");
    expect(screen.getByText("15万円から")).toBeInTheDocument();
    expect(screen.getByText("DB構築・DB管理は含みません")).toBeInTheDocument();
    expect(screen.getByText("Googleフォーム、予約ツール、note、SNS、地図、既存CMSなどの埋め込み・連携")).toBeInTheDocument();
  });

  it("3つの制作プランを静的生成対象にする", () => {
    expect(generateStaticParams()).toEqual([
      { slug: "light-lp" },
      { slug: "standard" },
      { slug: "business" }
    ]);
  });
});

import { render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { isGoogleAnalyticsEnabled } from "./analytics";
import RootLayout, { metadata } from "./layout";

vi.mock("./PageLoader", () => ({ PageLoader: () => null }));
vi.mock("./ScrollReveal", () => ({ ScrollReveal: () => null }));
vi.mock("@next/third-parties/google", () => ({
  GoogleAnalytics: ({ gaId }: { gaId: string }) => (
    <div data-testid="google-analytics" data-ga-id={gaId} />
  ),
}));

const nodeEnv = process.env.NODE_ENV;
const vercelEnv = process.env.VERCEL_ENV;

describe("RootLayout", () => {
  afterEach(() => {
    delete process.env.GA_ID;
    process.env.NODE_ENV = nodeEnv;
    process.env.VERCEL_ENV = vercelEnv;
  });

  it("サイト識別子と主要ナビゲーションを表示する", () => {
    render(
      React.createElement(
        RootLayout,
        null,
        React.createElement("p", null, "本文"),
      ),
    );

    expect(screen.getByText("Scarecrow")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "ホーム" })[0]).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getAllByRole("link", { name: "記事" })[0]).toHaveAttribute(
      "href",
      "/logs",
    );
    expect(
      screen.getAllByRole("link", { name: "プロフィール" })[0],
    ).toHaveAttribute("href", "/about");
    expect(
      screen.getAllByRole("link", { name: "お問い合わせ" })[0],
    ).toHaveAttribute("href", "https://forms.gle/XDLLPyPV4hwgCNLK6");
    expect(
      screen.getByRole("link", { name: "プライバシーポリシー" }),
    ).toHaveAttribute("href", "/privacy-policy");
    expect(
      screen.getByRole("link", { name: "特定商取引法に基づく表記" }),
    ).toHaveAttribute("href", "/legal-notice");
    expect(
      screen.getByRole("link", { name: "ページ上部へ戻る" }),
    ).toHaveAttribute("href", "#top");
    expect(screen.getByText("本文")).toBeInTheDocument();
  });

  it("メタデータにサイト名とアイコンを設定する", () => {
    expect(metadata).toMatchObject({
      title: "Scarecrow Web",
      icons: {
        icon: "/images/new-icon.png",
      },
    });
  });

  it("GA_IDが設定されている場合はGoogle Analyticsタグを出力する", () => {
    process.env.GA_ID = "G-TEST1234";
    process.env.NODE_ENV = "production";
    process.env.VERCEL_ENV = "production";

    render(
      React.createElement(
        RootLayout,
        null,
        React.createElement("p", null, "本文"),
      ),
    );

    expect(screen.getByTestId("google-analytics")).toHaveAttribute(
      "data-ga-id",
      "G-TEST1234",
    );
  });

  it("GA_IDが未設定の場合はGoogle Analyticsタグを出力しない", () => {
    render(
      React.createElement(
        RootLayout,
        null,
        React.createElement("p", null, "本文"),
      ),
    );

    expect(screen.queryByTestId("google-analytics")).not.toBeInTheDocument();
  });

  it("独自アナリティクストラッカーを出力しない", () => {
    render(
      React.createElement(
        RootLayout,
        null,
        React.createElement("p", null, "本文"),
      ),
    );

    expect(
      screen.queryByTestId("legacy-analytics-tracker"),
    ).not.toBeInTheDocument();
  });

  it("Vercel本番以外ではGA_IDがあってもGoogle Analyticsを出力しない", () => {
    expect(
      isGoogleAnalyticsEnabled("G-TEST1234", "development", "production"),
    ).toBe(false);
    expect(isGoogleAnalyticsEnabled("G-TEST1234", "test", "production")).toBe(
      false,
    );
    expect(
      isGoogleAnalyticsEnabled("G-TEST1234", "production", undefined),
    ).toBe(false);
    expect(
      isGoogleAnalyticsEnabled("G-TEST1234", "production", "preview"),
    ).toBe(false);
    expect(
      isGoogleAnalyticsEnabled("G-TEST1234", "production", "production"),
    ).toBe(true);
  });
});

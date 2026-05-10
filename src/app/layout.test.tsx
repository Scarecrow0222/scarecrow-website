import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import RootLayout, { metadata } from "./layout";

vi.mock("./analytics-tracker", () => ({ AnalyticsTracker: () => null }));
vi.mock("./PageLoader", () => ({ PageLoader: () => null }));
vi.mock("./ScrollReveal", () => ({ ScrollReveal: () => null }));

describe("RootLayout", () => {
  it("サイト識別子と主要ナビゲーションを表示する", () => {
    render(React.createElement(RootLayout, null, React.createElement("p", null, "本文")));

    expect(screen.getByText("Scarecrow")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Home" })[0]).toHaveAttribute("href", "/");
    expect(screen.getAllByRole("link", { name: "Logs" })[0]).toHaveAttribute("href", "/logs");
    expect(screen.getAllByRole("link", { name: "Projects" })[0]).toHaveAttribute("href", "/projects");
    expect(screen.getAllByRole("link", { name: "About" })[0]).toHaveAttribute("href", "/about");
    expect(screen.getAllByRole("link", { name: "Contact" })[0]).toHaveAttribute(
      "href",
      "https://forms.gle/XDLLPyPV4hwgCNLK6"
    );
    expect(screen.getByText("本文")).toBeInTheDocument();
  });

  it("メタデータにサイト名とアイコンを設定する", () => {
    expect(metadata).toMatchObject({
      title: "Scarecrow Web",
      icons: {
        icon: "/images/icon.png"
      }
    });
  });
});

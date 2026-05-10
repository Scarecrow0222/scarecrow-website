import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it } from "vitest";
import { MobileNav } from "./MobileNav";

const items = [
  { href: "/", label: "Home" },
  { href: "/logs", label: "Logs" },
  {
    href: "https://forms.gle/XDLLPyPV4hwgCNLK6",
    label: "Contact",
    target: "_blank",
    rel: "noopener noreferrer"
  }
];

describe("MobileNav", () => {
  it("メニューボタンで開閉でき、リンクを押すと閉じる", async () => {
    const user = userEvent.setup();
    render(React.createElement(MobileNav, { items }));

    const toggle = screen.getByRole("button", { name: "メニューを開く" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("link", { name: "Logs" }));
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("外部リンクには別タブ向け属性を渡す", async () => {
    const user = userEvent.setup();
    render(React.createElement(MobileNav, { items }));

    await user.click(screen.getByRole("button", { name: "メニューを開く" }));

    const contact = screen.getByRole("link", { name: "Contact" });
    expect(contact).toHaveAttribute("href", "https://forms.gle/XDLLPyPV4hwgCNLK6");
    expect(contact).toHaveAttribute("target", "_blank");
    expect(contact).toHaveAttribute("rel", "noopener noreferrer");
  });
});

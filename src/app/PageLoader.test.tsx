import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PageLoader } from "./PageLoader";

describe("PageLoader", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(document, "fonts", {
      configurable: true,
      value: {
        ready: Promise.resolve()
      }
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("文字とバーだけを表示し、GIF画像を読み込まない", () => {
    render(<PageLoader />);

    expect(screen.getByText("Scarecrow")).toBeInTheDocument();
    expect(screen.getByText(/LOADING/)).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});

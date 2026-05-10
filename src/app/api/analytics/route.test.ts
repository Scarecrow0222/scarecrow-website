import { beforeEach, describe, expect, it, vi } from "vitest";

const recordPageView = vi.fn();

vi.mock("@/lib/analytics", () => ({ recordPageView }));

describe("POST /api/analytics", () => {
  beforeEach(() => {
    recordPageView.mockReset();
  });

  it("pathをページビューとして記録する", async () => {
    recordPageView.mockResolvedValue({ ok: true });
    const { POST } = await import("./route");

    const response = await POST(
      new Request("https://example.com/api/analytics", {
        method: "POST",
        headers: { "user-agent": "UnitTest" },
        body: JSON.stringify({
          path: "/logs",
          referrer: "https://note.com/scarecorow0222"
        })
      })
    );

    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(response.status).toBe(200);
    expect(recordPageView).toHaveBeenCalledWith({
      path: "/logs",
      referrer: "https://note.com/scarecorow0222",
      userAgent: "UnitTest"
    });
  });

  it("pathが文字列でないリクエストを400にする", async () => {
    const { POST } = await import("./route");

    const response = await POST(
      new Request("https://example.com/api/analytics", {
        method: "POST",
        body: JSON.stringify({ path: 123 })
      })
    );

    await expect(response.json()).resolves.toEqual({ ok: false });
    expect(response.status).toBe(400);
    expect(recordPageView).not.toHaveBeenCalled();
  });

  it("壊れたJSONを400にする", async () => {
    const { POST } = await import("./route");

    const response = await POST(
      new Request("https://example.com/api/analytics", {
        method: "POST",
        body: "{"
      })
    );

    await expect(response.json()).resolves.toEqual({ ok: false });
    expect(response.status).toBe(400);
    expect(recordPageView).not.toHaveBeenCalled();
  });
});

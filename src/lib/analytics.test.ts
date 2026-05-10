import { beforeEach, describe, expect, it, vi } from "vitest";

const fallbackData = {
  analyticsSummary: { totalViews: 10, weeklyViews: 4, uniqueVisitors: 3, averageReadSeconds: 80 },
  dailyViews: [{ label: "月", views: 1 }],
  popularPages: [{ path: "/", title: "Home", views: 10 }],
  trafficSources: [{ name: "Direct", views: 10 }]
};

const createSupabaseAdminClient = vi.fn();

vi.mock("@/data/analytics", () => fallbackData);
vi.mock("@/lib/supabase", () => ({ createSupabaseAdminClient }));

async function loadAnalytics() {
  vi.resetModules();
  return import("./analytics");
}

async function withNodeEnv<T>(value: string, callback: () => Promise<T>) {
  const previous = process.env.NODE_ENV;
  process.env.NODE_ENV = value;

  try {
    return await callback();
  } finally {
    process.env.NODE_ENV = previous;
  }
}

beforeEach(() => {
  createSupabaseAdminClient.mockReset();
});

describe("recordPageView", () => {
  it("公開ページだけを保存し、開発環境ではlocalテーブルを使う", async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    createSupabaseAdminClient.mockReturnValue({
      from: vi.fn((tableName) => {
        expect(tableName).toBe("page_views_local");
        return { insert };
      })
    });
    const { recordPageView } = await loadAnalytics();

    const result = await withNodeEnv("test", () =>
      recordPageView({
        path: "/logs",
        referrer: "",
        userAgent: "UnitTest"
      })
    );

    expect(result).toEqual({ ok: true });
    expect(insert).toHaveBeenCalledWith({
      path: "/logs",
      referrer: null,
      user_agent: "UnitTest"
    });
  });

  it("APIとダッシュボードのアクセスを保存しない", async () => {
    createSupabaseAdminClient.mockReturnValue({
      from: vi.fn(() => {
        throw new Error("private paths should not be inserted");
      })
    });
    const { recordPageView } = await loadAnalytics();

    await expect(recordPageView({ path: "/api/analytics" })).resolves.toEqual({ ok: false });
    await expect(recordPageView({ path: "/dashboard" })).resolves.toEqual({ ok: false });
  });
});

describe("getAnalyticsDashboardData", () => {
  it("Supabase未設定時にフォールバックデータを返す", async () => {
    createSupabaseAdminClient.mockReturnValue(null);
    const { getAnalyticsDashboardData } = await loadAnalytics();

    await expect(getAnalyticsDashboardData()).resolves.toEqual({ ...fallbackData, isFallback: true });
  });

  it("ページ別・流入元別に直近アクセスを集計する", async () => {
    const today = new Date().toISOString();
    const rows = [
      { path: "/", referrer: null, created_at: today },
      { path: "/logs", referrer: "https://note.com/scarecorow0222", created_at: today },
      { path: "/logs", referrer: "https://www.google.com/search?q=scarecrow", created_at: today },
      { path: "/about", referrer: "not a url", created_at: today }
    ];

    createSupabaseAdminClient.mockReturnValue({
      from: vi.fn((tableName) => {
        expect(tableName).toBe("page_views_local");
        return {
          select: vi.fn().mockReturnThis(),
          gte: vi.fn().mockReturnThis(),
          order: vi.fn().mockResolvedValue({ data: rows, error: null })
        };
      })
    });
    const { getAnalyticsDashboardData } = await loadAnalytics();

    const result = await withNodeEnv("test", () => getAnalyticsDashboardData());

    expect(result.analyticsSummary.totalViews).toBe(4);
    expect(result.popularPages.slice(0, 3)).toEqual([
      { path: "/logs", title: "logs", views: 2 },
      { path: "/", title: "Home", views: 1 },
      { path: "/about", title: "about", views: 1 }
    ]);
    expect(result.trafficSources).toEqual([
      { name: "Direct", views: 1 },
      { name: "note", views: 1 },
      { name: "Search", views: 1 },
      { name: "Unknown", views: 1 }
    ]);
  });
});

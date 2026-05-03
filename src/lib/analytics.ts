import { analyticsSummary, dailyViews, popularPages, trafficSources } from "@/data/analytics";
import { createSupabaseAdminClient } from "@/lib/supabase";

export type PageViewInput = {
  path: string;
  referrer?: string | null;
  userAgent?: string | null;
};

type PageViewRow = {
  path: string;
  referrer: string | null;
  created_at: string;
};

export async function recordPageView(input: PageViewInput) {
  const supabase = createSupabaseAdminClient();
  const path = normalizePath(input.path);
  const tableName = getAnalyticsTableName();

  if (!supabase || !path) {
    return { ok: false };
  }

  const { error } = await supabase.from(tableName).insert({
    path,
    referrer: input.referrer || null,
    user_agent: input.userAgent || null
  });

  return { ok: !error };
}

export async function getAnalyticsDashboardData() {
  const supabase = createSupabaseAdminClient();
  const tableName = getAnalyticsTableName();

  if (!supabase) {
    return {
      analyticsSummary,
      dailyViews,
      popularPages,
      trafficSources,
      isFallback: true
    };
  }

  const since = new Date();
  since.setDate(since.getDate() - 6);
  since.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from(tableName)
    .select("path, referrer, created_at")
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: true });

  if (error || !data) {
    return {
      analyticsSummary,
      dailyViews,
      popularPages,
      trafficSources,
      isFallback: true
    };
  }

  return buildDashboardData(data as PageViewRow[]);
}

export function getAnalyticsTableName() {
  return process.env.NODE_ENV === "production" ? "page_views" : "page_views_local";
}

function buildDashboardData(rows: PageViewRow[]) {
  const dayFormatter = new Intl.DateTimeFormat("ja-JP", { weekday: "short", timeZone: "Asia/Tokyo" });
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    return {
      key: date.toISOString().slice(0, 10),
      label: dayFormatter.format(date),
      views: 0
    };
  });

  const pages = new Map<string, number>();
  const sources = new Map<string, number>();

  rows.forEach((row) => {
    const day = days.find((item) => item.key === row.created_at.slice(0, 10));
    if (day) {
      day.views += 1;
    }

    pages.set(row.path, (pages.get(row.path) || 0) + 1);
    const source = resolveTrafficSource(row.referrer);
    sources.set(source, (sources.get(source) || 0) + 1);
  });

  const weeklyViews = rows.length;

  return {
    analyticsSummary: {
      totalViews: rows.length,
      weeklyViews,
      uniqueVisitors: 0,
      averageReadSeconds: 0
    },
    dailyViews: days.map(({ label, views }) => ({ label, views })),
    popularPages: toSortedItems(pages).map(([path, views]) => ({
      path,
      title: path === "/" ? "Home" : path.replace("/", ""),
      views
    })),
    trafficSources: toSortedItems(sources).map(([name, views]) => ({ name, views })),
    isFallback: false
  };
}

function normalizePath(path: string) {
  if (!path.startsWith("/") || path.startsWith("/api") || path.startsWith("/dashboard")) {
    return null;
  }

  return path.slice(0, 120);
}

function resolveTrafficSource(referrer: string | null) {
  if (!referrer) {
    return "Direct";
  }

  try {
    const hostname = new URL(referrer).hostname;
    if (hostname.includes("note.com")) return "note";
    if (hostname.includes("x.com") || hostname.includes("twitter.com")) return "X";
    if (hostname.includes("google.") || hostname.includes("bing.")) return "Search";
    return hostname.replace(/^www\./, "");
  } catch {
    return "Unknown";
  }
}

function toSortedItems(items: Map<string, number>) {
  return [...items.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
}

import { notFound } from "next/navigation";
import { getAnalyticsDashboardData } from "@/lib/analytics";

export const dynamic = "force-dynamic";

type DashboardPageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams;
  const dashboardToken = process.env.ADMIN_DASHBOARD_TOKEN;

  if (!dashboardToken || params.token !== dashboardToken) {
    notFound();
  }

  const { analyticsSummary, dailyViews, popularPages, trafficSources, isFallback } =
    await getAnalyticsDashboardData();
  const metricItems = [
    { label: "総アクセス数", value: analyticsSummary.totalViews.toLocaleString(), note: "公開後の累計" },
    { label: "直近7日", value: analyticsSummary.weeklyViews.toLocaleString(), note: "週間ページビュー" },
    { label: "訪問者数", value: analyticsSummary.uniqueVisitors.toLocaleString(), note: "ユニーク推定" },
    { label: "平均滞在", value: `${analyticsSummary.averageReadSeconds}秒`, note: "1セッション平均" }
  ];
  const maxDailyViews = Math.max(...dailyViews.map((day) => day.views), 1);
  const maxPopularPageViews = Math.max(...popularPages.map((page) => page.views), 1);
  const maxSourceViews = Math.max(...trafficSources.map((source) => source.views), 1);

  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <div className="intro-scene mb-10">
        <div className="intro-copy">
          <p className="text-sm text-[#d49c5f]">アクセス分析</p>
          <h1 className="mt-3 font-serif text-4xl text-[#f3e5d0]">Dashboard</h1>
          <p className="mt-4 max-w-2xl leading-7 text-[#d8c6ad]">
            サイトのアクセス数、人気ページ、流入元をひと目で確認できます。
          </p>
          {isFallback ? (
            <p className="mt-3 text-sm text-[#b7a58d]">
              Supabase の環境変数が未設定のため、サンプル値を表示しています。
            </p>
          ) : null}
        </div>
      </div>

      <div className="dashboard-metrics">
        {metricItems.map((item) => (
          <div key={item.label} className="border border-[#6f5a42]/35 bg-[#1d1916]/90 p-5">
            <p className="text-sm text-[#b7a58d]">{item.label}</p>
            <p className="mt-3 font-serif text-3xl text-[#f3e5d0]">{item.value}</p>
            <p className="mt-2 text-xs text-[#d49c5f]">{item.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="section-band px-5 py-6">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-[#d49c5f]">Daily Views</p>
              <h2 className="mt-2 font-serif text-2xl text-[#f3e5d0]">直近7日</h2>
            </div>
            <p className="text-sm text-[#b7a58d]">{analyticsSummary.weeklyViews.toLocaleString()} views</p>
          </div>
          <div className="dashboard-bars" aria-label="直近7日のアクセス数">
            {dailyViews.map((day) => (
              <div key={day.label} className="dashboard-bar-column">
                <div
                  className="dashboard-bar"
                  style={{ height: `${Math.max((day.views / maxDailyViews) * 100, 10)}%` }}
                />
                <p className="mt-3 text-xs text-[#b7a58d]">{day.label}</p>
                <p className="mt-1 text-xs text-[#f3e5d0]">{day.views}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-[#6f5a42]/35 bg-[#1d1916]/90 p-6">
          <p className="text-sm text-[#d49c5f]">Popular Pages</p>
          <h2 className="mt-2 font-serif text-2xl text-[#f3e5d0]">人気ページ</h2>
          <div className="mt-6 space-y-5">
            {popularPages.map((page) => (
              <div key={page.path}>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-[#f3e5d0]">{page.title}</span>
                  <span className="text-[#b7a58d]">{page.views.toLocaleString()}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden bg-[#2b241f]">
                  <div
                    className="h-full bg-[#d49c5f]"
                    style={{ width: `${(page.views / maxPopularPageViews) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-8 border border-[#6f5a42]/35 bg-[#1d1916]/90 p-6">
        <p className="text-sm text-[#d49c5f]">Traffic Sources</p>
        <h2 className="mt-2 font-serif text-2xl text-[#f3e5d0]">流入元</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {trafficSources.map((source) => (
            <div key={source.name} className="border border-[#6f5a42]/30 p-4">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-[#f3e5d0]">{source.name}</span>
                <span className="text-[#b7a58d]">{source.views.toLocaleString()}</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden bg-[#2b241f]">
                <div
                  className="h-full bg-[#a87742]"
                  style={{ width: `${(source.views / maxSourceViews) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

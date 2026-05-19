import Link from "next/link";
import { notFound } from "next/navigation";
import { getServicePlan, servicePlans } from "@/data/servicePlans";

type ServicePlanPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return servicePlans.map((plan) => ({ slug: plan.slug }));
}

export default async function ServicePlanPage({
  params,
}: ServicePlanPageProps) {
  const { slug } = await params;
  const plan = getServicePlan(slug);

  if (!plan) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <div className="detail-hero" data-reveal>
        <p className="text-sm font-semibold text-[var(--primary-deep)]">
          制作依頼
        </p>
        <h1 className="mt-3 font-serif text-4xl text-[var(--text)]">
          {plan.name}
        </h1>
        <p className="mt-4 text-xl font-semibold text-[var(--primary)]">
          {plan.summary}
        </p>
        <p className="mt-5 max-w-3xl leading-8 text-[var(--muted)]">
          {plan.description}
        </p>
        <div className="mt-7 flex flex-wrap gap-4">
          <div>
            <p className="text-sm text-[var(--muted)]">制作費</p>
            <p className="font-serif text-4xl text-[var(--primary)]">
              {plan.price}
            </p>
          </div>
          <div>
            <p className="text-sm text-[var(--muted)]">ランニングコスト</p>
            <p className="font-serif text-2xl text-[var(--text)]">
              {plan.monthlyCost}
            </p>
          </div>
        </div>
      </div>

      <div className="detail-grid mt-8">
        <section className="detail-panel" data-reveal>
          <h2 className="font-serif text-2xl text-[var(--text)]">
            向いているご相談
          </h2>
          <p className="mt-4 leading-7 text-[var(--muted)]">{plan.bestFor}</p>
        </section>
        <section className="detail-panel" data-reveal>
          <h2 className="font-serif text-2xl text-[var(--text)]">制作内容</h2>
          <ul className="service-list mt-4">
            {plan.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="detail-panel" data-reveal>
          <h2 className="font-serif text-2xl text-[var(--text)]">
            月額サポート
          </h2>
          <ul className="service-list mt-4">
            {plan.runningSupport.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          className="service-detail-link"
          href="https://forms.gle/XDLLPyPV4hwgCNLK6"
          target="_blank"
          rel="noopener noreferrer"
        >
          このプランで相談する
        </Link>
        <Link
          className="rounded-[0.85rem] border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--muted)] transition hover:border-[var(--primary)] hover:text-[var(--text)]"
          href="/#service-plans"
        >
          プラン一覧へ戻る
        </Link>
      </div>
    </section>
  );
}

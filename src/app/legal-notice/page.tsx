const rows = [
  {
    label: "販売事業者",
    value: "Scarecrow Web",
  },
  {
    label: "運営責任者",
    value: "Scarecrow",
  },
  {
    label: "所在地・電話番号",
    value:
      "請求があった場合には、法令に基づき遅滞なく開示します。まずはお問い合わせフォームよりご連絡ください。",
  },
  {
    label: "販売価格",
    value:
      "各サービスページに記載の価格、または個別見積もりにて提示します。表示価格は制作内容により変動する場合があります。",
  },
  {
    label: "商品代金以外の必要料金",
    value:
      "サーバー費用、ドメイン費用、有料外部サービス利用料、振込手数料等が発生する場合があります。",
  },
  {
    label: "お支払い方法",
    value:
      "銀行振込、または個別に合意した方法。具体的な支払時期は見積書または契約時に提示します。",
  },
  {
    label: "納品時期",
    value:
      "制作内容、素材提供状況、確認期間により異なります。契約前に個別にスケジュールを提示します。",
  },
  {
    label: "キャンセル・返金",
    value:
      "制作着手後のキャンセルや返金は、進行状況と契約内容に応じて個別に協議します。納品物の性質上、納品後の返金は原則としてお受けできません。",
  },
  {
    label: "事業者情報の開示",
    value:
      "所在地・電話番号等の開示が必要な場合は、お問い合わせフォームよりご請求ください。",
  },
];

export default function LegalNoticePage() {
  return (
    <section className="responsive-section mx-auto max-w-4xl px-5 py-14">
      <div className="detail-hero">
        <p className="text-sm text-[var(--primary-deep)]">Legal Notice</p>
        <h1 className="mt-3 font-serif text-4xl text-[var(--text)]">
          特定商取引法に基づく表記
        </h1>
        <p className="mt-5 leading-8 text-[var(--muted)]">
          Web制作・運用支援に関する取引条件の概要です。具体的な条件は、制作内容に応じて契約前に個別に提示します。
        </p>
      </div>

      <dl className="detail-panel mt-8 divide-y divide-[var(--border)]">
        {rows.map((row) => (
          <div
            className="grid gap-2 py-5 md:grid-cols-[13rem_minmax(0,1fr)]"
            key={row.label}
          >
            <dt className="font-semibold text-[var(--text)]">{row.label}</dt>
            <dd className="leading-8 text-[var(--muted)]">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

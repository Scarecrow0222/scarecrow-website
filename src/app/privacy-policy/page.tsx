export default function PrivacyPolicyPage() {
  return (
    <section className="responsive-section mx-auto max-w-4xl px-5 py-14">
      <div className="detail-hero">
        <p className="text-sm text-[var(--primary-deep)]">Policy</p>
        <h1 className="mt-3 font-serif text-4xl text-[var(--text)]">
          プライバシーポリシー
        </h1>
        <p className="mt-5 leading-8 text-[var(--muted)]">
          Scarecrow Webでは、お問い合わせや制作相談でお預かりする情報を、必要な範囲で適切に取り扱います。
        </p>
      </div>

      <div className="mt-8 grid gap-4">
        {[
          {
            title: "個人情報の利用目的",
            body: "お問い合わせへの回答、制作内容の確認、見積もり、契約・請求・納品、保守運用の連絡に利用します。",
          },
          {
            title: "第三者提供について",
            body: "法令に基づく場合を除き、ご本人の同意なく第三者へ個人情報を提供しません。",
          },
          {
            title: "アクセス解析ツールについて",
            body: "サイト改善のため、Google Analytics等のアクセス解析ツールを利用する場合があります。取得される情報は個人を特定しない形で扱われます。",
          },
          {
            title: "個人情報の管理",
            body: "お預かりした情報は、漏えい、紛失、改ざん等を防ぐため、必要かつ適切な管理に努めます。",
          },
          {
            title: "お問い合わせ窓口",
            body: "個人情報の開示、訂正、削除、利用停止等のご相談は、お問い合わせフォームよりご連絡ください。",
          },
        ].map((section) => (
          <article className="detail-panel" key={section.title}>
            <h2 className="font-serif text-2xl text-[var(--text)]">
              {section.title}
            </h2>
            <p className="mt-3 leading-8 text-[var(--muted)]">{section.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

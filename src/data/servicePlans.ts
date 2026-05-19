export type ServicePlan = {
  slug: string;
  name: string;
  price: string;
  monthlyCost: string;
  summary: string;
  description: string;
  bestFor: string;
  includes: string[];
  runningSupport: string[];
};

export const servicePlans: ServicePlan[] = [
  {
    slug: "light-lp",
    name: "ライトLPプラン",
    price: "5万円から",
    monthlyCost: "月額 3,000円から",
    summary: "1ページ構成のシンプルなLP制作",
    description:
      "まずは小さく公開したい方向けに、目的と問い合わせ導線を絞った1ページのLPを制作します。原稿や素材をご用意いただける場合の入口価格です。",
    bestFor: "サービス紹介、イベント告知、個人事業の最初のWeb窓口",
    includes: [
      "スマートフォン対応の1ページLP",
      "問い合わせフォームや外部フォームへの導線設計",
      "基本的なSEOメタ情報の設定",
      "公開前の表示確認",
    ],
    runningSupport: [
      "ホスティング、ドメイン周りの最低限の保守",
      "軽微なテキスト修正の相談",
      "障害時の一次確認",
    ],
  },
  {
    slug: "standard",
    name: "スタンダード制作プラン",
    price: "15万円から",
    monthlyCost: "月額 6,000円から",
    summary: "計測と外部連携を備えた小規模サイト制作",
    description:
      "友人紹介や小規模事業サイトで必要になりやすい情報整理、導線設計、Google Analytics、外部サービスの埋め込みを含めた制作です。DB構築・DB管理は含みません。",
    bestFor: "店舗、制作サービス、採用導線、継続して育てたい事業サイト",
    includes: [
      "トップページと下層ページの基本構成",
      "Google Analyticsなどの計測設定",
      "Googleフォーム、予約ツール、note、SNS、地図、既存CMSなどの埋め込み・連携",
      "問い合わせにつながる導線と文言整理",
    ],
    runningSupport: [
      "月次の軽微な更新、表示確認",
      "計測タグやフォーム周りの保守",
      "DB構築・DB管理は含みません",
    ],
  },
  {
    slug: "business",
    name: "ビジネス運用プラン",
    price: "30万円から",
    monthlyCost: "月額 12,000円から",
    summary: "運用やDB/CMS管理まで見据えたWeb制作",
    description:
      "問い合わせ、実績掲載、CMSやDBを使ったデータ管理、継続改善まで含め、事業の基盤として使うWebサイトを個別に設計します。",
    bestFor: "継続的に集客や運用改善を行いたい法人、個人事業、チーム",
    includes: [
      "複数ページ構成のWebサイト設計と実装",
      "DBやCMSを使った実績、記事、問い合わせ情報の管理設計",
      "GAなどの分析、イベント計測、改善しやすい導線設計",
      "公開後の運用を見据えた管理フロー整理",
    ],
    runningSupport: [
      "保守運用、更新作業、DB管理の相談",
      "月次の状態確認と改善提案",
      "障害調査、バックアップ、軽微な機能調整",
    ],
  },
];

export function getServicePlan(slug: string) {
  return servicePlans.find((plan) => plan.slug === slug);
}

# Scarecrow Web Design System v2

## コンセプト

```txt
Friendly Future Developer Studio
```

ダークすぎる「ハッカー感」ではなく、

- 親しみやすい
- 相談しやすい
- 技術力がありそう
- AI時代っぽい
- 世界観がある

を両立する。

---

# デザインキーワード

- Purple Future
- Soft Tech
- Cozy Coding
- AI Creative
- Friendly Studio
- Personal Web Partner

---

# デザイン方針

## 現在の方向性

```txt
かわいい × 技術 × 未来感
```

---

# 世界観

## イメージ

- 夜の作業部屋
- 開発中のデスク
- コーディングしている空気感
- AIと一緒に制作している感じ
- 個人開発スタジオ

---

# キャラクター方針

## Scarecrow Mascot

### 役割

単なるマスコットではなく、

```txt
“実際に開発している”
キャラクター
```

として扱う。

---

# キャラクター演出

## Hero

### やること

- パソコンに向かっている
- モニター複数
- コーディング中
- デスク環境
- 夜の開発空間

---

## NG

- ただ立っている
- 飾りだけ
- マスコット感だけ強い

---

## OK

```txt
「この子が作ってる」
```

感。

---

# カラーシステム

## コンセプト

```txt
Soft Purple Tech
```

---

# ベースカラー

## Background

柔らかい明るめグレー。

```css
--bg: #f4f1f8;
```

---

## Surface

カード背景。

```css
--surface: #ffffff;
```

---

## Border

```css
--border: #e8def5;
```

---

# メインカラー

## Purple Primary

```css
--primary: #8b5cf6;
```

---

## Purple Deep

```css
--primary-deep: #6d4aff;
```

---

## Purple Soft

```css
--primary-soft: #f3ecff;
```

---

# Accent

## Glow Purple

```css
--glow: #b993ff;
```

---

## Text Main

```css
--text: #2a2340;
```

---

## Text Sub

```css
--muted: #756d88;
```

---

# 配色バランス

## 比率

```txt
70% White / Light
20% Purple
10% Dark
```

---

# UI方針

## 現在の方向性

```txt
Linear
+
Raycast
+
Notion
+
AI IDE
+
かわいい個人開発
```

---

# Heroセクション

## 構成

### 左

- キャッチコピー
- サブ説明
- CTA

---

### 右

- キャラクター
- コーディング空間
- ターミナル
- モニター
- デスク

---

# ターミナル演出

## 目的

```txt
実際に開発している感
```

を出す。

---

# アニメーション案

## コード入力演出

```txt
import { Hero } from "@/components/hero"

export default function ホーム() {
  return (
    <main>
      <Hero />
    </main>
  )
}
```

---

## ログ演出

```txt
✓ Build complete
✓ Responsive checked
✓ SEO configured
✓ Analytics connected
✓ Deploy success
```

---

## タイピング演出

- 1文字ずつ入力
- カーソル点滅
- スクロール
- 自動補完風

---

# 背景演出

## 方針

派手すぎない。

---

# 使用要素

## 使用する

- 柔らかい紫グラデ
- 光粒子
- ガラスUI
- 薄いグロー
- ゆるいノイズ

---

## 使用しない

- サイバーパンク強すぎ
- 真っ黒背景
- ネオングリーン
- ハッカー感

---

# カードデザイン

## 方針

```txt
「仕事を頼みやすい」
```

を優先。

---

# カードCSSイメージ

```css
.card {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(16px);

  border: 1px solid rgba(139, 92, 246, 0.12);

  border-radius: 24px;

  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.08);
}
```

---

# ボタンシステム

## Primary

```css
background: linear-gradient(135deg, #8b5cf6, #a855f7);
```

---

## Hover

```css
transform: translateY(-2px);
box-shadow: 0 10px 30px rgba(139, 92, 246, 0.25);
```

---

# Worksセクション

## 方針

「実際に仕事している感」

を出す。

---

# 表示したい内容

- PC表示
- スマホ表示
- 制作目的
- 使用技術
- 改善内容
- SEO対応
- アクセス改善

---

# Blog / Note セクション

## 超重要

現在の強みを活かす。

---

# Blog

## 内容

```txt
技術記事
```

### 例

- Next.js
- AI開発
- Vercel
- Supabase
- 設計
- TDD
- UI/UX

---

# Note

## 内容

```txt
活動記録
思想
制作裏話
```

---

# Blog と Note の違い

## Blog

```txt
技術力
```

を見せる。

---

## Note

```txt
人柄
```

を見せる。

---

# Noteセクション方針

## 雰囲気

- 少し暖かい
- 柔らかい
- かわいい
- 日記感

---

# Footer

## イメージ

```txt
個人制作スタジオ
```

感。

---

# 最終的なブランド方向

## 目指す見え方

```txt
制作会社
↓
ではなく

“相談しやすい
AI時代の個人開発スタジオ”
```

---

# 最終コンセプト

```txt
Scarecrow Web Studio

想いをカタチにする
“育てられるWebサイト”
を一緒につくる。
```

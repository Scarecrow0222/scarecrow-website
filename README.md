# Scarecrow Website

Scarecrow Website は、個人開発の記録、noteの記事、制作物、プロフィールをまとめる個人Webサイトです。夜の作業部屋、ランタン、紙の質感、Scarecrowのキャラクターを軸にした静かな雰囲気のデザインで構成しています。

## Features

- Home: サイトの導入、最新ログ、Projects、Philosophy を表示
- Logs: note RSS から記事を取得して表示
- Projects: 制作物の一覧を表示
- About: Scarecrow のプロフィールとリンクを表示

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- fast-xml-parser
- Vercel deploy 想定

## Development

```bash
npm install
npm run dev
```

通常は `http://localhost:3000` で起動します。

## Verification

```bash
npm test
npm run build
```

このプロジェクトでは、テスト成功とビルド成功を完了条件にしています。

## note RSS

デフォルトでは以下のRSSを参照します。

```text
https://note.com/scarecorow0222/rss
```

変更したい場合は `NOTE_RSS_URL` を設定してください。

## Troubleshooting

### `Cannot find module './xxx.js'` がブラウザで出る

Next.js の `.next` 生成キャッシュと起動中の dev server がずれたときに発生することがあります。特に、`npm run build` と `npm run dev` を行き来した後や、dev server が古いまま残っている場合に起きやすいです。

対応手順:

```bash
lsof -nP -iTCP:3000 -sTCP:LISTEN
kill <PID>
rm -rf .next
npm run dev
```

その後、ブラウザをハードリロードしてください。

### 3000番ポートが使用中になる

古い dev server が残っている可能性があります。

```bash
lsof -nP -iTCP:3000 -sTCP:LISTEN
kill <PID>
npm run dev
```

### note記事が表示されない

ローカル環境のネットワーク制限や note 側の応答によって、RSS取得に失敗することがあります。取得に失敗してもページは表示され、記事一覧は空の状態になります。

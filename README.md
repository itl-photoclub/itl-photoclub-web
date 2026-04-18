# iTL写真部 Web

中央大学 iTL写真部（市ヶ谷田町キャンパス）公式サイトのソースコード。

公開URL: https://itlphotoclub.com

## 構成

静的サイト（ビルドツールなし）。ブラウザで `index.html` を開けばそのまま動きます。

```
.
├── index.html       エントリ
├── styles.css       全スタイル（OKLCH + デザイントークン）
├── script.js        ヘッダー / モバイルメニュー / スクロールリビール
├── images/          ヒーロー画像（WebP + JPEG、4 サイズ）
└── .impeccable.md   デザインコンテキスト（ユーザー像・ブランド方針）
```

## 画像について

ヒーロー画像は 4 サイズ × 2 フォーマット（WebP / JPEG）で `images/` に配置済み。`<picture>` + `srcset` + `imagesrcset` preload で、モバイルは 26KB から配信されます。

オリジナル（`IMG_3370.JPG`, 11.6MB）はリポジトリには含めていません（`.gitignore` 対象）。画像を差し替える場合は最適化フロー（例: `cwebp` + `sips`）を再実行してください。

## デザイン方針

- ライトモード基調、OKLCH の warm sage パレット
- 写真を主役にするエディトリアル風レイアウト
- 日本語フォント: Shippori Mincho B1（見出し）+ Zen Kaku Gothic New（本文）
- モバイルファースト、WCAG AA 準拠

詳細は `.impeccable.md` を参照。

## ローカル確認

```bash
# 任意の静的サーバーで
python3 -m http.server 8000
# → http://localhost:8000
```

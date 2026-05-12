# THE THREAD 2日間チャレンジ・参加者の部屋

2026年5月12-13日開催の THE THREAD 2日間チャレンジ参加者(8名)専用のクローズドハブ。

公開URL(予定): https://iobschool.github.io/the-thread-2day-members/

---

## 仕様

- パスワード保護(クライアントサイド・身内向け簡易)
- 合言葉: `THETHREAD05`
- 一度入力するとlocalStorageに保存・再訪時は自動ログイン
- アクセス期間: 〜 **2026年6月15日 23:59 JST**
- 期限を過ぎるとクライアント側で全コンテンツ非表示 → 終了メッセージのみ表示

## ファイル構成

```
the-thread-2day-members/
├── index.html
├── style.css
├── script.js
├── assets/
└── README.md
```

## 更新方法

### パスワードを変更したい
`script.js` の先頭、`PASSWORD` を書き換える。

```js
var PASSWORD = 'THETHREAD05';
```

ユーザーの自動ログイン情報は古いキーで残るため、合言葉変更時は `STORAGE_KEY` も一緒に変えると確実。

### アクセス期限を変更したい
`script.js` の `DEADLINE` を書き換える(ISO形式・JST固定)。

```js
var DEADLINE = new Date('2026-06-15T23:59:00+09:00');
```

### 動画URLを差し替えたい
`script.js` の `DAY1_VIDEO` / `DAY2_VIDEO` に埋め込み用URLを入れる。

- YouTube: `https://www.youtube.com/embed/動画ID`
- Vimeo:   `https://player.vimeo.com/video/動画ID`

空文字列のままだとプレースホルダー(「配信後にここに表示されます」)が出る。

### Day2資料リンクを追加したい
`index.html` の `<!-- MATERIALS -->` セクション内、`mat-card-soon` のブロックを `<a class="mat-card" href="...">` に置き換える。

### 月末セミナーの日程確定後
`index.html` の `<!-- SEMINAR -->` セクションの `.sem-date` を実際の日程に書き換え、`.sem-note` を申込導線に差し替え。

### AIコーチURL
`index.html` の `data-placeholder="ai-coach-3day"` / `data-placeholder="ai-coach-90"` のついた `<a>` の `href` を本番URLに差し替え。

## ローカル確認

```
cd ~/Desktop/CCBooster_MacBook/the-thread-2day-members
python3 -m http.server 8000
# → http://localhost:8000/
```

スマホビューは Chrome DevTools の Toggle device toolbar(⌘+Shift+M)で iPhone 14 などを選択。

## デプロイ

1. GitHub Organization `IOBSchool` に新規リポジトリ `the-thread-2day-members` 作成(Private OK / Pagesは Public 必要なら Public)
2. `git init && git add . && git commit -m "init"`
3. `git remote add origin https://github.com/IOBSchool/the-thread-2day-members.git`
4. `git branch -M main && git push -u origin main`
5. リポジトリ Settings → Pages → Source: `main / root` → Save
6. 数分後 https://iobschool.github.io/the-thread-2day-members/ で公開

## プレースホルダー差し替え一覧

| 場所 | 何を入れるか |
|------|-------------|
| `script.js` `DAY1_VIDEO` | Day1 動画埋め込みURL |
| `script.js` `DAY2_VIDEO` | Day2 動画埋め込みURL |
| `index.html` MATERIALS Day2カード | Day2 資料Drive直リンク |
| `index.html` AI Coach `<a>` 2本 | 3日体験版/90日継続版 本番URL |
| `index.html` SEMINAR `.sem-date` | 月末セミナー確定日程 |

## 注意

- パスワード判定はクライアントサイド(身内向け許容)
- 期限判定もクライアント時刻依存(端末時刻ズレで誤判定の可能性あり・許容範囲)
- 強固な保護が必要になったら Cloudflare Pages + Worker Basic認証への移行を検討
- ステップ進捗(STEPSセクション)はDay2が始まったら `index.html` 内の `.step` クラス名を変更:
  - Day2スタート時に `03 現状` を `.now` に
  - 全完了したら全項目に `.done` を付け、`.now` を外す

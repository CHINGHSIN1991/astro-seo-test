# Nexora AI 企業網站（Astro）

以 [bimgo.ai](https://bimgo.ai/) 的版面與內容配置為參考所建立的企業網站範本。所有文案、數據、Logo 與圖片皆為假字／假圖，待替換為正式內容。

## 開發

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # 輸出至 dist/
npm run preview   # 預覽 build 結果
```

技術：Astro 7、Tailwind CSS 4（`@tailwindcss/vite`）、Content Collections、Astro i18n routing。純靜態輸出，無需伺服器。

## 多語系

- 中文（預設）在根路徑，英文在 `/en/` 前綴，例如 `/updates` ↔ `/en/updates`。Header 與 Footer 的語言切換會連到同一頁的另一語言版本。
- 頁面都放在 `src/pages/[...lang]/`，以 `langPaths()` 同時產生兩種語言；介面文字集中在 `src/i18n.ts` 的 `dict`。
- Markdown 內容依語系放在 `zh/` 與 `en/` 子資料夾，檔名相同即為同一篇（例如 `updates/zh/partner-visit.md` 與 `updates/en/partner-visit.md`）；缺少英文檔時英文頁面會回退顯示中文內容。
- 服務條款與隱私權政策僅維護中文版，英文頁面會顯示提示文字。

## 頁面

| 路徑 | 說明 |
| --- | --- |
| `/`（`/#features` 為功能區塊錨點） | 首頁：Hero + 示範影片輪播、核心功能、數據、客戶見證、合作標章、願景、最新消息、CTA |
| `/changelog` | 更新日誌：依日期排序的版本更新（來源 `src/content/changelog/*.md`） |
| `/updates` | 最新消息列表（來源 `src/content/updates/*.md`） |
| `/updates/[slug]` | 單篇消息頁，含「繼續閱讀」 |
| `/request-demo` | 預約 Demo 表單（前端驗證 + 成功狀態；送出為模擬，見下方） |
| `/terms`、`/privacy` | 服務條款、隱私權政策（假字） |

## 替換內容的位置

- **介面文案（中英）**：`src/i18n.ts` 的 `dict`；聯絡資訊與數據數值在 `src/data/site.ts`
- **更新日誌**：在 `src/content/changelog/zh/` 新增 `.md`（英文版放 `en/` 同名檔），frontmatter 需有 `title`、`date`、`intro`
- **最新消息**：在 `src/content/updates/zh/` 新增 `.md`（英文版放 `en/` 同名檔），frontmatter 需有 `title`、`date`、`category`（product／company／event）、`excerpt`，`image` 選填
- **假圖**：頁面內使用 `src/components/Placeholder.astro`；Markdown 內使用 `/images/placeholder-16x9.svg`、`/images/placeholder-4x3.svg`
- **配色／字體**：`src/styles/global.css` 的 `@theme`（品牌色 `--color-brand`）
- **表單後端**：`src/pages/[...lang]/request-demo.astro` 底部 `<script>` 內的 `TODO`，將模擬送出改為實際 API 呼叫

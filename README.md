# Nexora AI 企業網站（Astro）

以 [bimgo.ai](https://bimgo.ai/) 的版面與內容配置為參考所建立的企業網站範本。所有文案、數據、Logo 與圖片皆為假字／假圖，待替換為正式內容。

## 開發

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # 輸出至 dist/
npm run preview   # 預覽 build 結果
```

技術：Astro 7、Tailwind CSS 4（`@tailwindcss/vite`）、Content Collections。純靜態輸出，無需伺服器。

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

- **品牌／文案／數據／見證**：`src/data/site.ts`
- **更新日誌**：在 `src/content/changelog/` 新增 `.md`，frontmatter 需有 `title`、`date`、`intro`
- **最新消息**：在 `src/content/updates/` 新增 `.md`，frontmatter 需有 `title`、`date`、`category`（產品／公司／活動）、`excerpt`，`image` 選填
- **假圖**：頁面內使用 `src/components/Placeholder.astro`；Markdown 內使用 `/images/placeholder-16x9.svg`、`/images/placeholder-4x3.svg`
- **配色／字體**：`src/styles/global.css` 的 `@theme`（品牌色 `--color-brand`）
- **表單後端**：`src/pages/request-demo.astro` 底部 `<script>` 內的 `TODO`，將模擬送出改為實際 API 呼叫
# astro-seo-test

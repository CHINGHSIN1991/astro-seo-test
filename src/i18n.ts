/**
 * 雙語字典與路由工具。
 * - 中文為預設語言，位於根路徑；英文位於 /en 前綴（Astro i18n routing）
 * - 頁面放在 src/pages/[...lang]/，由 langPaths() 同時產生兩種語言的靜態路徑
 * - Markdown 內容依語系放在 `<collection>/zh/` 與 `<collection>/en/`，英文缺檔時回退為中文
 */
export type Lang = 'zh' | 'en';
export const LANGS: Lang[] = ['zh', 'en'];

export const dict = {
  zh: {
    name: 'Nexora AI',
    slogan: '為工程團隊打造的 AI 工作夥伴',
    'meta.description':
      'Nexora AI 是專為工程與設計團隊打造的 AI 代理。以自然語言生成程式碼、封裝可重複使用的技能，並自動化各種複雜的專業工作流程。',
    'header.bookDemo': '預約 Demo',
    'header.toggleLang': '切換語言',
    'header.toggleMenu': '開啟選單',
    'nav.features': '功能',
    'nav.changelog': '更新日誌',
    'nav.updates': '最新消息',

    'hero.subtitle': '生成程式碼、建立可重複使用的技能，並自動化複雜的專業工作流程。',
    'hero.bookDemo': '預約 Demo',
    'hero.demoTitle': '用 AI 自動化模型建置',
    'hero.familyTitle': '生成與微調元件庫',
    'hero.clashTitle': '碰撞檢查與問題單生成',
    'hero.demosLabel': '產品示範影片',
    'hero.previousDemo': '上一支影片',
    'hero.nextDemo': '下一支影片',

    'authorizedDeveloper.title': 'Nexora AI 為官方授權開發夥伴',
    'authorizedDeveloper.description': '在主流設計平台上打造可靠、實用的 AI 解決方案。',
    'authorizedDeveloper.badge': '合作夥伴標章（假圖）',

    'features.title': '核心功能',
    'features.subtitle': '一個真正理解專業領域的 AI 代理，從生成程式碼，到在設計工具內原生執行。',
    'features.codegen.title': 'AI 程式碼生成',
    'features.codegen.description': '將您的指令即時轉換成可執行的程式碼，用於建模、模型檢核、碰撞檢討等各種複雜流程。',
    'features.skills.title': 'AI 技能系統',
    'features.skills.description': '將 AI 生成的工作流程封裝為可重複使用的技能，透過 AI 編輯，並在組織內分享。',
    'features.knowledge.title': '專業知識庫',
    'features.knowledge.description': '內建產業最佳實務、技術文件與法規知識，讓 AI 能精準地完成各種任務。',
    'features.native.title': '原生整合設計工具',
    'features.native.description': '以原生外掛形式運行於主流設計工具，直接在軟體內執行生成的程式碼。',
    'features.models.title': '最新 AI 模型',
    'features.models.description': '支援最新的大型語言模型，協助您完成各種工作流程。',
    'features.governance.title': '企業 AI 治理',
    'features.governance.description': '透過用戶權限管理、額度管理與雲端技能管理，滿足企業導入 AI 的治理需求。',
    'features.logoPlaceholder': 'Logo（假圖）',

    'stats.eyebrow': '數據',
    'stats.title': '為可衡量的成效而打造',
    'stats.skills': '已生成技能',
    'stats.accuracy': '程式碼準確率',
    'stats.productivity': '每位使用者每月生產力提升',
    'stats.hours': '每位使用者每月節省工時',

    'testimonials.eyebrow': '客戶見證',
    'testimonials.title': '客戶與夥伴怎麼說',
    'testimonials.a.quote':
      'Nexora AI 將自然語言轉為程式碼以自動化工作流程，並可儲存為可重複使用的技能，為技術發展與專業傳承帶來新的可能。（假字示意）',
    'testimonials.a.name': '王科技長',
    'testimonials.a.company': '示範集團',
    'testimonials.b.quote':
      '透過 Nexora AI，我們將標準化檢核作業寫成自動化程式，大幅縮短模型驗收時間，為業主守住專案交付品質。（假字示意）',
    'testimonials.b.name': '林博士',
    'testimonials.b.company': '示範研究院',
    'testimonials.logoPlaceholder': 'Logo（假圖）',

    'team.eyebrow': '我們的願景',
    'team.vision1':
      '我們相信 AI 能改變工程與設計產業的工作方式。透過整合最先進的人工智慧與豐富的專業知識，我們致力於讓每一位專業使用者都能以更高效、更精準的方式完成工作。',
    'team.vision2': '我們正在打造的不只是一個工具，而是一個能與產業專家合作的 AI 夥伴，讓科技真正解決產業問題。',
    'team.founderName': '陳大明',
    'team.founderTitle': '創辦人暨執行長',
    'team.photoPlaceholder': '創辦人照片（假圖）',

    'articles.eyebrow': '文章',
    'articles.title': '最新消息',
    'updates.eyebrow': '文章',
    'updates.title': '最新消息',
    'updates.description': 'Nexora AI 的產品發布、公司消息與團隊動態。',
    'updates.all': '所有更新',
    'updates.readNext': '繼續閱讀',
    'category.product': '產品',
    'category.company': '公司',
    'category.event': '活動',

    'cta.title': '邀請您用 AI 自動化您的工作流程',
    'cta.subtitle': '留下您的聯繫方式，或透過 Email 聯繫我們。',
    'cta.bookDemo': '預約 Demo',

    'requestDemo.eyebrow': '預約 Demo',
    'requestDemo.featureTitle': '開始自動化您的工作流程',
    'requestDemo.subtitle': '填寫表單後，我們的團隊將與您聯絡，依照您的團隊需求安排 30 分鐘的線上示範。',
    'requestDemo.feature.automation': 'AI 自動化各種專業流程',
    'requestDemo.feature.native': '原生整合主流設計工具',
    'requestDemo.feature.skills': '建立公司內部 AI 技能庫',
    'requestDemo.feature.members': '輕鬆管理成員與權限',
    'requestDemo.feature.privacy': '不會使用您的資料進行訓練',
    'requestDemo.contactFallback': '想透過 Email 聯絡？請寫信至',
    'requestDemo.orCall': '或來電',
    'requestDemo.formTitle': '告訴我們您的團隊需求',
    'requestDemo.formSubtitle': '我們的團隊將與您聯絡並安排 Demo。標示 * 為必填。',
    'requestDemo.firstName': '名字 *',
    'requestDemo.lastName': '姓氏 *',
    'requestDemo.workEmail': '公司 Email *',
    'requestDemo.company': '公司名稱 *',
    'requestDemo.companySize': '團隊規模 *',
    'requestDemo.jobTitle': '職稱 *',
    'requestDemo.phone': '電話或其他聯繫方式',
    'requestDemo.phonePlaceholder': '例如 LINE ID',
    'requestDemo.message': '您目前的工作流程中，有哪些「如果能自動化就差很多」的工作？',
    'requestDemo.selectPlaceholder': '請選擇',
    'requestDemo.size.xs': '1–5 人',
    'requestDemo.size.s': '6–20 人',
    'requestDemo.size.m': '21–50 人',
    'requestDemo.size.l': '51–200 人',
    'requestDemo.size.xl': '200 人以上',
    'requestDemo.required': '此欄位為必填。',
    'requestDemo.emailInvalid': '請輸入有效的公司 Email。',
    'requestDemo.consent': '送出即表示您同意我們的',
    'requestDemo.privacyPolicy': '隱私權政策',
    'requestDemo.submit': '送出預約',
    'requestDemo.submitting': '送出中…',
    'requestDemo.successTitle': '謝謝您，我們已收到您的預約。',
    'requestDemo.successBody': '我們的團隊將盡快與您聯絡安排 Demo。',
    'requestDemo.backHome': '回首頁',
    'requestDemo.error': '目前無法送出預約，請再試一次或直接寄信聯絡我們。',

    'footer.resources': '資源',
    'footer.docs': '文件',
    'footer.terms': '服務條款',
    'footer.privacy': '隱私權政策',
    'footer.contact': '聯絡我們',
    'footer.badge': '合作標章（假圖）',
    'footer.note': '本網站內容皆為示意假字與假圖。',

    'legal.home': '回首頁',
    'legal.terms': '服務條款',
    'legal.privacy': '隱私權政策',
    'legal.effective': '生效日期：2026 年 1 月 1 日（假字示意）',
    'legal.zhOnly': '本文件為具法律效力之版本，僅提供繁體中文。',
  },
  en: {
    name: 'Nexora AI',
    slogan: 'AI Agent for Engineering Teams',
    'meta.description':
      'Nexora AI is an AI agent built for engineering and design teams. Turn natural language into code, package reusable Skills, and automate complex professional workflows.',
    'header.bookDemo': 'Book a Demo',
    'header.toggleLang': 'Toggle language',
    'header.toggleMenu': 'Toggle menu',
    'nav.features': 'Features',
    'nav.changelog': 'Changelog',
    'nav.updates': 'Updates',

    'hero.subtitle': 'Generate code, build reusable Skills, and automate complex professional workflows.',
    'hero.bookDemo': 'Book a Demo',
    'hero.demoTitle': 'Automate modeling with AI',
    'hero.familyTitle': 'Generate and fine-tune component libraries',
    'hero.clashTitle': 'Clash detection and issue generation',
    'hero.demosLabel': 'Product demos',
    'hero.previousDemo': 'Previous demo',
    'hero.nextDemo': 'Next demo',

    'authorizedDeveloper.title': 'Nexora AI is an Authorized Developer Partner',
    'authorizedDeveloper.description': 'Building dependable, practical AI solutions on leading design platforms.',
    'authorizedDeveloper.badge': 'Partner badge (placeholder)',

    'features.title': 'Core Features',
    'features.subtitle': 'An AI agent that truly understands your domain, from generating code to running it natively inside your design tools.',
    'features.codegen.title': 'AI Code Generation',
    'features.codegen.description': 'Turns your instructions into executable code in real time, ready for modeling, model checking, clash review, and other complex workflows.',
    'features.skills.title': 'AI Skills System',
    'features.skills.description': 'Package AI-generated workflows as reusable Skills, refine them with AI, and share them across your organization.',
    'features.knowledge.title': 'Domain Knowledge Base',
    'features.knowledge.description': 'Preloaded with industry best practices, technical documentation, and regulatory knowledge so every task is executed with precision.',
    'features.native.title': 'Native Design Tool Integration',
    'features.native.description': 'Runs as a native add-in for leading design tools, executing generated code directly inside the software.',
    'features.models.title': 'Latest AI Models',
    'features.models.description': 'Access the latest large language models to support every workflow.',
    'features.governance.title': 'Enterprise AI Governance',
    'features.governance.description': 'Manage user permissions, usage quotas, and cloud Skills to meet your organization’s AI governance needs.',
    'features.logoPlaceholder': 'Logo (placeholder)',

    'stats.eyebrow': 'By the numbers',
    'stats.title': 'Built for measurable impact',
    'stats.skills': 'Skills generated',
    'stats.accuracy': 'Code accuracy rate',
    'stats.productivity': 'Productivity boost / user / month',
    'stats.hours': 'Hours saved / user / month',

    'testimonials.eyebrow': 'Testimonials',
    'testimonials.title': 'What clients are saying',
    'testimonials.a.quote':
      'Nexora AI turns natural language into code to automate workflows, then saves them as reusable Skills, opening new possibilities for technology and the transfer of expertise. (Placeholder)',
    'testimonials.a.name': 'CTO Wang',
    'testimonials.a.company': 'Example Group',
    'testimonials.b.quote':
      'With Nexora AI, standardized checks became automated programs, dramatically shortening model acceptance and safeguarding delivery quality for owners. (Placeholder)',
    'testimonials.b.name': 'Dr. Lin',
    'testimonials.b.company': 'Example Research Institute',
    'testimonials.logoPlaceholder': 'Logo (placeholder)',

    'team.eyebrow': 'Our Vision',
    'team.vision1':
      'We believe AI has the power to fundamentally transform the way engineering and design professionals work. By combining AI with deep domain expertise, we are dedicated to helping every professional work more efficiently and precisely.',
    'team.vision2': 'We are building more than a tool: an AI partner that collaborates with industry experts, letting technology truly solve industry problems.',
    'team.founderName': 'Da-Ming Chen',
    'team.founderTitle': 'Founder & CEO',
    'team.photoPlaceholder': 'Founder photo (placeholder)',

    'articles.eyebrow': 'Insights',
    'articles.title': 'Latest Updates',
    'updates.eyebrow': 'Newsroom',
    'updates.title': 'Latest Updates',
    'updates.description': 'Product releases, company news, and notes from the team building Nexora AI.',
    'updates.all': 'All updates',
    'updates.readNext': 'Read next',
    'category.product': 'Product',
    'category.company': 'Company',
    'category.event': 'Event',

    'cta.title': 'Ready to automate your workflow with AI?',
    'cta.subtitle': 'Leave your contact information or reach us by email.',
    'cta.bookDemo': 'Book a Demo',

    'requestDemo.eyebrow': 'Request a demo',
    'requestDemo.featureTitle': 'Start automating your workflow',
    'requestDemo.subtitle': 'After you submit the form, our team will reach out to schedule a 30-minute online demo tailored to your team.',
    'requestDemo.feature.automation': 'Automate a wide range of professional workflows with AI',
    'requestDemo.feature.native': 'Integrate natively with leading design tools',
    'requestDemo.feature.skills': 'Build an internal AI Skills library',
    'requestDemo.feature.members': 'Manage members and permissions with ease',
    'requestDemo.feature.privacy': 'Your data is never used for training',
    'requestDemo.contactFallback': 'Prefer email? Contact us at',
    'requestDemo.orCall': 'or call',
    'requestDemo.formTitle': 'Tell us about your team',
    'requestDemo.formSubtitle': 'Our team will be in touch to schedule your demo. Fields marked * are required.',
    'requestDemo.firstName': 'First name *',
    'requestDemo.lastName': 'Last name *',
    'requestDemo.workEmail': 'Work email *',
    'requestDemo.company': 'Company *',
    'requestDemo.companySize': 'Team size *',
    'requestDemo.jobTitle': 'Job title *',
    'requestDemo.phone': 'Phone or other contact',
    'requestDemo.phonePlaceholder': 'e.g. LINE ID',
    'requestDemo.message': 'What are the pain points in your current workflow?',
    'requestDemo.selectPlaceholder': 'Select an option',
    'requestDemo.size.xs': '1–5 people',
    'requestDemo.size.s': '6–20 people',
    'requestDemo.size.m': '21–50 people',
    'requestDemo.size.l': '51–200 people',
    'requestDemo.size.xl': '200+ people',
    'requestDemo.required': 'This field is required.',
    'requestDemo.emailInvalid': 'Enter a valid work email.',
    'requestDemo.consent': 'By submitting, you agree to our',
    'requestDemo.privacyPolicy': 'Privacy Policy',
    'requestDemo.submit': 'Request a demo',
    'requestDemo.submitting': 'Sending…',
    'requestDemo.successTitle': 'Thank you — we have your request.',
    'requestDemo.successBody': 'Our team will be in touch shortly to arrange your demo.',
    'requestDemo.backHome': 'Back to home',
    'requestDemo.error': 'We could not send your request. Please try again or email us directly.',

    'footer.resources': 'Resources',
    'footer.docs': 'Documentation',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.contact': 'Contact',
    'footer.badge': 'Partner badge (placeholder)',
    'footer.note': 'All content on this site is placeholder text and imagery.',

    'legal.home': 'Back to home',
    'legal.terms': 'Terms of Service',
    'legal.privacy': 'Privacy Policy',
    'legal.effective': 'Effective date: January 1, 2026 (placeholder)',
    'legal.zhOnly': 'This document is the legally binding version and is maintained in Traditional Chinese only.',
  },
} as const;

export type Key = keyof typeof dict.zh;

/** BCP 47 語言標籤（html lang、hreflang、inLanguage 共用） */
export const langTag = (lang: Lang) => (lang === 'en' ? 'en' : 'zh-Hant');

/** 取得目前頁面語言 */
export const useLang = (astro: { currentLocale?: string }): Lang => (astro.currentLocale === 'en' ? 'en' : 'zh');

/** 建立翻譯函式：const $ = tr(lang); $('nav.features') */
export const tr = (lang: Lang) => (key: Key): string => dict[lang][key];

/** getStaticPaths 用：中文不帶前綴、英文帶 /en */
export const langPaths = () => [{ params: { lang: undefined }, props: { lang: 'zh' as Lang } }, { params: { lang: 'en' }, props: { lang: 'en' as Lang } }];

/** 部署子路徑（astro.config 的 `base`），不含結尾斜線；部署在根路徑時為空字串 */
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** 依語言加上路徑前綴，並補上部署子路徑 */
export const localePath = (lang: Lang, path: string) => `${base}${lang === 'zh' ? path : `/en${path === '/' ? '/' : path}`}`;

/** 同一頁切換到另一語言的網址（pathname 來自 Astro.url.pathname，已含 base） */
export function switchLangPath(lang: Lang, pathname: string) {
  const path = (base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname) || '/';
  if (lang === 'zh') return `${base}/en${path === '/' ? '/' : path}`;
  const stripped = path.replace(/^\/en(?=\/|$)/, '');
  return `${base}${stripped || '/'}`;
}

/** 分類 key（product / company / event）→ 字典 key */
export const categoryKey = (c: string): Key => `category.${c}` as Key;

export function formatDate(date: Date, lang: Lang = 'zh', style: 'short' | 'spaced' = 'short') {
  if (lang === 'en') {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: style === 'spaced' ? 'long' : 'short', day: 'numeric' }).format(date);
  }
  if (style === 'spaced') return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日`;
  return new Intl.DateTimeFormat('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
}

/** 條目 id 形如 `zh/<slug>`、`en/<slug>`；拆出語系與 slug */
const splitId = (id: string) => {
  const i = id.indexOf('/');
  return { lang: id.slice(0, i) as Lang, slug: id.slice(i + 1) };
};

/** 以 slug 把 `zh/<slug>` 與 `en/<slug>` 條目配成一對（以中文為主，英文可缺） */
export function pairEntries<T extends { id: string }>(entries: T[]): { slug: string; zh: T; en?: T }[] {
  const en = new Map(entries.filter((e) => e.id.startsWith('en/')).map((e) => [splitId(e.id).slug, e]));
  return entries
    .filter((e) => e.id.startsWith('zh/'))
    .map((zh) => {
      const { slug } = splitId(zh.id);
      return { slug, zh, en: en.get(slug) };
    });
}

/** 依語言挑出條目（英文缺檔時回退中文） */
export const pick = <T>(pair: { zh: T; en?: T }, lang: Lang): T => (lang === 'en' && pair.en ? pair.en : pair.zh);

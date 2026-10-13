export const site = {
  name: 'Nexora AI',
  slogan: '為工程團隊打造的 AI 工作夥伴',
  description:
    'Nexora AI 是專為工程與設計團隊打造的 AI 代理。以自然語言生成程式碼、封裝可重複使用的技能，並自動化各種複雜的專業工作流程。',
  email: 'support@example.com',
  phone: '+886 2 1234-5678',
  phoneHref: '+886212345678',
  company: '範例智能科技股份有限公司',
  docsUrl: '#',
  linkedinUrl: '#',
};

export const nav = [
  { href: '/#features', label: '功能' },
  { href: '/changelog', label: '更新日誌' },
  { href: '/updates', label: '最新消息' },
];

export const heroDemos = [
  { title: '用 AI 自動化模型建置' },
  { title: '生成與微調元件庫' },
  { title: '碰撞檢查與問題單生成' },
];

export const features = [
  {
    id: 'codegen',
    icon: 'code',
    title: 'AI 程式碼生成',
    description: '將您的指令即時轉換成可執行的程式碼，用於建模、模型檢核、碰撞檢討等各種複雜流程。',
  },
  {
    id: 'skills',
    icon: 'layers',
    title: 'AI 技能系統',
    description: '將 AI 生成的工作流程封裝為可重複使用的技能，透過 AI 編輯，並在組織內分享。',
  },
  {
    id: 'knowledge',
    icon: 'book',
    title: '專業知識庫',
    description: '內建產業最佳實務、技術文件與法規知識，讓 AI 能精準地完成各種任務。',
  },
  {
    id: 'native',
    icon: 'plug',
    contain: true,
    title: '原生整合設計工具',
    description: '以原生外掛形式運行於主流設計工具，直接在軟體內執行生成的程式碼。',
  },
  {
    id: 'models',
    icon: 'sparkles',
    contain: true,
    title: '最新 AI 模型',
    description: '支援最新的大型語言模型，協助您完成各種工作流程。',
  },
  {
    id: 'governance',
    icon: 'shield',
    title: '企業 AI 治理',
    description: '透過用戶權限管理、額度管理與雲端技能管理，滿足企業導入 AI 的治理需求。',
  },
];

export const stats = [
  { value: '3,600+', label: '已生成技能' },
  { value: '~92%', label: '程式碼準確率' },
  { value: '~25%', label: '每位使用者每月生產力提升' },
  { value: '40+', label: '每位使用者每月節省工時' },
];

export const founder = {
  name: '陳大明',
  title: '創辦人暨執行長',
  linkedin: '#',
};

export const testimonials = [
  {
    quote:
      'Nexora AI 將自然語言轉為程式碼以自動化工作流程，並可儲存為可重複使用的技能，為技術發展與專業傳承帶來新的可能。（假字示意）',
    name: '王科技長',
    role: '科技長',
    company: '示範集團',
  },
  {
    quote:
      '透過 Nexora AI，我們將標準化檢核作業寫成自動化程式，大幅縮短模型驗收時間，為業主守住專案交付品質。（假字示意）',
    name: '林博士',
    role: '研究員',
    company: '示範研究院',
  },
];

export const demoFeatures = [
  'AI 自動化各種專業流程',
  '原生整合主流設計工具',
  '建立公司內部 AI 技能庫',
  '輕鬆管理成員與權限',
  '不會使用您的資料進行訓練',
];

export const teamSizes = ['1–5 人', '6–20 人', '21–50 人', '51–200 人', '200 人以上'];

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
}

/** 更新日誌用的日期格式：2026 年 9 月 30 日 */
export function formatDateSpaced(date: Date) {
  return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日`;
}

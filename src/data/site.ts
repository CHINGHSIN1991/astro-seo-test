import type { Key } from '../i18n';

export const site = {
  name: 'Nexora AI',
  email: 'support@example.com',
  phone: '+886 2 1234-5678',
  phoneHref: '+886212345678',
  company: '範例智能科技股份有限公司',
  docsUrl: '#',
  linkedinUrl: '#',
};

export const nav: { href: string; key: Key }[] = [
  { href: '/#features', key: 'nav.features' },
  { href: '/changelog', key: 'nav.changelog' },
  { href: '/updates', key: 'nav.updates' },
];

export const heroDemos: { key: Key }[] = [{ key: 'hero.demoTitle' }, { key: 'hero.familyTitle' }, { key: 'hero.clashTitle' }];

/** 六大功能；contain = 以 Logo 型小圖呈現 */
export const features: { id: string; contain?: boolean }[] = [
  { id: 'codegen' },
  { id: 'skills' },
  { id: 'knowledge' },
  { id: 'native', contain: true },
  { id: 'models', contain: true },
  { id: 'governance' },
];

export const stats: { value: string; key: Key }[] = [
  { value: '3,600+', key: 'stats.skills' },
  { value: '~92%', key: 'stats.accuracy' },
  { value: '~25%', key: 'stats.productivity' },
  { value: '40+', key: 'stats.hours' },
];

export const testimonials: { id: 'a' | 'b' }[] = [{ id: 'a' }, { id: 'b' }];

export const founder = { linkedin: '#' };

export const demoFeatures: Key[] = [
  'requestDemo.feature.automation',
  'requestDemo.feature.native',
  'requestDemo.feature.skills',
  'requestDemo.feature.members',
  'requestDemo.feature.privacy',
];

export const teamSizes: { value: string; key: Key }[] = [
  { value: '1-5', key: 'requestDemo.size.xs' },
  { value: '6-20', key: 'requestDemo.size.s' },
  { value: '21-50', key: 'requestDemo.size.m' },
  { value: '51-200', key: 'requestDemo.size.l' },
  { value: '200+', key: 'requestDemo.size.xl' },
];

import { assets } from './assets';
import type { CaseStudy, ContactLink, NavItem, SkillGroup } from './types';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://svitich-margarita.vercel.app';

export const CONTACTS = {
  telegram: 'https://t.me/m_svitsich',
  email: 'ri.kakhanovich@gmail.com',
  linkedin: 'https://www.linkedin.com/in/margarita-svitsich-105b11339',
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: 'Обо мне', href: '/#about' },
  { label: 'Проекты', href: '/#projects' },
  { label: 'Резюме', href: '/assets/resume.pdf', external: true },
];

export const CASES: CaseStudy[] = [
  {
    slug: 't-bank-robot-delivery',
    title: 'Доставка карты роботом\nв Т-Банке',
    description:
      'Спроектировала флоу доставки банковских карт с помощью робота в приложении Т-Банка. Решила ключевые UX-задачи нового сценария: доверие, безопасность, идентификация пользователя и понятность процесса получения карты.',
    tags: [
      { label: 'B2C', variant: 'yellow' },
      { label: 'FinTech', variant: 'blue' },
      { label: 'Mobile app', variant: 'green' },
    ],
    inProgress: false,
    coverSrc: '/assets/cases/covers/t-bank-cover.png',
  },
  {
    slug: 'loooma',
    title: 'Loooma - сервис для управления гардеробом',
    description:
      'Спроектировала сервис, который помогает пользователям оцифровать гардероб, создавать образы с помощью AI и находить новых владельцев для ненужных вещей.',
    tags: [
      { label: 'B2C', variant: 'yellow' },
      { label: 'Fashion Tech', variant: 'pink' },
      { label: 'Recommerce', variant: 'blue' },
      { label: 'Mobile app', variant: 'green' },
    ],
    inProgress: true,
    coverSrc: '/assets/cases/covers/loooma-cover.png',
  },
];

export const ABOUT_TEXT = [
  'Пришла в продуктовый дизайн из архитектуры, поэтому мне близок системный подход к решению задач. В работе опираюсь на исследования, анализ пользовательского опыта и логику продукта.',
  'Люблю превращать сложные процессы в понятный пользовательский опыт и создавать интерфейсы, которые не только помогают решать задачи, но и формирует эмоциональную связь между пользователем и продуктом.',
];

export const EDUCATION = [
  {
    period: '2018 - 2023',
    title: 'Архитектурный дизайн',
    subtitle: 'Брестский государственный университет (БрГТУ)',
  },
  {
    period: '2025 - 2026',
    title: 'FormFactor school',
    subtitle: 'Курсы продуктового дизайна с менторской программой',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'ux',
    variant: 'blue',
    skills: [
      'Глубинные интервью',
      'JTBD',
      'Количественные исследования',
      'Информационная Архитектура',
      'Юзабилити-тесты',
      'User Flow',
      'Прототипирование',
    ],
  },
  {
    id: 'ui',
    variant: 'pink',
    skills: [
      'Типографика',
      'Дизайн-системы',
      'Композиция',
      'Адаптивный дизайн',
      'Цвет',
      'Токены и компоненты',
      'Визуальная иерархия',
    ],
  },
  {
    id: 'pm',
    variant: 'green',
    skills: [
      'Формирование и валидация гипотез',
      'User Flow',
      'Метрики продукта',
      'Анализ аудитории',
    ],
  },
];

export const FOOTER_LINKS: ContactLink[] = [
  { label: 'Резюме', href: '/assets/resume.pdf', icon: '', colorClass: 'blue' },
  {
    label: 'Telegram',
    href: CONTACTS.telegram,
    icon: assets.footerTelegram,
    colorClass: 'blue',
  },
  {
    label: 'Mail',
    href: `mailto:${CONTACTS.email}`,
    icon: assets.footerMail,
    colorClass: 'yellow',
  },
  {
    label: 'Linkedin',
    href: CONTACTS.linkedin,
    icon: assets.footerLinkedin,
    colorClass: 'green',
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}

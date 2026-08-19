import { assets } from '@/lib/assets';
import type { CaseRichBlock } from '@/lib/types';

const A = assets.caseTBank;

export const T_BANK_ONBOARDING_GALLERY: CaseRichBlock = {
  type: 'screen-gallery',
  layout: 'phones',
  groups: [
    {
      items: [12, 11, 7].map((n) => ({
        src: A.onboardingScreens[n - 1],
        alt: `Вариант онбординга: светлый минималистичный, экран ${n}`,
      })),
    },
    {
      items: [10, 9, 8, 2, 1].map((n) => ({
        src: A.onboardingScreens[n - 1],
        alt: `Вариант онбординга: иллюстрация с облаками, экран ${n}`,
      })),
    },
    {
      items: [13, 14].map((n) => ({
        src: A.onboardingScreens[n - 1],
        alt: `Вариант онбординга: мягкий голубой фон, экран ${n}`,
      })),
    },
    {
      items: [3, 4, 5, 6].map((n) => ({
        src: A.onboardingScreens[n - 1],
        alt: `Вариант онбординга: тёмная тема, экран ${n}`,
      })),
    },
    {
      items: [15, 16].map((n) => ({
        src: A.onboardingScreens[n - 1],
        alt: `Вариант онбординга: жёлтое свечение, экран ${n}`,
      })),
    },
  ],
};

export const T_BANK_QR_GALLERY: CaseRichBlock = {
  type: 'screen-gallery',
  layout: 'phones',
  items: [1, 6, 4, 3, 2, 5].map((n) => ({
    src: A.qrScreens[n - 1],
    alt: `Вариант экрана QR-кода ${n}`,
  })),
};

export const T_BANK_GRAPHICS_GALLERIES: CaseRichBlock[] = [
  { type: 'heading', text: 'Онбординг' },
  T_BANK_ONBOARDING_GALLERY,
  { type: 'heading', text: 'Экран QR-кода' },
  T_BANK_QR_GALLERY,
];

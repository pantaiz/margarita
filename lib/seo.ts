import type { Metadata } from 'next';
import { CONTACTS, SITE_URL } from './constants';

const title = 'Свитич Маргарита — Продуктовый дизайнер';
const description =
  'Портфолио продуктового дизайнера Маргариты Свитич. Кейсы в FinTech и mobile, UX-исследования, прототипирование и дизайн-системы.';

export const siteMetadata: Metadata = {
  title,
  description,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title,
    description,
    locale: 'ru_RU',
    type: 'website',
    siteName: 'Свитич Маргарита',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
};

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Свитич Маргарита',
  jobTitle: 'Продуктовый дизайнер',
  email: CONTACTS.email,
  sameAs: [CONTACTS.telegram, CONTACTS.linkedin],
  url: SITE_URL,
};

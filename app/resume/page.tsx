import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Резюме — Свитич Маргарита',
  description: 'Резюме продуктового дизайнера Маргариты Свитич.',
  alternates: {
    canonical: '/resume',
  },
};

function getCountryCode(headerStore: Headers): string {
  return (
    headerStore.get('x-vercel-ip-country') ??
    headerStore.get('cf-ipcountry') ??
    headerStore.get('x-country-code') ??
    ''
  ).toUpperCase();
}

export default async function ResumePage() {
  const headerStore = await headers();
  const isBelarus = getCountryCode(headerStore) === 'BY';

  redirect(isBelarus ? '/assets/resume-by.pdf' : '/assets/resume.pdf');
}

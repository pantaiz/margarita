import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Резюме — Свитич Маргарита',
  description: 'Резюме продуктового дизайнера Маргариты Свитич.',
  alternates: {
    canonical: '/resume',
  },
};

export default function ResumePage() {
  redirect('/assets/resume.pdf');
}

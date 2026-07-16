import type { Metadata } from 'next';
import { fontBenzin, fontGilroy, fontZeequada } from '@/lib/fonts';
import '@/styles/globals.css';
import { siteMetadata, personJsonLd } from '@/lib/seo';

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${fontGilroy.variable} ${fontZeequada.variable} ${fontBenzin.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

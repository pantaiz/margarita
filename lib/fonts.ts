import localFont from 'next/font/local';

export const fontGilroy = localFont({
  src: [
    {
      path: '../public/fonts/gilroy-regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/gilroy-medium.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-gilroy',
  display: 'swap',
});

export const fontBenzin = localFont({
  src: [
    {
      path: '../public/fonts/benzin-medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-benzin',
  display: 'swap',
});

export const fontZeequada = localFont({
  src: [
    {
      path: '../public/fonts/zeequada-regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-zeequada',
  display: 'swap',
});

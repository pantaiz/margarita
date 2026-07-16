import Image, { type ImageProps } from 'next/image';

function isSvgSrc(src: ImageProps['src']): boolean {
  if (typeof src !== 'string') return false;
  return src.endsWith('.svg');
}

/** Image wrapper: SVG assets skip Next.js optimizer (required for local SVG). */
export default function AppImage({ src, unoptimized, ...props }: ImageProps) {
  return (
    <Image
      src={src}
      unoptimized={unoptimized ?? isSvgSrc(src)}
      {...props}
    />
  );
}

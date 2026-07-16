type CaseImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

/** Static case assets — native img avoids Next/Image decode issues for local files. */
export default function CaseImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
}: CaseImageProps) {
  const sizeProps =
    width && height && !className ? { width, height } : undefined;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      {...sizeProps}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
    />
  );
}

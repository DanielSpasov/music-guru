export default function Image({
  src = 'images/logo/blue-logo192.png',
  alt = 'Image',
  size = 'auto'
}: {
  src?: string;
  alt?: string;
  size?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: size,
        height: size
      }}
    />
  );
}

import Image from "next/image";

/** Icon-only mark — for full lockup (icon + name), use BrandWordmark. */
export function BrandMark({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src="/logo.png"
      alt="Convolios"
      width={size}
      height={size}
      draggable={false}
      className={`brand-mark ${className ?? ""}`.trim()}
    />
  );
}

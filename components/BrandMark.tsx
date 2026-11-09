import { LogoImg } from "@/components/LogoImg";

/** Icon-only mark. For the full lockup (icon + name), use BrandWordmark. */
export function BrandMark({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <LogoImg
      size={size}
      alt="Convolios"
      draggable={false}
      className={`brand-mark ${className ?? ""}`.trim()}
    />
  );
}

import Image from "next/image";
import type { CSSProperties } from "react";
import {
  WORDMARK_GAP_EM,
  WORDMARK_ICON_CAP,
  WORDMARK_TEXT_SCALE,
} from "@/lib/wordmark";

function wordmarkStyle(size: number): CSSProperties {
  return {
    fontSize: size,
    "--wordmark-text-scale": WORDMARK_TEXT_SCALE,
    "--wordmark-icon-cap": WORDMARK_ICON_CAP,
    "--wordmark-gap": `${WORDMARK_GAP_EM}em`,
  } as CSSProperties;
}

/** Full lockup — icon + Convolios in Fraunces. For icon-only, use BrandMark. */
export function BrandWordmark({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={`brand-wordmark ${className ?? ""}`.trim()}
      style={wordmarkStyle(size)}
      aria-label="Convolios"
    >
      <span className="brand-wordmark__mark" aria-hidden>
        <Image
          src="/logo.png"
          alt=""
          fill
          draggable={false}
          sizes={`${Math.round(size * 0.8)}px`}
        />
      </span>
      <span className="brand-wordmark__name">Convolios</span>
    </span>
  );
}

import type { ImgHTMLAttributes } from "react";

/**
 * The Convolios logo, a vector: sharp at every size. Keep in sync with convolios
 * `src/components/icons/ConvoliosLogo.tsx` and BRAND.md "Logo"; the file comes from the app's
 * `npm run generate:brand` and `npm run sync:brand-web`.
 * Plain img: the image optimizer has nothing to add to an SVG.
 */
const LOGO_SRC = "/logo.svg";

type LogoImgProps = { size: number } & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet">;

/* eslint-disable @next/next/no-img-element */
export function LogoImg({ size, alt = "", ...img }: LogoImgProps) {
  return <img src={LOGO_SRC} alt={alt} width={size} height={size} {...img} />;
}

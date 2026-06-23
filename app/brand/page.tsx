import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Brand",
  robots: { index: false, follow: false },
};

export default function BrandPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <header className="mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-fg-faint">
          Convolios brand
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Logo</h1>
        <p className="mt-3 max-w-xl text-fg-muted">
          Pixel-art Greek philosopher in a speech bubble. Ancient world, modern inbox.
        </p>
      </header>

      <div className="flex flex-wrap items-end gap-10 border border-line bg-ink-raised p-10">
        <div className="text-center">
          <Image src="/logo.png" alt="Convolios logo" width={128} height={128} />
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
            Primary mark
          </p>
        </div>
        <div className="text-center">
          <Image src="/logo.png" alt="Convolios logo" width={32} height={32} />
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
            32px
          </p>
        </div>
        <div className="text-center">
          <Image src="/logo.png" alt="Convolios logo" width={16} height={16} />
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
            16px
          </p>
        </div>
      </div>

      <p className="mt-6 text-sm text-fg-muted">
        Source file: <code className="font-mono">public/logo.png</code>. See{" "}
        <code className="font-mono">BRAND.md</code> in the main repo for the
        full palette, characters, and voice.
      </p>
    </div>
  );
}

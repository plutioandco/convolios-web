import type { Metadata } from "next";
import { BrandMark } from "@/components/BrandMark";

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
          Engraved Greek philosopher in a speech bubble. Ancient world, modern inbox.
        </p>
      </header>

      <div className="flex flex-wrap items-end gap-10 border border-line bg-ink-raised p-10">
        <div className="text-center">
          <BrandMark size={128} />
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
            Primary mark
          </p>
        </div>
        <div className="text-center">
          <BrandMark size={32} />
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
            32px
          </p>
        </div>
        <div className="text-center">
          <BrandMark size={16} />
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-fg-faint">
            16px
          </p>
        </div>
      </div>

      <p className="mt-6 text-sm text-fg-muted">
        One vector drawing, <code className="font-mono">public/brand/logo.svg</code> in the main repo, sharp at every size. See{" "}
        <code className="font-mono">BRAND.md</code> in the main repo for the
        full palette, characters, and voice.
      </p>
    </div>
  );
}

import Link from "next/link";
import { APP_VERSION } from "@/lib/release";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="inline-block h-3 w-3 bg-fg" aria-hidden />
          <span className="font-mono text-sm font-medium tracking-tight text-fg">
            convolios
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/#features"
            className="hidden text-sm text-fg-muted transition-colors hover:text-fg sm:block"
          >
            Features
          </Link>
          <Link
            href="/#channels"
            className="hidden text-sm text-fg-muted transition-colors hover:text-fg sm:block"
          >
            Channels
          </Link>
          <span className="hidden font-mono text-xs text-fg-faint md:block">
            v{APP_VERSION}
          </span>
          <Link
            href="/download"
            className="border border-fg bg-fg px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-transparent hover:text-fg"
          >
            Download
          </Link>
        </nav>
      </div>
    </header>
  );
}

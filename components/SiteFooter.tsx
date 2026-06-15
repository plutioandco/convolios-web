import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="inline-block h-3 w-3 bg-fg" aria-hidden />
          <span className="font-mono text-sm text-fg-muted">
            convolios © {new Date().getFullYear()}
          </span>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/download" className="text-sm text-fg-muted transition-colors hover:text-fg">
            Download
          </Link>
          <Link href="/#features" className="text-sm text-fg-muted transition-colors hover:text-fg">
            Features
          </Link>
          <a
            href="mailto:hello@convolios.com"
            className="text-sm text-fg-muted transition-colors hover:text-fg"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}

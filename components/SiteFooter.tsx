import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__legal">
          © {new Date().getFullYear()} Plutio LTD, trading as Convolios. Registered in England &amp; Wales, company no. 09856706.
        </p>
        <nav className="site-footer__links" aria-label="Legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="mailto:hello@convolios.com">Contact</a>
        </nav>
      </div>
    </footer>
  );
}

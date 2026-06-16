import Link from "next/link";
import { HeroShowcase } from "@/components/HeroShowcase";
import { APP_VERSION, SITE_URL, DOWNLOADS_BASE } from "@/lib/release";

const CHANNELS = [
  "WhatsApp",
  "LinkedIn",
  "Instagram",
  "Telegram",
  "Email",
  "X DMs",
  "iMessage",
];

const FEATURES = [
  {
    k: "01",
    title: "One inbox, every channel",
    body: "WhatsApp, LinkedIn, Instagram, Telegram, email, X DMs and iMessage land in a single timeline. No more app-switching to follow one relationship.",
  },
  {
    k: "02",
    title: "Organized by person",
    body: "Convolios resolves handles across apps into one human. A contract in email and a follow-up on WhatsApp sit in the same thread — automatically.",
  },
  {
    k: "03",
    title: "AI triage",
    body: "Every inbound message is classified — urgent, human, newsletter, notification, noise — so the things that need you surface first.",
  },
  {
    k: "04",
    title: "Screener",
    body: "Unknown contacts wait in a pending queue. Approve who reaches your main inbox and keep the noise out.",
  },
  {
    k: "05",
    title: "Circles",
    body: "Tag people into Work, Family, Investors or anything else — surfaced as colored rings on avatars across the inbox.",
  },
  {
    k: "06",
    title: "Realtime, always",
    body: "Live updates over Supabase Realtime with automatic fallback polling, so the inbox is never stale.",
  },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Convolios",
    applicationCategory: "CommunicationApplication",
    operatingSystem: "macOS, Windows",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    softwareVersion: APP_VERSION,
    url: SITE_URL,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <HeroShowcase />

      {/* Channels */}
      <section id="channels" className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <p className="eyebrow mb-6">Connected channels</p>
          <div className="flex flex-wrap gap-3">
            {CHANNELS.map((c) => (
              <span
                key={c}
                className="border border-line px-4 py-2 font-mono text-sm text-fg-muted"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="eyebrow mb-3">What it does</p>
          <h2 className="mb-12 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for people who run their relationships across a dozen apps.
          </h2>
          <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.k} className="bg-ink p-8">
                <span className="font-mono text-xs text-fg-faint">{f.k}</span>
                <h3 className="mt-4 text-lg font-medium text-fg">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-24 text-center">
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Stop context-switching. Start with one inbox.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-fg-muted">
            Free during early access. macOS available now, Windows soon.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/download"
              className="border border-fg bg-fg px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-transparent hover:text-fg"
            >
              Download Convolios
            </Link>
          </div>
          <p className="mt-6 font-mono text-xs text-fg-faint">
            {DOWNLOADS_BASE.replace("https://", "")} · v{APP_VERSION}
          </p>
        </div>
      </section>
    </>
  );
}

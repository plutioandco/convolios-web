import Link from "next/link";
import { HeroShowcase, FeatureBento } from "@/components/HeroShowcase";
import { CtaSection } from "@/components/CtaSection";
import { getLatestVersion, SITE_URL } from "@/lib/release";

export default async function Home() {
  const version = await getLatestVersion();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Convolios",
    applicationCategory: "CommunicationApplication",
    operatingSystem: "macOS, Windows",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    softwareVersion: version,
    url: SITE_URL,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroShowcase />

      <div className="body">
        <section id="features" className="bento-section border-b border-line">
          <div className="bento-head">
            <p className="eyebrow">What it does</p>
          </div>
          <FeatureBento />
        </section>

        <section id="your-data" className="data-note border-b border-line">
          <p className="eyebrow">Your accounts and your data</p>
          <h2 className="data-note__title">What Convolios does with your email</h2>
          <p>
            When you connect a Google account, Convolios asks for permission to read, send and organise
            your Gmail. It uses that permission to show your email next to your other conversations,
            grouped by person; to send the replies and reactions you write; and to keep read, starred,
            archived and deleted mail in step with Gmail, both ways. Telegram, X and other email accounts work
            the same way, only when you connect them.
          </p>
          <p>
            Your messages are encrypted with a key for your account and stored in the EU. We never sell
            them, use them for advertising or use them to train AI models. You can disconnect an account
            or delete everything at any time. Convolios&rsquo;s use of information received from Google
            APIs adheres to the{" "}
            <a href="https://developers.google.com/terms/api-services-user-data-policy">
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements. Read the <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </section>

        <CtaSection />
      </div>
    </>
  );
}

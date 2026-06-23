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

        <CtaSection />
      </div>
    </>
  );
}

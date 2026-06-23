"use client";

import Image from "next/image";
import { BrandMark } from "@/components/BrandMark";
import { ChannelGlyph, HERO_CHANNELS } from "@/components/HeroShowcase";
import { DownloadPill } from "@/components/DownloadCta";

export function CtaSection() {
  return (
    <section className="cta-greek">
      <div className="cta-greek__scene" aria-hidden>
        <Image
          src="/brand/onboarding/vista-temple.jpg"
          alt=""
          fill
          sizes="100vw"
          className="cta-greek__bg"
        />
      </div>
      <div className="cta-greek__wash" aria-hidden />
      <div className="cta-greek__inner">
        <BrandMark className="cta-greek__mark" size={72} />
        <h2 className="cta-greek__title">
          One inbox for all your chats, powered by AI.
        </h2>
        <div className="cta-greek__chans" aria-hidden>
          {HERO_CHANNELS.map((channel) => (
            <ChannelGlyph key={channel} channel={channel} />
          ))}
        </div>
        <div className="cta-greek__actions">
          <DownloadPill />
        </div>
      </div>
    </section>
  );
}

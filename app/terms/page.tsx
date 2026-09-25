import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply when you use Convolios.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "25 September 2026";

export default function TermsPage() {
  return (
    <article className="legal">
      <h1>Terms of Service</h1>
      <p className="legal__meta">Last updated: {UPDATED}</p>

      <p>
        These terms are an agreement between you and <strong>Plutio LTD</strong> (company no. 09856706,
        England &amp; Wales), trading as Convolios (“we”). By using Convolios you agree to them. Our{" "}
        <Link href="/privacy">Privacy Policy</Link> explains how we handle your data.
      </p>

      <h2>1. The service</h2>
      <p>
        Convolios is an app that brings your email and messaging accounts into one inbox organised by
        person, with optional AI features. Features may change as we improve the product. During the
        beta, some features may be limited or unavailable.
      </p>

      <h2>2. Your account</h2>
      <ul>
        <li>You must be at least 16 and able to agree to these terms.</li>
        <li>Keep your sign-in secure. You are responsible for activity under your account.</li>
        <li>Only connect accounts you own or are authorised to use.</li>
      </ul>

      <h2>3. Connected services</h2>
      <p>
        When you connect Gmail, Outlook, another email provider or a messaging service, you authorise us
        to access that account on your behalf to provide Convolios. Those services are run by third
        parties under their own terms, which still apply to you. We are not responsible for their
        availability or decisions.
      </p>
      <p>
        Some messaging services do not offer an official way for apps like Convolios to connect. Where
        we support such a service, we will say so before you connect it. Connecting it may break that
        service’s terms, and the service could restrict or suspend your account. You connect it at your
        own choice and risk, and we may stop supporting it at any time.
      </p>

      <h2>4. Acceptable use</h2>
      <p>You agree not to use Convolios to:</p>
      <ul>
        <li>send spam, bulk or automated messages, or unsolicited messages to people you don’t know;</li>
        <li>break the law or anyone’s rights, or harass or deceive anyone;</li>
        <li>access accounts or data you are not authorised to access;</li>
        <li>interfere with, reverse engineer, or overload the service, except where the law allows it.</li>
      </ul>

      <h2>5. AI features</h2>
      <p>
        AI features can make mistakes. Check summaries, answers and drafts before relying on them.
        Convolios never sends a message on your behalf without your confirmation. You can turn AI
        features off.
      </p>

      <h2>6. Your content</h2>
      <p>
        Your messages and data remain yours. You give us permission to process them only to provide and
        improve Convolios for you, as described in the Privacy Policy.
      </p>

      <h2>7. Plans and payment</h2>
      <p>
        Convolios is free during the beta. When paid plans launch, prices and any usage limits (for
        example on AI features) will be shown before you subscribe. Payments are handled by our payment
        provider, which acts as the merchant of record.
      </p>

      <h2>8. Ending your use</h2>
      <p>
        You can disconnect accounts or delete your Convolios account at any time. We may suspend or end
        access if you seriously or repeatedly break these terms, or if required by law or by a connected
        service. Where reasonable, we will tell you first.
      </p>

      <h2>9. Disclaimers and liability</h2>
      <p>
        We work hard to keep Convolios reliable and secure, but the service is provided “as is” and we
        cannot promise it will be uninterrupted or error-free. To the extent the law allows, we are not
        liable for indirect or consequential losses, or for losses caused by connected services, and our
        total liability is limited to the amount you paid us in the 12 months before the claim (or £100
        if you paid nothing). Nothing in these terms limits liability that cannot be limited by law, or
        your rights as a consumer.
      </p>

      <h2>10. Changes to these terms</h2>
      <p>
        We may update these terms. We will tell you about significant changes in the app or by email
        before they take effect. If you keep using Convolios after that, the new terms apply.
      </p>

      <h2>11. Law</h2>
      <p>
        These terms are governed by the laws of England &amp; Wales. If you are a consumer, you also keep
        the protection of the mandatory laws of the country where you live, and you can bring
        proceedings there.
      </p>

      <h2>12. Contact</h2>
      <p>
        Plutio LTD (trading as Convolios), 1 Lyric Square, London W6 0NB, United Kingdom.{" "}
        <a href="mailto:hello@convolios.com">hello@convolios.com</a>
      </p>
    </article>
  );
}

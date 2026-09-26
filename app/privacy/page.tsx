import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Convolios collects, uses, stores and protects your data, including data from Google and Microsoft accounts.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "26 September 2026";

export default function PrivacyPage() {
  return (
    <article className="legal">
      <h1>Privacy Policy</h1>
      <p className="legal__meta">Last updated: {UPDATED}</p>

      <p>
        Convolios brings your conversations from email and messaging services into one inbox,
        organised by person, with optional AI features for search, summaries and drafting. This
        policy explains what data we handle, why, where it is stored, who helps us process it, and
        the choices you have.
      </p>

      <h2>1. Who we are</h2>
      <p>
        Convolios is operated by <strong>Plutio LTD</strong>, a company registered in England &amp; Wales
        (company no. 09856706), trading as Convolios. We are the controller of the personal data
        described here. Contact us at <a href="mailto:hello@convolios.com">hello@convolios.com</a>.
      </p>

      <h2>2. Data we handle</h2>
      <ul>
        <li><strong>Your account:</strong> your email address, sign-in records, and settings.</li>
        <li>
          <strong>Connected accounts:</strong> when you connect Gmail, another email provider (over
          IMAP), Telegram, X (Twitter) direct messages or another messaging service, we receive the
          messages in that account (content, subject, attachments, reactions), their metadata
          (senders, recipients, dates, labels, folders, read state), and the credentials needed to
          stay connected (for example OAuth tokens, an app password or a Telegram session).
        </li>
        <li>
          <strong>People you communicate with:</strong> names, addresses and message content from people
          who write to you or whom you write to, because they appear in your connected accounts.
        </li>
        <li>
          <strong>Data we create for you:</strong> how messages are grouped by person, labels such as
          “urgent” or “newsletter”, search indexes, summaries, drafts, and a profile of your writing
          style if you use drafting.
        </li>
        <li>
          <strong>Device and diagnostics:</strong> app version, device type, push-notification tokens,
          and error reports. Diagnostics never include message content.
        </li>
        <li><strong>Billing</strong> (when paid plans launch): handled by our payment provider; we do not store card numbers.</li>
      </ul>

      <h2>3. How we use it</h2>
      <p>We use your data only to provide and improve the features you use:</p>
      <ul>
        <li>syncing your connected accounts so your inbox is up to date on all your devices, including while they are off;</li>
        <li>showing, searching, sending, replying to and organising your messages at your request;</li>
        <li>AI features you choose to use: sorting, search answers, summaries of a person or thread, and reply drafts;</li>
        <li>notifications about new messages and about accounts that need reconnecting;</li>
        <li>keeping the service secure, preventing abuse, and fixing problems.</li>
      </ul>
      <p>
        We do not sell your data, use it for advertising, or let anyone use it to train general AI
        models. Your writing-style profile is used only for your own drafts, and you can view and
        delete it.
      </p>

      <h2>4. Data from Google and Microsoft accounts</h2>
      <p>
        If you connect a Google account, Convolios requests permission to read, send and organise your
        Gmail messages (the <code>gmail.modify</code> scope), plus your email address to identify the
        account, so it can sync your mailbox (including changes you make in Gmail), send the emails and
        reactions you write, and make the changes you make in Convolios (read, starred, archived,
        moved to Trash) in Gmail too. Convolios never permanently deletes your email. If
        you connect a Microsoft account, we request equivalent permissions for Outlook mail.
      </p>
      <p>
        Convolios’s use and transfer to any other app of information received from Google APIs will
        adhere to{" "}
        <a href="https://developers.google.com/terms/api-services-user-data-policy">
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements. In particular:
      </p>
      <ul>
        <li>we use Google user data only to provide and improve the user-facing features described above;</li>
        <li>we transfer it only to the service providers listed in section 6, only to run those features, or when required by law;</li>
        <li>we never use it for advertising, never sell it, and never use it to train general AI or machine-learning models;</li>
        <li>
          no person at Convolios reads your messages unless you explicitly ask us to (for example for
          support, for specific messages you point to), or where it is needed for security or to comply
          with the law.
        </li>
      </ul>
      <p>
        You can disconnect an account at any time in the app. You can also revoke access in your{" "}
        <a href="https://myaccount.google.com/permissions">Google account</a> or{" "}
        <a href="https://account.microsoft.com/consent">Microsoft account</a>.
      </p>

      <h2>5. Where your data is stored and how it is protected</h2>
      <ul>
        <li>
          <strong>Location:</strong> our database, servers, message storage and search index are in the
          European Union (Frankfurt, Germany). AI processing runs in Google Cloud’s EU region.
        </li>
        <li>
          <strong>Encryption:</strong> data is encrypted in transit (TLS) and at rest. Message content,
          attachments and account credentials are additionally encrypted by our application with a key
          unique to each connected account, protected by a hardware-backed key in Google Cloud Key
          Management (EU).
        </li>
        <li>
          <strong>What is not application-encrypted:</strong> message metadata (such as senders,
          recipients and dates) and the search index and AI embeddings derived from your messages. These
          are still encrypted at rest by our providers and are only accessible to your account.
        </li>
        <li>
          <strong>AI processing:</strong> content sent to our AI provider (Google Vertex AI, EU) is
          processed to answer your request and is not retained or used for training.
        </li>
        <li>
          <strong>Access:</strong> staff access to production systems is limited, logged and protected by
          hardware-key sign-in.
        </li>
      </ul>

      <h2>6. Service providers we use</h2>
      <p>These companies process data on our behalf under data-processing agreements:</p>
      <ul>
        <li><strong>Supabase</strong>: database and sign-in (EU, Frankfurt)</li>
        <li><strong>Fly.io</strong>: servers that run syncing and the app backend (EU, Frankfurt)</li>
        <li><strong>Cloudflare</strong>: encrypted message and attachment storage (EU), and our website’s DNS</li>
        <li><strong>turbopuffer</strong>: search index (EU, Frankfurt)</li>
        <li><strong>Google Cloud</strong>: AI processing, key management and Gmail change notifications (EU)</li>
        <li><strong>Expo</strong>: delivering push notifications to your phone (notifications contain no message content)</li>
        <li><strong>Resend</strong>: our own emails to you, such as sign-in codes</li>
        <li><strong>Better Stack</strong> and <strong>Sentry</strong>: monitoring and error reporting, without message content</li>
        <li><strong>Vercel</strong>: hosting this website</li>
        <li><strong>Paddle</strong>: payments and tax, when paid plans launch</li>
      </ul>
      <p>
        Some of these providers are based in the United States. Where data is transferred outside the
        UK or EU, we rely on the EU–US Data Privacy Framework and its UK extension, or on standard
        contractual clauses.
      </p>
      <p>
        The services you connect (such as Google, Telegram, X or your email provider) handle
        your messages under their own terms and privacy policies.
      </p>

      <h2>7. How long we keep data</h2>
      <ul>
        <li>
          When you connect an email account we import the last 90 days of messages, and index up to
          one year for search. Older messages stay with your provider and are fetched only when you
          ask for them.
        </li>
        <li>We keep synced data while the account stays connected.</li>
        <li>
          When you disconnect an account or delete your Convolios account, its data is removed from our
          active systems promptly and from backups within 90 days. The encryption keys for that account
          are destroyed, so any remaining backup copies become unreadable.
        </li>
        <li>If your Convolios account is inactive for 6 months, we notify you and then delete it.</li>
        <li>Diagnostics and logs are kept for up to 30 days.</li>
      </ul>

      <h2>8. Your rights</h2>
      <p>
        Under UK and EU data-protection law you can ask to access, correct, delete or export your data,
        object to or restrict our processing, and withdraw consent at any time. Email{" "}
        <a href="mailto:hello@convolios.com">hello@convolios.com</a>; we respond within one month.
      </p>
      <p>
        If someone uses Convolios and you have emailed or messaged them, your data may appear in their
        inbox. We process it on the basis of our legitimate interest in providing the service to our
        user. You can contact us to exercise your rights too.
      </p>
      <p>
        You can complain to the UK Information Commissioner’s Office (
        <a href="https://ico.org.uk">ico.org.uk</a>) or your local data-protection authority.
      </p>

      <h2>9. Legal bases</h2>
      <ul>
        <li><strong>Contract:</strong> to provide the service you signed up for, including syncing and features you use.</li>
        <li><strong>Consent:</strong> for connecting each account, for optional AI features, and for notifications.</li>
        <li><strong>Legitimate interests:</strong> security, abuse prevention, service improvement, and processing data about people who communicate with you.</li>
        <li><strong>Legal obligation:</strong> where the law requires us to keep or disclose data.</li>
      </ul>

      <h2>10. Children</h2>
      <p>Convolios is not intended for anyone under 16, and we do not knowingly collect their data.</p>

      <h2>11. Changes</h2>
      <p>
        We will update this page when our practices change, and tell you in the app or by email about
        significant changes before they take effect.
      </p>

      <h2>12. Contact</h2>
      <p>
        Plutio LTD (trading as Convolios), 1 Lyric Square, London W6 0NB, United Kingdom.{" "}
        <a href="mailto:hello@convolios.com">hello@convolios.com</a>
      </p>
    </article>
  );
}

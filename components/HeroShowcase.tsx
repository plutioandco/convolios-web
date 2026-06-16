import Image from "next/image";
import Link from "next/link";

type ChannelKey = "whatsapp" | "email" | "instagram" | "telegram" | "linkedin";

const CHANNEL_COLOR: Record<ChannelKey, string> = {
  whatsapp: "#25d366",
  email: "#5b6b7b",
  instagram: "#e1306c",
  telegram: "#229ed9",
  linkedin: "#0a66c2",
};

function ChannelGlyph({ channel }: { channel: ChannelKey }) {
  const common = {
    fill: "none",
    stroke: "#fff",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <span className="cv-badge" style={{ background: CHANNEL_COLOR[channel] }}>
      <svg viewBox="0 0 24 24" aria-hidden>
        {channel === "whatsapp" && (
          <path
            {...common}
            d="M21 11.5a8.4 8.4 0 0 1-12.9 7.2L3 20l1.4-5A8.4 8.4 0 1 1 21 11.5z"
          />
        )}
        {channel === "email" && (
          <>
            <rect {...common} x="3" y="5" width="18" height="14" rx="2" />
            <path {...common} d="m3 7 9 6 9-6" />
          </>
        )}
        {channel === "instagram" && (
          <>
            <rect {...common} x="3" y="3" width="18" height="18" rx="5" />
            <circle {...common} cx="12" cy="12" r="3.6" />
            <circle cx="17.4" cy="6.6" r="1" fill="#fff" />
          </>
        )}
        {channel === "telegram" && (
          <path {...common} d="M22 3 2.5 10.6l6.2 2.1L11 20l3.1-4 4.5 3.3L22 3z" />
        )}
        {channel === "linkedin" && (
          <text
            x="12"
            y="16.5"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="#fff"
            fontFamily="Georgia, serif"
          >
            in
          </text>
        )}
      </svg>
    </span>
  );
}

type Row = {
  name: string;
  initials: string;
  color: string;
  ring?: string;
  channels: ChannelKey[];
  preview: string;
  time: string;
  state?: "my_turn";
  active?: boolean;
};

const ROWS: Row[] = [
  {
    name: "Sofia Mendoza",
    initials: "SM",
    color: "#5865f2",
    ring: "#5865f2",
    channels: ["whatsapp", "email", "instagram"],
    preview: "Sounds great — let's lock the date.",
    time: "2m",
    state: "my_turn",
    active: true,
  },
  {
    name: "Marcus Chen",
    initials: "MC",
    color: "#23a559",
    ring: "#23a559",
    channels: ["linkedin", "email"],
    preview: "You: I'll send the deck over tonight.",
    time: "1h",
  },
  {
    name: "Aisha Karim",
    initials: "AK",
    color: "#eb459e",
    channels: ["instagram", "whatsapp"],
    preview: "Loved the photos from the launch!",
    time: "3h",
  },
  {
    name: "David Okafor",
    initials: "DO",
    color: "#f0b132",
    ring: "#f0b132",
    channels: ["telegram", "email"],
    preview: "Can we push our call to Friday?",
    time: "5h",
    state: "my_turn",
  },
  {
    name: "Elena Rossi",
    initials: "ER",
    color: "#00b0f4",
    channels: ["email"],
    preview: "Invoice attached — thanks again.",
    time: "1d",
  },
];

const CIRCLES = [
  { name: "Investors", color: "#5865f2", count: 4 },
  { name: "Family", color: "#23a559" },
  { name: "Press", color: "#f0b132", count: 2 },
];

export function HeroShowcase() {
  return (
    <section className="hero-greek border-b border-line">
      <Image
        src="/greek-town.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-greek__bg"
      />
      <div className="hero-greek__wash" aria-hidden />

      <div className="hero-greek__inner">
        <p className="hero-greek__eyebrow">One inbox · organized by person</p>
        <h1 className="hero-greek__title">
          The single source of truth for every conversation.
        </h1>
        <p className="hero-greek__sub">
          Convolios gathers every channel into one calm inbox — organized by the
          person you&apos;re talking to, not the app they happened to use.
        </p>
        <Link href="/download" className="hero-greek__cta">
          Download for macOS
        </Link>
        <p className="hero-greek__note">Free during early access</p>

        <div className="hero-greek__stage">
          <div className="cv-window" role="img" aria-label="Convolios inbox preview">
            <div className="cv-titlebar">
              <span className="cv-traffic" style={{ background: "#ec6a5e" }} />
              <span className="cv-traffic" style={{ background: "#f4bf4f" }} />
              <span className="cv-traffic" style={{ background: "#61c554" }} />
              <span className="cv-titlebar__name">Convolios</span>
            </div>

            <div className="cv-body">
              {/* sidebar */}
              <div className="cv-sidebar">
                <div className="cv-brand">Convolios</div>
                <div className="cv-search">
                  <span>Search…</span>
                  <kbd>⌘K</kbd>
                </div>

                <div className="cv-nav" data-active="true">
                  <span className="cv-nav__icon">●</span>
                  <span>All</span>
                  <span className="cv-nav__count">12</span>
                </div>
                <div className="cv-nav">
                  <span className="cv-nav__icon">◑</span>
                  <span>My Turn</span>
                  <span className="cv-nav__count">3</span>
                </div>
                <div className="cv-nav">
                  <span className="cv-nav__icon">◔</span>
                  <span>Their Turn</span>
                </div>

                <div className="cv-sec">
                  <div className="cv-sec__head">Circles</div>
                  {CIRCLES.map((c) => (
                    <div key={c.name} className="cv-nav">
                      <span className="cv-dot" style={{ background: c.color }} />
                      <span>{c.name}</span>
                      {c.count && <span className="cv-nav__count">{c.count}</span>}
                    </div>
                  ))}
                </div>

                <div className="cv-sec">
                  <div className="cv-sec__head">Library</div>
                  <div className="cv-nav">
                    <span className="cv-nav__icon">⌂</span>
                    <span>Gate</span>
                    <span className="cv-nav__count">3</span>
                  </div>
                </div>
              </div>

              {/* inbox list */}
              <div className="cv-inbox">
                <div className="cv-inbox__head">
                  <span>All</span>
                  <span className="cv-inbox__count">5</span>
                </div>
                {ROWS.map((r) => (
                  <div key={r.name} className="cv-row" data-active={r.active}>
                    <span
                      className="cv-ava"
                      data-ring={Boolean(r.ring)}
                      style={
                        {
                          background: r.color,
                          ["--ring" as string]: r.ring,
                        } as React.CSSProperties
                      }
                    >
                      {r.initials}
                    </span>
                    <div className="cv-row__main">
                      <div className="cv-row__top">
                        <span className="cv-row__name">{r.name}</span>
                        <span className="cv-badges">
                          {r.channels.map((ch) => (
                            <ChannelGlyph key={ch} channel={ch} />
                          ))}
                        </span>
                        <span className="cv-row__time">{r.time}</span>
                      </div>
                      <div className="cv-row__preview">
                        <span>{r.preview}</span>
                        {r.state === "my_turn" && (
                          <span className="cv-chip">My Turn</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* thread */}
              <div className="cv-thread">
                <div className="cv-thread__head">
                  <span
                    className="cv-ava"
                    data-ring="true"
                    style={
                      {
                        background: "#5865f2",
                        ["--ring" as string]: "#5865f2",
                      } as React.CSSProperties
                    }
                  >
                    SM
                  </span>
                  <div>
                    <div className="cv-thread__name">Sofia Mendoza</div>
                    <div className="cv-thread__sub">WhatsApp · Email · Instagram</div>
                  </div>
                </div>
                <div className="cv-thread__body">
                  <div className="cv-bubble cv-bubble--in">
                    Did the contract land in your inbox?
                    <span className="cv-bubble__meta">Email · 9:02</span>
                  </div>
                  <div className="cv-bubble cv-bubble--out">
                    Just signed it — sending now.
                    <span className="cv-bubble__meta">WhatsApp · 9:05</span>
                  </div>
                  <div className="cv-bubble cv-bubble--in">
                    Sounds great — let&apos;s lock the date.
                    <span className="cv-bubble__meta">Instagram · 9:07</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* callouts */}
          <div
            className="cv-callout cv-callout--circles"
            style={{ ["--tag" as string]: "#5865f2" } as React.CSSProperties}
          >
            <span className="cv-callout__tag">Circles</span>
            <p className="cv-callout__body">
              Group people into Work, Family or Investors — shown as colored rings
              across your whole inbox.
            </p>
          </div>

          <div
            className="cv-callout cv-callout--channels"
            style={{ ["--tag" as string]: "#25d366" } as React.CSSProperties}
          >
            <span className="cv-callout__tag">One contact, every channel</span>
            <p className="cv-callout__body">
              WhatsApp, email and Instagram from the same person merge into a single
              thread — automatically.
            </p>
          </div>

          <div
            className="cv-callout cv-callout--gate"
            style={{ ["--tag" as string]: "#b8893b" } as React.CSSProperties}
          >
            <span className="cv-callout__tag">The Gate</span>
            <p className="cv-callout__body">
              Unknown senders wait at the Gate. You decide who reaches your main
              inbox — the rest stays out.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

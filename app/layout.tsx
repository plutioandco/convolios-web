import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/release";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
});

const title = "Convolios | Everyone you care about, in one place";
const description =
  "Every chat from WhatsApp, Instagram, email, Telegram and more, grouped by person. Make Circles for family, trips and projects. Anyone new waits at the Gate until you let them in.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | Convolios",
  },
  description,
  applicationName: "Convolios",
  keywords: [
    "unified inbox",
    "messaging app",
    "WhatsApp",
    "LinkedIn",
    "Telegram",
    "iMessage",
    "AI inbox",
    "CRM",
    "conversations",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Convolios",
    title,
    description,
    images: [{ url: "/brand/og.jpg", width: 1200, height: 630, alt: "Convolios" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/brand/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/favicon-48.png",
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink text-fg">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

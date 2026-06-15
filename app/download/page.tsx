import type { Metadata } from "next";
import { DownloadGrid } from "@/components/DownloadGrid";
import { APP_VERSION } from "@/lib/release";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download Convolios for macOS and Windows. One AI-enriched inbox for every messaging channel, organized by person.",
  alternates: { canonical: "/download" },
};

export default function DownloadPage() {
  return (
    <section>
      <div className="mx-auto max-w-4xl px-5 py-20">
        <p className="eyebrow mb-4">Get Convolios</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Download Convolios
        </h1>
        <p className="mt-4 max-w-xl text-lg text-fg-muted">
          Free during early access. The app keeps itself up to date
          automatically once installed.
        </p>

        <div className="mt-10">
          <DownloadGrid />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
          <div className="bg-ink p-6">
            <p className="eyebrow mb-2">Version</p>
            <p className="font-mono text-sm text-fg">v{APP_VERSION}</p>
          </div>
          <div className="bg-ink p-6">
            <p className="eyebrow mb-2">Auto-update</p>
            <p className="text-sm text-fg-muted">
              Signed updates install silently in the background.
            </p>
          </div>
          <div className="bg-ink p-6">
            <p className="eyebrow mb-2">Requirements</p>
            <p className="text-sm text-fg-muted">macOS 12+ · Windows 10/11</p>
          </div>
        </div>

        <p className="mt-10 text-sm text-fg-faint">
          macOS builds are signed and notarized by Apple. On first launch,
          right-click the app and choose Open if Gatekeeper prompts you.
        </p>
      </div>
    </section>
  );
}

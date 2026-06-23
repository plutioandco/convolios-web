"use client";

import Link from "next/link";
import { DOWNLOADS } from "@/lib/release";
import { usePlatform } from "@/lib/usePlatform";

const APPLE_ICON =
  "M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.74-1.517.03-2.02-.9-3.71-.9-1.698 0-2.235.87-3.66.93-1.42.06-2.52-1.43-3.494-2.84-1.99-2.93-3.51-8.29-1.46-11.95 1.012-1.82 2.84-2.99 4.78-3.02 1.45-.03 2.84.97 3.74.97.91 0 2.55-1.2 4.31-1.02.73.03 2.78.3 4.1 2.27-.11.07-2.44 1.45-2.42 4.33.03 3.45 3.04 4.58 3.07 4.59z";

function AppleIcon() {
  return (
    <svg className="download-pill__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d={APPLE_ICON} />
    </svg>
  );
}

/** Pill download button — hero, CTA, anywhere we need the primary download action. */
export function DownloadPill() {
  const platform = usePlatform() ?? "macos-arm";
  const target = DOWNLOADS[platform];
  const label = target.available
    ? target.label
    : target.label.replace("Download for", "Coming soon for");

  if (target.available && target.href) {
    return (
      <a href={target.href} className="download-pill">
        <AppleIcon />
        {label}
      </a>
    );
  }

  return (
    <Link href="/download" className="download-pill">
      <AppleIcon />
      {label}
    </Link>
  );
}

/** Download page layout — grid + platform picker. */
export function DownloadCta() {
  const platform = usePlatform() ?? "macos-arm";
  const target = DOWNLOADS[platform];

  return (
    <div className="flex flex-col items-center gap-3 sm:items-start">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {target.available && target.href ? (
          <a
            href={target.href}
            className="border border-fg bg-fg px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-transparent hover:text-fg"
          >
            {target.label}
          </a>
        ) : (
          <span className="cursor-not-allowed border border-line px-6 py-3 text-sm font-medium text-fg-faint">
            {target.label.replace("Download for", "Coming soon for")}
          </span>
        )}
        <Link
          href="/download"
          className="text-sm text-fg-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
        >
          All platforms
        </Link>
      </div>
      <p className="font-mono text-xs text-fg-faint">{target.detail}</p>
    </div>
  );
}

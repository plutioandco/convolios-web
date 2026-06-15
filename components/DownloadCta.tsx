"use client";

import Link from "next/link";
import { DOWNLOADS } from "@/lib/release";
import { usePlatform } from "@/lib/usePlatform";

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
            {target.label.replace("Download for", "Coming soon —")}
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

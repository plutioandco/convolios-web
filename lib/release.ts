export const SITE_URL = "https://convolios.com";

export const DOWNLOADS_BASE = "https://downloads.convolios.com";

// Fallback only. The live version is read from latest.json (the same manifest
// the desktop auto-updater uses) via getLatestVersion(), so the site never
// goes stale and never needs a manual bump on release.
export const APP_VERSION = "0.2.19";

// Single source of truth for "what is the latest release": the updater manifest
// on R2. Revalidated every 5 minutes so the marketing copy follows a release
// automatically, while the actual download link (/download/mac) is always live.
export async function getLatestVersion(): Promise<string> {
  try {
    const res = await fetch(`${DOWNLOADS_BASE}/latest.json`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return APP_VERSION;
    const data = (await res.json()) as { version?: unknown };
    return typeof data.version === "string" ? data.version : APP_VERSION;
  } catch {
    return APP_VERSION;
  }
}

export type Platform = "macos-arm" | "windows" | "macos-intel" | "linux";

export type DownloadTarget = {
  id: Platform;
  label: string;
  detail: string;
  href: string | null;
  available: boolean;
};

export const DOWNLOADS: Record<Platform, DownloadTarget> = {
  "macos-arm": {
    id: "macos-arm",
    label: "Download for macOS",
    detail: "Apple Silicon, macOS 12+",
    // Stable redirect → always resolves to the newest DMG from latest.json.
    href: "/download/mac",
    available: true,
  },
  windows: {
    id: "windows",
    label: "Download for Windows",
    detail: "x64, Windows 10/11",
    href: null,
    available: false,
  },
  "macos-intel": {
    id: "macos-intel",
    label: "Download for macOS (Intel)",
    detail: "Intel, macOS 12+",
    href: null,
    available: false,
  },
  linux: {
    id: "linux",
    label: "Download for Linux",
    detail: "AppImage, x64",
    href: null,
    available: false,
  },
};

export const PRIMARY_DOWNLOADS: Platform[] = ["macos-arm", "windows"];

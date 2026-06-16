export const SITE_URL = "https://convolios.com";

export const DOWNLOADS_BASE = "https://downloads.convolios.com";

export const APP_VERSION = "0.2.19";

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
    detail: "Apple Silicon · macOS 12+",
    href: `${DOWNLOADS_BASE}/Convolios_${APP_VERSION}_aarch64.dmg`,
    available: true,
  },
  windows: {
    id: "windows",
    label: "Download for Windows",
    detail: "x64 · Windows 10/11",
    href: null,
    available: false,
  },
  "macos-intel": {
    id: "macos-intel",
    label: "Download for macOS (Intel)",
    detail: "Intel · macOS 12+",
    href: null,
    available: false,
  },
  linux: {
    id: "linux",
    label: "Download for Linux",
    detail: "AppImage · x64",
    href: null,
    available: false,
  },
};

export const PRIMARY_DOWNLOADS: Platform[] = ["macos-arm", "windows"];

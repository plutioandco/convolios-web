import { NextResponse } from "next/server";
import { DOWNLOADS_BASE, SITE_URL } from "@/lib/release";

// Always resolve to the newest macOS build. Reads the same latest.json that the
// desktop auto-updater uses, so a download link can never go stale: shipping a
// release (which rewrites latest.json) updates this redirect instantly.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(`${DOWNLOADS_BASE}/latest.json`, { cache: "no-store" });
    if (res.ok) {
      const data = (await res.json()) as { version?: unknown };
      if (typeof data.version === "string") {
        return NextResponse.redirect(
          `${DOWNLOADS_BASE}/Convolios_${data.version}_aarch64.dmg`,
          302,
        );
      }
    }
  } catch {
    // fall through to the download page on any failure
  }
  return NextResponse.redirect(`${SITE_URL}/download`, 302);
}

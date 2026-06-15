"use client";

import { DOWNLOADS, type Platform } from "@/lib/release";
import { usePlatform } from "@/lib/usePlatform";

const ORDER: Platform[] = ["macos-arm", "windows", "macos-intel", "linux"];

export function DownloadGrid() {
  const detected = usePlatform();

  return (
    <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
      {ORDER.map((id) => {
        const t = DOWNLOADS[id];
        const isDetected = detected === id;
        return (
          <div
            key={id}
            className={`flex flex-col justify-between gap-6 bg-ink p-8 ${
              isDetected ? "ring-1 ring-inset ring-fg" : ""
            }`}
          >
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-medium text-fg">
                  {t.label.replace("Download for ", "")}
                </h3>
                {isDetected && (
                  <span className="border border-fg px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fg">
                    Your system
                  </span>
                )}
              </div>
              <p className="mt-2 font-mono text-xs text-fg-faint">{t.detail}</p>
            </div>
            {t.available && t.href ? (
              <a
                href={t.href}
                className="border border-fg bg-fg px-5 py-2.5 text-center text-sm font-medium text-ink transition-colors hover:bg-transparent hover:text-fg"
              >
                Download
              </a>
            ) : (
              <span className="border border-line px-5 py-2.5 text-center text-sm font-medium text-fg-faint">
                Coming soon
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

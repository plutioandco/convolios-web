"use client";

import { useSearchParams } from "next/navigation";

export function ConnectedCard() {
  const params = useSearchParams();
  const isError = params.get("error") === "1";
  const title = isError
    ? (params.get("title") ?? "Something went wrong")
    : "Connected";
  const message = isError
    ? (params.get("msg") ?? "Close this tab and try again in Convolios.")
    : "Close this tab and return to Convolios. Your inbox will update in a few seconds.";

  return (
    <article className="w-full max-w-md border border-line bg-ink-raised px-8 py-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
      <h1
        className={`font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight ${
          isError ? "text-[#b42318]" : "text-[#1a7f4b]"
        }`}
      >
        {title}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-fg-muted">{message}</p>
    </article>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { ConnectedCard } from "./ConnectedCard";

export const metadata: Metadata = {
  title: "Connected",
  robots: { index: false, follow: false },
};

export default function ConnectedPage() {
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-16">
      <Suspense>
        <ConnectedCard />
      </Suspense>
    </div>
  );
}

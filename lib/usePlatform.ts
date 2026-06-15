"use client";

import { useSyncExternalStore } from "react";
import type { Platform } from "@/lib/release";

function detectPlatform(): Platform | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  if (ua.includes("linux") && !ua.includes("android")) return "linux";
  if (ua.includes("mac")) return "macos-arm";
  return null;
}

const subscribe = () => () => {};

export function usePlatform(): Platform | null {
  return useSyncExternalStore(subscribe, detectPlatform, () => null);
}

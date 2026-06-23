"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BrandWordmark } from "@/components/BrandWordmark";
import { DownloadPill } from "@/components/DownloadCta";

export type ChannelKey =
  | "whatsapp"
  | "instagram"
  | "email"
  | "telegram"
  | "linkedin"
  | "messenger"
  | "x"
  | "imessage";

const CHANNEL_COLOR: Record<ChannelKey, string> = {
  whatsapp: "#25D366",
  instagram: "#E4405F",
  email: "#EA4335",
  telegram: "#26A5E4",
  linkedin: "#0A66C2",
  messenger: "#0084FF",
  x: "#000000",
  imessage: "#34C759",
};

// Real brand glyphs (single-path, filled) — same source as the app.
const CHANNEL_PATH: Record<ChannelKey, string> = {
  whatsapp:
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
  instagram:
    "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
  email:
    "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  telegram:
    "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  messenger:
    "M.001 11.639C.001 4.949 5.3 0 12 0s12 4.95 12 11.639c0 6.689-5.3 11.638-12 11.638-1.2 0-2.358-.16-3.442-.457a.96.96 0 0 0-.641.047l-2.383 1.05a.96.96 0 0 1-1.348-.849l-.065-2.134a.96.96 0 0 0-.322-.684C1.809 17.958 0 14.971 0 11.639Zm8.32-2.19-3.525 5.592c-.338.535.317 1.14.817.756l3.786-2.874a.722.722 0 0 1 .868 0l2.803 2.101a1.8 1.8 0 0 0 2.604-.48l3.525-5.592c.338-.535-.317-1.14-.817-.756l-3.786 2.874a.722.722 0 0 1-.868 0l-2.803-2.101a1.8 1.8 0 0 0-2.604.48Z",
  x: "M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z",
  imessage:
    "M5.285 0A5.273 5.273 0 0 0 0 5.285v13.43A5.273 5.273 0 0 0 5.285 24h13.43A5.273 5.273 0 0 0 24 18.715V5.285A5.273 5.273 0 0 0 18.715 0ZM12 4.154a8.809 7.337 0 0 1 8.809 7.338A8.809 7.337 0 0 1 12 18.828a8.809 7.337 0 0 1-2.492-.303A8.656 7.337 0 0 1 5.93 19.93a9.929 7.337 0 0 0 1.54-2.155 8.809 7.337 0 0 1-4.279-6.283A8.809 7.337 0 0 1 12 4.154",
};

export const HERO_CHANNELS: ChannelKey[] = [
  "whatsapp",
  "instagram",
  "email",
  "telegram",
  "linkedin",
  "messenger",
  "x",
  "imessage",
];

export function ChannelGlyph({ channel }: { channel: ChannelKey }) {
  return (
    <span className="cv-badge">
      <svg viewBox="0 0 24 24" fill={CHANNEL_COLOR[channel]} aria-hidden>
        <path d={CHANNEL_PATH[channel]} />
      </svg>
    </span>
  );
}

type BadgeTone = "my_turn" | "their_turn" | "urgent" | "newsletter" | "notification" | "flag";

type InboxRow = {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
  ring?: string;
  channels: ChannelKey[];
  preview: string;
  time: string;
  badge?: { label: string; tone: BadgeTone };
  circles?: string[];
  myTurn?: boolean;
  theirTurn?: boolean;
  flagged?: boolean;
  unread?: boolean;
  bucket?: "primary" | "general";
};

type ViewConfig = {
  activeNav: string;
  search?: string;
  header: { label: string; count: number };
  toggle: "all" | "unread";
  rows: InboxRow[];
  rowActiveId?: string;
  gateActions?: boolean;
  composerMenu?: boolean;
  pane: "athena" | "gate";
};

const PEOPLE = {
  athena: { name: "Athena Pappas", avatar: "/brand/characters/muse.png", ring: "#f0b132" },
  leonidas: { name: "Leonidas Maro", avatar: "/brand/characters/athlete.png", ring: "#23a559" },
  penelope: { name: "Penelope Sava", avatar: "/brand/characters/messenger.png" },
  hektor: { name: "Hektor Galanis", avatar: "/brand/characters/merchant.png", ring: "#5865f2" },
  iris: { name: "Iris Dimou", avatar: "/brand/characters/oracle.png" },
};

const ALL_ROWS: InboxRow[] = [
  {
    id: "athena",
    ...PEOPLE.athena,
    channels: ["whatsapp", "instagram", "email", "telegram"],
    preview: "Perfect, let's lock the dates.",
    time: "2m",
    badge: { label: "My Turn", tone: "my_turn" },
    circles: ["family", "santorini"],
    myTurn: true,
    flagged: true,
    unread: true,
    bucket: "primary",
  },
  {
    id: "leonidas",
    ...PEOPLE.leonidas,
    channels: ["whatsapp", "messenger", "email"],
    preview: "You: see you Sunday!",
    time: "1h",
    circles: ["family", "symposium"],
    theirTurn: true,
    bucket: "primary",
  },
  {
    id: "penelope",
    ...PEOPLE.penelope,
    channels: ["instagram", "whatsapp", "imessage"],
    preview: "Loved the photos from Naxos!",
    time: "3h",
    circles: ["santorini"],
    theirTurn: true,
    unread: true,
    bucket: "primary",
  },
  {
    id: "hektor",
    ...PEOPLE.hektor,
    channels: ["telegram", "linkedin", "email"],
    preview: "Can we move dinner to Friday?",
    time: "5h",
    badge: { label: "My Turn", tone: "my_turn" },
    circles: ["santorini", "symposium"],
    myTurn: true,
    flagged: true,
    bucket: "primary",
  },
  {
    id: "iris",
    ...PEOPLE.iris,
    channels: ["x", "email"],
    preview: "Sending the recipe now.",
    time: "1d",
    circles: ["family", "symposium"],
    theirTurn: true,
    bucket: "general",
  },
];

const GATE_ROWS: InboxRow[] = [
  { id: "g1", name: "+44 7700 900 841", initials: "?", channels: ["whatsapp"], preview: "Hi! Is this Leo? Got your number from…", time: "4m" },
  { id: "g2", name: "Spektra Offers", initials: "SO", channels: ["email"], preview: "You've been selected for an exclusive…", time: "26m" },
  { id: "g3", name: "nikos_archi", initials: "N", channels: ["instagram"], preview: "Loved your studio tour. Can we collab?", time: "2h" },
];

const CIRCLES = [
  { id: "family", name: "Family", emoji: "🏡", color: "#23a559", count: 3 },
  { id: "santorini", name: "Santorini Trip", emoji: "⛵️", color: "#f0b132", count: 4 },
  { id: "symposium", name: "Symposium", emoji: "🍷", color: "#5865f2", count: 3 },
];

const CHANNEL_LABEL: Record<ChannelKey, string> = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  email: "Email",
  telegram: "Telegram",
  linkedin: "LinkedIn",
  messenger: "Messenger",
  x: "X",
  imessage: "iMessage",
};

const COMPOSER_CHANNELS: ChannelKey[] = ["whatsapp", "email", "instagram", "telegram"];
const SIDEBAR_CHANNELS: ChannelKey[] = ["whatsapp", "instagram", "telegram", "email"];

type DemoNav =
  | { kind: "all" }
  | { kind: "my-turn" }
  | { kind: "their-turn" }
  | { kind: "action-items" }
  | { kind: "gate" }
  | { kind: "circle"; id: string }
  | { kind: "channel"; channel: ChannelKey }
  | { kind: "search"; query: string };

function filterDemoRows(
  nav: DemoNav,
  bucket: "primary" | "general",
  unreadOnly: boolean,
  gateRows: InboxRow[],
): InboxRow[] {
  if (nav.kind === "gate") return gateRows;

  let rows = ALL_ROWS.filter((r) => r.bucket === bucket);

  if (unreadOnly) rows = rows.filter((r) => r.unread);

  switch (nav.kind) {
    case "my-turn":
      rows = rows.filter((r) => r.myTurn);
      break;
    case "their-turn":
      rows = rows.filter((r) => r.theirTurn);
      break;
    case "action-items":
      rows = rows.filter((r) => r.flagged);
      break;
    case "circle":
      rows = rows.filter((r) => r.circles?.includes(nav.id));
      break;
    case "channel":
      rows = rows.filter((r) => r.channels.includes(nav.channel));
      break;
    case "search": {
      const q = nav.query.trim().toLowerCase();
      if (!q) return ALL_ROWS;
      const matched = ALL_ROWS.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.preview.toLowerCase().includes(q),
      );
      if (q.includes("santorini")) {
        const extras: InboxRow[] = [
          {
            id: "villa",
            name: "Villa Aegean",
            initials: "VA",
            channels: ["email"],
            preview: "Santorini, Jun 12-16, 2 guests",
            time: "1d",
            bucket: "primary",
          },
        ];
        const ids = new Set(matched.map((r) => r.id));
        return [...matched, ...extras.filter((r) => !ids.has(r.id))];
      }
      return matched;
    }
    default:
      break;
  }

  return rows;
}

function navHeader(nav: DemoNav, count: number): { label: string; count: number } {
  switch (nav.kind) {
    case "all":
      return { label: "All", count };
    case "my-turn":
      return { label: "My Turn", count };
    case "their-turn":
      return { label: "Their Turn", count };
    case "action-items":
      return { label: "Action items", count };
    case "gate":
      return { label: "Gate", count };
    case "search":
      return { label: "Results", count };
    case "circle":
      return { label: CIRCLES.find((c) => c.id === nav.id)?.name ?? "Circle", count };
    case "channel":
      return { label: CHANNEL_LABEL[nav.channel], count };
  }
}

function navActiveKey(nav: DemoNav): string {
  switch (nav.kind) {
    case "all":
      return "all";
    case "my-turn":
      return "my-turn";
    case "their-turn":
      return "their-turn";
    case "action-items":
      return "action-items";
    case "gate":
      return "gate";
    case "circle":
      return `circle-${nav.id}`;
    case "channel":
      return `channel-${nav.channel}`;
    case "search":
      return "search";
  }
}

const VIEWS: Record<string, ViewConfig> = {
  channels: {
    activeNav: "all",
    header: { label: "All", count: 5 },
    toggle: "all",
    rowActiveId: "athena",
    rows: ALL_ROWS,
    pane: "athena",
  },
  circles: {
    activeNav: "circle-family",
    header: { label: "Family", count: 3 },
    toggle: "all",
    rowActiveId: "athena",
    rows: [
      { id: "athena", ...PEOPLE.athena, channels: ["whatsapp", "instagram", "email"], preview: "Perfect, let's lock the dates.", time: "2m" },
      { id: "leonidas", ...PEOPLE.leonidas, channels: ["whatsapp", "email"], preview: "You: see you Sunday!", time: "1h" },
      { id: "iris", ...PEOPLE.iris, channels: ["x", "email"], preview: "Sending the recipe now.", time: "1d" },
    ],
    pane: "athena",
  },
  "my-turn": {
    activeNav: "my-turn",
    header: { label: "My Turn", count: 2 },
    toggle: "all",
    rowActiveId: "athena",
    rows: [
      { id: "athena", ...PEOPLE.athena, channels: ["whatsapp", "instagram", "email", "telegram"], preview: "Perfect, let's lock the dates.", time: "2m", badge: { label: "My Turn", tone: "my_turn" } },
      { id: "hektor", ...PEOPLE.hektor, channels: ["telegram", "linkedin", "email"], preview: "Can we move dinner to Friday?", time: "5h", badge: { label: "My Turn", tone: "my_turn" } },
    ],
    pane: "athena",
  },
  "whose-turn": {
    activeNav: "my-turn",
    header: { label: "My Turn", count: 2 },
    toggle: "all",
    rowActiveId: "athena",
    rows: [
      { id: "athena", ...PEOPLE.athena, channels: ["whatsapp", "instagram", "email"], preview: "Perfect, let's lock the dates.", time: "2m", badge: { label: "My Turn", tone: "my_turn" } },
      { id: "hektor", ...PEOPLE.hektor, channels: ["telegram", "linkedin"], preview: "Can we move dinner to Friday?", time: "5h", badge: { label: "My Turn", tone: "my_turn" } },
      { id: "leonidas", ...PEOPLE.leonidas, channels: ["whatsapp", "messenger"], preview: "You: see you Sunday!", time: "1h", badge: { label: "Their Turn", tone: "their_turn" } },
      { id: "penelope", ...PEOPLE.penelope, channels: ["instagram", "whatsapp"], preview: "Loved the photos from Naxos!", time: "3h", badge: { label: "Their Turn", tone: "their_turn" } },
    ],
    pane: "athena",
  },
  "action-items": {
    activeNav: "action-items",
    header: { label: "Action items", count: 2 },
    toggle: "all",
    rowActiveId: "athena",
    rows: [
      { id: "athena", ...PEOPLE.athena, channels: ["whatsapp"], preview: "Send the deposit by Friday", time: "2m", badge: { label: "Flagged", tone: "flag" } },
      { id: "hektor", ...PEOPLE.hektor, channels: ["telegram"], preview: "Confirm the dinner reservation", time: "5h", badge: { label: "Flagged", tone: "flag" } },
    ],
    pane: "athena",
  },
  gate: {
    activeNav: "gate",
    header: { label: "Gate", count: 3 },
    toggle: "all",
    gateActions: true,
    rows: [
      { id: "g1", name: "+44 7700 900 841", initials: "?", channels: ["whatsapp"], preview: "Hi! Is this Leo? Got your number from…", time: "4m" },
      { id: "g2", name: "Spektra Offers", initials: "SO", channels: ["email"], preview: "You've been selected for an exclusive…", time: "26m" },
      { id: "g3", name: "nikos_archi", initials: "N", channels: ["instagram"], preview: "Loved your studio tour. Can we collab?", time: "2h" },
    ],
    pane: "gate",
  },
  search: {
    activeNav: "",
    search: "santorini",
    header: { label: "Results", count: 3 },
    toggle: "all",
    rowActiveId: "athena",
    rows: [
      { id: "athena", ...PEOPLE.athena, channels: ["whatsapp", "instagram"], preview: "Found our villa for Santorini 😍", time: "2m" },
      { id: "villa", name: "Villa Aegean", initials: "VA", channels: ["email"], preview: "Santorini, Jun 12-16, 2 guests", time: "1d" },
      { id: "hektor", ...PEOPLE.hektor, channels: ["telegram"], preview: "What are the Santorini ferry times?", time: "5h" },
    ],
    pane: "athena",
  },
  composer: {
    activeNav: "all",
    header: { label: "All", count: 5 },
    toggle: "all",
    rowActiveId: "athena",
    rows: ALL_ROWS,
    composerMenu: true,
    pane: "athena",
  },
};

type NavName =
  | "inbox"
  | "reply"
  | "clock"
  | "flag"
  | "door"
  | "layers"
  | "settings";

function NavIcon({ name }: { name: NavName }) {
  const common = {
    width: 14,
    height: 14,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  return (
    <svg {...common}>
      {name === "inbox" && (
        <>
          <path d="M22 12h-6l-2 3h-4l-2-3H2" />
          <path d="M5.4 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.4-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.8 1.1z" />
        </>
      )}
      {name === "reply" && (
        <>
          <path d="M9 17 4 12l5-5" />
          <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
        </>
      )}
      {name === "clock" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </>
      )}
      {name === "flag" && (
        <>
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <path d="M4 22v-7" />
        </>
      )}
      {name === "door" && (
        <>
          <path d="M3 20h18" />
          <path d="M5 20V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16" />
          <path d="M12 12h.01" />
        </>
      )}
      {name === "layers" && (
        <>
          <path d="M12 2 2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </>
      )}
      {name === "settings" && (
        <>
          <path d="M20 7h-9M14 17H5" />
          <circle cx="17" cy="17" r="3" />
          <circle cx="7" cy="7" r="3" />
        </>
      )}
    </svg>
  );
}

function CvAvatar({ row }: { row: InboxRow }) {
  if (row.avatar) {
    return (
      <span
        className="cv-ava"
        data-ring={Boolean(row.ring)}
        style={{ ["--ring" as string]: row.ring } as React.CSSProperties}
      >
        <Image className="cv-ava__img" src={row.avatar} alt="" width={32} height={32} />
      </span>
    );
  }
  return <span className="cv-ava cv-ava--initials">{row.initials ?? row.name[0]}</span>;
}

function InboxRowView({
  row,
  active,
  gateActions,
  onSelect,
  onGateAllow,
  onGateDeny,
}: {
  row: InboxRow;
  active: boolean;
  gateActions?: boolean;
  onSelect?: () => void;
  onGateAllow?: () => void;
  onGateDeny?: () => void;
}) {
  const inner = (
    <>
      <CvAvatar row={row} />
      <div className="cv-row__main">
        <div className="cv-row__top">
          <span className="cv-row__name">{row.name}</span>
          <span className="cv-badges">
            {row.channels.map((ch) => (
              <ChannelGlyph key={ch} channel={ch} />
            ))}
          </span>
          {!gateActions && <span className="cv-row__time">{row.time}</span>}
        </div>
        <div className="cv-row__preview">
          <span>{row.preview}</span>
          {row.badge && (
            <span className={`cv-chip cv-chip--${row.badge.tone}`}>{row.badge.label}</span>
          )}
        </div>
      </div>
      {gateActions && (
        <div className="cv-gate-actions">
          <button
            type="button"
            className="cv-gate-btn cv-gate-btn--ok"
            aria-label="Let in"
            onClick={(e) => {
              e.stopPropagation();
              onGateAllow?.();
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </button>
          <button
            type="button"
            className="cv-gate-btn cv-gate-btn--no"
            aria-label="Keep out"
            onClick={(e) => {
              e.stopPropagation();
              onGateDeny?.();
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );

  if (onSelect) {
    return (
      <button type="button" className="cv-row" data-active={active} onClick={onSelect}>
        {inner}
      </button>
    );
  }

  return (
    <div className="cv-row" data-active={active}>
      {inner}
    </div>
  );
}

function AthenaThread() {
  return (
    <>
      <div className="cv-thread__head">
        <span
          className="cv-ava"
          data-ring="true"
          style={{ ["--ring" as string]: "#f0b132" } as React.CSSProperties}
        >
          <Image
            className="cv-ava__img"
            src={PEOPLE.athena.avatar}
            alt=""
            width={32}
            height={32}
          />
        </span>
        <div>
          <div className="cv-thread__name">Athena Pappas</div>
          <div className="cv-thread__sub">Instagram, WhatsApp, Email, Telegram</div>
        </div>
      </div>
      <div className="cv-thread__body">
        <div className="cv-bubble cv-bubble--in">
          Found our villa for Santorini 😍
          <span className="cv-bubble__meta">
            <ChannelGlyph channel="instagram" />
            9:01
          </span>
        </div>

        <div className="cv-reel">
          <Image
            className="cv-reel__img"
            src="/brand/reel-santorini.png"
            alt=""
            width={120}
            height={170}
          />
          <span className="cv-reel__play" aria-hidden>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="cv-reel__tag">
            <ChannelGlyph channel="instagram" /> Reel, 0:14
          </span>
        </div>

        <div className="cv-bubble cv-bubble--out">
          Looks unreal! Book it.
          <span className="cv-bubble__meta">
            <ChannelGlyph channel="whatsapp" />
            9:03
          </span>
        </div>

        <div className="cv-mail">
          <div className="cv-mail__top">
            <ChannelGlyph channel="email" />
            <span className="cv-mail__subject">Reservation confirmed</span>
          </div>
          <p className="cv-mail__snippet">
            Villa Aegean, Jun 12 to 16, 2 guests. Your booking reference is ATH-4471.
          </p>
          <span className="cv-bubble__meta">
            <ChannelGlyph channel="email" />
            9:05
          </span>
        </div>

        <div className="cv-bubble cv-bubble--in">
          Booked the ferry too 🚢
          <span className="cv-bubble__meta">
            <ChannelGlyph channel="telegram" />
            9:06
          </span>
        </div>

        <div className="cv-bubble cv-bubble--out">
          Perfect, see you Friday ☀️
          <span className="cv-bubble__meta">
            <ChannelGlyph channel="whatsapp" />
            9:08
          </span>
        </div>
      </div>
    </>
  );
}

function GatePane({ count, row }: { count: number; row?: InboxRow }) {
  return (
    <div className="cv-gatepane">
      <span className="cv-gatepane__icon"><NavIcon name="door" /></span>
      <div className="cv-gatepane__title">
        {count === 0
          ? "The Gate is clear"
          : `${count} ${count === 1 ? "person is" : "people are"} waiting at the Gate`}
      </div>
      <p className="cv-gatepane__sub">
        {count === 0
          ? "Anyone new stays out until you let them in."
          : "People you haven't talked to yet wait here. You decide who gets in."}
      </p>
      {row && (
        <div className="cv-gatepane__card">
          <div className="cv-gatepane__row">
            <CvAvatar row={row} />
            <div className="cv-gatepane__person">
              <span className="cv-gatepane__name">{row.name}</span>
              <span className="cv-gatepane__msg">{row.preview}</span>
            </div>
            <ChannelGlyph channel={row.channels[0]} />
          </div>
          <div className="cv-gatepane__actions">
            <span className="cv-gatepane__btn cv-gatepane__btn--ok">Let in</span>
            <span className="cv-gatepane__btn cv-gatepane__btn--no">Keep out</span>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyInboxPane({ label }: { label: string }) {
  return (
    <div className="cv-empty">
      <span className="cv-empty__icon"><NavIcon name="inbox" /></span>
      <p className="cv-empty__title">Nothing here</p>
      <p className="cv-empty__sub">{label}</p>
    </div>
  );
}

function channelSubtitle(channels: ChannelKey[]) {
  return channels.map((ch) => CHANNEL_LABEL[ch]).join(", ");
}

type ThreadItem =
  | { kind: "bubble"; dir: "in" | "out"; text: string; channel: ChannelKey; time: string }
  | { kind: "mail"; subject: string; snippet: string; channel: ChannelKey; time: string };

const THREADS: Record<string, ThreadItem[]> = {
  leonidas: [
    { kind: "bubble", dir: "in", text: "Match Sunday, you in?", channel: "whatsapp", time: "Sat 10:12" },
    { kind: "bubble", dir: "out", text: "Definitely. What time?", channel: "whatsapp", time: "Sat 10:14" },
    { kind: "bubble", dir: "in", text: "2pm at the court by the water", channel: "messenger", time: "Sat 11:02" },
    {
      kind: "mail",
      subject: "Sunday pickup",
      snippet: "I'll grab bread from the bakery on the way. Need anything else?",
      channel: "email",
      time: "Sun 8:40",
    },
    { kind: "bubble", dir: "out", text: "see you Sunday!", channel: "whatsapp", time: "1h" },
  ],
  penelope: [
    { kind: "bubble", dir: "in", text: "These Naxos photos are insane 🤍", channel: "instagram", time: "Yesterday" },
    { kind: "bubble", dir: "out", text: "Thanks! That sunset was unreal", channel: "whatsapp", time: "Yesterday" },
    { kind: "bubble", dir: "in", text: "We should go back next summer", channel: "imessage", time: "4h" },
    { kind: "bubble", dir: "in", text: "Loved the photos from Naxos!", channel: "instagram", time: "3h" },
  ],
  hektor: [
    { kind: "bubble", dir: "in", text: "Great chatting at the symposium last week", channel: "linkedin", time: "Tue" },
    {
      kind: "mail",
      subject: "Dinner next week?",
      snippet: "Likewise. Let's do dinner soon. I'll be in Athens Thursday through Saturday.",
      channel: "email",
      time: "Wed",
    },
    { kind: "bubble", dir: "in", text: "How about Thursday?", channel: "telegram", time: "Thu 18:20" },
    { kind: "bubble", dir: "out", text: "Thursday works, 8pm at Ouzeri", channel: "telegram", time: "Thu 18:45" },
    { kind: "bubble", dir: "in", text: "Can we move dinner to Friday?", channel: "telegram", time: "5h" },
  ],
  iris: [
    { kind: "bubble", dir: "in", text: "Just posted that recipe you asked for", channel: "x", time: "2d" },
    { kind: "bubble", dir: "out", text: "Got it, printing for my mum", channel: "email", time: "1d" },
    {
      kind: "mail",
      subject: "Horiatiki notes",
      snippet: "Sending the recipe now. Use the small cucumbers if you can find them.",
      channel: "email",
      time: "1d",
    },
  ],
  villa: [
    {
      kind: "mail",
      subject: "Reservation confirmed",
      snippet: "Santorini, Jun 12-16, 2 guests. Your booking reference is ATH-4471.",
      channel: "email",
      time: "1d",
    },
    { kind: "bubble", dir: "in", text: "Check-in is from 3pm. Let us know your ferry arrival.", channel: "email", time: "1d" },
  ],
};

function ThreadBody({ items }: { items: ThreadItem[] }) {
  return (
    <>
      {items.map((item, i) => {
        if (item.kind === "mail") {
          return (
            <div key={i} className="cv-mail">
              <div className="cv-mail__top">
                <ChannelGlyph channel={item.channel} />
                <span className="cv-mail__subject">{item.subject}</span>
              </div>
              <p className="cv-mail__snippet">{item.snippet}</p>
              <span className="cv-bubble__meta">
                <ChannelGlyph channel={item.channel} />
                {item.time}
              </span>
            </div>
          );
        }
        return (
          <div key={i} className={`cv-bubble cv-bubble--${item.dir}`}>
            {item.text}
            <span className="cv-bubble__meta">
              <ChannelGlyph channel={item.channel} />
              {item.time}
            </span>
          </div>
        );
      })}
    </>
  );
}

function PersonThread({ row }: { row: InboxRow }) {
  if (row.id === "athena") return <AthenaThread />;

  const items = THREADS[row.id];
  const preview = row.preview.startsWith("You:") ? row.preview.slice(4).trim() : row.preview;

  return (
    <>
      <div className="cv-thread__head">
        <CvAvatar row={row} />
        <div>
          <div className="cv-thread__name">{row.name}</div>
          <div className="cv-thread__sub">{channelSubtitle(row.channels)}</div>
        </div>
      </div>
      <div className="cv-thread__body">
        {items ? (
          <ThreadBody items={items} />
        ) : (
          <div className={`cv-bubble cv-bubble--${row.preview.startsWith("You:") ? "out" : "in"}`}>
            {preview}
            <span className="cv-bubble__meta">
              <ChannelGlyph channel={row.channels[0]} />
              {row.time}
            </span>
          </div>
        )}
      </div>
    </>
  );
}

const VOICE_BARS = [
  0.32, 0.55, 0.78, 0.42, 0.88, 0.61, 0.95, 0.48, 0.72, 0.38, 0.84, 0.52,
  0.91, 0.45, 0.68, 0.58, 0.82, 0.36, 0.74, 0.5, 0.86, 0.44, 0.66, 0.8,
  0.4, 0.76, 0.56, 0.9, 0.46, 0.7, 0.62, 0.85, 0.34, 0.58, 0.48, 0.3,
];
const VOICE_PROGRESS = 0.38;

function BentoVoiceNote() {
  return (
    <div className="cv-voice">
      <button type="button" className="cv-voice__play" aria-label="Play voice note">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
      <div className="cv-voice__wave" aria-hidden>
        {VOICE_BARS.map((h, i) => (
          <span
            key={i}
            className="cv-voice__bar"
            data-filled={(i + 0.5) / VOICE_BARS.length <= VOICE_PROGRESS}
            style={{ height: `${Math.max(18, Math.round(h * 100))}%` }}
          />
        ))}
      </div>
      <span className="cv-voice__dur">0:16</span>
    </div>
  );
}

function BentoMapCard() {
  return (
    <div className="cv-map">
      <div className="cv-map__preview">
        <svg className="cv-map__static" viewBox="0 0 200 72" aria-hidden>
          <rect width="200" height="72" fill="#e8f4f0" />
          <rect width="200" height="18" fill="#d4ecf0" />
          <path d="M0 72V38c12-4 28-2 44 4s34 10 52 6 36-12 48-16 26-4 34 0 22 10 22 10V72H0Z" fill="#dde8d8" />
          <path d="M80 38c6-4 12-6 18-4s14 6 20 12" fill="none" stroke="#b8a870" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="100" cy="30" r="6" fill="#c25b33" stroke="#fff" strokeWidth="2" />
        </svg>
      </div>
      <div className="cv-map__body">
        <span className="cv-map__label">Villa Aegean, Oia</span>
        <span className="cv-map__link">Open</span>
      </div>
    </div>
  );
}

const PRIMARY_ROWS = ALL_ROWS.filter((r) => r.bucket === "primary").slice(0, 3);

export function FeatureBento() {
  return (
    <div className="bento-grid">
      {/* Circles */}
      <article id="circles" className="bento-card scroll-mt-24">
        <div className="bento-canvas">
          <div className="cv-sec">
            <div className="cv-sec__head">Circles</div>
            {CIRCLES.map((c, i) => (
              <div key={c.name} className="cv-nav" data-active={i === 0}>
                <span className="cv-nav__icon cv-nav__emoji">{c.emoji}</span>
                <span className="cv-nav__label">{c.name}</span>
                {c.count && <span className="cv-nav__count">{c.count}</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="bento-meta">
          <h3 className="bento-title">Circles</h3>
          <p className="bento-body">
            Group people however you like: family, a trip, your team. Each Circle
            gets a colour so you can spot who a message is from.
          </p>
        </div>
      </article>

      {/* Every channel */}
      <article className="bento-card">
        <div className="bento-canvas">
          <div className="bento-focus">
            <div className="cv-thread__head">
              <span
                className="cv-ava"
                data-ring="true"
                style={{ ["--ring" as string]: "#f0b132" } as React.CSSProperties}
              >
                <Image
                  className="cv-ava__img"
                  src={PEOPLE.athena.avatar}
                  alt=""
                  width={32}
                  height={32}
                />
              </span>
              <div>
                <div className="cv-thread__name">Athena Pappas</div>
                <div className="cv-thread__sub">Instagram, WhatsApp, Email, Telegram</div>
              </div>
            </div>
          </div>
          <div className="bento-bubbles">
            <div className="cv-bubble cv-bubble--in">
              Found our villa for Santorini 😍
              <span className="cv-bubble__meta"><ChannelGlyph channel="instagram" />9:01</span>
            </div>
            <div className="cv-bubble cv-bubble--out">
              Looks unreal! Book it.
              <span className="cv-bubble__meta"><ChannelGlyph channel="whatsapp" />9:03</span>
            </div>
            <div className="cv-bubble cv-bubble--in">
              Booked the ferry too 🚢
              <span className="cv-bubble__meta"><ChannelGlyph channel="telegram" />9:06</span>
            </div>
          </div>
        </div>
        <div className="bento-meta">
          <h3 className="bento-title">Every channel</h3>
          <p className="bento-body">
            Someone might text you on WhatsApp, then email, then DM you on
            Instagram. Convolios puts it all in one thread so nothing gets lost
            between apps.
          </p>
        </div>
      </article>

      {/* The Gate */}
      <article id="gate" className="bento-card scroll-mt-24">
        <div className="bento-canvas">
          <div className="bento-focus">
            <InboxRowView row={GATE_ROWS[0]} active={false} gateActions />
          </div>
        </div>
        <div className="bento-meta">
          <h3 className="bento-title">The Gate</h3>
          <p className="bento-body">
            Your inbox is for people you already know. Anyone new waits at the
            Gate: a number you don&apos;t recognise, a cold email, a first DM.
            You choose who gets in.
          </p>
        </div>
      </article>

      {/* My Turn + Their Turn */}
      <article className="bento-card">
        <div className="bento-canvas">
          <div className="bento-focus bento-focus--stack">
            {VIEWS["whose-turn"].rows.map((r) => (
              <InboxRowView key={r.id} row={r} active={false} />
            ))}
          </div>
        </div>
        <div className="bento-meta">
          <h3 className="bento-title">My Turn &amp; Their Turn</h3>
          <p className="bento-body">
            See who is waiting on you and who you&apos;re waiting on, without
            jumping between apps.
          </p>
        </div>
      </article>

      {/* Rich timeline */}
      <article className="bento-card">
        <div className="bento-canvas bento-rich">
          <div className="cv-reel cv-reel--compact">
            <Image
              className="cv-reel__img"
              src="/brand/reel-santorini.png"
              alt=""
              width={120}
              height={170}
            />
            <span className="cv-reel__play" aria-hidden>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="cv-reel__tag">
              <ChannelGlyph channel="instagram" /> Reel, 0:14
            </span>
          </div>
          <BentoVoiceNote />
          <BentoMapCard />
          <div className="cv-mail cv-mail--compact">
            <div className="cv-mail__top">
              <ChannelGlyph channel="email" />
              <span className="cv-mail__subject">Reservation confirmed</span>
            </div>
            <p className="cv-mail__snippet">
              Villa Aegean, Jun 12-16, 2 guests. Ref ATH-4471.
            </p>
          </div>
        </div>
        <div className="bento-meta">
          <h3 className="bento-title">Rich timeline</h3>
          <p className="bento-body">
            Reels, voice notes, maps, emails. Every widget from across channels
            shows up in the same timeline, rendered properly.
          </p>
        </div>
      </article>

      {/* Primary & General */}
      <article className="bento-card">
        <div className="bento-canvas">
          <div className="cv-toggle cv-toggle--bento">
            <span className="cv-toggle__opt" data-active="true">Primary</span>
            <span className="cv-toggle__opt">General</span>
          </div>
          <div className="bento-focus bento-focus--stack">
            {PRIMARY_ROWS.map((r, i) => (
              <InboxRowView key={r.id} row={r} active={i === 0} />
            ))}
          </div>
        </div>
        <div className="bento-meta">
          <h3 className="bento-title">Primary &amp; General</h3>
          <p className="bento-body">
            People you care about stay in Primary. Newsletters and notifications
            go to General. Still there when you need them, just out of the way.
          </p>
        </div>
      </article>

      {/* Reply on any channel */}
      <article className="bento-card">
        <div className="bento-canvas">
          <div className="bento-bubbles">
            <div className="cv-bubble cv-bubble--in">
              Perfect, let&apos;s lock the dates.
              <span className="cv-bubble__meta"><ChannelGlyph channel="whatsapp" />2m</span>
            </div>
          </div>
          <div className="bento-focus bento-focus--stack bento-channels" aria-hidden>
            {COMPOSER_CHANNELS.map((ch) => (
              <div key={ch} className="bento-channel" data-active={ch === "instagram"}>
                <ChannelGlyph channel={ch} />
                <span>{CHANNEL_LABEL[ch]}</span>
              </div>
            ))}
          </div>
          <div className="cv-composer cv-composer--bento" aria-hidden>
            <div className="cv-composer__channel" data-open="true">
              <ChannelGlyph channel="instagram" />
              <span>Instagram</span>
              <svg className="cv-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
            <div className="cv-composer__input">Reply to Athena…</div>
            <span className="cv-composer__send" aria-hidden>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.4 20.4l17.5-7.5a1 1 0 000-1.8L3.4 3.6a1 1 0 00-1.4 1.1L4 11l9 1-9 1-2 6.3a1 1 0 001.4 1.1z" />
              </svg>
            </span>
          </div>
        </div>
        <div className="bento-meta">
          <h3 className="bento-title">Reply on any channel</h3>
          <p className="bento-body">
            Read one timeline, reply on whatever channel makes sense. Convolios
            sends it. You stay in one window.
          </p>
        </div>
      </article>

      {/* Action items */}
      <article className="bento-card">
        <div className="bento-canvas">
          <div className="bento-focus bento-focus--stack">
            {VIEWS["action-items"].rows.map((r) => (
              <InboxRowView key={r.id} row={r} active={false} />
            ))}
          </div>
        </div>
        <div className="bento-meta">
          <h3 className="bento-title">Action items</h3>
          <p className="bento-body">
            Flag messages to save them for later or as action items.
          </p>
        </div>
      </article>

      {/* Search */}
      <article className="bento-card">
        <div className="bento-canvas">
          <div className="bento-focus">
            <div className="cv-search" data-active="true">
              <span>santorini</span>
              <kbd>⌘K</kbd>
            </div>
          </div>
          <div className="bento-results">
            {VIEWS.search.rows.map((r) => (
              <InboxRowView key={r.id} row={r} active={false} />
            ))}
          </div>
        </div>
        <div className="bento-meta">
          <h3 className="bento-title">Search everything</h3>
          <p className="bento-body">
            Looking for an address someone sent months ago? Search once. WhatsApp,
            email, Instagram, whatever channel it was on.
          </p>
        </div>
      </article>
    </div>
  );
}

export function HeroShowcase() {
  const [nav, setNav] = useState<DemoNav>({ kind: "all" });
  const [selectedId, setSelectedId] = useState("athena");
  const [bucket, setBucket] = useState<"primary" | "general">("primary");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [gateRows, setGateRows] = useState(GATE_ROWS);
  const [composerMenuOpen, setComposerMenuOpen] = useState(false);
  const [composerChannel, setComposerChannel] = useState<ChannelKey>("whatsapp");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const rows = useMemo(
    () => filterDemoRows(nav, bucket, unreadOnly, gateRows),
    [nav, bucket, unreadOnly, gateRows],
  );

  useEffect(() => {
    setSelectedId((cur) => (rows.some((r) => r.id === cur) ? cur : (rows[0]?.id ?? "")));
  }, [rows]);

  const header = navHeader(nav, rows.length);
  const activeKey = navActiveKey(nav);
  const isGate = nav.kind === "gate";
  const searchQuery = nav.kind === "search" ? nav.query : null;

  const activeRow = rows.length > 0
    ? (rows.find((r) => r.id === selectedId) ?? rows[0])
    : undefined;

  const firstName = activeRow?.name.split(" ")[0] ?? "them";

  const pickNav = useCallback(
    (next: DemoNav) => {
      setNav(next);
      setComposerMenuOpen(false);
      setSettingsOpen(false);
      const nextRows = filterDemoRows(next, bucket, unreadOnly, gateRows);
      setSelectedId(nextRows[0]?.id ?? "");
    },
    [bucket, unreadOnly, gateRows],
  );

  const removeGateRow = useCallback((id: string) => {
    setGateRows((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return (
    <section className="hero-greek border-b border-line">
      <Image
        src="/brand/hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-greek__bg"
      />
      <div className="hero-greek__wash" aria-hidden />

      <div className="hero-greek__inner">
        <div className="hero-greek__column">
        <BrandWordmark className="hero-greek__wordmark" size={36} />
        <h1 className="hero-greek__title">
          Everyone you care about, in one place.
        </h1>
        <p className="hero-greek__sub">
          Every message from the people you know, across{" "}
          <span className="hero-greek__chans">
            {HERO_CHANNELS.map((channel) => (
              <ChannelGlyph key={channel} channel={channel} />
            ))}
          </span>{" "}
          in one inbox, powered by AI. Group people into Circles. Strangers wait
          at the Gate until you let them in.
        </p>
        <div className="hero-greek__cta-block">
          <DownloadPill />
        </div>

        <div className="hero-greek__stage">
          <div className="cv-window-stack">
            <div className="cv-window" role="img" aria-label="Convolios inbox preview, beta">
            <span className="cv-ribbon" aria-hidden>Beta</span>
            <div className="cv-titlebar">
              <span className="cv-traffic" style={{ background: "#ec6a5e" }} />
              <span className="cv-traffic" style={{ background: "#f4bf4f" }} />
              <span className="cv-traffic" style={{ background: "#61c554" }} />
              <span className="cv-titlebar__name">Convolios</span>
            </div>

            <div className="cv-body">
              {/* sidebar */}
              <div className="cv-sidebar">
                <button
                  type="button"
                  className="cv-search"
                  data-active={nav.kind === "search"}
                  onClick={() => pickNav({ kind: "search", query: "santorini" })}
                >
                  <span>{searchQuery ?? "Search…"}</span>
                  <kbd>⌘K</kbd>
                </button>

                <div className="cv-scroll">
                  <button
                    type="button"
                    className="cv-nav"
                    data-active={activeKey === "all"}
                    onClick={() => pickNav({ kind: "all" })}
                  >
                    <span className="cv-nav__icon"><NavIcon name="inbox" /></span>
                    <span className="cv-nav__label">All</span>
                    <span className="cv-nav__count">{ALL_ROWS.length}</span>
                  </button>
                  <button
                    type="button"
                    className="cv-nav"
                    data-active={activeKey === "my-turn"}
                    onClick={() => pickNav({ kind: "my-turn" })}
                  >
                    <span className="cv-nav__icon"><NavIcon name="reply" /></span>
                    <span className="cv-nav__label">My Turn</span>
                    <span className="cv-nav__count">{ALL_ROWS.filter((r) => r.myTurn).length}</span>
                  </button>
                  <button
                    type="button"
                    className="cv-nav"
                    data-active={activeKey === "their-turn"}
                    onClick={() => pickNav({ kind: "their-turn" })}
                  >
                    <span className="cv-nav__icon"><NavIcon name="clock" /></span>
                    <span className="cv-nav__label">Their Turn</span>
                    <span className="cv-nav__count">{ALL_ROWS.filter((r) => r.theirTurn).length}</span>
                  </button>
                  <button
                    type="button"
                    className="cv-nav"
                    data-active={activeKey === "action-items"}
                    onClick={() => pickNav({ kind: "action-items" })}
                  >
                    <span className="cv-nav__icon"><NavIcon name="flag" /></span>
                    <span className="cv-nav__label">Action items</span>
                    <span className="cv-nav__count">{ALL_ROWS.filter((r) => r.flagged).length}</span>
                  </button>

                  <div className="cv-sec">
                    <div className="cv-sec__head">Circles</div>
                    {CIRCLES.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        className="cv-nav"
                        data-active={activeKey === `circle-${c.id}`}
                        onClick={() => pickNav({ kind: "circle", id: c.id })}
                      >
                        <span className="cv-nav__icon cv-nav__emoji">{c.emoji}</span>
                        <span className="cv-nav__label">{c.name}</span>
                        <span className="cv-nav__count">
                          {ALL_ROWS.filter((r) => r.circles?.includes(c.id)).length}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="cv-sec">
                    <div className="cv-sec__head">Channels</div>
                    <button
                      type="button"
                      className="cv-nav"
                      data-active={nav.kind === "all"}
                      onClick={() => pickNav({ kind: "all" })}
                    >
                      <span className="cv-nav__icon"><NavIcon name="layers" /></span>
                      <span className="cv-nav__label">All channels</span>
                    </button>
                    {SIDEBAR_CHANNELS.map((ch) => (
                      <button
                        key={ch}
                        type="button"
                        className="cv-nav"
                        data-active={activeKey === `channel-${ch}`}
                        onClick={() => pickNav({ kind: "channel", channel: ch })}
                      >
                        <span className="cv-nav__icon"><ChannelGlyph channel={ch} /></span>
                        <span className="cv-nav__label">{CHANNEL_LABEL[ch]}</span>
                      </button>
                    ))}
                  </div>

                  <div className="cv-sec">
                    <div className="cv-sec__head">Library</div>
                    <button
                      type="button"
                      className="cv-nav cv-nav--gate"
                      data-active={activeKey === "gate"}
                      onClick={() => pickNav({ kind: "gate" })}
                    >
                      <span className="cv-nav__icon"><NavIcon name="door" /></span>
                      <span className="cv-nav__label">Gate</span>
                      <span className="cv-nav__count">{gateRows.length}</span>
                    </button>
                  </div>
                </div>

                <div className="cv-foot">
                  <span className="cv-foot__name">you@convolios.com</span>
                  <button
                    type="button"
                    className="cv-foot__gear"
                    data-active={settingsOpen}
                    aria-label="Settings"
                    onClick={() => setSettingsOpen((v) => !v)}
                  >
                    <NavIcon name="settings" />
                  </button>
                </div>
              </div>

              {/* inbox list */}
              <div className="cv-inbox">
                <div className="cv-inbox__util">
                  <div className="cv-tabs">
                    <button
                      type="button"
                      className="cv-tab"
                      data-active={bucket === "primary"}
                      onClick={() => setBucket("primary")}
                    >
                      Primary
                    </button>
                    <button
                      type="button"
                      className="cv-tab"
                      data-active={bucket === "general"}
                      onClick={() => setBucket("general")}
                    >
                      General
                    </button>
                  </div>
                  <div className="cv-toggle">
                    <button
                      type="button"
                      className="cv-toggle__opt"
                      data-active={!unreadOnly}
                      onClick={() => setUnreadOnly(false)}
                    >
                      All
                    </button>
                    <button
                      type="button"
                      className="cv-toggle__opt"
                      data-active={unreadOnly}
                      onClick={() => setUnreadOnly(true)}
                    >
                      Unread
                    </button>
                  </div>
                </div>
                <div className="cv-inbox__head">
                  <span>{header.label}</span>
                  <span className="cv-inbox__count">{header.count}</span>
                </div>
                <div className="cv-inbox__list">
                  {rows.length === 0 && (
                    <div className="cv-empty cv-empty--inbox">
                      <p className="cv-empty__title">
                        {isGate ? "Gate is clear" : unreadOnly ? "All caught up" : "No conversations"}
                      </p>
                      <p className="cv-empty__sub">
                        {isGate
                          ? "No one is waiting to get in."
                          : unreadOnly
                            ? "Nothing unread in this view."
                            : "Try another filter or tab."}
                      </p>
                    </div>
                  )}
                  {rows.map((r) => (
                    <InboxRowView
                      key={r.id}
                      row={r}
                      active={r.id === selectedId}
                      gateActions={isGate}
                      onSelect={() => setSelectedId(r.id)}
                      onGateAllow={() => removeGateRow(r.id)}
                      onGateDeny={() => removeGateRow(r.id)}
                    />
                  ))}
                </div>
              </div>

              {/* thread */}
              <div className="cv-thread">
                <div className="cv-thread__spotlight">
                  {isGate ? (
                    <GatePane count={gateRows.length} row={activeRow} />
                  ) : activeRow ? (
                    <PersonThread row={activeRow} />
                  ) : (
                    <EmptyInboxPane
                      label={
                        unreadOnly
                          ? "Switch to All or pick another view."
                          : "Pick someone from the list, or change filters."
                      }
                    />
                  )}
                </div>

                {!isGate && activeRow && (
                  <div className="cv-composer">
                    {composerMenuOpen && (
                      <div className="cv-composer__menu">
                        {COMPOSER_CHANNELS.map((ch) => (
                          <button
                            key={ch}
                            type="button"
                            className="cv-composer__menu-item"
                            data-active={composerChannel === ch}
                            onClick={() => {
                              setComposerChannel(ch);
                              setComposerMenuOpen(false);
                            }}
                          >
                            <ChannelGlyph channel={ch} /> {CHANNEL_LABEL[ch]}
                          </button>
                        ))}
                      </div>
                    )}
                    <button
                      className="cv-composer__channel"
                      type="button"
                      data-open={composerMenuOpen}
                      onClick={() => setComposerMenuOpen((v) => !v)}
                    >
                      <ChannelGlyph channel={composerChannel} />
                      <span>{CHANNEL_LABEL[composerChannel]}</span>
                      <svg
                        className="cv-chevron"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    <div className="cv-composer__input">Reply to {firstName}…</div>
                    <button className="cv-composer__send" type="button" aria-label="Send">
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M3.4 20.4l17.5-7.5a1 1 0 000-1.8L3.4 3.6a1 1 0 00-1.4 1.1L4 11l9 1-9 1-2 6.3a1 1 0 001.4 1.1z" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

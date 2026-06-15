import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Content,
  fetchOneEntry,
  isPreviewing,
} from "@builder.io/sdk-react-nextjs";
import { BUILDER_API_KEY, asString } from "@/lib/builder";

interface PageProps {
  params: Promise<{ page: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const MODEL = "page";

function toQuery(
  search: Record<string, string | string[] | undefined>,
): Record<string, string | string[]> {
  const out: Record<string, string | string[]> = {};
  for (const [key, value] of Object.entries(search)) {
    if (value !== undefined) out[key] = value;
  }
  return out;
}

async function getContent(page: string[]) {
  if (!BUILDER_API_KEY) return null;
  const urlPath = "/" + (page?.join("/") || "");
  return fetchOneEntry({
    model: MODEL,
    apiKey: BUILDER_API_KEY,
    userAttributes: { urlPath },
  });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { page } = await params;
  const content = await getContent(page);
  if (!content) return {};
  return {
    title: asString(content.data?.title),
    description: asString(content.data?.description),
  };
}

export default async function BuilderPage({
  params,
  searchParams,
}: PageProps) {
  const { page } = await params;
  const search = await searchParams;
  const content = await getContent(page);

  if (!content && !isPreviewing(toQuery(search))) {
    notFound();
  }

  return <Content content={content} apiKey={BUILDER_API_KEY} model={MODEL} />;
}

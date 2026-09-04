import { headers } from "next/headers";

export async function getBaseUrl() {
  const headerList = await headers();
  const host = headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") ?? "http";

  if (!host) {
    return "http://localhost:3000";
  }

  return `${protocol}://${host}`;
}

export async function getAbsoluteUrl(pathname: string) {
  return new URL(pathname, await getBaseUrl()).toString();
}

import { NextRequest, NextResponse } from "next/server";
export const runtime = "edge";
export async function GET(request: Request | NextRequest) {
  const parsedUrl = new URL(request.url as string);
  const searchParams = parsedUrl.searchParams;
  
  const protocol = parsedUrl.protocol;
  const host = request.headers.get("host") || parsedUrl.host;
  const baseUrl = `${protocol}//${host}`;
  
  const redirectUrl = new URL("/", baseUrl);
  searchParams.forEach((value, key) => {
    redirectUrl.searchParams.set(key, value);
  });

  return NextResponse.redirect(redirectUrl);
}

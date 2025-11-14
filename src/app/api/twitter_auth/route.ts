import { NextRequest, NextResponse } from "next/server";
export const runtime = "edge";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();
  const redirectPath = queryString ? `/referral?${queryString}` : "/";
  const redirectUrl = `${request.nextUrl.origin}${redirectPath}`;
  
  return NextResponse.redirect(redirectUrl);
}

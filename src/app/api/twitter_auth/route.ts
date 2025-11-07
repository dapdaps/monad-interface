import { NextRequest } from "next/server";
export const runtime = "edge";
export async function GET(request: Request | NextRequest) {

  const res = new Response(
    JSON.stringify({ callback: true }),
    {
      status: 200
    }
  );

  res.headers.set("Content-Type", "application/json");

  return res;
}

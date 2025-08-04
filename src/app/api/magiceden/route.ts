import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const accessToken = "d0d4c2a8-873a-4475-a830-ee19bb224521";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const url =
      "https://api-mainnet.magiceden.dev/v4/self_serve/nft/mint_token";

    const fetchOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(body)
    };

    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ status: 500, error: error });
  }
}

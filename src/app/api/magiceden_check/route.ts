import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const url = 'https://api-mainnet.magiceden.dev/v4/self_serve/nft/check_allowlist_eligibility';
    
    const fetchOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || '',
        'referer': 'https://magiceden.io/',
        'origin': 'https://magiceden.io/',
        'user-agent:': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(url, fetchOptions);

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: 500, error: error }
    );
  }
}


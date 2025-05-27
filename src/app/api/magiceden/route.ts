import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const url = 'https://api-mainnet.magiceden.dev/v4/self_serve/nft/mint_token';
    
    const fetchOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || '',
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('代理请求失败:', error);
    return NextResponse.json(
      { error: '请求转发失败' },
      { status: 500 }
    );
  }
}


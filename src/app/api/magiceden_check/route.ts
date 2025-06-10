import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const url = 'https://api-mainnet.magiceden.dev/v4/self_serve/nft/check_allowlist_eligibility';

    // const fetchOptions: RequestInit = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     "priority": "u=1, i",
    //     // 'Authorization': request.headers.get('Authorization') || '',
    //     'referer': 'https://magiceden.io/',
    //     'origin': 'https://magiceden.io/',
    //     "referrerPolicy": "strict-origin-when-cross-origin",
    //     "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    //     "sec-ch-ua-mobile": "?0",
    //     "sec-ch-ua-platform": "\"macOS\"",
    //     "sec-fetch-dest": "empty",
    //     "sec-fetch-mode": "cors",
    //     "sec-fetch-site": "same-site",
    //     "mode": "cors",
    //     "credentials": "omit",
    //     'user-agent:': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
    //   },
    //   body: JSON.stringify(body),
    // };

    // const response = await fetch(url, fetchOptions);


    const response = await fetch("https://api-mainnet.magiceden.dev/v4/self_serve/nft/check_allowlist_eligibility", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site"
      },
      "referrer": "https://magiceden.io/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": JSON.stringify(body),
      "method": "POST",
      "mode": "cors",
      "credentials": "omit"
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: 500, error: error }
    );
  }
}


import { NextRequest } from "next/server";
export const runtime = "edge";
export async function GET(request: Request | NextRequest) {
  const parsedUrl = new URL(request.url as string);
  const code = parsedUrl.searchParams.get("code");
  const state = parsedUrl.searchParams.get("state");

  const api = process.env.NEXT_PUBLIC_API_URL;

  const res = new Response(
    `<html><body><script>
    var code = ${code};
    var state = ${state};
    // async function callback() {
    //   const res = await fetch('${api}/api/twitter/bind', {
    //     method: 'POST',
    //     body: JSON.stringify({ code, redirect_uri: window.location.origin }),
    //   });
    //   if (res.ok) {
    //     window.location.href = "/";
    //   } else {
    //     window.location.href = "/";
    //   }
    // }
    
    </script></body></html>`,
    {
      status: 200
    }
  );

  res.headers.set("Content-Type", "text/html");

  return res;
}

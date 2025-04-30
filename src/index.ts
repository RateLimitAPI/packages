export async function isRateLimited(req: Request, apiToken: string): Promise<Response | null> {
  const rlRes = await fetch('https://ratelimitapi.com/limit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiToken}`,
    },
    body: JSON.stringify({
      method: req.method,
      url: new URL(req.url).pathname,
    }),
  });

  if (rlRes.status === 429) {
    const headers = new Headers();
    rlRes.headers.forEach((v, k) => headers.set(k, v));
    const body = await rlRes.text();
    return new Response(body, { status: 429, headers });
  }

  return null;
}
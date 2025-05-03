/**
 * Checks if a request is rate-limited by calling the RateLimitAPI service.
 * 
 * This function extracts the path, method, headers, and full URL from the incoming request and
 * forwards them to the RateLimitAPI service. If the request is rate-limited,
 * it returns a Response object with a 429 status code and headers from the
 * RateLimitAPI service. Otherwise, it returns null.
 * 
 * @param req - The incoming request object to check for rate limiting
 * @param apiToken - The authentication token for the RateLimitAPI service
 * @returns A Response object with status 429 if rate-limited, or null if not rate-limited
 * @throws Will throw an error if the network request to the RateLimitAPI service fails
 * 
 * @example
 * ```typescript
 * const rateLimitResponse = await isRateLimited(request, "your-api-token");
 * if (rateLimitResponse) {
 *   return rateLimitResponse; // Return the 429 response if rate-limited
 * }
 * // Continue with normal request handling if not rate-limited
 * ```
 */
export async function isRateLimited(req: Request, apiToken: string): Promise<Response | null> {
  const url = new URL(req.url);
  const method = req.method;
  const apiUrl = 'https://api.ratelimitapi.com/v1/limit';
  
  // Extract original headers
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });
  
  const rlRes = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      method,
      url: req.url,
      headers
    })
  });
  
  if (rlRes.status === 429) {
    const headers = new Headers();
    rlRes.headers.forEach((v, k) => headers.set(k, v));
    const body = await rlRes.text();
    return new Response(body, { status: 429, headers });
  }
  return null;
}
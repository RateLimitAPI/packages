/**
 * Checks if a request should be rate limited based on RateLimit API
 * 
 * This function evaluates if a request should be rate limited by communicating with the
 * RateLimit API service. It validates the API token, extracts request information, and
 * sends it to the rate limiting service for evaluation.
 *
 * @param req - The request object to check for rate limiting
 * @param apiToken - The API token for authenticating with the RateLimit API (must start with "rlimit_")
 * @returns A Response object if the request is rate limited or encounters an error, or null if the request is allowed to proceed
 * @example
```typescript
 * const limitedResponse = await isRateLimited(request, "rlimit_your_token_here");
 * if (limitedResponse) {
 *   return limitedResponse; // Return the rate limit response to the client
 * }
 * // Continue with normal request processing
 * ```
 */
export async function isRateLimited(req: Request, apiToken: string): Promise<Response | null> {
  // Validate API token
  if (!apiToken.startsWith('rlimit_')) {
    return createErrorResponse({
      error: 'invalid_api_token', 
      message: 'API token must start with "rlimit_"'
    }, 401);
  }

  // Extract request information
  const method = req.method;
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });
  
  // Call rate limit API
  const rlRes = await fetch('https://api.ratelimitapi.com/v1/limit', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ method, url: req.url, headers })
  });

  // Handle rate limited response
  if (rlRes.status === 429) {
    const headers = new Headers();
    rlRes.headers.forEach((v, k) => headers.set(k, v));
    return new Response(await rlRes.text(), { status: 429, headers });
  }
  
  // Handle error responses
  if (!rlRes.ok) {
    try {
      const errorData = await rlRes.json();
      if (!errorData.success && errorData.error) {
        const status = errorData.error === 'forbidden_url' ? 403 : 400;
        return createErrorResponse(errorData, status);
      }
    } catch (e) {
      return new Response(await rlRes.text(), { status: rlRes.status });
    }
  }
  
  return null;
}

/**
 * Creates a standardized error Response object with JSON content.
 * 
 * @param errorData - Additional error information to be included in the response body
 * @param status - HTTP status code for the response
 * @returns A Response object with the error data and appropriate headers
 */
function createErrorResponse(errorData: Record<string, any>, status: number): Response {
  return new Response(
    JSON.stringify({ success: false, ...errorData }),
    { 
      status,
      headers: { 'Content-Type': 'application/json' } 
    }
  );
}

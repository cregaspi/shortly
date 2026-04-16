import axios from 'axios';

// In Next.js, browser-accessible env vars must start with NEXT_PUBLIC_
const TINYURL_TOKEN = process.env.NEXT_PUBLIC_TINYURL_TOKEN;

// Pre-configured axios instance — every request gets the auth header automatically
const tinyurlClient = axios.create({
  baseURL: 'https://api.tinyurl.com',
  headers: {
    'Content-Type': 'application/json',
    Accept:         'application/json',
    Authorization:  `Bearer ${TINYURL_TOKEN}`,
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// shortenUrl(url)
//
// POST /create — shortens a URL via TinyURL.
//
// Request body : { url: string, domain: 'tinyurl.com' }
// Response     : { data: { tiny_url: string, ... } }
//
// Returns      : { success: true,  shortUrl: string }
//              | { success: false, error: string }
// ─────────────────────────────────────────────────────────────────────────────
export async function shortenUrl(url) {
  try {
    const response = await tinyurlClient.post('/create', {
      url,
      domain: 'tinyurl.com',
    });

    const tinyUrl = response.data?.data?.tiny_url;

    if (tinyUrl) {
      return { success: true, shortUrl: tinyUrl };
    }

    return { success: false, error: 'No URL returned. Please try again.' };

  } catch (err) {
    // Axios wraps HTTP errors inside err.response
    const status  = err.response?.status;
    const message = err.response?.data?.errors?.[0] || err.message;

    // Switch on the HTTP status code for clean, readable error handling
    switch (status) {
      case 400:
        return {
          success: false,
          error: 'Bad request. Please check the URL and try again.',
        };

      case 401:
        return {
          success: false,
          error: 'Invalid API token. Check your TinyURL API key in .env.local.',
        };

      case 403:
        return {
          success: false,
          error: 'Access forbidden. Your API key may not have permission for this action.',
        };

      case 404:
        return {
          success: false,
          error: 'TinyURL endpoint not found. The API may have changed.',
        };

      case 422:
        return {
          success: false,
          error: "That doesn't look like a valid URL. Please check and try again.",
        };

      case 429:
        return {
          success: false,
          error: 'Too many requests. Please wait a moment and try again.',
        };

      case 500:
      case 502:
      case 503:
        return {
          success: false,
          error: 'TinyURL is temporarily unavailable. Please try again later.',
        };

      default:
        // Catches network errors (no response) and any unlisted status codes
        return {
          success: false,
          error: message || 'Something went wrong. Please try again.',
        };
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// getUrlInfo(alias, domain)
//
// GET /alias/{domain}/{alias} — retrieves info about an existing TinyURL.
// Optional — available for future use (e.g. analytics dashboard).
//
// Returns: { success: true, data: object }
//        | { success: false, error: string }
// ─────────────────────────────────────────────────────────────────────────────
export async function getUrlInfo(alias, domain = 'tinyurl.com') {
  try {
    const response = await tinyurlClient.get(`/alias/${domain}/${alias}`);
    return { success: true, data: response.data?.data };

  } catch (err) {
    const status  = err.response?.status;
    const message = err.response?.data?.errors?.[0] || err.message;

    switch (status) {
      case 401:
        return { success: false, error: 'Unauthorised. Check your API key.' };

      case 404:
        return { success: false, error: 'Short link not found.' };

      case 429:
        return { success: false, error: 'Too many requests. Please slow down.' };

      default:
        return { success: false, error: message || 'Could not retrieve URL info.' };
    }
  }
}
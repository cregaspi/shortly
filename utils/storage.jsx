// utils/storage.js
//
// Wraps localStorage so the page component doesn't deal with the key
// name or JSON parsing errors directly.
//
// No changes needed for Next.js — localStorage is a browser API and
// works the same way. The only caveat is that localStorage is undefined
// during Next.js server-side rendering (SSR), but because these functions
// are only called from useState() initialisers and useEffect() hooks
// (which run in the browser only), that is never an issue here.

const STORAGE_KEY = 'shortly_links';

/**
 * Load the saved links array from localStorage.
 * Returns [] if nothing is saved or if JSON parsing fails.
 *
 * @returns {Array<{ id: number, original: string, short: string }>}
 */
export function loadLinks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Persist the current links array to localStorage.
 *
 * @param {Array<{ id: number, original: string, short: string }>} links
 */
export function saveLinks(links) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  } catch {
    // Storage quota exceeded or unavailable — silently ignore
  }
}
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
const USERS_STORAGE_KEY = 'shortly_users';

/**
 * Load the saved links array from localStorage.
 * Returns [] if nothing is saved or if JSON parsing fails.
 *
 * @returns {Array<{ id: number, original: string, short: string, username: string }>}
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
 * @param {Array<{ id: number, original: string, short: string, username: string }>} links
 */
export function saveLinks(links) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  } catch {
    // Storage quota exceeded or unavailable — silently ignore
  }
}

/**
 * Get links for a specific user
 *
 * @param {string} username
 * @returns {Array<{ id: number, original: string, short: string, username: string }>}
 */
export function getUserLinks(username) {
  const allLinks = loadLinks();
  return allLinks.filter(link => link.username === username);
}

/**
 * Register a new user
 *
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {{ success: boolean, error?: string }}
 */
export function registerUser(username, email, password) {
  try {
    const users = getAllUsers();
    
    // Check if username already exists
    if (users.some(u => u.username === username)) {
      return { success: false, error: 'Username already taken' };
    }
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }
    
    // Add new user
    users.push({ username, email, password });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    return { success: true };
  } catch {
    return { success: false, error: 'Registration failed' };
  }
}

/**
 * Verify user login credentials
 *
 * @param {string} usernameOrEmail
 * @param {string} password
 * @returns {{ success: boolean, username?: string, error?: string }}
 */
export function verifyUser(usernameOrEmail, password) {
  try {
    const users = getAllUsers();
    
    // Check if it's username or email
    const user = users.find(u => 
      (u.username === usernameOrEmail || u.email === usernameOrEmail) && 
      u.password === password
    );
    
    if (user) {
      return { success: true, username: user.username };
    }
    
    return { success: false, error: 'Invalid username/email or password' };
  } catch {
    return { success: false, error: 'Login failed' };
  }
}

/**
 * Get all registered users
 *
 * @returns {Array<{ username: string, email: string, password: string }>}
 */
function getAllUsers() {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
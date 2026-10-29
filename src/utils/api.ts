/**
 * API configuration and helper utilities
 * Supports direct relative routing (for local dev, Cloudflare _redirects, or unified full-stack hosting)
 * and custom remote API base URL (VITE_API_BASE_URL) when frontend and backend are hosted on separate domains.
 */

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/$/, '');

export function getApiUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (!API_BASE_URL) {
    return cleanPath;
  }
  return `${API_BASE_URL}${cleanPath}`;
}

import axios from "axios";

// Use NEXT_PUBLIC_CMS_URL on the client; fall back to local CMS host for dev only.
export const NEXT_PUBLIC_CMS_URL =
  process.env.NEXT_PUBLIC_CMS_URL || process.env.NEXT_PUBLIC_API_URL || "http://cms.secnews.local";

export const API_BASE = NEXT_PUBLIC_CMS_URL;

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
});

/**
 * Build absolute image URL returned from CMS. If `imagePath` is already an absolute URL,
 * return it unchanged.
 */
export function buildImageUrl(imagePath?: string) {
  if (!imagePath) return undefined;
  try {
    const url = new URL(imagePath);
    // if parsing succeeds and has protocol, return as-is
    return url.toString();
  } catch {
    // relative path -> prefix with API_BASE
    return `${API_BASE}${imagePath}`;
  }
}
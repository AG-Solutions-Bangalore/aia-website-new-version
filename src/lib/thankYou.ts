import type { NavigateFunction } from 'react-router-dom';

export const THANK_YOU_PATH = '/thank-you/';
export const THANK_YOU_SOURCE_KEY = 'aia:thank-you:source';
export const THANK_YOU_COUNTDOWN_SECONDS = 120;

const MAX_SOURCE_LENGTH = 2048;
const CONTROL_CHARACTERS = /[\u0000-\u001F\u007F]/;

function stripThankYouSuffix(value: string): string {
  return value.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
}

export function isThankYouPath(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  return stripThankYouSuffix(value) === '/thank-you';
}

export function isSafeInternalPath(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  if (!value || value.length > MAX_SOURCE_LENGTH || value !== value.trim()) {
    return false;
  }
  if (!value.startsWith('/') || value.startsWith('//')) return false;
  if (value.includes('\\') || CONTROL_CHARACTERS.test(value)) return false;
  if (isThankYouPath(value)) return false;

  try {
    const origin =
      typeof window !== 'undefined' ? window.location.origin : 'https://aia.in.net';
    const url = new URL(value, origin);
    return url.origin === origin && !isThankYouPath(url.pathname);
  } catch {
    return false;
  }
}

export function getCurrentSourcePath(): string {
  if (typeof window === 'undefined') return '/';
  return (
    `${window.location.pathname}${window.location.search}${window.location.hash}` ||
    '/'
  );
}

export function rememberThankYouSource(source: string): void {
  if (typeof window === 'undefined' || !isSafeInternalPath(source)) return;
  try {
    window.sessionStorage.setItem(THANK_YOU_SOURCE_KEY, source);
  } catch {
    // Storage can be unavailable in private or sandboxed browsing contexts.
  }
}

export function getStoredThankYouSource(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.sessionStorage.getItem(THANK_YOU_SOURCE_KEY);
    if (stored && isSafeInternalPath(stored)) return stored;
    if (stored) window.sessionStorage.removeItem(THANK_YOU_SOURCE_KEY);
  } catch {
    // Fall through to the router-state fallback.
  }
  return null;
}

export function clearThankYouSource(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(THANK_YOU_SOURCE_KEY);
  } catch {
    // Nothing to clear when storage is unavailable.
  }
}

export function resolveThankYouSource(locationStateFrom?: unknown): string | null {
  const stored = getStoredThankYouSource();
  if (stored) return stored;
  if (isSafeInternalPath(locationStateFrom)) {
    rememberThankYouSource(locationStateFrom);
    return locationStateFrom;
  }
  return null;
}

export function redirectToThankYou(navigate: NavigateFunction): void {
  const current = getCurrentSourcePath();
  const source = isSafeInternalPath(current) ? current : '/';
  rememberThankYouSource(source);
  navigate(THANK_YOU_PATH, { state: { from: source } });
}

interface FormResponseLike {
  status?: number;
  data?: {
    code?: unknown;
  } | null;
}

export function isConfirmedFormSuccess(response: FormResponseLike): boolean {
  if (!response) return false;
  const code = response.data?.code;
  const hasCode = code !== undefined && code !== null && code !== '';
  if (hasCode) return code === 200 || code === '200';
  return (
    typeof response.status === 'number' &&
    response.status >= 200 &&
    response.status < 300
  );
}

export function formatCountdown(seconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safeSeconds / 60)
    .toString()
    .padStart(2, '0');
  const remainingSeconds = (safeSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
}

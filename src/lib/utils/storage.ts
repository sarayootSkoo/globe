/**
 * Secure storage wrapper using @secure-storage/common.
 *
 * - All keys are prefixed with `kg_` via the library's prefix config
 * - Values are AES-encrypted before writing to localStorage
 * - All operations are wrapped in try/catch (handles disabled storage,
 *   quota exceeded, SSR environments, private browsing)
 */

import { configure, localStorage as secureStorage } from '@secure-storage/common';

// Initialize secure storage with prefix and encryption secret
configure({
  prefix: 'kg',
  secret: 'knowledge-graph-v1',
});

/** Read a value from secure storage with fallback on any failure. */
export function safeGet<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined') return fallback;
    const val = secureStorage.getItem<T>(key);
    if (val === null || val === undefined) return fallback;
    // Type guard: ensure value matches fallback's type
    if (typeof val !== typeof fallback) return fallback;
    return val;
  } catch {
    return fallback;
  }
}

/** Write a value to secure storage. Silently fails on error. */
export function safeSet(key: string, value: unknown): void {
  try {
    if (typeof window === 'undefined') return;
    secureStorage.setItem(key, value as any);
  } catch (e) {
    console.warn(`[storage] Failed to write "${key}":`, e);
  }
}

/** Remove a value from secure storage. */
export function safeRemove(key: string): void {
  try {
    if (typeof window === 'undefined') return;
    secureStorage.removeItem(key);
  } catch {
    // ignore
  }
}

/** Validate a string value against an allowed set. */
export function safeGetEnum<T extends string>(
  key: string,
  fallback: T,
  allowed: readonly T[],
): T {
  const val = safeGet<string>(key, fallback);
  return (allowed as readonly string[]).includes(val) ? (val as T) : fallback;
}

/** Read a number clamped to [min, max]. */
export function safeGetNumber(
  key: string,
  fallback: number,
  min: number,
  max: number,
): number {
  const val = safeGet<number>(key, fallback);
  if (typeof val !== 'number' || !isFinite(val)) return fallback;
  return Math.max(min, Math.min(max, val));
}

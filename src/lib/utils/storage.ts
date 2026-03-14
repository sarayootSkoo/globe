/**
 * Simple localStorage persistence — plain JSON, no encryption.
 *
 * All keys are prefixed with `kg:` to namespace this app's data.
 * All operations are wrapped in try/catch for safety.
 */

const PREFIX = 'kg:';

/** Read a value from localStorage with fallback on any failure. */
export function safeGet<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined') return fallback;
    const raw = window.localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    if (typeof parsed !== typeof fallback) return fallback;
    return parsed as T;
  } catch {
    return fallback;
  }
}

/** Write a value to localStorage. Silently fails on error. */
export function safeSet(key: string, value: unknown): void {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // quota exceeded or private browsing — ignore
  }
}

/** Remove a value from localStorage. */
export function safeRemove(key: string): void {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(PREFIX + key);
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

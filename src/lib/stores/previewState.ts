import { writable } from 'svelte/store';
import type { GraphNode } from '../types';

const PREVIEW_W_KEY = 'kg-preview-width';
const PREVIEW_W_DEFAULT = 80;

/**
 * Reads the saved preview width from localStorage, falling back to the
 * default value of 80 when not set or when localStorage is unavailable
 * (e.g. SSR / test environments).
 */
function readSavedWidth(): number {
  try {
    const saved = localStorage.getItem(PREVIEW_W_KEY);
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed)) return parsed;
    }
  } catch {
    // localStorage unavailable (SSR, sandboxed environments)
  }
  return PREVIEW_W_DEFAULT;
}

/**
 * Whether the fullscreen preview overlay is visible.
 */
export const previewVisible = writable<boolean>(false);

/**
 * The node whose content is displayed in the preview overlay.
 * null when no preview is open.
 */
export const previewNode = writable<GraphNode | null>(null);

/**
 * Width of the preview box as a percentage (50–100).
 * HTML slider: min=50, max=100, value=80, step=5
 * Initialized from localStorage key 'kg-preview-width', falling back to 80.
 */
export const previewWidth = writable<number>(readSavedWidth());

/**
 * Text entered in the in-document search bar inside the preview overlay.
 */
export const previewSearchQuery = writable<string>('');

// Persist previewWidth to localStorage whenever it changes.
previewWidth.subscribe((val) => {
  try {
    localStorage.setItem(PREVIEW_W_KEY, String(val));
  } catch {
    // localStorage unavailable
  }
});

/**
 * Opens the preview overlay for the given node.
 * Resets the in-preview search query so the previous search does not bleed over.
 */
export function showPreview(node: GraphNode): void {
  previewNode.set(node);
  previewSearchQuery.set('');
  previewVisible.set(true);
}

/**
 * Closes the preview overlay and clears the displayed node.
 */
export function hidePreview(): void {
  previewVisible.set(false);
  previewNode.set(null);
}

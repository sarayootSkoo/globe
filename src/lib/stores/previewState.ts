import { writable } from 'svelte/store';
import { kanbanDB } from './kanbanDB';
import type { GraphNode } from '../types';

const PREVIEW_W_DEFAULT = 80;

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
 * Persisted via kanbanDB.
 */
export const previewWidth = writable<number>(
  kanbanDB.previewWidth.get(PREVIEW_W_DEFAULT)
);

/**
 * Text entered in the in-document search bar inside the preview overlay.
 */
export const previewSearchQuery = writable<string>('');

// Persist previewWidth to kanbanDB whenever it changes.
previewWidth.subscribe((val) => {
  kanbanDB.previewWidth.set(val);
});

// Migrate old key
try { localStorage.removeItem('kg-preview-width'); } catch { /* ignore */ }

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

/**
 * Simple history-based router that syncs URL path with viewMode store.
 *
 * Routes:
 *   /       → globe
 *   /board  → kanban
 */

import { viewMode } from './stores/appState';
import type { ViewMode } from './stores/appState';

const ROUTES: Record<string, ViewMode> = {
  '/': 'globe',
  '/board': 'kanban',
};

const VIEW_TO_PATH: Record<ViewMode, string> = {
  globe: '/',
  kanban: '/board',
};

function pathToView(pathname: string): ViewMode {
  return ROUTES[pathname] ?? 'globe';
}

/** Navigate to a path, updating both the URL and viewMode store. */
export function navigate(path: string): void {
  if (window.location.pathname !== path) {
    window.history.pushState(null, '', path);
  }
  viewMode.set(pathToView(path));
}

/** Navigate by view name. */
export function navigateTo(view: ViewMode): void {
  navigate(VIEW_TO_PATH[view]);
}

/**
 * Initialize router — read current URL to set viewMode,
 * and listen for popstate (back/forward) events.
 * Returns cleanup function.
 */
export function initRouter(): () => void {
  // Set initial viewMode from URL
  viewMode.set(pathToView(window.location.pathname));

  // Handle browser back/forward
  function onPopState() {
    viewMode.set(pathToView(window.location.pathname));
  }

  window.addEventListener('popstate', onPopState);

  // Sync viewMode changes → URL (for programmatic viewMode.set() calls)
  const unsub = viewMode.subscribe((view) => {
    const target = VIEW_TO_PATH[view];
    if (window.location.pathname !== target) {
      window.history.replaceState(null, '', target);
    }
  });

  return () => {
    window.removeEventListener('popstate', onPopState);
    unsub();
  };
}

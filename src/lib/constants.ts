import type { Category } from './types';
import { kanbanConfig } from './stores/kanbanConfig';

// Default categories — overridden by graph-config.json at runtime
export let CATEGORIES: Record<string, Category> = {
  'core':       { label: 'Core Docs',    color: '#00e5ff', glow: 'rgba(0,229,255,0.6)' },
  'oms-order':  { label: 'OMS Order',    color: '#4d8aff', glow: 'rgba(77,138,255,0.5)' },
  'oms-webapp': { label: 'OMS Webapp',   color: '#00ff88', glow: 'rgba(0,255,136,0.5)' },
  'oms-help':   { label: 'Webapp Help',  color: '#ffcc00', glow: 'rgba(255,204,0,0.55)' },
};

// Sync CATEGORIES from kanbanConfig.projects
kanbanConfig.subscribe(cfg => {
  if (cfg.projects?.length) {
    const cats: Record<string, Category> = {};
    for (const p of cfg.projects) {
      cats[p.id] = { label: p.label, color: p.color, glow: p.glow };
    }
    CATEGORIES = { ...CATEGORIES, ...cats };
  }
});

/** Update categories from external config */
export function setCategories(cats: Record<string, Category>): void {
  if (cats && Object.keys(cats).length > 0) {
    CATEGORIES = { ...CATEGORIES, ...cats };
  }
}

export const COMET_COLORS = [0x00d4ff, 0xa855f7, 0xf97316, 0x10b981, 0x3b82f6, 0xf59e0b, 0xef4444, 0x6366f1];

export const GLOBE_RADIUS = 300;
export const DOT_COUNT = 2400;
export const TRAIL_COUNT = 8;
export const TRAIL_POINTS = 40;
export const DEFAULT_CAM_DIST = 900;
export const FOCUS_CAM_DIST = 650;

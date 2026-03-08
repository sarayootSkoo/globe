import type { Category } from './types';

export const CATEGORIES: Record<string, Category> = {
  'core':       { label: 'Core Docs',       color: '#00d4ff', glow: 'rgba(0,212,255,0.5)' },
  'decisions':  { label: 'ADR Decisions',   color: '#a855f7', glow: 'rgba(168,85,247,0.5)' },
  'discussion': { label: 'Discussions',     color: '#f97316', glow: 'rgba(249,115,22,0.5)' },
  'oms-order':  { label: 'OMS Order Docs',  color: '#3b82f6', glow: 'rgba(59,130,246,0.5)' },
  'oms-webapp': { label: 'OMS Webapp',      color: '#10b981', glow: 'rgba(16,185,129,0.5)' },
  'oms-help':   { label: 'Webapp Help',     color: '#f59e0b', glow: 'rgba(245,158,11,0.5)' },
  'meta':       { label: 'Meta / Config',   color: '#6b7280', glow: 'rgba(107,114,128,0.5)' },
};

export const KNOWLEDGE_ROOT = '/Users/grammer/Documents/git-central/knowledge';

export const COMET_COLORS = [0x00d4ff, 0xa855f7, 0xf97316, 0x10b981, 0x3b82f6, 0xf59e0b, 0xef4444, 0x6366f1];

export const GLOBE_RADIUS = 300;
export const DOT_COUNT = 2400;
export const TRAIL_COUNT = 8;
export const TRAIL_POINTS = 40;
export const DEFAULT_CAM_DIST = 900;
export const FOCUS_CAM_DIST = 650;

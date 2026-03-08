import { writable } from 'svelte/store';
import type { Category } from './types';

export interface GraphConfig {
  projectName: string;
  dataFile: string;
  basePath: string;
  categories: Record<string, Category>;
}

const DEFAULT_CONFIG: GraphConfig = {
  projectName: 'Knowledge Graph',
  dataFile: './graph-data.json',
  basePath: '',
  categories: {},
};

export const graphConfig = writable<GraphConfig>(DEFAULT_CONFIG);

export async function loadConfig(): Promise<GraphConfig> {
  // Check URL parameter for custom config path
  const params = new URLSearchParams(window.location.search);
  const configPath = params.get('config') || './graph-config.json';
  const configUrl = configPath.startsWith('http') ? configPath : `./${configPath.replace(/^\.\//, '')}`;

  try {
    const resp = await fetch(configUrl);
    if (resp.ok) {
      const config = await resp.json() as GraphConfig;
      graphConfig.set(config);
      return config;
    }
  } catch {
    console.warn(`Config not found at ${configUrl}, using defaults`);
  }
  return DEFAULT_CONFIG;
}

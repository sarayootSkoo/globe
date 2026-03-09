import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// --- Types (copied from src/lib/types.ts, browser-independent) ---

export interface GraphNode {
  id: string;
  label: string;
  cat: string;
  desc?: string;
  keywords?: string[];
  file?: string;
  refs?: number;
  preview?: string;
  connections?: string[];
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  label?: string;
}

export interface Category {
  label: string;
  color: string;
  glow: string;
}

export interface ScoredResult {
  node: GraphNode;
  score: number;
}

export interface GraphConfig {
  projectName: string;
  dataFile: string;
  basePath: string;
  categories: Record<string, Category>;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
  categories: Record<string, Category>;
  config: GraphConfig;
  stats: {
    totalNodes: number;
    totalLinks: number;
    categoryCounts: Record<string, number>;
    generated: string;
  };
}

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Resolves the data directory — checks CLI --data-dir arg first,
 * then falls back to ../../public/ relative to this file's dist/ location.
 */
function resolveDataDir(): string {
  const args = process.argv;
  const dataDirIdx = args.indexOf('--data-dir');
  if (dataDirIdx !== -1 && args[dataDirIdx + 1]) {
    return resolve(args[dataDirIdx + 1]);
  }
  // Default: mcp-server/dist/ → mcp-server/ → public/
  return resolve(__dirname, '../../public');
}

export function loadGraphData(): GraphData {
  const dataDir = resolveDataDir();

  const configPath = resolve(dataDir, 'graph-config.json');
  const config: GraphConfig = JSON.parse(readFileSync(configPath, 'utf-8'));

  const dataPath = resolve(dataDir, 'graph-data.json');
  const raw = JSON.parse(readFileSync(dataPath, 'utf-8'));

  const nodes: GraphNode[] = raw.nodes ?? [];
  const links: GraphLink[] = raw.links ?? [];
  const categories = config.categories ?? {};

  // Compute stats
  const categoryCounts: Record<string, number> = {};
  for (const node of nodes) {
    categoryCounts[node.cat] = (categoryCounts[node.cat] ?? 0) + 1;
  }

  return {
    nodes,
    links,
    categories,
    config,
    stats: {
      totalNodes: nodes.length,
      totalLinks: links.length,
      categoryCounts,
      generated: new Date().toISOString(),
    },
  };
}

#!/usr/bin/env node
/**
 * build-graph-data.mjs
 * Scans a directory of Markdown files and produces graph-data.json + updates graph-config.json.
 *
 * Usage:
 *   node scripts/build-graph-data.mjs [rootDir] [--out <outputFile>]
 *
 * Defaults:
 *   rootDir    = ../../docs  (the knowledge/docs folder, relative to this script)
 *   outputFile = public/graph-data.json
 *
 * Also updates graph-config.json next to the output file:
 *   - Sets basePath to the scanned rootDir
 *   - Syncs categories to match discovered data (preserves existing colors)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── CLI args ─────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
let rootArg = null;
let outArg = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--out' && args[i + 1]) {
    outArg = args[++i];
  } else if (!args[i].startsWith('--')) {
    rootArg = args[i];
  }
}

const ROOT_DIR = rootArg
  ? path.resolve(rootArg)
  : path.resolve(__dirname, '../../../docs');

const OUTPUT_FILE = outArg
  ? path.resolve(outArg)
  : path.resolve(__dirname, '../public/graph-data.json');

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.next', 'build', '.svelte-kit', '.turbo', 'coverage']);
const PREVIEW_CHARS = 500;

// ── Status detection ──────────────────────────────────────────────────────────
/**
 * Returns 'done', 'in-progress', 'planned', or undefined (no status).
 * Rules applied in priority order.
 */
function detectStatus(filePath, rootDir, content) {
  const rel = path.relative(rootDir, filePath);
  const parts = rel.split(path.sep);

  // Any segment named 'old' or 'archive' → done
  if (parts.some(p => p.toLowerCase() === 'old' || p.toLowerCase() === 'archive')) return 'done';

  // Check directory names (look at all segments, not just first)
  const dirParts = parts.slice(0, -1); // exclude filename

  const hasDirNamed = (name) => dirParts.some(p => p.toLowerCase() === name);

  // specs/ with done-status content → done; otherwise → in-progress
  if (hasDirNamed('specs') || hasDirNamed('spec')) {
    const donePattern = /^\s*[-*]\s*(?:status|สถานะ)\s*:\s*(?:done|complete|เสร็จ)/im;
    if (donePattern.test(content)) return 'done';
    return 'in-progress';
  }

  // tasks/ → in-progress
  if (hasDirNamed('tasks') || hasDirNamed('task')) return 'in-progress';

  // docs/ → no status (reference docs)
  if (hasDirNamed('docs') || hasDirNamed('doc')) return undefined;

  // discussion/ or discuss/ → planned
  if (hasDirNamed('discussion') || hasDirNamed('discussions') || hasDirNamed('discuss')) return 'planned';

  // Everything else → no status
  return undefined;
}

// ── Category detection ────────────────────────────────────────────────────────
function detectCategory(filePath, rootDir) {
  const rel = path.relative(rootDir, filePath);
  const parts = rel.split(path.sep);

  // Shadow folder detection — any segment named 'shadow'
  if (parts.some(p => p.toLowerCase() === 'shadow')) return 'shadow';

  // First folder segment hints
  const first = parts[0].toLowerCase();
  if (first === 'decisions' || first === 'decision') return 'decisions';
  if (first === 'discussion' || first === 'discussions') return 'discussion';
  if (first.startsWith('oms-order')) return 'oms-order';
  if (first === 'oms-help' || first.startsWith('oms-webapp-help')) return 'oms-help';
  if (first.startsWith('oms-webapp') || first.startsWith('oms-fe')) return 'oms-webapp';
  if (first === '.claude' || first === 'scripts' || first === 'meta') return 'meta';

  // File name hints
  const basename = path.basename(filePath, '.md').toLowerCase();
  if (['claude', 'contributing', 'license', 'changelog'].includes(basename)) return 'meta';

  return 'core';
}

// ── Recursively collect MD files ──────────────────────────────────────────────
function collectMdFiles(dir, rootDir, results = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }

  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);
    // Follow symlinks by stat-ing the resolved path
    const isDir = entry.isDirectory() || (entry.isSymbolicLink() && fs.statSync(fullPath).isDirectory());
    const isFile = entry.isFile() || (entry.isSymbolicLink() && fs.statSync(fullPath).isFile());
    if (isDir) {
      collectMdFiles(fullPath, rootDir, results);
    } else if (isFile && entry.name.endsWith('.md') && entry.name !== 'CLAUDE.md') {
      results.push(fullPath);
    }
  }
  return results;
}

// ── Build a stable node ID from relative path ────────────────────────────────
function makeId(filePath, rootDir) {
  const rel = path.relative(rootDir, filePath);
  return rel.replace(/\.md$/, '').replace(/[/\\]/g, '-').replace(/[^a-zA-Z0-9-_]/g, '_');
}

// ── Extract cross-references from content ────────────────────────────────────
function extractRefs(content) {
  // Match patterns like: [text](OTHER.md), [[OTHER]], or bare OTHER.md references
  const refs = new Set();
  const mdLink = /\[.*?\]\(([^)]+\.md)\)/g;
  const wikiLink = /\[\[([^\]]+)\]\]/g;
  const bareRef = /\b([A-Z][A-Z0-9_-]*\.md)\b/g;

  let m;
  while ((m = mdLink.exec(content)) !== null) {
    refs.add(path.basename(m[1], '.md'));
  }
  while ((m = wikiLink.exec(content)) !== null) {
    refs.add(m[1]);
  }
  while ((m = bareRef.exec(content)) !== null) {
    refs.add(path.basename(m[1], '.md'));
  }
  return [...refs];
}

// ── Main ──────────────────────────────────────────────────────────────────────
console.log(`Scanning: ${ROOT_DIR}`);
console.log(`Output:   ${OUTPUT_FILE}`);

const files = collectMdFiles(ROOT_DIR, ROOT_DIR);
console.log(`Found ${files.length} Markdown files`);

// Build nodes
const nodes = [];
const idMap = new Map(); // basename (no ext) → full node id

for (const filePath of files) {
  const id = makeId(filePath, ROOT_DIR);
  const basename = path.basename(filePath, '.md');
  const label = basename;
  const cat = detectCategory(filePath, ROOT_DIR);

  let content = '';
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch {
    // skip unreadable
  }

  const preview = content.slice(0, PREVIEW_CHARS);
  // Extract first non-heading line as desc
  const descMatch = content.match(/^(?!#)[^\n]{10,}/m);
  const desc = descMatch ? descMatch[0].slice(0, 80) : basename;

  const status = detectStatus(filePath, ROOT_DIR, content);

  const nodeObj = {
    id,
    label,
    cat,
    desc,
    file: path.relative(ROOT_DIR, filePath),
    preview,
    _refs: extractRefs(content),
    _basename: basename,
  };
  if (status !== undefined) nodeObj.status = status;

  nodes.push(nodeObj);

  // Track by basename for cross-ref resolution (last-writer wins for duplicates)
  idMap.set(basename.toLowerCase(), id);
}

// Build links from cross-references
const links = [];
const linkSet = new Set();

// Build a quick id→cat lookup (using the not-yet-cleaned nodes array)
const idCatMap = new Map(nodes.map(n => [n.id, n.cat]));

/**
 * Determine link direction based on source and target categories.
 * oms-order (backend) → oms-webapp (frontend) = forward
 * oms-webapp → oms-order = backward
 * all other cross-repo pairs = bidirectional
 */
function detectLinkDirection(srcCat, tgtCat) {
  if (srcCat === 'oms-order' && tgtCat === 'oms-webapp') return 'forward';
  if (srcCat === 'oms-webapp' && tgtCat === 'oms-order') return 'backward';
  return 'bidirectional';
}

for (const node of nodes) {
  for (const refBasename of node._refs) {
    const targetId = idMap.get(refBasename.toLowerCase());
    if (targetId && targetId !== node.id) {
      const key = [node.id, targetId].sort().join('||');
      if (!linkSet.has(key)) {
        linkSet.add(key);
        const srcCat = idCatMap.get(node.id);
        const tgtCat = idCatMap.get(targetId);
        const crossRepo = srcCat !== tgtCat;
        const link = { source: node.id, target: targetId };
        if (crossRepo) {
          link.crossRepo = true;
          link.direction = detectLinkDirection(srcCat, tgtCat);
        }
        links.push(link);
      }
    }
  }
}

// Clean internal fields
const cleanNodes = nodes.map(({ _refs, _basename, ...rest }) => rest);

// Collect category list
const catSet = new Set(cleanNodes.map(n => n.cat));

// Compute status counts
const statusCounts = { done: 0, 'in-progress': 0, planned: 0 };
for (const n of cleanNodes) {
  if (n.status === 'done') statusCounts.done++;
  else if (n.status === 'in-progress') statusCounts['in-progress']++;
  else if (n.status === 'planned') statusCounts.planned++;
}

const crossRepoCount = links.filter(l => l.crossRepo).length;

const output = {
  generated: new Date().toISOString(),
  root: ROOT_DIR,
  stats: {
    totalFiles: cleanNodes.length,
    totalLinks: links.length,
    categories: [...catSet],
    statusCounts,
    crossRepoCount,
  },
  nodes: cleanNodes,
  links,
};

// Ensure output directory exists
fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf8');

console.log(`Done — ${cleanNodes.length} nodes, ${links.length} links → ${OUTPUT_FILE}`);

// ── Sync graph-config.json ──────────────────────────────────────────────────
const CONFIG_FILE = path.join(path.dirname(OUTPUT_FILE), 'graph-config.json');

// Default colors for new categories
const DEFAULT_COLORS = [
  { color: '#00e5ff', glow: 'rgba(0,229,255,0.6)' },
  { color: '#4d8aff', glow: 'rgba(77,138,255,0.5)' },
  { color: '#00ff88', glow: 'rgba(0,255,136,0.5)' },
  { color: '#ffcc00', glow: 'rgba(255,204,0,0.55)' },
  { color: '#ff3dff', glow: 'rgba(255,61,255,0.55)' },
  { color: '#ff6b2b', glow: 'rgba(255,107,43,0.55)' },
  { color: '#b44dff', glow: 'rgba(180,77,255,0.5)' },
  { color: '#ff03cd', glow: 'rgba(187,136,174,0.4)' },
];

let config = { projectName: 'Knowledge Graph', dataFile: './graph-data.json', basePath: '', categories: {} };
try {
  config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
} catch {
  // start fresh
}

// Update basePath
config.basePath = ROOT_DIR;

// Sync categories: keep existing colors, add new ones, remove stale ones
const discoveredCats = [...catSet];
const oldCats = config.categories || {};
const newCats = {};
let colorIdx = 0;

for (const cat of discoveredCats) {
  if (oldCats[cat]) {
    newCats[cat] = oldCats[cat];
  } else {
    const fallback = DEFAULT_COLORS[colorIdx % DEFAULT_COLORS.length];
    colorIdx++;
    newCats[cat] = {
      label: cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      color: fallback.color,
      glow: fallback.glow,
    };
    console.log(`  + New category: "${cat}" (${newCats[cat].label})`);
  }
}

// Report removed categories
for (const cat of Object.keys(oldCats)) {
  if (!catSet.has(cat)) {
    console.log(`  - Removed category: "${cat}"`);
  }
}

config.categories = newCats;
fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf8');
console.log(`Config updated → ${CONFIG_FILE}`);

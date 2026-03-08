#!/usr/bin/env node
/**
 * build-graph-data.mjs
 * Scans a directory of Markdown files and produces graph-data.json for the knowledge graph demo.
 *
 * Usage:
 *   node scripts/build-graph-data.mjs [rootDir] [--out <outputFile>]
 *
 * Defaults:
 *   rootDir    = ../../  (the knowledge folder, relative to this script)
 *   outputFile = public/graph-data.json
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
  : path.resolve(__dirname, '../../');

const OUTPUT_FILE = outArg
  ? path.resolve(outArg)
  : path.resolve(__dirname, '../public/graph-data.json');

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.next', 'build', '.svelte-kit', '.turbo', 'coverage']);
const PREVIEW_CHARS = 500;

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
  if (first.startsWith('oms-webapp') || first.startsWith('oms-fe')) return 'oms-webapp';
  if (first === 'oms-help') return 'oms-help';
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
    if (entry.isDirectory()) {
      collectMdFiles(fullPath, rootDir, results);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
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

  nodes.push({
    id,
    label,
    cat,
    desc,
    file: path.relative(ROOT_DIR, filePath),
    preview,
    _refs: extractRefs(content),
    _basename: basename,
  });

  // Track by basename for cross-ref resolution (last-writer wins for duplicates)
  idMap.set(basename.toLowerCase(), id);
}

// Build links from cross-references
const links = [];
const linkSet = new Set();

for (const node of nodes) {
  for (const refBasename of node._refs) {
    const targetId = idMap.get(refBasename.toLowerCase());
    if (targetId && targetId !== node.id) {
      const key = [node.id, targetId].sort().join('||');
      if (!linkSet.has(key)) {
        linkSet.add(key);
        links.push({ source: node.id, target: targetId });
      }
    }
  }
}

// Clean internal fields
const cleanNodes = nodes.map(({ _refs, _basename, ...rest }) => rest);

// Collect category list
const catSet = new Set(cleanNodes.map(n => n.cat));

const output = {
  generated: new Date().toISOString(),
  root: ROOT_DIR,
  stats: {
    totalFiles: cleanNodes.length,
    totalLinks: links.length,
    categories: [...catSet],
  },
  nodes: cleanNodes,
  links,
};

// Ensure output directory exists
fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf8');

console.log(`Done — ${cleanNodes.length} nodes, ${links.length} links → ${OUTPUT_FILE}`);

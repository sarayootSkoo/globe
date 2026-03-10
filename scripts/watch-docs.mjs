#!/usr/bin/env node
/**
 * watch-docs.mjs
 * Watches the docs directory for Markdown changes and rebuilds graph-data.json.
 *
 * Usage:
 *   node scripts/watch-docs.mjs
 *
 * Outputs to BOTH:
 *   public/graph-data.json
 *   dist/graph-data.json
 *
 * Log format: [watch] <timestamp> rebuilt: N files, M links (Xms)
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolved paths — same convention as build-graph-data.mjs
const DOCS_DIR    = path.resolve(__dirname, '../../../docs');
const SCRIPT_PATH = path.resolve(__dirname, 'build-graph-data.mjs');
const PUBLIC_OUT  = path.resolve(__dirname, '../public/graph-data.json');
const DIST_OUT    = path.resolve(__dirname, '../dist/graph-data.json');

const DEBOUNCE_MS = 500;

let debounceTimer = null;

// ── Helpers ───────────────────────────────────────────────────────────────────

function timestamp() {
  return new Date().toISOString();
}

function log(...args) {
  console.log('[watch]', ...args);
}

// ── Build ─────────────────────────────────────────────────────────────────────

function rebuild() {
  const start = Date.now();

  // Build to public/ first (default output)
  try {
    execSync(`node "${SCRIPT_PATH}"`, { stdio: 'pipe' });
  } catch (err) {
    console.error('[watch] build failed (public):', err.stderr?.toString() ?? err.message);
    return;
  }

  // Build to dist/ as second output
  try {
    fs.mkdirSync(path.dirname(DIST_OUT), { recursive: true });
    execSync(`node "${SCRIPT_PATH}" --out "${DIST_OUT}"`, { stdio: 'pipe' });
  } catch (err) {
    console.error('[watch] build failed (dist):', err.stderr?.toString() ?? err.message);
    return;
  }

  const elapsed = Date.now() - start;

  // Read stats from the generated file to produce the log line
  let files = '?';
  let links = '?';
  try {
    const data = JSON.parse(fs.readFileSync(PUBLIC_OUT, 'utf8'));
    files = data.stats?.totalFiles ?? '?';
    links = data.stats?.totalLinks ?? '?';
  } catch {
    // stats unavailable — leave as '?'
  }

  log(`${timestamp()} rebuilt: ${files} files, ${links} links (${elapsed}ms)`);
}

// ── Watcher ───────────────────────────────────────────────────────────────────

function startWatcher() {
  log(`watching ${DOCS_DIR}...`);

  // fs.watch with recursive + followSymlinks (Node 20+ supports followSymlinks option;
  // on macOS the native FSEvents backend already resolves symlinks automatically,
  // so recursive: true is sufficient on this platform).
  const watcher = fs.watch(
    DOCS_DIR,
    { recursive: true, persistent: true },
    (eventType, filename) => {
      if (!filename) return;

      // Skip non-Markdown files
      if (!filename.endsWith('.md')) return;

      // Debounce — many editors write multiple events per save
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      debounceTimer = setTimeout(() => {
        debounceTimer = null;
        rebuild();
      }, DEBOUNCE_MS);
    },
  );

  watcher.on('error', (err) => {
    console.error('[watch] watcher error:', err.message);
  });

  return watcher;
}

// ── Graceful shutdown ─────────────────────────────────────────────────────────

function shutdown(signal) {
  log(`received ${signal}, shutting down.`);
  if (debounceTimer) clearTimeout(debounceTimer);
  process.exit(0);
}

process.on('SIGINT',  () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// ── Entry point ───────────────────────────────────────────────────────────────

startWatcher();

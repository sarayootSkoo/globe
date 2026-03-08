<script lang="ts">
  import { marked } from 'marked';
  import {
    previewVisible,
    previewNode,
    previewWidth,
    previewSearchQuery,
    hidePreview,
  } from '../../lib/stores/previewState';
  import type { GraphNode } from '../../lib/types';

  // ── Store subscriptions ────────────────────────────────────────────────────
  let visible = $state(false);
  let node = $state<GraphNode | null>(null);
  let width = $state(80);
  let docQuery = $state('');

  $effect(() => {
    const u1 = previewVisible.subscribe((v) => { visible = v; });
    const u2 = previewNode.subscribe((v) => { node = v; });
    const u3 = previewWidth.subscribe((v) => { width = v; });
    const u4 = previewSearchQuery.subscribe((v) => { docQuery = v; });
    return () => { u1(); u2(); u3(); u4(); };
  });

  // ── Rendered HTML + search state ──────────────────────────────────────────
  let rawHtml = $state('');
  let contentEl = $state<HTMLElement | null>(null);

  // Re-render markdown whenever the node changes
  $effect(() => {
    if (!node) {
      rawHtml = '';
      return;
    }
    try {
      rawHtml = marked.parse(node.preview ?? '*No content available*') as string;
    } catch {
      rawHtml = '<pre>' + escapeHtml(node.preview ?? 'No content') + '</pre>';
    }
  });

  // Inject rendered HTML into content element
  $effect(() => {
    if (!contentEl) return;
    contentEl.innerHTML = rawHtml;
    contentEl.scrollTop = 0;
    // Reset in-doc search whenever a new node opens
    clearDocSearch();
  });

  // Apply --preview-w CSS variable to :root whenever width changes
  $effect(() => {
    document.documentElement.style.setProperty('--preview-w', width + '%');
  });

  // ── In-document search state ──────────────────────────────────────────────
  let searchMarks: NodeListOf<HTMLElement> | null = null;
  let searchIdx = $state(-1);
  let searchCount = $state('');
  let searchInput = $state('');

  function doDocSearch(q: string) {
    searchInput = q;
    previewSearchQuery.set(q);

    if (!contentEl) return;

    // Always restore original HTML first
    contentEl.innerHTML = rawHtml;
    searchMarks = null;
    searchIdx = -1;

    if (!q) {
      searchCount = '';
      return;
    }

    // Escape special regex chars
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'gi');

    // Walk text nodes only (not inside HTML tags)
    const walker = document.createTreeWalker(contentEl, NodeFilter.SHOW_TEXT, null);
    const textNodes: Text[] = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

    let matchCount = 0;
    textNodes.forEach((tn) => {
      const text = tn.nodeValue ?? '';
      if (!regex.test(text)) return;
      regex.lastIndex = 0;

      const frag = document.createDocumentFragment();
      let lastIdx = 0;
      let match: RegExpExecArray | null;

      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIdx) {
          frag.appendChild(document.createTextNode(text.slice(lastIdx, match.index)));
        }
        const mark = document.createElement('mark');
        mark.textContent = match[0];
        (mark as HTMLElement & { dataset: DOMStringMap }).dataset.matchIdx = String(matchCount++);
        frag.appendChild(mark);
        lastIdx = regex.lastIndex;
      }

      if (lastIdx < text.length) {
        frag.appendChild(document.createTextNode(text.slice(lastIdx)));
      }
      tn.parentNode!.replaceChild(frag, tn);
    });

    searchMarks = contentEl.querySelectorAll<HTMLElement>('mark');
    searchCount = matchCount > 0 ? `${matchCount} found` : 'No matches';

    if (searchMarks.length > 0) {
      searchIdx = 0;
      scrollToMark(0);
    }
  }

  function scrollToMark(idx: number) {
    if (!searchMarks || searchMarks.length === 0) return;
    searchMarks.forEach((m) => m.classList.remove('current'));
    const mark = searchMarks[idx];
    if (mark) {
      mark.classList.add('current');
      mark.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function nextMatch(e: KeyboardEvent) {
    if (e.key !== 'Enter') return;
    if (!searchMarks || searchMarks.length === 0) return;
    e.preventDefault();
    searchIdx = (searchIdx + 1) % searchMarks.length;
    scrollToMark(searchIdx);
    searchCount = `${searchIdx + 1} / ${searchMarks.length}`;
  }

  function clearDocSearch() {
    searchInput = '';
    searchCount = '';
    searchMarks = null;
    searchIdx = -1;
    previewSearchQuery.set('');
    if (contentEl) contentEl.innerHTML = rawHtml;
  }

  // ── Width slider ──────────────────────────────────────────────────────────
  function applyWidth(val: number) {
    const clamped = Math.max(50, Math.min(100, val));
    previewWidth.set(clamped);
    // Store subscribes and persists to localStorage automatically
  }

  function handleWidthInput(e: Event) {
    applyWidth(parseInt((e.target as HTMLInputElement).value, 10));
  }

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  function handleKeydown(e: KeyboardEvent) {
    if (!visible) return;
    // Do not intercept keypresses inside inputs
    const tag = (e.target as HTMLElement).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    if (e.key === 'Escape') {
      e.preventDefault();
      hidePreview();
    } else if (e.key === '[') {
      e.preventDefault();
      applyWidth(width - 5);
    } else if (e.key === ']') {
      e.preventDefault();
      applyWidth(width + 5);
    }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  function escapeHtml(s: string): string {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
</script>

<svelte:document onkeydown={handleKeydown} />

<div id="preview-overlay" class:show={visible}>
  <div id="preview-box" style="width:{width}%">
    <!-- Header -->
    <div id="preview-header">
      <div>
        <span id="preview-title">PREVIEW</span>
        <span id="preview-file">{node?.file ?? ''}</span>
      </div>
      <button id="preview-close" onclick={hidePreview}>ESC Close</button>
    </div>

    <!-- Toolbar -->
    <div id="preview-toolbar">
      <!-- Width control -->
      <div class="preview-tool-group">
        <span class="preview-tool-label">Width</span>
        <input
          type="range"
          id="preview-width-slider"
          min="50"
          max="100"
          step="5"
          value={width}
          title="Popup width ([ ] keys to step)"
          oninput={handleWidthInput}
        />
        <span id="preview-width-val">{width}%</span>
      </div>

      <!-- Document search -->
      <div id="preview-search-wrap">
        <input
          type="text"
          id="preview-search"
          placeholder="Search in document..."
          value={searchInput}
          oninput={(e) => doDocSearch((e.target as HTMLInputElement).value.trim())}
          onkeydown={nextMatch}
        />
        <button
          id="preview-search-clear"
          class:show={searchInput.length > 0}
          onclick={() => { clearDocSearch(); (document.getElementById('preview-search') as HTMLInputElement)?.focus(); }}
        >
          &times;
        </button>
      </div>

      <span id="preview-search-count">{searchCount}</span>
    </div>

    <!-- Content -->
    <div
      id="preview-content"
      bind:this={contentEl}
    ></div>
  </div>
</div>

<style>
  /* ── Overlay ──────────────────────────────────────────── */
  #preview-overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
    background: var(--bg);
    display: none;
    flex-direction: column;
  }

  #preview-overlay.show {
    display: flex;
  }

  /* ── Box ──────────────────────────────────────────────── */
  #preview-box {
    display: flex;
    flex-direction: column;
    flex: 1;
    /* width is set via inline style binding, CSS var is also applied to :root */
    max-width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  /* ── Header ───────────────────────────────────────────── */
  #preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 24px;
    border-bottom: 1px solid var(--border);
    background: var(--panel-bg);
    backdrop-filter: blur(14px);
    flex-shrink: 0;
  }

  #preview-title {
    font-size: 13px;
    color: var(--accent);
    letter-spacing: 3px;
  }

  #preview-file {
    font-size: 10px;
    color: var(--text-dim);
    margin-left: 12px;
  }

  #preview-close {
    background: none;
    border: 1px solid var(--border);
    border-radius: 3px;
    color: var(--text-dim);
    font-family: var(--font);
    font-size: 11px;
    padding: 5px 16px;
    cursor: pointer;
    transition: all 0.2s;
  }

  #preview-close:hover {
    color: var(--red);
    border-color: var(--red);
  }

  /* ── Toolbar ──────────────────────────────────────────── */
  #preview-toolbar {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 8px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    background: rgba(0, 0, 0, 0.15);
    flex-shrink: 0;
  }

  .preview-tool-group {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .preview-tool-label {
    font-family: var(--font);
    font-size: 9px;
    color: var(--text-dim);
    letter-spacing: 1px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  #preview-width-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100px;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--text-dim) 0%, var(--accent) 100%);
    outline: none;
    cursor: pointer;
  }

  #preview-width-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--accent);
    border: 2px solid var(--bg);
    box-shadow: 0 0 5px var(--accent);
    cursor: pointer;
  }

  #preview-width-slider::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--accent);
    border: 2px solid var(--bg);
    box-shadow: 0 0 5px var(--accent);
    cursor: pointer;
  }

  #preview-width-val {
    font-family: var(--font);
    font-size: 10px;
    color: var(--accent);
    min-width: 36px;
    text-align: center;
  }

  /* ── Document search ──────────────────────────────────── */
  #preview-search-wrap {
    position: relative;
    margin-left: auto;
  }

  #preview-search {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 5px 28px 5px 10px;
    font-family: var(--font);
    font-size: 11px;
    color: var(--text);
    width: 200px;
    outline: none;
    transition: border-color 0.2s;
  }

  #preview-search::placeholder {
    color: var(--text-dim);
  }

  #preview-search:focus {
    border-color: var(--accent);
  }

  #preview-search-clear {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--text-dim);
    font-size: 11px;
    line-height: 1;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-family: var(--font);
    transition: all 0.2s;
  }

  #preview-search-clear:hover {
    background: rgba(239, 68, 68, 0.15);
    border-color: var(--red);
    color: var(--red);
  }

  #preview-search-clear.show {
    display: flex;
  }

  #preview-search-count {
    font-family: var(--font);
    font-size: 10px;
    color: var(--text-dim);
    white-space: nowrap;
  }

  /* ── Content area ─────────────────────────────────────── */
  #preview-content {
    padding: 32px 0;
    overflow-y: auto;
    flex: 1;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 15px;
    line-height: 1.8;
    color: var(--text);
  }

  /* Every direct child gets horizontal padding (matches HTML original) */
  #preview-content :global(> *) {
    padding-left: 32px;
    padding-right: 32px;
  }

  /* ── Markdown rendered styles ─────────────────────────── */
  #preview-content :global(h1) {
    font-size: 26px;
    color: var(--accent);
    margin: 0 0 20px;
    font-weight: 600;
    border-bottom: 1px solid var(--border);
    padding-bottom: 10px;
  }

  #preview-content :global(h2) {
    font-size: 20px;
    color: #a5b4fc;
    margin: 32px 0 12px;
    font-weight: 600;
  }

  #preview-content :global(h3) {
    font-size: 16px;
    color: #93c5fd;
    margin: 24px 0 10px;
    font-weight: 600;
  }

  #preview-content :global(p) {
    margin: 0 0 14px;
  }

  #preview-content :global(a) {
    color: var(--accent);
    text-decoration: none;
  }

  #preview-content :global(a:hover) {
    text-decoration: underline;
  }

  #preview-content :global(code) {
    background: rgba(0, 212, 255, 0.08);
    border: 1px solid rgba(0, 212, 255, 0.12);
    border-radius: 3px;
    padding: 2px 6px;
    font-family: var(--font);
    font-size: 13px;
    color: #93c5fd;
  }

  #preview-content :global(pre) {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 18px 20px;
    overflow-x: auto;
    margin: 0 0 16px;
  }

  #preview-content :global(pre code) {
    background: none;
    border: none;
    padding: 0;
    font-size: 13px;
    color: var(--text);
    line-height: 1.6;
  }

  #preview-content :global(table) {
    border-collapse: collapse;
    width: 100%;
    margin: 0 0 16px;
    font-size: 13px;
  }

  #preview-content :global(th) {
    background: rgba(0, 212, 255, 0.06);
    color: var(--accent);
    text-align: left;
    padding: 8px 12px;
    border: 1px solid var(--border);
    font-weight: 600;
  }

  #preview-content :global(td) {
    padding: 8px 12px;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  #preview-content :global(tr:hover td) {
    background: rgba(0, 212, 255, 0.03);
  }

  #preview-content :global(blockquote) {
    border-left: 3px solid var(--accent);
    margin: 0 0 14px;
    padding: 10px 18px;
    background: rgba(0, 212, 255, 0.04);
    color: var(--text-dim);
    font-style: italic;
  }

  #preview-content :global(ul),
  #preview-content :global(ol) {
    margin: 0 0 14px;
    padding-left: 28px;
  }

  #preview-content :global(li) {
    margin-bottom: 5px;
  }

  #preview-content :global(strong) {
    color: var(--accent);
    font-weight: 600;
  }

  #preview-content :global(hr) {
    border: none;
    border-top: 1px solid var(--border);
    margin: 24px 0;
  }

  #preview-content :global(img) {
    max-width: 100%;
    border-radius: 6px;
  }

  /* ── Search highlight marks ───────────────────────────── */
  #preview-content :global(mark) {
    background: rgba(0, 212, 255, 0.25);
    color: var(--text);
    border-radius: 2px;
    padding: 0 2px;
  }

  #preview-content :global(mark.current) {
    background: rgba(249, 115, 22, 0.4);
    outline: 1px solid var(--orange);
  }
</style>

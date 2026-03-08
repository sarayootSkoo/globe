<script lang="ts">
  import { searchQuery } from '../../lib/stores/searchState';
  import SearchResults from './SearchResults.svelte';

  let query = $state('');

  // Keep local state in sync with the store (two-way bridge)
  $effect(() => {
    const unsub = searchQuery.subscribe((v) => {
      query = v;
    });
    return unsub;
  });

  function handleInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    query = val;
    searchQuery.set(val);
  }

  function clearSearch() {
    query = '';
    searchQuery.set('');
  }
</script>

<div id="search-box">
  <div id="search-wrap">
    <input
      type="text"
      id="search-input"
      placeholder="Search... (Kafka, SLA, order, pnpm)"
      value={query}
      oninput={handleInput}
    />
    <button
      id="search-clear"
      class:show={query.length > 0}
      title="Clear search"
      onclick={clearSearch}
    >
      &times;
    </button>
  </div>
  <SearchResults />
</div>

<style>
  #search-box {
    position: fixed;
    bottom: 36px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    width: 340px;
  }

  #search-wrap {
    position: relative;
    width: 100%;
  }

  #search-input {
    background: var(--panel-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 9px 32px 9px 16px;
    font-family: var(--font);
    font-size: 12px;
    color: var(--text);
    width: 340px;
    outline: none;
    transition: all 0.2s;
  }

  #search-input::placeholder {
    color: var(--text-dim);
  }

  #search-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 12px rgba(0, 212, 255, 0.12);
  }

  #search-clear {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--text-dim);
    font-size: 13px;
    line-height: 1;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-family: var(--font);
    transition: all 0.2s;
  }

  #search-clear:hover {
    background: rgba(239, 68, 68, 0.15);
    border-color: var(--red);
    color: var(--red);
  }

  #search-clear.show {
    display: flex;
  }
</style>

<script lang="ts">
  import { currentMode, pathSelection } from '../../lib/stores/appState';
  import type { AppMode } from '../../lib/stores/appState';

  let mode = $state<AppMode>('explore');
  let pathSel = $state<string[]>([]);

  $effect(() => {
    const unsub = currentMode.subscribe(v => { mode = v; });
    return unsub;
  });

  $effect(() => {
    const unsub = pathSelection.subscribe(v => { pathSel = v; });
    return unsub;
  });

  let modeText = $derived((): string => {
    if (mode === 'path') {
      if (pathSel.length === 0) return 'PATH MODE — Click 2 nodes';
      if (pathSel.length === 1) return 'PATH MODE — Click END node';
      return 'PATH MODE — Click 2 nodes';
    }
    if (mode === 'impact') return 'IMPACT MODE — Click a node';
    return '';
  });

  let show = $derived(modeText() !== '');
</script>

<div id="mode-bar" class:show={show}>
  {modeText()}
</div>

<style>
  #mode-bar {
    position: fixed;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 30;
    background: rgba(249, 115, 22, 0.15);
    border: 1px solid rgba(249, 115, 22, 0.4);
    border-radius: 4px;
    padding: 6px 18px;
    font-size: 11px;
    color: var(--orange);
    display: none;
    pointer-events: none;
    letter-spacing: 1px;
  }
  #mode-bar.show {
    display: block;
  }
</style>

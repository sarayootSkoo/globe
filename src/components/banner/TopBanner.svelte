<script lang="ts">
  import { graphNodes, graphLinks } from '../../lib/stores/graphData';

  let nodes = $state<typeof $graphNodes>([]);
  let links = $state<typeof $graphLinks>([]);

  $effect(() => {
    const unsubNodes = graphNodes.subscribe(v => { nodes = v; });
    const unsubLinks = graphLinks.subscribe(v => { links = v; });
    return () => { unsubNodes(); unsubLinks(); };
  });

  let statsText = $derived(
    nodes.length > 0
      ? `${nodes.length} DOCUMENTS \u2022 ${links.length} CONNECTIONS \u2022 AUTO-GENERATED`
      : ''
  );
</script>

<div id="top-banner">
  <h1>KNOWLEDGE GRAPH — GIT-CENTRAL</h1>
  <div class="subtitle">
    <span id="stats-inline">{statsText}</span>
  </div>
</div>

<style>
  #top-banner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 25;
    text-align: center;
    padding: 12px 0 8px;
    background: linear-gradient(180deg, var(--banner-bg) 0%, transparent 100%);
    pointer-events: none;
  }
  #top-banner h1 {
    font-size: 13px;
    letter-spacing: 6px;
    color: var(--accent);
    text-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
    font-weight: 400;
  }
  .subtitle {
    font-size: 10px;
    color: var(--text-dim);
    letter-spacing: 2px;
    margin-top: 3px;
  }
</style>

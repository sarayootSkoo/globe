<script lang="ts">
  import { onMount } from 'svelte';
  import { loadData } from './lib/stores/graphData';
  import { loadConfig, graphConfig } from './lib/config';
  import { setCategories } from './lib/constants';
  import { theme, immersiveMode, viewMode } from './lib/stores/appState';

  // Background
  import Scanline from './components/background/Scanline.svelte';
  import Corners from './components/background/Corners.svelte';
  import ParticleCanvas from './components/background/ParticleCanvas.svelte';
  import BorderMagic from './components/background/BorderMagic.svelte';

  // Banner
  import TopBanner from './components/banner/TopBanner.svelte';
  import ModeBar from './components/banner/ModeBar.svelte';

  // Controls
  import TopControls from './components/controls/TopControls.svelte';
  import Toolbar from './components/controls/Toolbar.svelte';
  import GlobeControls from './components/controls/GlobeControls.svelte';
  import MenuPanel from './components/controls/MenuPanel.svelte';

  // Panels
  import LegendPanel from './components/panels/LegendPanel.svelte';
  import StatsPanel from './components/panels/StatsPanel.svelte';
  import DetailPanel from './components/panels/DetailPanel.svelte';
  import PathPanel from './components/panels/PathPanel.svelte';
  import ImpactPanel from './components/panels/ImpactPanel.svelte';
  import CrossRepoPanel from './components/panels/CrossRepoPanel.svelte';

  // Search
  import SearchBox from './components/search/SearchBox.svelte';

  // Globe
  import GlobeCanvas from './components/globe/GlobeCanvas.svelte';
  import WasdHud from './components/globe/WasdHud.svelte';

  // WASD Popup
  import WasdPopup from './components/wasd/WasdPopup.svelte';

  // Preview
  import PreviewOverlay from './components/preview/PreviewOverlay.svelte';

  // Kanban
  import KanbanBoard from './components/kanban/KanbanBoard.svelte';
  import IPCStatus from './components/kanban/IPCStatus.svelte';

  // Keyboard help
  import KeyboardHelp from './components/controls/KeyboardHelp.svelte';

  // Keyboard shortcuts
  import KeyboardShortcuts from './components/controls/KeyboardShortcuts.svelte';


  import type { ViewMode } from './lib/types';

  let loaded = $state(false);
  let wasdPopupVisible = $state(false);
  let crossRepoPanelVisible = $state(false);
  let wasdKeys = $state({ w: false, a: false, s: false, d: false, q: false, shift: false });
  let wasdSpeed = $state(0);
  let currentView = $state<ViewMode>('globe');

  $effect(() => {
    const unsub = viewMode.subscribe(v => { currentView = v; });
    return unsub;
  });

  // Sync theme to document
  $effect(() => {
    const unsub = theme.subscribe(t => {
      document.documentElement.dataset.theme = t;
    });
    return unsub;
  });

  // Sync immersive mode to document.body class
  $effect(() => {
    const unsub = immersiveMode.subscribe(v => {
      document.body.classList.toggle('immersive', v);
    });
    return unsub;
  });

  onMount(async () => {
    const config = await loadConfig();
    setCategories(config.categories);
    await loadData(config);
    loaded = true;
  });

  function handleWasdGuideOpen() {
    wasdPopupVisible = true;
  }

  function handleWasdGuideClose() {
    wasdPopupVisible = false;
  }

  function handleCrossRepoPanel() {
    crossRepoPanelVisible = !crossRepoPanelVisible;
  }

  function handleCrossRepoPanelClose() {
    crossRepoPanelVisible = false;
  }

  function handleWasdUpdate(detail: { keys: typeof wasdKeys; speed: number }) {
    wasdKeys = detail.keys;
    wasdSpeed = detail.speed;
  }
</script>

<!-- Background layers (disabled on board to save battery) -->
{#if currentView !== 'kanban'}
  <Scanline />
  <ParticleCanvas />
  <BorderMagic />
{/if}
<Corners />

{#if loaded}
  <!-- Menu Panel — always visible, controls both views -->
  <MenuPanel oncrossrepopanel={handleCrossRepoPanel} />

  {#if currentView === 'kanban'}
    <!-- HTML Kanban Board -->
    <KanbanBoard />
    <!-- Detail panel for card clicks -->
    <DetailPanel />
    <PreviewOverlay />
    <!-- IPC connection status indicator (bottom-right, fixed) -->
    <IPCStatus />
  {:else}
    <!-- 3D Globe -->
    <GlobeCanvas onwasdupdate={handleWasdUpdate} />

    <!-- Banners -->
    <TopBanner />
    <ModeBar />

    <!-- Controls -->
    <TopControls />
    <GlobeControls onwasdguide={handleWasdGuideOpen} />

    <!-- Panels -->
    <LegendPanel />
    <StatsPanel />
    <DetailPanel />
    <PathPanel />
    <ImpactPanel />
    <CrossRepoPanel visible={crossRepoPanelVisible} onclose={handleCrossRepoPanelClose} />

    <!-- Search -->
    <SearchBox />

    <!-- HUD -->
    <WasdHud keys={wasdKeys} speed={wasdSpeed} />

    <!-- Popups -->
    <WasdPopup
      visible={wasdPopupVisible}
      keys={wasdKeys}
      onclose={handleWasdGuideClose}
    />
    <PreviewOverlay />
  {/if}
{/if}

<KeyboardHelp />
<KeyboardShortcuts />

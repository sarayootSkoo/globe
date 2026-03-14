<script lang="ts">
  import { onMount } from 'svelte';
  import { loadData } from './lib/stores/graphData';
  import { loadConfig, graphConfig } from './lib/config';
  import { setCategories } from './lib/constants';
  import { theme, immersiveMode, viewMode, globePreview } from './lib/stores/appState';
  import { kanbanDB } from './lib/stores/kanbanDB';
  import { initAllStores } from './lib/stores/initStores';

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
  import AnalyticsDashboard from './components/kanban/AnalyticsDashboard.svelte';

  // Keyboard help
  import KeyboardHelp from './components/controls/KeyboardHelp.svelte';

  // Keyboard shortcuts
  import KeyboardShortcuts from './components/controls/KeyboardShortcuts.svelte';


  import type { ViewMode } from './lib/types';

  let loaded = $state(false);
  let wasdPopupVisible = $state(false);
  let crossRepoPanelVisible = $state(false);
  const _params = new URLSearchParams(window.location.search);
  let hideConsole = $state(_params.get('console') === 'hide');
  let hideMenu = $state(_params.get('menu') === 'hide');
  let hideSearch = $state(_params.get('search') === 'hide');
  let wasdKeys = $state({ w: false, a: false, s: false, d: false, q: false, shift: false });
  let wasdSpeed = $state(0);
  let currentView = $state<ViewMode>('globe');
  let isGlobePreview = $state(false);

  $effect(() => {
    const unsub = viewMode.subscribe(v => { currentView = v; });
    return unsub;
  });

  $effect(() => {
    const unsub = globePreview.subscribe(v => { isGlobePreview = v; });
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
    // Load kanban state from SQLite BEFORE rendering
    await kanbanDB.init();
    initAllStores();

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

<!-- Background layers (disabled on board/analytics to save battery) -->
{#if currentView === 'globe'}
  <Scanline />
  <ParticleCanvas />
  <BorderMagic />
{/if}
<Corners />

{#if loaded}
  <!-- Menu Panel -->
  {#if !hideMenu}
    <MenuPanel oncrossrepopanel={handleCrossRepoPanel} />
  {/if}

  {#if currentView === 'kanban'}
    <!-- Globe Preview handled by MiniGlobe inside CommandPanel -->
    <!-- HTML Kanban Board -->
    <KanbanBoard />
    <DetailPanel />
    <PreviewOverlay />
  {:else if currentView === 'analytics'}
    <!-- Analytics Dashboard (full page) -->
    <AnalyticsDashboard />
  {:else}
    <!-- 3D Globe -->
    <GlobeCanvas onwasdupdate={handleWasdUpdate} />

    <!-- Banners -->
    {#if !hideConsole}
      <TopBanner />
      <ModeBar />
    {/if}

    <!-- Controls -->
    {#if !hideConsole}
      <TopControls />
      <GlobeControls onwasdguide={handleWasdGuideOpen} />
    {/if}

    <!-- Panels -->
    {#if !hideConsole}
      <LegendPanel />
      <StatsPanel />
    {/if}
    <DetailPanel />
    <PathPanel />
    <ImpactPanel />
    <CrossRepoPanel visible={crossRepoPanelVisible} onclose={handleCrossRepoPanelClose} />

    <!-- Search -->
    {#if !hideSearch}
      <SearchBox />
    {/if}

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

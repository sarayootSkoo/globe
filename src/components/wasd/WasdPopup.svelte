<script lang="ts">
  import { cometEnabled } from '../../lib/stores/globeState';

  interface Props {
    visible: boolean;
    onclose: () => void;
    keys?: {
      w: boolean;
      a: boolean;
      s: boolean;
      d: boolean;
      q: boolean;
      shift: boolean;
    };
  }

  let {
    visible,
    onclose,
    keys = { w: false, a: false, s: false, d: false, q: false, shift: false },
  }: Props = $props();

  // ── ESC key listener ─────────────────────────────────────────────────────────
  $effect(() => {
    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === 'Escape' && visible) {
        e.stopPropagation();
        onclose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // ── Overlay click: close only when clicking the backdrop itself ───────────────
  function handleOverlayClick(e: MouseEvent): void {
    if (e.target === e.currentTarget) {
      onclose();
    }
  }

  function handleCometToggle(): void {
    cometEnabled.update(v => !v);
  }
</script>

<!-- Backdrop -->
<div
  id="wasd-popup-overlay"
  class:show={visible}
  onclick={handleOverlayClick}
  onkeydown={(e) => e.key === 'Escape' && onclose()}
  role="dialog"
  aria-modal="true"
  aria-label="WASD Rotation Controls"
  tabindex="-1"
>
  <div id="wasd-popup">

    <!-- Header -->
    <div id="wasd-popup-header">
      <span class="popup-title">WASD Rotation Controls</span>
      <button id="wasd-popup-close" onclick={onclose}>ESC Close</button>
    </div>

    <!-- Body -->
    <div id="wasd-popup-body">

      <!-- Visual keyboard layout with live key highlighting -->
      <div class="wasd-visual">
        <div>
          <div class="key-row" style="justify-content:center">
            <div class="key-block" class:lit={keys.w} id="vk-w">W</div>
          </div>
          <div class="key-row">
            <div class="key-block" class:lit={keys.a} id="vk-a">A</div>
            <div class="key-block" class:lit={keys.s} id="vk-s">S</div>
            <div class="key-block" class:lit={keys.d} id="vk-d">D</div>
          </div>
        </div>
        <div style="margin-left:16px">
          <div class="key-row" style="margin-bottom:4px">
            <div class="key-block wide" class:lit={keys.q} id="vk-q">Q</div>
          </div>
          <div class="key-row">
            <div class="key-block wide small-text" class:lit={keys.shift} id="vk-shift">&#8679; Shift</div>
          </div>
        </div>
      </div>

      <!-- Movement keys guide -->
      <div class="wasd-section-title">Movement Keys</div>
      <div class="wasd-key-row">
        <span class="wasd-key-badge">W</span>
        <span class="wasd-key-desc">Roll Up — pitch camera upward around globe</span>
      </div>
      <div class="wasd-key-row">
        <span class="wasd-key-badge">S</span>
        <span class="wasd-key-desc">Roll Down — pitch camera downward</span>
      </div>
      <div class="wasd-key-row">
        <span class="wasd-key-badge">A</span>
        <span class="wasd-key-desc">Roll Left — yaw camera to the left</span>
      </div>
      <div class="wasd-key-row">
        <span class="wasd-key-badge">D</span>
        <span class="wasd-key-desc">Roll Right — yaw camera to the right</span>
      </div>

      <!-- Modifiers -->
      <div class="wasd-section-title">Modifiers</div>
      <div class="wasd-key-row">
        <span class="wasd-key-badge">&#8679; Shift</span>
        <span class="wasd-key-desc">Boost — hold longer to accelerate faster (3x rate)</span>
      </div>
      <div class="wasd-key-row">
        <span class="wasd-key-badge">Q</span>
        <span class="wasd-key-desc">Brake — smooth deceleration to stop</span>
      </div>

      <!-- Combos -->
      <div class="wasd-section-title">Combos</div>
      <div class="wasd-key-row">
        <span class="wasd-key-badge">W+A</span>
        <span class="wasd-key-desc">Diagonal — roll up-left simultaneously</span>
      </div>
      <div class="wasd-key-row">
        <span class="wasd-key-badge">W+D</span>
        <span class="wasd-key-desc">Diagonal — roll up-right simultaneously</span>
      </div>
      <div class="wasd-key-row">
        <span class="wasd-combo">W+S or A+D cancel each other (opposite directions)</span>
      </div>

      <!-- Comet Trail toggle -->
      <div class="wasd-section-title">Comet Trail</div>
      <div class="wasd-toggle-row">
        <div>
          <div class="wasd-toggle-label">Comet Trail Effect</div>
          <div class="wasd-toggle-sub">Light trails appear when rotating at speed &gt; 15%</div>
        </div>
        <div
          class="globe-toggle"
          class:on={$cometEnabled}
          id="popup-comet-toggle"
          title="Toggle comet trails"
          onclick={handleCometToggle}
          role="switch"
          aria-checked={$cometEnabled}
          tabindex="0"
          onkeydown={(e) => e.key === 'Enter' && handleCometToggle()}
        ></div>
      </div>

      <!-- Tip box -->
      <div class="tip-box">
        <strong>Tip:</strong> Speed builds like a car throttle — hold
        <strong class="tip-orange">Shift</strong> longer for maximum speed (500 km/h).
        Comet trails glow brighter the faster you go. When speed reaches 0 km/h the
        globe resets to its default position. Disabled during search mode.
      </div>

    </div><!-- /popup-body -->
  </div><!-- /popup -->
</div><!-- /overlay -->

<style>
  /* ── WASD Fullview Popup ─────────────────────── */
  #wasd-popup-overlay {
    position: fixed;
    inset: 0;
    z-index: 55;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(8px);
    display: none;
    justify-content: center;
    align-items: center;
  }
  #wasd-popup-overlay.show {
    display: flex;
  }

  #wasd-popup {
    background: var(--panel-bg);
    border: 1px solid var(--border-hi);
    border-radius: 8px;
    width: min(520px, 90vw);
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 50px rgba(0, 212, 255, 0.12);
    overflow: hidden;
  }

  #wasd-popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 20px;
    border-bottom: 1px solid var(--border);
  }
  #wasd-popup-header .popup-title {
    font-size: 12px;
    color: var(--accent);
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  #wasd-popup-close {
    background: none;
    border: 1px solid var(--border);
    border-radius: 3px;
    color: var(--text-dim);
    font-family: var(--font);
    font-size: 11px;
    padding: 4px 12px;
    cursor: pointer;
    transition: all 0.2s;
  }
  #wasd-popup-close:hover {
    color: var(--red);
    border-color: var(--red);
  }

  #wasd-popup-body {
    padding: 20px 24px;
    overflow-y: auto;
    flex: 1;
  }

  /* Section titles */
  .wasd-section-title {
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--accent);
    margin: 16px 0 10px;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--border);
  }
  .wasd-section-title:first-child {
    margin-top: 0;
  }

  /* Key guide rows */
  .wasd-key-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 5px 0;
    font-size: 12px;
  }
  .wasd-key-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 28px;
    padding: 0 8px;
    border-radius: 4px;
    border: 1px solid var(--border);
    background: rgba(0, 212, 255, 0.06);
    color: var(--accent);
    font-family: var(--font);
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }
  .wasd-key-desc {
    color: var(--text-dim);
  }
  .wasd-combo {
    color: var(--orange);
    font-size: 10px;
    opacity: 0.7;
  }

  /* Comet toggle row */
  .wasd-toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    margin-top: 4px;
  }
  .wasd-toggle-label {
    font-size: 12px;
    color: var(--text);
  }
  .wasd-toggle-sub {
    font-size: 10px;
    color: var(--text-dim);
    margin-top: 2px;
  }

  /* Toggle pill (shared with GlobeControls) */
  .globe-toggle {
    position: relative;
    width: 32px;
    height: 16px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid var(--border);
    cursor: pointer;
    transition: all 0.3s;
    flex-shrink: 0;
  }
  .globe-toggle::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--text-dim);
    transition: all 0.3s;
  }
  .globe-toggle.on {
    background: rgba(0, 212, 255, 0.2);
    border-color: var(--accent);
  }
  .globe-toggle.on::after {
    left: 18px;
    background: var(--accent);
  }

  /* Tip box */
  .tip-box {
    margin-top: 14px;
    padding: 10px;
    background: rgba(0, 212, 255, 0.04);
    border: 1px solid var(--border);
    border-radius: 4px;
    font-size: 11px;
    color: var(--text-dim);
    line-height: 1.6;
  }
  .tip-box strong {
    color: var(--accent);
  }
  .tip-orange {
    color: var(--orange);
  }

  /* Visual keyboard */
  .wasd-visual {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin: 14px 0 8px;
    flex-wrap: wrap;
  }
  .wasd-visual .key-block {
    width: 38px;
    height: 38px;
    border-radius: 5px;
    border: 1px solid var(--border);
    background: rgba(0, 212, 255, 0.04);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font);
    font-size: 14px;
    font-weight: bold;
    color: var(--text-dim);
    transition: all 0.2s;
  }
  .wasd-visual .key-block.wide {
    width: 56px;
  }
  .wasd-visual .key-block.small-text {
    font-size: 10px;
  }
  .wasd-visual .key-block.lit {
    border-color: var(--accent);
    color: var(--accent);
    background: rgba(0, 212, 255, 0.12);
    box-shadow: 0 0 10px rgba(0, 212, 255, 0.2);
  }
  .wasd-visual .key-row {
    display: flex;
    gap: 4px;
  }
</style>

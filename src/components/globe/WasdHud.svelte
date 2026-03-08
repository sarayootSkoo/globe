<script lang="ts">
  import type { WASDKeys } from '../../lib/types';

  // ── Props ────────────────────────────────────────────────────────────────────
  interface Props {
    keys: WASDKeys;
    speed: number;   // 0–1 scalar (multiply by 500 for km/h display)
  }
  let { keys, speed }: Props = $props();

  // ── Derived display values ───────────────────────────────────────────────────
  let speedKmh    = $derived(Math.round(speed * 500));
  let speedBarPct = $derived(speed * 100);

  // ── Visibility: show HUD when any key is pressed or speed > ~0 ──────────────
  // The parent component controls this via the `keys` and `speed` props.
  // The HUD itself is always rendered; parent mounts/unmounts or hides it.
  let show = $derived(
    speed > 0.01 || keys.w || keys.a || keys.s || keys.d || keys.q
  );
</script>

<div id="wasd-hud" class:show={show}>
  <!-- Key indicators -->
  <div class="key-indicators">
    <div
      class="key-ind"
      class:active={keys.w}
    >W</div>
    <div
      class="key-ind"
      class:active={keys.a}
    >A</div>
    <div
      class="key-ind"
      class:active={keys.s}
    >S</div>
    <div
      class="key-ind"
      class:active={keys.d}
    >D</div>
    <div
      class="key-ind"
      class:brake={keys.q}
      class:active={keys.q}
    >Q</div>
    <div
      class="key-ind"
      class:boost={keys.shift}
      class:active={keys.shift}
    >&#8679;</div>
  </div>

  <!-- Speed bar -->
  <div class="speed-bar">
    <div
      class="speed-fill"
      style="width:{speedBarPct}%"
    ></div>
  </div>

  <!-- Speed value -->
  <span class="speed-val">{speedKmh} km/h</span>
</div>

<style>
  /* ── WASD Speed HUD ──────────────────────────── */
  #wasd-hud {
    position: fixed;
    bottom: 70px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 30;
    display: none;
    align-items: center;
    gap: 10px;
    background: rgba(10, 14, 23, 0.85);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 212, 255, 0.25);
    border-radius: 6px;
    padding: 6px 14px;
    font-family: var(--font);
    font-size: 10px;
    color: var(--text-dim);
    letter-spacing: 1px;
    pointer-events: none;
    transition: opacity 0.3s;
  }
  #wasd-hud.show {
    display: flex;
  }

  .speed-bar {
    width: 100px;
    height: 5px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.08);
    overflow: hidden;
    position: relative;
  }
  .speed-fill {
    height: 100%;
    border-radius: 3px;
    width: 0%;
    background: linear-gradient(90deg, var(--green) 0%, var(--yellow) 50%, var(--red) 100%);
    transition: width 0.1s linear;
  }
  .speed-val {
    font-size: 11px;
    font-weight: bold;
    color: var(--accent);
    min-width: 48px;
    text-align: right;
  }

  .key-indicators {
    display: flex;
    gap: 3px;
  }
  .key-ind {
    width: 18px;
    height: 18px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    color: var(--text-dim);
    font-weight: bold;
  }
  .key-ind.active {
    background: rgba(0, 212, 255, 0.2);
    border-color: var(--accent);
    color: var(--accent);
    box-shadow: 0 0 6px rgba(0, 212, 255, 0.3);
  }
  .key-ind.brake {
    background: rgba(239, 68, 68, 0.2);
    border-color: var(--red);
    color: var(--red);
  }
  .key-ind.boost {
    background: rgba(249, 115, 22, 0.2);
    border-color: var(--orange);
    color: var(--orange);
  }
</style>

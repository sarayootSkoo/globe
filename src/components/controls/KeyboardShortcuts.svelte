<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from '../../lib/stores/appState';
  import type { Theme } from '../../lib/stores/appState';
  import * as fx from '../../lib/stores/themeEffects';
  import { resetToDefaults } from '../../lib/stores/presetState';

  const THEMES: Theme[] = ['dark', 'light', 'fire', 'winter', 'galaxy', 'electric', 'void', 'aurora', 'rain', 'polygon'];

  onMount(() => {
    function handleKey(e: KeyboardEvent): void {
      // Don't trigger when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // 1-9: Switch themes[0..8], 0: Switch themes[9] (polygon)
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 9) {
        theme.set(THEMES[num - 1]);
        return;
      }
      if (e.key === '0') {
        theme.set(THEMES[9]);
        return;
      }

      switch (e.key.toLowerCase()) {
        case ' ':  // Space: toggle auto tour
          e.preventDefault();
          document.dispatchEvent(new CustomEvent('kg:autotour', {
            detail: { action: 'toggle' },
          }));
          break;
        case 'r':  // R: reset effects
          resetToDefaults();
          document.dispatchEvent(new CustomEvent('kg:reset'));
          break;
        case 'f':  // F: toggle fullscreen
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen?.();
          } else {
            document.exitFullscreen?.();
          }
          break;
        case 'b':  // B: toggle border effects
          fx.borderEnabled.update(v => !v);
          break;
        case 'h':  // H: toggle black hole
          fx.blackholeEnabled.update(v => !v);
          break;
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });
</script>

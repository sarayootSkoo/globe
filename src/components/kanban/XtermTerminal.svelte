<script lang="ts">
  import { onMount } from 'svelte';
  import { Terminal } from '@xterm/xterm';
  import { FitAddon } from '@xterm/addon-fit';
  import '@xterm/xterm/css/xterm.css';
  import { eventSocket } from '../../lib/stores/agentEventStore';

  interface Props {
    sessionId: string;
    cardId?: string | null;
  }

  let { sessionId, cardId = null }: Props = $props();

  let containerEl = $state<HTMLDivElement | null>(null);
  let terminal: Terminal | null = null;
  let fitAddon: FitAddon | null = null;
  let subscribed = false;

  const EVENT_SERVER = 'http://localhost:4010';

  function getWs(): WebSocket | null {
    return eventSocket.instance;
  }

  function sendWs(msg: Record<string, unknown>) {
    const ws = getWs();
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(msg));
    }
  }

  function handleWsMessage(ev: MessageEvent) {
    try {
      const msg = JSON.parse(ev.data as string);
      if (msg.type === 'pty:output' && msg.sessionId === sessionId && terminal) {
        terminal.write(msg.data);
      } else if (msg.type === 'pty:exit' && msg.sessionId === sessionId && terminal) {
        terminal.write('\r\n\x1b[33m--- Session ended ---\x1b[0m\r\n');
      }
    } catch { /* ignore */ }
  }

  function subscribe() {
    if (subscribed) return;
    const ws = getWs();
    if (ws) {
      ws.addEventListener('message', handleWsMessage);
      sendWs({ type: 'pty:subscribe', sessionId });
      subscribed = true;
    }
  }

  function unsubscribe() {
    if (!subscribed) return;
    const ws = getWs();
    if (ws) {
      ws.removeEventListener('message', handleWsMessage);
      sendWs({ type: 'pty:unsubscribe', sessionId });
    }
    subscribed = false;
  }

  onMount(() => {
    if (!containerEl) return;

    terminal = new Terminal({
      cursorBlink: true,
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      fontSize: 13,
      lineHeight: 1.3,
      theme: {
        background: '#0d1117',
        foreground: '#b8c0cc',
        cursor: '#00e5ff',
        selectionBackground: 'rgba(0, 229, 255, 0.2)',
        black: '#0d1117',
        red: '#ff5555',
        green: '#00ff88',
        yellow: '#f97316',
        blue: '#00e5ff',
        magenta: '#c084fc',
        cyan: '#22d3ee',
        white: '#e0e0e0',
        brightBlack: '#444',
        brightRed: '#ff7070',
        brightGreen: '#b0ffa0',
        brightYellow: '#fbbf24',
        brightBlue: '#60a5fa',
        brightMagenta: '#d4a6ff',
        brightCyan: '#67e8f9',
        brightWhite: '#ffffff',
      },
    });

    fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(containerEl);

    // Fit to container
    requestAnimationFrame(() => {
      fitAddon?.fit();
      // Send initial size to server
      if (terminal) {
        sendWs({ type: 'pty:resize', sessionId, cols: terminal.cols, rows: terminal.rows });
      }
    });

    // Send keystrokes to PTY
    terminal.onData((data) => {
      sendWs({ type: 'pty:input', sessionId, data });
    });

    // Subscribe to PTY output
    subscribe();

    // Resize handler
    const resizeObserver = new ResizeObserver(() => {
      fitAddon?.fit();
      if (terminal) {
        sendWs({ type: 'pty:resize', sessionId, cols: terminal.cols, rows: terminal.rows });
      }
    });
    resizeObserver.observe(containerEl);

    return () => {
      unsubscribe();
      resizeObserver.disconnect();
      terminal?.dispose();
      terminal = null;
    };
  });

  // Re-subscribe when sessionId changes
  $effect(() => {
    // Read sessionId to establish dependency
    const sid = sessionId;
    if (sid && terminal) {
      unsubscribe();
      terminal.clear();
      subscribe();
    }
  });
</script>

<div class="xterm-container" bind:this={containerEl}></div>

<style>
  .xterm-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .xterm-container :global(.xterm) {
    height: 100%;
    padding: 4px 8px;
  }
</style>

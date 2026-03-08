<div class="corner corner-tl"></div>
<div class="corner corner-tr"></div>
<div class="corner corner-bl"></div>
<div class="corner corner-br"></div>

<style>
  .corner {
    position: fixed;
    width: 22px;
    height: 22px;
    z-index: 15;
    pointer-events: none;
  }
  .corner-tl {
    top: 5px;
    left: 5px;
    border-top: 2px solid var(--accent);
    border-left: 2px solid var(--accent);
  }
  .corner-tr {
    top: 5px;
    right: 5px;
    border-top: 2px solid var(--accent);
    border-right: 2px solid var(--accent);
  }
  .corner-bl {
    bottom: 5px;
    left: 5px;
    border-bottom: 2px solid var(--accent);
    border-left: 2px solid var(--accent);
  }
  .corner-br {
    bottom: 5px;
    right: 5px;
    border-bottom: 2px solid var(--accent);
    border-right: 2px solid var(--accent);
  }
</style>

/**
 * Parses a CSS hex or rgb/rgba color string into a THREE.Color-compatible
 * hex number (e.g. 0x00d4ff).
 *
 * Supports:
 *   '#00d4ff'           → 0x00d4ff
 *   'rgb(0, 212, 255)'  → 0x00d4ff
 *   'rgba(0,212,255,1)' → 0x00d4ff
 *
 * Falls back to 0x00d4ff (cyan accent) for unrecognised formats.
 */
export function parseColorToHex(colorStr: string): number {
  const c = colorStr.trim();
  if (c.startsWith('#')) return parseInt(c.slice(1), 16);
  const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (m) return (parseInt(m[1]) << 16) | (parseInt(m[2]) << 8) | parseInt(m[3]);
  return 0x00d4ff;
}

/**
 * Reads a CSS custom property value from the document root element.
 * Example: getCSSColor('--accent') → '#00d4ff'
 */
export function getCSSColor(varName: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

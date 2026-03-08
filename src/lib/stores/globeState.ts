import { writable } from 'svelte/store';
import type { GraphNode } from '../types';

/**
 * Controls for the 3D Globe visualization.
 *
 * These stores represent the UI toggle state that is reflected into the
 * GlobeRenderer (Three.js). The renderer subscribes to these and applies
 * changes (e.g. globe.controls.autoRotate = value). Storing state here
 * allows other components (toolbar, panels) to read/write without coupling
 * directly to the renderer instance.
 *
 * Default values match the HTML: all toggles start "on", sliders at their
 * HTML value= attributes converted to the runtime unit where applicable.
 */

/**
 * Whether the globe auto-rotates when the user is not interacting.
 * HTML: <div class="globe-toggle on" id="gc-autorotate">
 */
export const autoRotate = writable<boolean>(true);

/**
 * Whether the wireframe sphere overlay is visible.
 * HTML: <div class="globe-toggle on" id="gc-wireframe">
 */
export const showWireframe = writable<boolean>(true);

/**
 * Whether the Fibonacci dot-sphere particle cloud is visible.
 * HTML: <div class="globe-toggle on" id="gc-dots">
 */
export const showDots = writable<boolean>(true);

/**
 * Whether the connection lines between nodes are visible.
 * HTML: <div class="globe-toggle on" id="gc-links">
 */
export const showLinks = writable<boolean>(true);

/**
 * Whether the breathing pulse animation plays on nodes and dots.
 * HTML: <div class="globe-toggle on" id="gc-pulse">
 */
export const pulseEnabled = writable<boolean>(true);

/**
 * Whether the comet trail effect is active during WASD rotation.
 * HTML: <div class="globe-toggle on" id="gc-comet">
 */
export const cometEnabled = writable<boolean>(true);

/**
 * Pulse animation speed in cycles per second.
 * HTML: <input id="gc-pulse-speed" min="10" max="200" value="60">
 * Runtime conversion: value / 100 → 60 / 100 = 0.6 cycles/s
 */
export const pulseSpeed = writable<number>(0.6);

/**
 * Auto-rotation speed passed to OrbitControls.autoRotateSpeed.
 * HTML: <input id="gc-rotate-speed" min="5" max="200" value="35">
 * Runtime conversion: value / 100 → 35 / 100 = 0.35
 */
export const rotateSpeed = writable<number>(0.35);

/**
 * Zoom slider value (raw slider units, 10–100).
 * HTML: <input id="gc-zoom" min="10" max="100" value="55">
 * The renderer converts this to a camera distance:
 *   dist = 1800 - (val / 100) * 1400
 */
export const zoomLevel = writable<number>(55);

/**
 * The node that was clicked and whose detail panel is locked open.
 * null when no node is locked. Setting a node here also pauses autoRotate
 * in the renderer.
 */
export const lockedNode = writable<GraphNode | null>(null);

/**
 * Globe opacity multiplier (0.1–1.0).
 * Scales the wireframe and dot sphere opacity to prevent blowout
 * when combined with additive-blended effects like electric arcs.
 */
export const globeOpacity = writable<number>(1);

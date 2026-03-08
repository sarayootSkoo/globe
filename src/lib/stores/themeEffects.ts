import { writable } from 'svelte/store';

/**
 * Theme effect control stores.
 *
 * These control the particle background effects (embers, snowflakes,
 * nebula, glitter, shooting stars) independently of the theme selection.
 * The ParticleCanvas component subscribes to these and forwards
 * settings to the ParticleBackground renderer.
 */

/** Master effect intensity: 0 = off, 0.5 = half density, 1 = normal, 2 = double */
export const effectDensity = writable<number>(1);

/** Master effect speed multiplier: 0.25 = slow-mo, 1 = normal, 3 = fast */
export const effectSpeed = writable<number>(1);

/** Toggle individual effect layers */
export const showNebula = writable<boolean>(true);
export const showGlitter = writable<boolean>(true);
export const showShootingStars = writable<boolean>(true);
export const showEmbers = writable<boolean>(true);
export const showSnowflakes = writable<boolean>(true);
export const showLightning = writable<boolean>(true);

/** Electric globe-specific effects */
export const showElectricArcs = writable<boolean>(true);
export const showPlasmaAura = writable<boolean>(true);
export const electricArcIntensity = writable<number>(1);  // 0.2–2
export const electricArcSpeed = writable<number>(1);       // 0.25–3

/** Background stars (shared across all themes) */
export const showBgStars = writable<boolean>(true);
export const showBgMesh = writable<boolean>(true);

/** Magic border effect */
export const borderEnabled = writable<boolean>(true);
export const borderIntensity = writable<number>(1);   // 0.2–2, glow strength
export const borderSpeed = writable<number>(1);        // 0.25–3, animation speed

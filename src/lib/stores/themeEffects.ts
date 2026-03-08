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
export const electricArcIntensity = writable<number>(1);  // 0.2–3
export const electricArcSpeed = writable<number>(1);       // 0.25–3
export const electricArcCount = writable<number>(1);       // 0.2–3 arc/ring count multiplier
export const electricOrbitSpeed = writable<number>(1);     // 0.25–3 orbit ring rotation speed
export const electricCoreGlow = writable<number>(1);       // 0.2–3 core glow intensity

/** Spark burst — radial lightning discharge from globe center */
export const showSparkBurst = writable<boolean>(true);
export const sparkBurstIntensity = writable<number>(1);   // 0.2–3 bolt brightness + count
export const sparkBurstRate = writable<number>(1);         // 0.25–3 pulse frequency

/** Background stars (shared across all themes) */
export const showBgStars = writable<boolean>(true);
export const showBgMesh = writable<boolean>(true);

/** Magic border effect */
export const borderEnabled = writable<boolean>(true);
export const borderIntensity = writable<number>(1);   // 0.2–2, glow strength
export const borderSpeed = writable<number>(1);        // 0.25–3, animation speed

/** Post-processing effects */
export const bloomEnabled = writable<boolean>(false);
export const bloomStrength = writable<number>(1);    // 0–5
export const bloomRadius = writable<number>(0.4);    // 0–2
export const bloomThreshold = writable<number>(0.3); // 0–1

/** Fireworks effect — 3D firework explosions around the globe */
export const fireworksEnabled = writable<boolean>(false);
export const fireworksSpeed = writable<number>(1);       // 0.25–3 animation speed
export const fireworksLaunchRate = writable<number>(1);   // 0.25–3 rockets per interval
export const fireworksBurstSize = writable<number>(1);    // 0.2–3 particle count & spread
export const fireworksMiddleFire = writable<boolean>(true);  // secondary inner burst
export const fireworksColorful = writable<boolean>(true);    // random colorful mode
export const fireworksNoLimit = writable<boolean>(false);    // unlimited concurrent
export const fireworksHue = writable<number>(0);             // 0 = auto, 1–360 = specific color

/** Black hole effect — standalone animated effect available on any theme */
export const blackholeEnabled = writable<boolean>(false);
export const blackholeSize = writable<number>(1);      // 0–20: overall scale (0.01x–20x)
export const blackholeSpeed = writable<number>(1);     // 0–20: animation speed
export const blackholeGlow = writable<number>(1);      // 0–20: glow intensity
export const blackholeWidth = writable<number>(1);     // 0–20: horizontal stretch
export const blackholeHeight = writable<number>(1);    // 0–20: vertical stretch
export const blackholeHue = writable<number>(280);     // 0–360: color hue (280 = purple default)

import * as THREE from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { WASDState } from '../types';
import { DEFAULT_CAM_DIST } from '../constants';

const KEY_MAP: Record<string, keyof Pick<WASDState['keys'], 'w' | 'a' | 's' | 'd' | 'q'>> = {
  w: 'w',
  a: 'a',
  s: 's',
  d: 'd',
  q: 'q',
};

export class GlobeWASD {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  state: WASDState;

  /** Called when speed drops to 0 after moving — use to fly back to default position */
  onFlyTo: ((pos: THREE.Vector3, dist: number) => void) | null = null;

  /** Whether the globe is currently the active layout (gates key handling) */
  isGlobeActive: () => boolean = () => true;

  /** Whether search is active (gates key handling and physics) */
  isSearchActive: () => boolean = () => false;

  /** Whether auto-rotate is enabled in settings (used when restoring after stop) */
  autoRotateSetting: boolean = true;

  private _boundKeyDown: (e: KeyboardEvent) => void;
  private _boundKeyUp: (e: KeyboardEvent) => void;
  private _boundBlur: () => void;

  constructor(camera: THREE.PerspectiveCamera, controls: OrbitControls) {
    this.camera = camera;
    this.controls = controls;
    this.state = {
      keys: { w: false, a: false, s: false, d: false, q: false, shift: false },
      speed: 0,
      maxSpeed: 4,       // 4.0 maps to 2000 km/h display
      accelRate: 1.6,    // normal acceleration per second (4x)
      boostRate: 4.8,    // shift-boost acceleration per second (4x)
      brakeRate: 6.0,    // Q-key brake deceleration per second (4x)
      friction: 1.2,     // natural deceleration when no keys held (4x)
      rotX: 0,           // accumulated pitch rotation velocity
      rotY: 0,           // accumulated yaw rotation velocity
      active: false,
      _wasMoving: false,
    };

    this._boundKeyDown = this.handleKeyDown.bind(this);
    this._boundKeyUp = this.handleKeyUp.bind(this);
    this._boundBlur = this.handleBlur.bind(this);

    window.addEventListener('keydown', this._boundKeyDown);
    window.addEventListener('keyup', this._boundKeyUp);
    window.addEventListener('blur', this._boundBlur);
  }

  // ── Key handlers ────────────────────────────────────────────────────────────

  handleKeyDown(e: KeyboardEvent): void {
    // Do not steal keys from text inputs
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

    // Only active during globe layout and outside search
    if (!this.isGlobeActive()) return;
    if (this.isSearchActive()) return;

    const key = e.key.toLowerCase();
    if (KEY_MAP[key] !== undefined) {
      this.state.keys[KEY_MAP[key]] = true;
      e.preventDefault();
    }
    if (key === 'shift' || e.shiftKey) {
      this.state.keys.shift = true;
    }
  }

  handleKeyUp(e: KeyboardEvent): void {
    const key = e.key.toLowerCase();
    if (KEY_MAP[key] !== undefined) {
      this.state.keys[KEY_MAP[key]] = false;
    }
    if (key === 'shift') {
      this.state.keys.shift = false;
    }
  }

  /** Release all keys when window loses focus */
  handleBlur(): void {
    this.state.keys.w = false;
    this.state.keys.a = false;
    this.state.keys.s = false;
    this.state.keys.d = false;
    this.state.keys.q = false;
    this.state.keys.shift = false;
  }

  // ── Physics update ──────────────────────────────────────────────────────────

  /**
   * Called every animation frame. Applies WASD physics to the camera orbit.
   *
   * @param dt              Delta-time in seconds
   * @param isSearchActive  When true, speed is zeroed and physics are skipped
   * @param autoRotateSetting  Whether auto-rotate should be restored after stopping
   */
  update(dt: number, isSearchActive: boolean, autoRotateSetting: boolean): void {
    this.autoRotateSetting = autoRotateSetting;

    // Search active → freeze everything
    if (isSearchActive) {
      this.state.speed = 0;
      return;
    }

    const keys = this.state;

    // Determine desired rotation direction (opposing axes cancel each other)
    let dx = 0; // pitch: W = up (-1), S = down (+1)
    let dy = 0; // yaw:   A = left (-1), D = right (+1)
    if (keys.keys.w && !keys.keys.s) dx = -1;
    if (keys.keys.s && !keys.keys.w) dx = 1;
    if (keys.keys.a && !keys.keys.d) dy = -1;
    if (keys.keys.d && !keys.keys.a) dy = 1;

    const hasInput = dx !== 0 || dy !== 0;

    // ── Acceleration / deceleration ──────────────────────────────────────────
    if (keys.keys.q) {
      // Q = hard brake
      this.state.speed = Math.max(0, this.state.speed - this.state.brakeRate * dt);
    } else if (hasInput) {
      // Moving: normal accel or shift boost
      const rate = this.state.keys.shift ? this.state.boostRate : this.state.accelRate;
      this.state.speed = Math.min(this.state.maxSpeed, this.state.speed + rate * dt);
    } else {
      // No input: natural friction slows down
      this.state.speed = Math.max(0, this.state.speed - this.state.friction * dt);
    }

    // ── Smooth rotation direction (avoid snapping) ───────────────────────────
    const dirLerp = 5 * dt;
    const targetRx = hasInput ? dx : 0;
    // When coasting (no input, still moving), maintain last yaw direction
    const targetRy = hasInput ? dy : (this.state.speed > 0.01 ? this.state.rotY : 0);
    this.state.rotX += (targetRx - this.state.rotX) * Math.min(1, dirLerp);
    this.state.rotY += (targetRy - this.state.rotY) * Math.min(1, dirLerp);

    // ── Apply quaternion rotation to camera orbit ────────────────────────────
    if (this.state.speed > 0.001) {
      // Disable auto-rotate while WASD is driving
      this.controls.autoRotate = false;

      // Rotation magnitude: non-linear (speed² feels like acceleration)
      const rotMag = this.state.speed * this.state.speed * 0.45 * dt;

      const camPos = this.camera.position.clone();
      const forward = camPos.clone().normalize(); // center → camera direction
      const worldUp = new THREE.Vector3(0, 1, 0);

      // Right = worldUp × forward (perpendicular, for yaw axis)
      const right = new THREE.Vector3().crossVectors(worldUp, forward).normalize();
      // Up = forward × right (relative up for pitch axis)
      const up = new THREE.Vector3().crossVectors(forward, right).normalize();

      // Combine pitch and yaw into one quaternion
      const qPitch = new THREE.Quaternion().setFromAxisAngle(right, this.state.rotX * rotMag);
      const qYaw   = new THREE.Quaternion().setFromAxisAngle(up,    this.state.rotY * rotMag);
      const combined = new THREE.Quaternion().multiplyQuaternions(qYaw, qPitch);

      // Apply and re-normalise distance from centre
      camPos.applyQuaternion(combined);
      const dist = this.camera.position.length();
      camPos.normalize().multiplyScalar(dist);

      this.camera.position.copy(camPos);
      this.camera.lookAt(0, 0, 0);
      this.controls.target.set(0, 0, 0);
      this.controls.update();
    } else if (this.state.speed <= 0.001 && !hasInput && !keys.keys.q) {
      // Speed hit 0 → reset position and restore auto-rotate
      if (this.state._wasMoving) {
        this.state._wasMoving = false;
        this.state.speed = 0;

        // Fly back to default position
        const defaultPos = new THREE.Vector3(0, 0, DEFAULT_CAM_DIST);
        if (this.onFlyTo) {
          this.onFlyTo(defaultPos, DEFAULT_CAM_DIST);
        }

        // Restore auto-rotate if it was enabled
        if (autoRotateSetting) {
          this.controls.autoRotate = true;
        }
      }
    }

    // ── Track moving state (for reset-on-stop) ───────────────────────────────
    if (this.state.speed > 0.01) {
      this.state._wasMoving = true;
    }

    this.state.active = hasInput || this.state.speed > 0.01;
  }

  // ── Computed helpers ─────────────────────────────────────────────────────────

  /** Current speed mapped to km/h display value (0–2000) */
  get speedKmh(): number {
    return Math.round(this.state.speed * 500);
  }

  /** Whether any movement key is currently pressed */
  get anyKeyDown(): boolean {
    const k = this.state.keys;
    return k.w || k.a || k.s || k.d || k.q;
  }

  // ── Lifecycle ────────────────────────────────────────────────────────────────

  dispose(): void {
    window.removeEventListener('keydown', this._boundKeyDown);
    window.removeEventListener('keyup', this._boundKeyUp);
    window.removeEventListener('blur', this._boundBlur);
  }
}

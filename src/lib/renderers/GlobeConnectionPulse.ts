/**
 * GlobeConnectionPulse — traveling light pulse along links from a clicked node.
 */
import * as THREE from 'three';

interface PulseTravel {
  sprite: THREE.Sprite;
  start: THREE.Vector3;
  end: THREE.Vector3;
  progress: number;   // 0 → 1
  speed: number;       // progress per second
}

export class GlobeConnectionPulse {
  private scene: THREE.Scene;
  private pulses: PulseTravel[] = [];
  private pulseMat: THREE.SpriteMaterial;
  private pulseTexture: THREE.CanvasTexture;

  constructor(scene: THREE.Scene) {
    this.scene = scene;

    // Create glow dot texture
    const size = 64;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d')!;
    const cx = size / 2;
    const g = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.2, 'rgba(200,230,255,0.8)');
    g.addColorStop(0.5, 'rgba(100,180,255,0.3)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);

    this.pulseTexture = new THREE.CanvasTexture(c);
    this.pulseMat = new THREE.SpriteMaterial({
      map: this.pulseTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }

  /**
   * Fire pulses from `origin` to each position in `targets`.
   * @param color - accent color for the pulse
   */
  fire(origin: THREE.Vector3, targets: THREE.Vector3[], color?: THREE.Color): void {
    for (const target of targets) {
      const mat = this.pulseMat.clone();
      if (color) mat.color = color;
      const sprite = new THREE.Sprite(mat);
      const pulseSize = 18;
      sprite.scale.set(pulseSize, pulseSize, 1);
      sprite.position.copy(origin);
      sprite.frustumCulled = false;
      this.scene.add(sprite);

      const dist = origin.distanceTo(target);
      const speed = 1.0 / Math.max(0.3, dist / 400); // normalize speed based on distance

      this.pulses.push({
        sprite,
        start: origin.clone(),
        end: target.clone(),
        progress: 0,
        speed,
      });
    }
  }

  update(dt: number): void {
    for (let i = this.pulses.length - 1; i >= 0; i--) {
      const p = this.pulses[i];
      p.progress += dt * p.speed;

      if (p.progress >= 1) {
        this.scene.remove(p.sprite);
        (p.sprite.material as THREE.Material).dispose();
        this.pulses.splice(i, 1);
        continue;
      }

      // Lerp position
      p.sprite.position.lerpVectors(p.start, p.end, p.progress);

      // Fade: bright at start, fade at end
      const fade = 1 - p.progress * p.progress; // quadratic fade-out
      (p.sprite.material as THREE.SpriteMaterial).opacity = fade;

      // Pulsing size
      const sizePulse = 18 * (0.8 + 0.4 * Math.sin(p.progress * Math.PI));
      p.sprite.scale.set(sizePulse, sizePulse, 1);
    }
  }

  dispose(): void {
    for (const p of this.pulses) {
      this.scene.remove(p.sprite);
      (p.sprite.material as THREE.Material).dispose();
    }
    this.pulses = [];
    this.pulseMat.dispose();
    this.pulseTexture.dispose();
  }
}

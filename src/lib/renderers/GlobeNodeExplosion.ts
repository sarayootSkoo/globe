/**
 * GlobeNodeExplosion — particle burst on node click.
 * Creates a burst of particles shooting outward from a 3D position.
 */
import * as THREE from 'three';

interface ExplosionParticle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
}

const PARTICLE_COUNT = 40;

export class GlobeNodeExplosion {
  private scene: THREE.Scene;
  private explosions: { particles: ExplosionParticle[]; points: THREE.Points; geo: THREE.BufferGeometry; mat: THREE.PointsMaterial }[] = [];

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  /**
   * Trigger explosion at a world position with a color.
   */
  explode(position: THREE.Vector3, color: THREE.Color): void {
    const particles: ExplosionParticle[] = [];
    const positions = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Random direction on sphere
      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
      ).normalize();

      const speed = 80 + Math.random() * 200; // units per second
      particles.push({
        position: position.clone(),
        velocity: dir.multiplyScalar(speed),
        life: 0.4 + Math.random() * 0.6,
        maxLife: 0.4 + Math.random() * 0.6,
      });
      // Initialize positions at explosion origin
      positions[i * 3] = position.x;
      positions[i * 3 + 1] = position.y;
      positions[i * 3 + 2] = position.z;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color,
      size: 4,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    this.scene.add(points);

    this.explosions.push({ particles, points, geo, mat });
  }

  /**
   * Update all active explosions. Call every frame.
   */
  update(dt: number): void {
    for (let e = this.explosions.length - 1; e >= 0; e--) {
      const explosion = this.explosions[e];
      let allDead = true;
      const posArr = explosion.geo.attributes.position.array as Float32Array;

      for (let i = 0; i < explosion.particles.length; i++) {
        const p = explosion.particles[i];
        p.life -= dt;
        if (p.life <= 0) continue;
        allDead = false;

        // Move particle
        p.position.addScaledVector(p.velocity, dt);
        // Friction / slow down
        p.velocity.multiplyScalar(0.97);

        posArr[i * 3] = p.position.x;
        posArr[i * 3 + 1] = p.position.y;
        posArr[i * 3 + 2] = p.position.z;
      }

      explosion.geo.attributes.position.needsUpdate = true;

      // Fade out material based on oldest particle
      const maxRemaining = Math.max(...explosion.particles.map(p => p.life / p.maxLife));
      explosion.mat.opacity = Math.max(0, maxRemaining);
      explosion.mat.size = 4 * (0.3 + 0.7 * Math.max(0, maxRemaining));

      if (allDead) {
        this.scene.remove(explosion.points);
        explosion.geo.dispose();
        explosion.mat.dispose();
        this.explosions.splice(e, 1);
      }
    }
  }

  dispose(): void {
    for (const explosion of this.explosions) {
      this.scene.remove(explosion.points);
      explosion.geo.dispose();
      explosion.mat.dispose();
    }
    this.explosions = [];
  }
}

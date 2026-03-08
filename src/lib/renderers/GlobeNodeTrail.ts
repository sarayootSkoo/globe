/**
 * GlobeNodeTrail — glowing breadcrumb trail between visited nodes.
 */
import * as THREE from 'three';

export class GlobeNodeTrail {
  private scene: THREE.Scene;
  private line: THREE.Line | null = null;
  private glowLine: THREE.Line | null = null;
  private visited: THREE.Vector3[] = [];
  private maxTrail = 30;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  /**
   * Add a visited node position to the trail.
   */
  addPoint(position: THREE.Vector3): void {
    // Don't add duplicate consecutive points
    if (this.visited.length > 0) {
      const last = this.visited[this.visited.length - 1];
      if (last.distanceTo(position) < 5) return;
    }

    this.visited.push(position.clone());
    if (this.visited.length > this.maxTrail) {
      this.visited.shift();
    }
    this._rebuild();
  }

  private _rebuild(): void {
    // Remove old lines
    if (this.line) {
      this.scene.remove(this.line);
      this.line.geometry.dispose();
      (this.line.material as THREE.Material).dispose();
      this.line = null;
    }
    if (this.glowLine) {
      this.scene.remove(this.glowLine);
      this.glowLine.geometry.dispose();
      (this.glowLine.material as THREE.Material).dispose();
      this.glowLine = null;
    }

    if (this.visited.length < 2) return;

    const positions: number[] = [];
    for (const v of this.visited) {
      positions.push(v.x, v.y, v.z);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    // Core line
    const mat = new THREE.LineBasicMaterial({
      color: 0xffd700, // gold
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.line = new THREE.Line(geo, mat);
    this.line.frustumCulled = false;
    this.scene.add(this.line);

    // Glow line
    const glowMat = new THREE.LineBasicMaterial({
      color: 0xff8800,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.glowLine = new THREE.Line(geo.clone(), glowMat);
    this.glowLine.scale.setScalar(1.02);
    this.glowLine.frustumCulled = false;
    this.scene.add(this.glowLine);
  }

  /** Clear the trail */
  clear(): void {
    this.visited = [];
    this._rebuild();
  }

  dispose(): void {
    if (this.line) {
      this.scene.remove(this.line);
      this.line.geometry.dispose();
      (this.line.material as THREE.Material).dispose();
    }
    if (this.glowLine) {
      this.scene.remove(this.glowLine);
      this.glowLine.geometry.dispose();
      (this.glowLine.material as THREE.Material).dispose();
    }
  }
}

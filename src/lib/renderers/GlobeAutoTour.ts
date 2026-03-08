/**
 * GlobeAutoTour — automated camera tour visiting nodes sequentially.
 */
import * as THREE from 'three';
import type { GraphNode } from '../types';

export interface TourCallbacks {
  flyTo: (position: THREE.Vector3, distance: number) => void;
  onNodeFocus: (node: GraphNode) => void;
  onTourEnd: () => void;
  /** Returns the current camera distance derived from zoom control */
  getZoomDistance?: () => number;
}

export class GlobeAutoTour {
  private nodes: { data: GraphNode; position: THREE.Vector3 }[] = [];
  private currentIndex = 0;
  private _active = false;
  private _timer = 0;
  private pauseDuration = 3; // seconds to pause at each node
  private callbacks: TourCallbacks;

  constructor(callbacks: TourCallbacks) {
    this.callbacks = callbacks;
  }

  /**
   * Start the tour with a list of nodes and their positions.
   */
  start(nodes: { data: GraphNode; position: THREE.Vector3 }[]): void {
    if (nodes.length === 0) return;
    this.nodes = nodes;
    this.currentIndex = 0;
    this._active = true;
    this._timer = 0;
    this._visitCurrent();
  }

  stop(): void {
    this._active = false;
    this.callbacks.onTourEnd();
  }

  get active(): boolean {
    return this._active;
  }

  /**
   * Call every frame with delta time.
   */
  update(dt: number): void {
    if (!this._active) return;
    this._timer += dt;

    if (this._timer >= this.pauseDuration) {
      this._timer = 0;
      this.currentIndex++;

      if (this.currentIndex >= this.nodes.length) {
        // Loop back to start
        this.currentIndex = 0;
      }

      this._visitCurrent();
    }
  }

  /** Set pause duration between nodes */
  setPauseDuration(seconds: number): void {
    this.pauseDuration = Math.max(1, seconds);
  }

  private _visitCurrent(): void {
    const entry = this.nodes[this.currentIndex];
    if (!entry) return;

    // Use zoom control distance if available, otherwise default to FOCUS_CAM_DIST
    const dist = this.callbacks.getZoomDistance ? this.callbacks.getZoomDistance() : 650;
    const nodePos = entry.position.clone().normalize();
    const camPos = nodePos.multiplyScalar(dist);
    this.callbacks.flyTo(camPos, dist);
    this.callbacks.onNodeFocus(entry.data);
  }

  dispose(): void {
    this._active = false;
  }
}

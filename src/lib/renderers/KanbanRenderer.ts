/**
 * KanbanRenderer — renders Kanban columns + cards in Three.js scene.
 *
 * Architecture:
 *   - Receives scene reference from GlobeRenderer (shared scene)
 *   - Creates a Group at z=-100 (behind globe)
 *   - Columns: PlaneGeometry with header text sprites
 *   - Cards: BoxGeometry with Canvas2D face textures
 *   - Click: raycaster → identify card → emit via callback
 *   - Hover: card lifts up + brighten edge glow
 */

import * as THREE from 'three';
import type { KanbanCard, KanbanStatus, KanbanColumnDef, Category } from '../types';
import { KANBAN_COLUMNS } from '../stores/kanbanState';

// ── Layout constants ──────────────────────────────────────────────────────────

const KANBAN_Z        = -100;   // depth position for kanban zone
const COLUMN_SPACING  = 22;     // x-distance between column centers
const CARD_WIDTH      = 14;
const CARD_HEIGHT     = 3.5;
const CARD_DEPTH      = 0.2;
const CARD_GAP        = 4.5;    // vertical gap between card centers
const MAX_CARDS       = 12;     // max visible cards per column
const COLUMN_WIDTH    = 16;
const COLUMN_HEIGHT   = 60;

// Canvas texture resolution
const TEX_W = 512;
const TEX_H = 256;

// ── Camera targets ────────────────────────────────────────────────────────────

export const KANBAN_CAM = {
  position: new THREE.Vector3(0, 40, -30),
  lookAt:   new THREE.Vector3(0, -5, KANBAN_Z),
};

export const GLOBE_CAM = {
  position: new THREE.Vector3(0, 0, 900),
  lookAt:   new THREE.Vector3(0, 0, 0),
};

// ── Easing ────────────────────────────────────────────────────────────────────

function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ── Camera fly-to animation ───────────────────────────────────────────────────

export function animateCameraTo(
  camera: THREE.PerspectiveCamera,
  controls: { target: THREE.Vector3; update: () => void; enabled: boolean },
  target: { position: THREE.Vector3; lookAt: THREE.Vector3 },
  duration = 2000,
  onComplete?: () => void,
): { cancel: () => void } {
  const startPos    = camera.position.clone();
  const startLookAt = controls.target.clone();
  const startTime   = performance.now();
  let id: number | null = null;

  const step = (now: number) => {
    const elapsed = now - startTime;
    const raw = Math.min(elapsed / duration, 1);
    const t = easeInOutCubic(raw);

    camera.position.lerpVectors(startPos, target.position, t);
    controls.target.lerpVectors(startLookAt, target.lookAt, t);
    camera.lookAt(controls.target);
    controls.update();

    if (raw < 1) {
      id = requestAnimationFrame(step);
    } else {
      id = null;
      onComplete?.();
    }
  };

  id = requestAnimationFrame(step);

  return {
    cancel() {
      if (id !== null) cancelAnimationFrame(id);
    },
  };
}

// ── Canvas2D card texture ─────────────────────────────────────────────────────

function createCardTexture(card: KanbanCard, catColor: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width  = TEX_W;
  canvas.height = TEX_H;
  const ctx = canvas.getContext('2d')!;

  // Background
  ctx.fillStyle = '#1a1a2e';
  ctx.beginPath();
  ctx.roundRect(0, 0, TEX_W, TEX_H, 12);
  ctx.fill();

  // Left color bar
  ctx.fillStyle = catColor;
  ctx.fillRect(0, 0, 8, TEX_H);

  // Category dot
  ctx.fillStyle = catColor;
  ctx.beginPath();
  ctx.arc(28, 32, 8, 0, Math.PI * 2);
  ctx.fill();

  // Category label
  ctx.fillStyle = '#aaa';
  ctx.font = '18px monospace';
  ctx.fillText(card.node.cat, 44, 38);

  // Type badge
  ctx.fillStyle = card.type === 'spec' ? '#4d8aff' : card.type === 'task' ? '#f97316' : '#888';
  ctx.font = '16px monospace';
  const typeTxt = card.type.toUpperCase();
  const tw = ctx.measureText(typeTxt).width;
  ctx.fillText(typeTxt, TEX_W - tw - 20, 38);

  // Title
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 22px monospace';
  const title = card.node.label.length > 28
    ? card.node.label.slice(0, 26) + '..'
    : card.node.label;
  ctx.fillText(title, 20, 100);

  // File path
  ctx.fillStyle = '#666';
  ctx.font = '14px monospace';
  const fp = card.filePath.length > 50
    ? '..' + card.filePath.slice(-48)
    : card.filePath;
  ctx.fillText(fp, 20, 140);

  // Description
  ctx.fillStyle = '#888';
  ctx.font = '14px monospace';
  const desc = (card.node.desc || '').slice(0, 60);
  ctx.fillText(desc, 20, 180);

  // Status dot (bottom-right)
  const statusColors: Record<KanbanStatus, string> = {
    backlog: '#888', planned: '#4d8aff', done: '#00ff88', hold: '#ffcc00',
  };
  ctx.fillStyle = statusColors[card.status];
  ctx.beginPath();
  ctx.arc(TEX_W - 20, TEX_H - 20, 6, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ── Header sprite ─────────────────────────────────────────────────────────────

function createHeaderSprite(label: string, count: number, color: string): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width  = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = color;
  ctx.font = 'bold 28px monospace';
  ctx.fillText(label, 10, 36);

  ctx.fillStyle = '#aaa';
  ctx.font = '22px monospace';
  ctx.fillText(`(${count})`, ctx.measureText(label).width + 20, 36);

  const texture = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(16, 4, 1);
  return sprite;
}

// ── KanbanRenderer class ──────────────────────────────────────────────────────

export class KanbanRenderer {
  private scene: THREE.Scene;
  private group: THREE.Group;
  private cardMeshes: Map<string, THREE.Mesh> = new Map();
  private _hoveredId: string | null = null;
  private _hoverTween: { mesh: THREE.Mesh; origY: number } | null = null;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.visible = false;
    this.scene.add(this.group);
  }

  /** Build/rebuild all columns and cards from data */
  update(
    columns: Map<KanbanStatus, KanbanCard[]>,
    categories: Record<string, Category>,
  ): void {
    this._clear();

    KANBAN_COLUMNS.forEach((colDef, i) => {
      const cards = columns.get(colDef.id) || [];
      const x = (i - 1.5) * COLUMN_SPACING;

      // ── Column background plane ──────────────────────────────────────────
      const colGeo = new THREE.PlaneGeometry(COLUMN_WIDTH, COLUMN_HEIGHT);
      const colMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(colDef.color),
        transparent: true,
        opacity: 0.03,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const colMesh = new THREE.Mesh(colGeo, colMat);
      colMesh.position.set(x, -5, KANBAN_Z);
      this.group.add(colMesh);

      // Column wireframe outline
      const edgesGeo = new THREE.EdgesGeometry(colGeo);
      const edgesMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(colDef.color),
        transparent: true,
        opacity: 0.15,
      });
      const edges = new THREE.LineSegments(edgesGeo, edgesMat);
      edges.position.copy(colMesh.position);
      this.group.add(edges);

      // ── Header sprite ────────────────────────────────────────────────────
      const header = createHeaderSprite(colDef.label, cards.length, colDef.color);
      header.position.set(x, 24, KANBAN_Z + 0.5);
      this.group.add(header);

      // ── Cards ────────────────────────────────────────────────────────────
      const visibleCards = cards.slice(0, MAX_CARDS);
      visibleCards.forEach((card, j) => {
        const catColor = categories[card.node.cat]?.color || '#888';
        const texture  = createCardTexture(card, catColor);

        const geo = new THREE.BoxGeometry(CARD_WIDTH, CARD_HEIGHT, CARD_DEPTH);
        const mat = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          opacity: 0.92,
          emissive: new THREE.Color(catColor),
          emissiveIntensity: 0.04,
          roughness: 0.8,
          metalness: 0.1,
        });

        const mesh = new THREE.Mesh(geo, mat);
        const cardY = 20 - (j * CARD_GAP);
        mesh.position.set(x, cardY, KANBAN_Z + 0.5);
        mesh.userData['nodeId']     = card.node.id;
        mesh.userData['kanbanCard'] = true;
        this.group.add(mesh);
        this.cardMeshes.set(card.node.id, mesh);
      });

      // "more" indicator if truncated
      if (cards.length > MAX_CARDS) {
        const moreCount = cards.length - MAX_CARDS;
        const moreCanvas = document.createElement('canvas');
        moreCanvas.width = 256;
        moreCanvas.height = 64;
        const moreCtx = moreCanvas.getContext('2d')!;
        moreCtx.fillStyle = '#666';
        moreCtx.font = '20px monospace';
        moreCtx.fillText(`+${moreCount} more...`, 10, 36);
        const moreTex = new THREE.CanvasTexture(moreCanvas);
        const moreMat = new THREE.SpriteMaterial({ map: moreTex, transparent: true, opacity: 0.7 });
        const moreSprite = new THREE.Sprite(moreMat);
        moreSprite.scale.set(10, 2.5, 1);
        moreSprite.position.set(x, 20 - (MAX_CARDS * CARD_GAP), KANBAN_Z + 0.5);
        this.group.add(moreSprite);
      }
    });
  }

  /** Show/hide the kanban zone */
  setVisible(visible: boolean): void {
    this.group.visible = visible;
  }

  get isVisible(): boolean {
    return this.group.visible;
  }

  /** Raycaster hit test — returns card nodeId or null */
  hitTest(raycaster: THREE.Raycaster): string | null {
    if (!this.group.visible) return null;

    const meshes = Array.from(this.cardMeshes.values());
    const hits = raycaster.intersectObjects(meshes, false);
    if (hits.length > 0) {
      return hits[0].object.userData['nodeId'] as string || null;
    }
    return null;
  }

  /** Hover effect on card */
  highlightCard(nodeId: string | null): void {
    // Restore previous hover
    if (this._hoverTween) {
      this._hoverTween.mesh.position.y = this._hoverTween.origY;
      const mat = this._hoverTween.mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.04;
      this._hoverTween = null;
    }

    this._hoveredId = nodeId;
    if (!nodeId) return;

    const mesh = this.cardMeshes.get(nodeId);
    if (!mesh) return;

    // Lift card + brighten
    this._hoverTween = { mesh, origY: mesh.position.y };
    mesh.position.y += 0.6;
    const mat = mesh.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.15;
  }

  /** Cleanup all meshes */
  dispose(): void {
    this._clear();
    this.scene.remove(this.group);
  }

  private _clear(): void {
    // Dispose all children
    while (this.group.children.length > 0) {
      const child = this.group.children[0];
      this.group.remove(child);
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        const mat = child.material;
        if (Array.isArray(mat)) {
          mat.forEach(m => {
            if (m.map) m.map.dispose();
            m.dispose();
          });
        } else {
          if (mat.map) mat.map.dispose();
          mat.dispose();
        }
      } else if (child instanceof THREE.Sprite) {
        child.material.map?.dispose();
        child.material.dispose();
      } else if (child instanceof THREE.LineSegments) {
        child.geometry.dispose();
        (child.material as THREE.Material).dispose();
      }
    }
    this.cardMeshes.clear();
    this._hoveredId = null;
    this._hoverTween = null;
  }
}

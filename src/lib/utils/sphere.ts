import type { GraphNode } from '../types';

export interface SpherePoint {
  x: number;
  y: number;
  z: number;
}

export interface GlobePositions {
  [nodeId: string]: SpherePoint;
}

/**
 * Distributes N points evenly over a unit sphere using the Fibonacci / golden-
 * angle method.  Returns an array of unit-length {x, y, z} objects.
 */
export function fibonacciSphere(n: number): SpherePoint[] {
  const pts: SpherePoint[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle in radians
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;       // y ranges from 1 to -1
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
  }
  return pts;
}

/**
 * Assigns a unit-sphere position to every node, grouping nodes into latitudinal
 * bands per category.  Each category receives an evenly-spaced band, and nodes
 * within that category are spread across a longitude arc.
 *
 * Returns a map of nodeId → {x, y, z} (unit-sphere coordinates — multiply by
 * GLOBE_RADIUS to get world-space positions).
 */
export function computeGlobePositions(nodes: GraphNode[]): GlobePositions {
  const cats = [...new Set(nodes.map(n => n.cat))];
  const catCount = cats.length || 1;

  // Each category gets a latitudinal band centre
  const catBand: Record<string, { lat: number }> = {};
  cats.forEach((cat, i) => {
    const frac = (i + 0.5) / catCount; // 0..1
    catBand[cat] = { lat: Math.PI * frac - Math.PI / 2 }; // -PI/2 .. PI/2
  });

  // Group nodes by category
  const catNodes: Record<string, GraphNode[]> = {};
  cats.forEach(c => { catNodes[c] = []; });
  nodes.forEach(n => catNodes[n.cat].push(n));

  const positions: GlobePositions = {};

  cats.forEach(cat => {
    const cns = catNodes[cat];
    const bandLat = catBand[cat].lat;
    const latSpread = (Math.PI / catCount) * 0.8; // tighter spread within band

    cns.forEach((n, i) => {
      const frac = cns.length > 1 ? i / (cns.length - 1) : 0.5;
      const lon = (frac * 2 - 1) * Math.PI * 0.9;             // -162° .. 162°
      const lat = bandLat + (Math.random() - 0.5) * latSpread * 0.6;

      // Spherical → Cartesian
      const cosLat = Math.cos(lat);
      positions[n.id] = {
        x: Math.cos(lon) * cosLat,
        y: Math.sin(lat),
        z: Math.sin(lon) * cosLat,
      };
    });
  });

  return positions;
}

/**
 * Builds a great-circle arc between two 3D vectors on a sphere of the given
 * radius.  Returns `segments + 1` evenly-spaced points that lie slightly above
 * the sphere surface (radius * 1.01) so lines are visible over the sphere mesh.
 *
 * The returned points are plain {x, y, z} objects so this utility has no
 * dependency on Three.js — callers convert to THREE.Vector3 themselves.
 */
export function greatCircleArc(
  v1: SpherePoint,
  v2: SpherePoint,
  radius: number,
  segments: number = 20,
): SpherePoint[] {
  const pts: SpherePoint[] = [];

  // Normalise input vectors
  const len1 = Math.sqrt(v1.x ** 2 + v1.y ** 2 + v1.z ** 2) || 1;
  const len2 = Math.sqrt(v2.x ** 2 + v2.y ** 2 + v2.z ** 2) || 1;
  const start = { x: v1.x / len1, y: v1.y / len1, z: v1.z / len1 };
  const end   = { x: v2.x / len2, y: v2.y / len2, z: v2.z / len2 };

  const r = radius * 1.01; // slightly above the sphere surface

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;

    // Linear interpolation, then re-normalise to stay on the sphere
    const ix = start.x + (end.x - start.x) * t;
    const iy = start.y + (end.y - start.y) * t;
    const iz = start.z + (end.z - start.z) * t;
    const len = Math.sqrt(ix * ix + iy * iy + iz * iz) || 1;

    pts.push({ x: (ix / len) * r, y: (iy / len) * r, z: (iz / len) * r });
  }

  return pts;
}

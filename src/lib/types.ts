export interface GraphNode {
  id: string;
  label: string;
  cat: string;
  desc?: string;
  keywords?: string[];
  file?: string;
  refs?: number;
  preview?: string;
  status?: 'done' | 'in-progress' | 'planned';
  // D3 simulation adds these
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  // Globe 3D positions
  _gx?: number;
  _gy?: number;
  _gz?: number;
  // Internal state
  __opacity?: number;
  __opFrom?: number;
  __opTo?: number;
  // Populated by updateNodes — IDs of directly connected nodes
  connections?: string[];
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  label?: string;
  /** True when the source and target belong to different categories. */
  crossRepo?: boolean;
  /** Directional hint: backend→frontend = forward, frontend→backend = backward, same-level = bidirectional. */
  direction?: 'forward' | 'backward' | 'bidirectional';
}

export interface Category {
  label: string;
  color: string;
  glow: string;
}

export interface ScoredResult {
  node: GraphNode;
  score: number;
}

export interface WASDKeys {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
  q: boolean;
  shift: boolean;
}

export interface WASDState {
  keys: WASDKeys;
  speed: number;
  maxSpeed: number;
  accelRate: number;
  boostRate: number;
  brakeRate: number;
  friction: number;
  rotX: number;
  rotY: number;
  active: boolean;
  _wasMoving: boolean;
}

export interface GraphNode {
  id: string;
  label: string;
  cat: string;
  desc?: string;
  keywords?: string[];
  file?: string;
  refs?: number;
  preview?: string;
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
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  label?: string;
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

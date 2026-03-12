export interface GraphNode {
  id: string;
  label: string;
  cat: string;
  desc?: string;
  keywords?: string[];
  file?: string;
  refs?: number;
  preview?: string;
  status?: 'done' | 'in-progress' | 'planned' | 'hold';
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

export type ViewMode = 'globe' | 'kanban';

export type KanbanStatus =
  | 'create'
  | 'design'
  | 'backlog'
  | 'hold'
  | 'task'
  | 'issue'
  | 'develop'
  | 'testing'
  | 'validate'
  | 'update-docs'
  | 'done';

// ── Agent Types (13 agents — maps to SDLC pipeline commands) ─────────────────
export type AgentType =
  | 'chore'       // Tech Lead — /chore
  | 'feature'     // Tech Lead — /feature
  | 'breakdown'   // Product Manager — /breakdown
  | 'estimate'    // Scrum Master — /estimate
  | 'implement'   // Developer — /implement
  | 'issue'       // Investigator — /issue
  | 'test'        // QA Engineer — /test
  | 'review'      // Code Reviewer — /review
  | 'security'    // Security Auditor — /security
  | 'validate'    // Domain Expert — /validate
  | 'docs'        // Tech Writer — /docs
  | 'deploy'      // DevOps Engineer — /deploy
  | 'discussion'  // Architect — /discussion
  | null;

export interface AgentSuggestion {
  agent: string;
  command: string;
  priority: number;
  note?: string;
}

export interface AgentLiveStatus {
  nodeId: string;
  agent: AgentType;
  state: 'idle' | 'working' | 'done' | 'error';
  progress?: number;   // 0-100
  lastAction?: string; // e.g. "Edit order.service.ts"
  startedAt?: string;
  duration?: number;   // seconds
}

export interface AgentEvent {
  type: 'session_start' | 'tool_call' | 'agent_spawn' | 'agent_end' | 'session_end';
  sessionId: string;
  timestamp: string;
  data: Record<string, unknown>;
}

export interface CardPriority {
  score: number;
  reasons: string[];
}

// ── Card Lifecycle ───────────────────────────────────────────────────────────
export type CardLifecycleState =
  | 'idle'       // สร้างแล้ว ยังไม่เริ่ม
  | 'started'    // กด Start แล้ว กำลังเตรียม
  | 'running'    // Claude กำลังทำงาน
  | 'paused'     // หยุดชั่วคราว
  | 'completed'  // เสร็จ พร้อมย้าย lane
  | 'failed'     // error ต้อง retry หรือ skip
  | 'blocked';   // blocked by dependency

export type PauseReason =
  | 'token_limit'      // Claude หมด token
  | 'subscription'     // ต้อง login ใหม่
  | 'user_pause'       // User กด pause เอง
  | 'dependency'       // รอ card อื่นเสร็จก่อน
  | 'error_retry';     // error แต่จะ retry

// ── Card Types ───────────────────────────────────────────────────────────────
export type CardType = 'spec' | 'discussion' | 'task' | 'issue';

export interface KanbanCard {
  node: GraphNode;
  status: KanbanStatus;
  filePath: string;
  type: CardType;
  agent?: AgentType;
  // Lifecycle
  lifecycle: CardLifecycleState;
  pauseReason?: PauseReason | null;
  // Iteration
  iterationCount: number;
  iterationScore: number;       // 0-5
  lastCommand?: string | null;
  lastRunAt?: number | null;
  // Upload
  uploadPath?: string | null;
  // Artifact
  artifactPath?: string | null;
  // Local-only card (created via UI, not from graph node)
  isLocal?: boolean;
  // Dependencies
  blockedBy?: string[];   // IDs of cards that must complete before this one
  blocking?: string[];    // IDs of cards that this card is blocking
}

export interface KanbanColumnDef {
  id: KanbanStatus;
  label: string;
  color: string;
}

// ── Workflow Types ───────────────────────────────────────────────────────────
export interface WorkflowTransition {
  from: KanbanStatus;
  to: KanbanStatus;
  trigger: string;        // command name e.g., '/chore'
  artifactPattern: string; // e.g., 'specs/chore-*.md'
}

export interface CommandOutput {
  artifactPath: string;
  cardId: string | null;
  suggestedNext: {
    command: string;
    args: string;
    description: string;
  } | null;
  targetColumn: KanbanStatus;
  mode: 'create' | 'iterate';
  iterationNumber: number;
  score: IterationScore;
  changesSummary: string[];
}

export interface CommandInput {
  mode: 'create' | 'iterate' | 'upload';
  prompt?: string;
  existingFilePath?: string;
  uploadPath?: string;
  iterationGoal?: string;
  section?: string;
}

export interface WorkflowChain {
  id: string;
  name: string;
  steps: WorkflowTransition[];
}

export interface WorkflowExecution {
  chainId: string;
  cardId: string;
  currentStep: number;
  totalSteps: number;
  status: 'active' | 'paused' | 'completed' | 'failed';
  history: WorkflowStepRecord[];
  createdAt: number;
  updatedAt: number;
}

export interface WorkflowStepRecord {
  index: number;
  command: string;
  fromColumn: KanbanStatus;
  toColumn: KanbanStatus;
  artifactPath: string | null;
  startedAt: number;
  completedAt: number | null;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
}

// ── Iteration Types ──────────────────────────────────────────────────────────
export interface IterationScore {
  overall: number;       // 1-5
  structure: number;
  accuracy: number;
  completeness: number;
  actionability: number;
  consistency: number;
}

export interface IterationRecord {
  iterationNumber: number;
  command: string;
  changesSummary: string[];
  scoreBefore: number;
  scoreAfter: number;
  executedAt: number;
  durationMs: number;
}

// ── Real-time Event Types ────────────────────────────────────────────────────
export type KanbanEventType =
  // Card events
  | 'card:created'
  | 'card:moved'
  | 'card:updated'
  | 'card:deleted'
  // Lifecycle events
  | 'lifecycle:started'
  | 'lifecycle:paused'
  | 'lifecycle:resumed'
  | 'lifecycle:completed'
  | 'lifecycle:failed'
  | 'lifecycle:blocked'
  // Command events
  | 'command:queued'
  | 'command:started'
  | 'command:progress'
  | 'command:completed'
  | 'command:failed'
  // Workflow events
  | 'workflow:advanced'
  | 'workflow:suggested'
  | 'workflow:completed'
  // Session events
  | 'session:connected'
  | 'session:disconnected'
  | 'session:token_usage'
  // File events
  | 'file:created'
  | 'file:modified'
  | 'file:uploaded';

export type KanbanEventSource = 'ui' | 'claude' | 'hook' | 'mcp' | 'git' | 'system';

export interface KanbanEvent<T = unknown> {
  id: string;
  type: KanbanEventType;
  timestamp: string;
  source: KanbanEventSource;
  cardId?: string;
  data: T;
}

// ── Command Registry Types ───────────────────────────────────────────────────
export interface CommandDef {
  operatesIn: KanbanStatus[];
  movesTo: KanbanStatus;
  staysInColumn?: boolean;
  artifactDir: string | null;
  artifactPattern: string | null;
  agent: string;
  role: string;
  description: string;
  rerunnable: boolean;
  acceptsUpload: boolean;
  emitsEvents: KanbanEventType[];
}

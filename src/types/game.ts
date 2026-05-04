// ============================================================
// Game-wide type definitions
// ============================================================

// --- Dice ---

/** Dice face value (1-4) or null if not yet rolled */
export type DiceFace = 1 | 2 | 3 | 4

/** A single die (A-D) */
export type DieId = 'A' | 'B' | 'C' | 'D'

/** The three possible ways to pair four dice into two groups of two */
export type DicePairing =
  | 'AB-CD'
  | 'AC-BD'
  | 'AD-BC'

/** Dice sum from combining two dice (2-8) */
export type DiceSum = 2 | 3 | 4 | 5 | 6 | 7 | 8

/** State of all four dice */
export type DiceState = Record<DieId, DiceFace | null>

// --- Damage table ---

/** Maps each possible dice sum to a base damage value */
export const DAMAGE_TABLE: Record<DiceSum, number> = {
  2: 10,
  3: 6,
  4: 4,
  5: 2,
  6: 4,
  7: 6,
  8: 10,
}

// --- Character icon ---

import type { CSSProperties } from 'react'

/**
 * A single visual layer of a character icon.
 * Layers are rendered bottom-to-top (first = back, last = front).
 */
export type EmojiLayer = {
  /** The emoji string to display (can be multi-codepoint, e.g. 🧑‍🚀) */
  char: string
  /** BEM modifier class applied to this layer, e.g. 'char-icon__layer--red-tint' */
  className?: string
  /** Inline styles for one-off overrides (offset, rotation, scale, etc.) */
  style?: CSSProperties
}

/**
 * Serialisable icon definition — no JSX.
 * Passed as data to <CharIcon> for actual rendering.
 */
export type CharacterIconDef = {
  layers: EmojiLayer[]
}

// --- Enemy ---

export type Rarity = 'C' | 'B' | 'A' | 'S' | 'X'

export type EnemyActionType =
  | { kind: 'damage'; value: number }
  | { kind: 'status'; statusId: StatusEffectId; value: number }
  | { kind: 'damage_status'; value: number; statusId: StatusEffectId; statusValue: number }
  | { kind: 'reduce'; factor: number }
  | { kind: 'nullify' }

/** Weights for dice sum targeting (2-8). Higher weight = more likely. */
export type DiceSumWeights = Partial<Record<DiceSum, number>>

export type EnemyAction = {
  type: EnemyActionType
  /** Targeting weights for dice sums. Defaults to uniform if omitted. */
  weights?: DiceSumWeights
}

export type EnemyData = {
  name: string
  icon: CharacterIconDef
  hp: number
  /** Turn-based action patterns. Cycles through outer array each turn.
   *  Inner array = all actions the enemy performs in that turn. */
  actions: EnemyAction[][]
  exp: number
  gold: number
  rarity: Rarity
}

export type EnemyVariant = {
  name: string
  hpMultiplier?: number
  damageMultiplier?: number
}

export type EnemyInstance = {
  data: EnemyData
  variants: EnemyVariant[]
  state: EnemyState
}

export type EnemyState = {
  currentHp: number
  statusEffects: ActiveStatusEffect[]
}

// --- Status effects ---

/** Display template for a status effect. Instance state is in ActiveStatusEffect. */
export type StatusEffectDef = {
  name: string
  icon: string
}

/** Single source of truth for all status effect definitions */
export const STATUS_REGISTRY = {
  burn:   { name: 'Burn',   icon: '🔥' }, // #F60 毎ターン，value ダメージ
  freeze: { name: 'Freeze', icon: '❄️' }, // #4FF プレイヤー：value 個のランダムな目を無効化 / 敵：行動個数が value 減る
  strength: { name: 'Strength', icon: '⚔️' }, // #D44 value × 1%のダメージ増加
  shield: { name: 'Shield', icon: '🛡️' }, // #33D value × 1%のダメージ減少
  regen: { name: 'Regen', icon: '🌿' }, // #0D0 毎ターン，value 回復． value は半減（切り捨て）して減少．
  regen_plus: { name: 'Regen+', icon: '🍏' }, // #0F0 毎ターン，value 回復．
  radioactive: { name: 'Radioactive', icon: '☢️' }, // #FB4 value が 100 以上でHPが0になる
  garlic: { name: 'Garlic', icon: '🧄' }, // #F0F 与えるダメージと受けるダメージが value 倍
  carat: { name: 'Carat', icon: '💎' }, // #09F value ターンの間，受けるダメージが1になる
  invincible: { name: 'Invincible', icon: '⭐' }, // #FFD700 value ターンの間，受けるダメージが0になり，状態異常を受けない
} satisfies Record<string, StatusEffectDef>

export type StatusEffectId = keyof typeof STATUS_REGISTRY

/** A status effect currently active on a combatant */
export type ActiveStatusEffect = {
  id: StatusEffectId
  value: number
}

// --- Player ---

export type PlayerState = {
  maxHp: number
  currentHp: number
  maxMp: number
  currentMp: number
  statusEffects: ActiveStatusEffect[]
  dice: DiceState
  skills: Skill[]
  icon: CharacterIconDef
}

export type Skill = {
  id: string
  name: string
  icon: string
  description: string
  mpCost: number
}

// --- Enemy identifier markers ---

export type EnemyMarker = {
  shape: 'circle' | 'triangle' | 'square' | 'diamond'
  color: string
}

export const ENEMY_MARKERS: EnemyMarker[] = [
  { shape: 'circle', color: '#00f0ff' },   // cyan
  { shape: 'triangle', color: '#00ff66' },  // lime
  { shape: 'square', color: '#ffff00' },    // yellow
  { shape: 'diamond', color: '#ff00ff' },   // magenta
]

// --- Dice color per face ---

export const DICE_FACE_COLORS: Record<DiceFace, string> = {
  1: '#00f0ff',  // cyan
  2: '#00ff66',  // lime
  3: '#ffff00',  // yellow
  4: '#ff00ff',  // magenta
}

// --- Battle state ---

export type TurnPhase =
  | 'rolling'       // Player needs to roll dice
  | 'pairing'       // Player picks a dice pairing
  | 'resolving'     // Attacks are being resolved
  | 'victory'       // All enemies defeated
  | 'defeat'        // Player HP reached 0

/** Resolved action placed on a specific dice sum slot */
export type PlacedEnemyAction = {
  enemyIndex: number
  action: EnemyAction
  targetSum: DiceSum
}

export type BattleState = {
  player: PlayerState
  enemies: EnemyInstance[]
  turnNumber: number
  battleNumber: number
  floorNumber: number
  exp: number
  gold: number
  phase: TurnPhase
  selectedPairing: DicePairing | null
  /** Enemy actions placed on dice sums for this turn */
  placedActions: PlacedEnemyAction[]
  log: LogEntry[]
  verboseLog: boolean
}

export type LogEntry = {
  turn: number
  message: string
  detail?: string
  /** Enemy identifier color for log display (hex string) */
  markerColor?: string
}

// --- Page routing ---

export type PageId = 'home' | 'battle'

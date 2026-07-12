// ============================================================
// Enemy types and constants
// ============================================================

import type { DiceSum } from './dice'
import type { CharacterIconDef } from './icon'
import type { StatusEffectId, ActiveStatusEffect } from './status'
import type { Rarity } from './rarity'

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

/** 敵の分類 */
export type EnemyKind = 'normal' | 'boss' | 'special'

export type EnemyData = {
  name: string
  description: string
  icon: CharacterIconDef
  hp: number
  /** Turn-based action patterns. Cycles through outer array each turn.
   *  Inner array = all actions the enemy performs in that turn. */
  actions: EnemyAction[][]
  exp: number
  gold: number
  rarity: Rarity
  kind: EnemyKind
  /** Status effects the enemy starts the battle with */
  initialStatusEffects?: ActiveStatusEffect[]
}

/** Big, Fast, etc. variants of a base enemy.
 *  Multiplier applies to base HP and damage values.
 *  Can be used for minibosses, bosses, or just variety. */
export type EnemyVariant = {
  name: string
  hpMultiplier?: number
  damageMultiplier?: number
  rewardMultiplier?: number
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

/** Visual marker assigned to each enemy in a battle (symbol + color) */
export type EnemyMarker = {
  symbol: string
  color: string
}

export const ENEMY_MARKERS: EnemyMarker[] = [
  { symbol: '■', color: '#00f0ff' },  // cyan
  { symbol: '▲', color: '#00ff66' },  // lime
  { symbol: '◆', color: '#ffff00' },  // yellow
  { symbol: '▼', color: '#ff00ff' },  // magenta
]

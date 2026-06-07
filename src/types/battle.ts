// ============================================================
// Battle state types
// ============================================================

import type { DiceSum, DicePairing } from './dice'
import type { EnemyInstance, EnemyAction } from './enemy'
import type { PlayerState } from './player'

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

/** A text or enemy-reference segment within a log entry */
export type LogSegment =
  | { kind: 'text'; text: string }
  | { kind: 'enemy'; enemyIndex: number; name: string }

export type LogEntry = {
  turn: number
  segments: LogSegment[]
}

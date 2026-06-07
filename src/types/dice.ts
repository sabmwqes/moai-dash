// ============================================================
// Dice types and constants
// ============================================================

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

/** Color per dice face value */
export const DICE_FACE_COLORS: Record<DiceFace, string> = {
  1: '#00f0ff',  // cyan
  2: '#00ff66',  // lime
  3: '#ffff00',  // yellow
  4: '#ff00ff',  // magenta
}

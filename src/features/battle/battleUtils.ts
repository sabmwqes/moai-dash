import type {
  DiceFace,
  DicePairing,
  DiceState,
  DiceSum,
  EnemyAction,
  EnemyInstance,
  PlacedEnemyAction,
} from '../../types/game'

const ALL_SUMS: DiceSum[] = [2, 3, 4, 5, 6, 7, 8]

/** Roll a single die (1-4) */
export function rollDie(): DiceFace {
  return (Math.floor(Math.random() * 4) + 1) as DiceFace
}

/** Roll all four dice */
export function rollAllDice(): DiceState {
  return { A: rollDie(), B: rollDie(), C: rollDie(), D: rollDie() }
}

/** Compute the two sums for a given pairing */
export function computeSums(
  dice: DiceState,
  pairing: DicePairing,
): [DiceSum, DiceSum] {
  const d = dice as Record<string, number>
  switch (pairing) {
    case 'AB-CD': return [(d.A + d.B) as DiceSum, (d.C + d.D) as DiceSum]
    case 'AC-BD': return [(d.A + d.C) as DiceSum, (d.B + d.D) as DiceSum]
    case 'AD-BC': return [(d.A + d.D) as DiceSum, (d.B + d.C) as DiceSum]
  }
}

/** Given dice state, return all 3 pairing options with their sums */
export function getAllPairings(dice: DiceState) {
  const pairings: DicePairing[] = ['AB-CD', 'AC-BD', 'AD-BC']
  return pairings.map((p) => ({
    pairing: p,
    sums: computeSums(dice, p),
  }))
}

/** Place enemy actions on random dice sums (no duplicate sums per turn) */
export function placeEnemyActions(
  enemies: EnemyInstance[],
  turnNumber: number,
): PlacedEnemyAction[] {
  const placed: PlacedEnemyAction[] = []
  const usedSums = new Set<DiceSum>()

  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i]
    if (enemy.state.currentHp <= 0) continue

    const patternIndex = turnNumber % enemy.data.actions.length
    const actions: EnemyAction[] = enemy.data.actions[patternIndex]

    for (const action of actions) {
      const targetSum = pickTargetSum(action, usedSums)
      if (targetSum !== null) {
        usedSums.add(targetSum)
        placed.push({ enemyIndex: i, action, targetSum })
      }
    }
  }

  return placed
}

function pickTargetSum(
  action: EnemyAction,
  usedSums: Set<DiceSum>,
): DiceSum | null {
  const available = ALL_SUMS.filter((s) => !usedSums.has(s))
  if (available.length === 0) return null

  if (!action.weights) {
    // Uniform distribution
    return available[Math.floor(Math.random() * available.length)]
  }

  // Weighted distribution
  const weights = available.map((s) => action.weights![s] ?? 1)
  const total = weights.reduce((a, b) => a + b, 0)
  let r = Math.random() * total
  for (let i = 0; i < available.length; i++) {
    r -= weights[i]
    if (r <= 0) return available[i]
  }
  return available[available.length - 1]
}

/** Get HP bar color based on ratio */
export function hpBarColor(current: number, max: number): string {
  const ratio = current / max
  if (ratio > 0.5) return '#00ff66'  // green
  if (ratio > 0.25) return '#ffff00' // yellow
  return '#ff3d00'                    // red
}

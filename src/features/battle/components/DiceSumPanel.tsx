import type { DiceSum, PlacedEnemyAction, DicePairing, DiceState } from '../../../types/game'
import { DAMAGE_TABLE } from '../../../types/game'
import { computeSums } from '../battleUtils'

const ALL_SUMS: DiceSum[] = [2, 3, 4, 5, 6, 7, 8]

type Props = {
  placedActions: PlacedEnemyAction[]
  selectedPairing: DicePairing | null
  dice: DiceState
}

export function DiceSumPanel({ placedActions, selectedPairing, dice }: Props) {
  // Compute which sums are "active" from the selected pairing
  const activeSums = new Set<DiceSum>()
  if (selectedPairing && dice.A !== null) {
    const [s1, s2] = computeSums(dice, selectedPairing)
    activeSums.add(s1)
    activeSums.add(s2)
  }

  return (
    <div className="battle-panel battle-panel--dice-sum">
      <div className="dice-sum-table">
        {ALL_SUMS.map((sum) => {
          const actions = placedActions.filter((a) => a.targetSum === sum)
          const isActive = activeSums.has(sum)

          return (
            <div
              className="dice-sum-row"
              key={sum}
              style={isActive ? { background: 'rgb(0 240 255 / 10%)' } : undefined}
            >
              <div className="dice-sum-row__number">{sum}</div>
              <div className="dice-sum-row__enemy">
                {actions.map((a, i) => (
                  <span key={i} style={{ color: 'var(--moai-accent-alt)' }}>
                    {formatAction(a)}
                  </span>
                ))}
              </div>
              <div className="dice-sum-row__player">
                {isActive ? DAMAGE_TABLE[sum] : '—'}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function formatAction(a: PlacedEnemyAction): string {
  switch (a.action.type.kind) {
    case 'damage':
      return `⚔${a.action.type.value}`
    case 'status':
      return `${a.action.type.status.icon}`
    case 'damage_status':
      return `⚔${a.action.type.value}+${a.action.type.status.icon}`
    case 'reduce':
      return `↓${Math.round(a.action.type.factor * 100)}%`
    case 'nullify':
      return '🚫'
  }
}

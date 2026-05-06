import type { DiceSum, PlacedEnemyAction, DicePairing, DiceState } from '../../../types/game'
import { DAMAGE_TABLE, ENEMY_MARKERS, STATUS_REGISTRY } from '../../../types/game'
import { computeSums } from '../battleUtils'

const ALL_SUMS: DiceSum[] = [2, 3, 4, 5, 6, 7, 8]

type Props = {
  placedActions: PlacedEnemyAction[]
  selectedPairing: DicePairing | null
  hoveredPairing: DicePairing | null
  dice: DiceState
}

export function DiceSumPanel({ placedActions, selectedPairing, hoveredPairing, dice }: Props) {
  // Compute which sums are "active" from the selected pairing
  const activeSums = new Set<DiceSum>()
  if (selectedPairing && dice.A !== null) {
    const [s1, s2] = computeSums(dice, selectedPairing)
    activeSums.add(s1)
    activeSums.add(s2)
  }

  // Compute which sums are hovered (preview before selection)
  const hoveredSums = new Set<DiceSum>()
  if (hoveredPairing && dice.A !== null) {
    const [h1, h2] = computeSums(dice, hoveredPairing)
    hoveredSums.add(h1)
    hoveredSums.add(h2)
  }

  return (
    <div className="battle-panel battle-panel--dice-sum">
      {/* Header: ENEMY ACTION | SUM | MY ACTION */}
      <div className="dice-sum-header">
        <div className="dice-sum-header__enemy">ENEMY ACTION</div>
        <div className="dice-sum-header__sum">SUM</div>
        <div className="dice-sum-header__player">MY ACTION</div>
      </div>

      <div className="dice-sum-table">
        {ALL_SUMS.map((sum) => {
          const actions = placedActions.filter((a) => a.targetSum === sum)
          const isActive = activeSums.has(sum)

          return (
            <div
              className={`dice-sum-row${isActive ? ' dice-sum-row--active' : ''}`}
              key={sum}
            >
              {/* Enemy actions — right-aligned */}
              <div className="dice-sum-row__enemy">
                {actions.map((a, i) => {
                  const marker = ENEMY_MARKERS[a.enemyIndex % ENEMY_MARKERS.length]
                  return (
                    <span key={i} style={{ color: marker.color }}>
                      {marker.symbol} {formatAction(a)}
                    </span>
                  )
                })}
              </div>

              {/* Sum number — center */}
              <div className={`dice-sum-row__number${hoveredSums.has(sum) ? ' dice-sum-row__number--hovered' : ''}`}>{sum}</div>

              {/* Player damage — left-aligned, always visible */}
              <div className="dice-sum-row__player">
                <span className={isActive ? 'dice-sum-row__player--active' : ''}>
                  {DAMAGE_TABLE[sum]}
                </span>
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
      return STATUS_REGISTRY[a.action.type.statusId].icon
    case 'damage_status':
      return `⚔${a.action.type.value}+${STATUS_REGISTRY[a.action.type.statusId].icon}`
    case 'reduce':
      return `↓${Math.round(a.action.type.factor * 100)}%`
    case 'nullify':
      return '🚫'
  }
}

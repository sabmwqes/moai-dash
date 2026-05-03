import type { DiceState, DieId, DiceFace, DicePairing, TurnPhase } from '../../../types/game'
import { DICE_FACE_COLORS } from '../../../types/game'
import { getAllPairings } from '../battleUtils'

const DIE_IDS: DieId[] = ['A', 'B', 'C', 'D']

type Props = {
  dice: DiceState
  phase: TurnPhase
  selectedPairing: DicePairing | null
  onRoll: () => void
  onSelectPairing: (p: DicePairing) => void
  onConfirm: () => void
}

export function DicePanel({
  dice,
  phase,
  selectedPairing,
  onRoll,
  onSelectPairing,
  onConfirm,
}: Props) {
  const pairings = dice.A !== null ? getAllPairings(dice) : []

  return (
    <div className="battle-panel battle-panel--dice">
      {/* Dice grid */}
      <div className="dice-grid">
        {DIE_IDS.map((id) => {
          const value = dice[id]
          return (
            <div className="die" key={id}>
              <span className={`die__corner die__corner--${id}`} />
              <span style={{ color: value ? DICE_FACE_COLORS[value as DiceFace] : 'var(--moai-text)' }}>
                {value ?? '?'}
              </span>
            </div>
          )
        })}
      </div>

      {/* Pairing buttons (visible after rolling) */}
      {phase === 'pairing' && (
        <div className="pairing-buttons">
          {pairings.map(({ pairing, sums }) => (
            <button
              key={pairing}
              type="button"
              className={`pairing-btn${selectedPairing === pairing ? ' pairing-btn--selected' : ''}`}
              onClick={() => onSelectPairing(pairing)}
            >
              {pairing.replace('-', ' / ')} → {sums[0]}, {sums[1]}
            </button>
          ))}
        </div>
      )}

      {/* Action button */}
      {phase === 'rolling' && (
        <button type="button" className="roll-btn" onClick={onRoll}>
          ROLL DICE
        </button>
      )}
      {phase === 'pairing' && selectedPairing && (
        <button type="button" className="roll-btn" onClick={onConfirm}>
          CONFIRM
        </button>
      )}
    </div>
  )
}

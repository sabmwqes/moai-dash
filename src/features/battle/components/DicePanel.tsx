import type { DiceState, DieId, DiceFace, DicePairing, TurnPhase } from '../../../types/game'
import { DICE_FACE_COLORS } from '../../../types/game'
import { getAllPairings } from '../battleUtils'

const DIE_IDS: DieId[] = ['A', 'B', 'C', 'D']

/** Parse "AB-CD" → [['A','B'], ['C','D']] */
function parsePairing(p: DicePairing): [DieId[], DieId[]] {
  const [left, right] = p.split('-')
  return [left.split('') as DieId[], right.split('') as DieId[]]
}

type Props = {
  dice: DiceState
  phase: TurnPhase
  selectedPairing: DicePairing | null
  onRoll: () => void
  onSelectPairing: (p: DicePairing) => void
  onConfirm: () => void
  onExit: () => void
  onHoverPairing: (p: DicePairing | null) => void
}

export function DicePanel({
  dice,
  phase,
  selectedPairing,
  onRoll,
  onSelectPairing,
  onConfirm,
  onExit,
  onHoverPairing,
}: Props) {
  const pairings = dice.A !== null ? getAllPairings(dice) : []

  return (
    <div className="battle-panel battle-panel--dice">
      {/* Dice grid */}
      <div className="dice-grid">
        {DIE_IDS.map((id) => {
          const value = dice[id]
          return (
            <div className="die-wrapper" key={id}>
              {/* Letter label above the die */}
              <span className={`die__label die__label--${id}`}>{id}</span>
              <div className="die">
                <span className={`die__corner die__corner--${id}`} />
                <span
                  className="die__value"
                  style={{ color: value ? DICE_FACE_COLORS[value as DiceFace] : 'var(--moai-text)' }}
                >
                  {value ?? '?'}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Pairing buttons with mini dice visualization */}
      {phase === 'pairing' && (
        <div className="pairing-buttons">
          {pairings.map(({ pairing, sums }) => {
            const [pair1, pair2] = parsePairing(pairing)
            return (
              <button
                key={pairing}
                type="button"
                className={`pairing-btn${selectedPairing === pairing ? ' pairing-btn--selected' : ''}`}
                onClick={() => onSelectPairing(pairing)}
                onMouseEnter={() => onHoverPairing(pairing)}
                onMouseLeave={() => onHoverPairing(null)}
              >
                {/* Mini dice grouped by pair */}
                <span className="pairing-btn__dice">
                  {pair1.map((id) => (
                    <span key={id} className={`mini-die mini-die--${id}`}>
                      {dice[id] ?? '?'}
                    </span>
                  ))}
                  <span className="pairing-btn__sep">+</span>
                  {pair2.map((id) => (
                    <span key={id} className={`mini-die mini-die--${id}`}>
                      {dice[id] ?? '?'}
                    </span>
                  ))}
                </span>
                {/* Resulting sums */}
                <span className="pairing-btn__sums">{sums[0]} + {sums[1]}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Primary action button — always visible, disabled when not applicable */}
      {(() => {
        if (phase === 'rolling')  return <button type="button" className="roll-btn" onClick={onRoll}>ROLL DICE</button>
        if (phase === 'pairing')  return <button type="button" className="roll-btn" onClick={onConfirm} disabled={!selectedPairing}>CONFIRM</button>
        if (phase === 'victory')  return <button type="button" className="roll-btn" onClick={onExit}>CONTINUE</button>
        if (phase === 'defeat')   return <button type="button" className="roll-btn" onClick={onExit}>RETURN HOME</button>
        return <button type="button" className="roll-btn" disabled>—</button>
      })()}
    </div>
  )
}

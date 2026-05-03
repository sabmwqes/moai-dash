type Props = {
  gold: number
  exp: number
  turnNumber: number
  battleNumber: number
  floorNumber: number
}

export function BattleStatus({ gold, exp, turnNumber, battleNumber, floorNumber }: Props) {
  return (
    <div className="battle-panel battle-panel--status">
      <div className="status-item">
        <span className="status-item__label">FLOOR</span>
        <span className="status-item__value">{floorNumber}</span>
      </div>
      <div className="status-item">
        <span className="status-item__label">BATTLE</span>
        <span className="status-item__value">{battleNumber}</span>
      </div>
      <div className="status-item">
        <span className="status-item__label">TURN</span>
        <span className="status-item__value">{turnNumber}</span>
      </div>
      <div className="status-item" style={{ marginLeft: 'auto' }}>
        <span className="status-item__label">GOLD</span>
        <span className="status-item__value">{gold}</span>
      </div>
      <div className="status-item">
        <span className="status-item__label">EXP</span>
        <span className="status-item__value">{exp}</span>
      </div>
    </div>
  )
}

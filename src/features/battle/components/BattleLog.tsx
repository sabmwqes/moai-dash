import type { LogEntry } from '../../../types/game'
import { ENEMY_MARKERS } from '../../../types/game'
import { useRef, useEffect } from 'react'

type Props = {
  log: LogEntry[]
}

export function BattleLog({ log }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [log.length])

  return (
    <div className="battle-panel battle-panel--log">
      {log.length === 0 && (
        <span className="log-entry" style={{ opacity: 0.4 }}>— battle log —</span>
      )}
      {log.map((entry, i) => (
        <div className="log-entry" key={i}>
          <span className="log-entry__turn">T{entry.turn}</span>
          {entry.segments.map((seg, j) => {
            if (seg.kind === 'text') return <span key={j}>{seg.text}</span>
            const marker = ENEMY_MARKERS[seg.enemyIndex % ENEMY_MARKERS.length]
            return (
              <span key={j} className="log-entry__enemy" style={{ color: marker.color }}>
                {marker.symbol} {seg.name}
              </span>
            )
          })}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

import type { LogEntry } from '../../../types/game'
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
          {entry.markerColor && (
            <span className="log-entry__marker" style={{ color: entry.markerColor }}>●</span>
          )}
          {entry.message}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

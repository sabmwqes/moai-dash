import type { PlayerState, EnemyInstance } from '../../../types/game'
import { ENEMY_MARKERS } from '../../../types/game'
import { hpBarColor } from '../battleUtils'
import { CharIcon } from './CharIcon'

type Props = {
  player: PlayerState
  enemies: EnemyInstance[]
}

export function BattleMainPanel({ player, enemies }: Props) {
  const aliveEnemies = enemies.filter((e) => e.state.currentHp > 0)

  return (
    <div className="battle-panel battle-panel--main">
      <div className="battle-main__arena">
        {/* Enemies (left side) */}
        {aliveEnemies.map((enemy, i) => {
          const marker = ENEMY_MARKERS[i % ENEMY_MARKERS.length]
          return (
            <div className="battle-char" key={i}>
              <CharIcon icon={enemy.data.icon} size="lg" mirrored/>
              <span className="battle-char__name">
                <span className="battle-char__marker" style={{ color: marker.color }}>
                  {marker.symbol}
                </span>
                {enemy.data.name}
              </span>
              <div className="hp-bar">
                <div
                  className="hp-bar__fill"
                  style={{
                    width: `${(enemy.state.currentHp / enemy.data.hp) * 100}%`,
                    background: hpBarColor(enemy.state.currentHp, enemy.data.hp),
                  }}
                />
              </div>
              <span className="hp-bar__label">
                {enemy.state.currentHp} / {enemy.data.hp}
              </span>
            </div>
          )
        })}

        {/* VS */}
        <span style={{ fontFamily: 'Orbitron', fontSize: '1.4rem', opacity: 0.4 }}>VS</span>

        {/* Player (right side — mirrored) */}
        <div className="battle-char">
          <CharIcon icon={player.icon} size="lg" />
          <span className="battle-char__name">YOU</span>
          <div className="hp-bar">
            <div
              className="hp-bar__fill"
              style={{
                width: `${(player.currentHp / player.maxHp) * 100}%`,
                background: hpBarColor(player.currentHp, player.maxHp),
              }}
            />
          </div>
          <span className="hp-bar__label">
            {player.currentHp} / {player.maxHp}
          </span>
        </div>
      </div>
    </div>
  )
}

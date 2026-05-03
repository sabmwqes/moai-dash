import type { PlayerState, EnemyInstance } from '../../../types/game'
import { hpBarColor } from '../battleUtils'

type Props = {
  player: PlayerState
  enemies: EnemyInstance[]
}

export function BattleMainPanel({ player, enemies }: Props) {
  const aliveEnemies = enemies.filter((e) => e.state.currentHp > 0)

  return (
    <div className="battle-panel battle-panel--main">
      <div className="battle-main__arena">
        {/* Player */}
        <div className="battle-char">
          <span className="battle-char__emoji">🧑‍🚀</span>
          <span className="battle-char__name">Player</span>
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

        {/* VS */}
        <span style={{ fontFamily: 'Orbitron', fontSize: '1.4rem', opacity: 0.4 }}>VS</span>

        {/* Enemies */}
        {aliveEnemies.map((enemy, i) => (
          <div className="battle-char" key={i}>
            <span className="battle-char__emoji">{enemy.data.emoji}</span>
            <span className="battle-char__name">{enemy.data.name}</span>
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
        ))}
      </div>
    </div>
  )
}

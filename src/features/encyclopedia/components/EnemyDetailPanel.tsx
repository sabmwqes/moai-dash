import type { EnemyData, EnemyAction } from '../../../types/game'
import { RARITY_REGISTRY, STATUS_REGISTRY } from '../../../types/game'
import { CharIcon } from '../../../components/CharIcon'
import './EnemyDetailPanel.css'

type Props = {
  enemy: EnemyData | null
}

type Rarity = keyof typeof RARITY_REGISTRY
type StatusId = keyof typeof STATUS_REGISTRY

/** 全ターンのダメージ値から最小・最大を取得 */
function getDamageRange(actions: EnemyAction[][]): { min: number; max: number } | null {
  const damages: number[] = []
  for (const turn of actions) {
    for (const action of turn) {
      const t = action.type
      if (t.kind === 'damage' || t.kind === 'damage_status') {
        damages.push(t.value)
      }
    }
  }
  if (damages.length === 0) return null
  return { min: Math.min(...damages), max: Math.max(...damages) }
}

/** 全ターンで使用される状態異常IDを収集 */
function getStatusEffects(actions: EnemyAction[][]): StatusId[] {
  const ids = new Set<StatusId>()
  for (const turn of actions) {
    for (const action of turn) {
      const t = action.type
      if (t.kind === 'status' || t.kind === 'damage_status') {
        ids.add(t.statusId as StatusId)
      }
    }
  }
  return [...ids]
}

export function EnemyDetailPanel({ enemy }: Props) {
  if (!enemy) {
    return (
      <div className="enemy-detail-panel enemy-detail-panel--empty">
        <p className="enemy-detail-panel__placeholder">SELECT A MOAI</p>
      </div>
    )
  }

  const rarityDef = RARITY_REGISTRY[enemy.rarity as Rarity]
  const damageRange = getDamageRange(enemy.actions)
  const statusIds = getStatusEffects(enemy.actions)

  return (
    <div className="enemy-detail-panel">
      {/* レア度 */}
      <span className="enemy-detail-panel__rarity" style={{ color: rarityDef?.color }}>
        {rarityDef?.label ?? enemy.rarity}
      </span>

      {/* アイコン */}
      <div className="enemy-detail-panel__icon">
        <CharIcon icon={enemy.icon} size="lg" />
      </div>

      {/* 名前 */}
      <h2 className="enemy-detail-panel__name">{enemy.name}</h2>

      {/* 説明文 */}
      <p className="enemy-detail-panel__description">{enemy.description}</p>

      {/* ステータス */}
      <div className="enemy-detail-panel__stats">
        <div className="enemy-detail-panel__stat">
          <span className="enemy-detail-panel__stat-label">HP</span>
          <span className="enemy-detail-panel__stat-value">{enemy.hp}</span>
        </div>
        <div className="enemy-detail-panel__stat">
          <span className="enemy-detail-panel__stat-label">EXP</span>
          <span className="enemy-detail-panel__stat-value">{enemy.exp}</span>
        </div>
        <div className="enemy-detail-panel__stat">
          <span className="enemy-detail-panel__stat-label">GOLD</span>
          <span className="enemy-detail-panel__stat-value">{enemy.gold}</span>
        </div>
      </div>

      {/* スキル: 通常攻撃 + 状態異常の2セクション */}
      <div className="enemy-detail-panel__skills">
        <h3 className="enemy-detail-panel__skills-title">ACTIONS</h3>

        {/* 通常攻撃ダメージ範囲 */}
        {damageRange && (
          <div className="enemy-detail-panel__skill-row">
            <span className="enemy-detail-panel__skill-icon">⚔️</span>
            <span className="enemy-detail-panel__skill-text">
              {damageRange.min === damageRange.max
                ? `${damageRange.min}`
                : `${damageRange.min}~${damageRange.max}`}
            </span>
          </div>
        )}

        {/* 状態異常アイコン */}
        {statusIds.length > 0 && (
          <div className="enemy-detail-panel__skill-row">
            {statusIds.map((id) => {
              const def = STATUS_REGISTRY[id]
              return (
                <span
                  key={id}
                  className="enemy-detail-panel__status-icon"
                  title={def?.name ?? id}
                  style={{ color: def?.color }}
                >
                  {def?.icon ?? '?'}
                </span>
              )
            })}
          </div>
        )}

        {/* 通常攻撃も状態異常もない場合 */}
        {!damageRange && statusIds.length === 0 && (
          <p className="enemy-detail-panel__no-actions">NO ACTIONS</p>
        )}
      </div>

      {/* 状態パネル（プレースホルダ） */}
      <div className="enemy-detail-panel__discovery-status">
        <span className="enemy-detail-panel__discovery-label">UNLOCKED</span>
      </div>
    </div>
  )
}

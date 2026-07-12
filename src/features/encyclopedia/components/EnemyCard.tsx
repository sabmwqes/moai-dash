import type { EnemyData } from '../../../types/game'
import { RARITY_REGISTRY } from '../../../types/game'
import { CharIcon } from '../../../components/CharIcon'
import type { ViewMode } from '../encyclopediaUtils'
import './EnemyCard.css'

type Rarity = keyof typeof RARITY_REGISTRY

type Props = {
  enemy: EnemyData
  selected: boolean
  viewMode: ViewMode
  onClick: () => void
}

export function EnemyCard({ enemy, selected, viewMode, onClick }: Props) {
  const rarityDef = RARITY_REGISTRY[enemy.rarity as Rarity]

  if (viewMode === 'grid') {
    return (
      <button
        type="button"
        className={`enemy-card enemy-card--grid ${selected ? 'enemy-card--selected' : ''}`}
        style={{ borderColor: selected ? rarityDef?.color : undefined }}
        onClick={onClick}
      >
        <CharIcon icon={enemy.icon} size="md" />
        <span className="enemy-card__name">{enemy.name}</span>
      </button>
    )
  }

  // リスト表示
  return (
    <button
      type="button"
      className={`enemy-card enemy-card--list ${selected ? 'enemy-card--selected' : ''}`}
      style={{ borderColor: selected ? rarityDef?.color : undefined }}
      onClick={onClick}
    >
      <span className="enemy-card__icon-wrap">
        <CharIcon icon={enemy.icon} size="sm" />
      </span>
      <span className="enemy-card__rarity" style={{ color: rarityDef?.color }}>
        {enemy.rarity}
      </span>
      <span className="enemy-card__name">{enemy.name}</span>
    </button>
  )
}

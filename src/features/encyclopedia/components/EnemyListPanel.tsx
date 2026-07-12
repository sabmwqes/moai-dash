import type { EnemyData } from '../../../types/game'
import { RARITY_REGISTRY } from '../../../types/game'
import { EnemyCard } from './EnemyCard'
import type { SortOption, SortKey, SortOrder, ViewMode } from '../encyclopediaUtils'
import './EnemyListPanel.css'

type Rarity = keyof typeof RARITY_REGISTRY

type Props = {
  entries: [string, EnemyData][]
  selectedId: string | null
  onSelect: (id: string) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  sortOptions: SortOption[]
  currentSortKey: SortKey
  currentSortOrder: SortOrder
  onSortChange: (key: SortKey, order: SortOrder) => void
  activeRarities: Set<string>
  onRarityToggle: (rarity: string) => void
}

const ALL_RARITIES = Object.keys(RARITY_REGISTRY) as Rarity[]

export function EnemyListPanel({
  entries,
  selectedId,
  onSelect,
  viewMode,
  onViewModeChange,
  sortOptions,
  currentSortKey,
  currentSortOrder,
  onSortChange,
  activeRarities,
  onRarityToggle,
}: Props) {
  const currentSortLabel = sortOptions.find(
    (o) => o.key === currentSortKey && o.order === currentSortOrder,
  )?.label ?? ''

  return (
    <div className="enemy-list-panel">
      {/* --- ツールバー --- */}
      <div className="enemy-list-panel__toolbar">
        {/* ソート */}
        <div className="enemy-list-panel__sort">
          <label className="enemy-list-panel__toolbar-label">SORT</label>
          <select
            className="enemy-list-panel__select"
            value={`${currentSortKey}_${currentSortOrder}`}
            aria-label={`Sort: ${currentSortLabel}`}
            onChange={(e) => {
              const opt = sortOptions.find(
                (o) => `${o.key}_${o.order}` === e.target.value,
              )
              if (opt) onSortChange(opt.key, opt.order)
            }}
          >
            {sortOptions.map((opt) => (
              <option key={`${opt.key}_${opt.order}`} value={`${opt.key}_${opt.order}`}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* フィルタ（レア度） */}
        <div className="enemy-list-panel__filter">
          <label className="enemy-list-panel__toolbar-label">FILTER</label>
          <div className="enemy-list-panel__rarity-buttons">
            {ALL_RARITIES.map((r) => {
              const def = RARITY_REGISTRY[r]
              const active = activeRarities.size === 0 || activeRarities.has(r)
              return (
                <button
                  key={r}
                  type="button"
                  className={`enemy-list-panel__rarity-btn ${active ? 'enemy-list-panel__rarity-btn--active' : ''}`}
                  style={{ borderColor: def.color, color: active ? def.color : '#555' }}
                  onClick={() => onRarityToggle(r)}
                  title={def.label}
                >
                  {r}
                </button>
              )
            })}
          </div>
        </div>

        {/* 表示切替 */}
        <div className="enemy-list-panel__view-toggle">
          <button
            type="button"
            className={`enemy-list-panel__view-btn ${viewMode === 'grid' ? 'enemy-list-panel__view-btn--active' : ''}`}
            onClick={() => onViewModeChange('grid')}
            title="Grid view"
          >
            ▦
          </button>
          <button
            type="button"
            className={`enemy-list-panel__view-btn ${viewMode === 'list' ? 'enemy-list-panel__view-btn--active' : ''}`}
            onClick={() => onViewModeChange('list')}
            title="List view"
          >
            ≡
          </button>
        </div>
      </div>

      {/* --- 敵一覧 --- */}
      <div className={`enemy-list-panel__content enemy-list-panel__content--${viewMode}`}>
        {entries.map(([id, data]) => (
          <EnemyCard
            key={id}
            enemy={data}
            selected={id === selectedId}
            viewMode={viewMode}
            onClick={() => onSelect(id)}
          />
        ))}
        {entries.length === 0 && (
          <p className="enemy-list-panel__empty">NO RESULTS</p>
        )}
      </div>
    </div>
  )
}

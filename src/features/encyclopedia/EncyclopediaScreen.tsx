import { useState, useMemo } from 'react'
import type { EnemyData } from '../../types/game'
import { ENEMY_REGISTRY } from '../../data/enemies'
import { EnemyDetailPanel } from './components/EnemyDetailPanel'
import { EnemyListPanel } from './components/EnemyListPanel'
import {
  sortEnemies,
  filterByRarity,
  SORT_OPTIONS,
  type SortKey,
  type SortOrder,
  type ViewMode,
} from './encyclopediaUtils'
import './EncyclopediaScreen.css'

type Props = {
  onExit: () => void
}

export function EncyclopediaScreen({ onExit }: Props) {
  // 全敵エントリ
  const allEntries = useMemo(
    () => Object.entries(ENEMY_REGISTRY) as [string, EnemyData][],
    [],
  )

  // 選択中の敵ID
  const [selectedId, setSelectedId] = useState<string | null>(allEntries[0]?.[0] ?? null)

  // ソート状態
  const [sortKey, setSortKey] = useState<SortKey>('rarity')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  // フィルタ状態（空=全表示）
  const [activeRarities, setActiveRarities] = useState<Set<string>>(new Set())

  // 表示モード
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  // フィルタ・ソート適用後の一覧
  const displayedEntries = useMemo(() => {
    const filtered = filterByRarity(allEntries, activeRarities)
    return sortEnemies(filtered, sortKey, sortOrder)
  }, [allEntries, activeRarities, sortKey, sortOrder])

  // 選択中の敵データ
  const selectedEnemy = selectedId ? ENEMY_REGISTRY[selectedId as keyof typeof ENEMY_REGISTRY] : null

  const handleSortChange = (key: SortKey, order: SortOrder) => {
    setSortKey(key)
    setSortOrder(order)
  }

  const handleRarityToggle = (rarity: string) => {
    setActiveRarities((prev) => {
      const next = new Set(prev)
      if (next.has(rarity)) next.delete(rarity)
      else next.add(rarity)
      return next
    })
  }

  return (
    <main className="encyclopedia-screen">
      {/* --- 左パネル: 敵詳細 --- */}
      <section className="encyclopedia-screen__left">
        <button type="button" className="encyclopedia-screen__back-btn" onClick={onExit}>
          BACK
        </button>
        <EnemyDetailPanel enemy={selectedEnemy} />
      </section>

      {/* --- 右パネル: 敵一覧 --- */}
      <section className="encyclopedia-screen__right">
        <EnemyListPanel
          entries={displayedEntries}
          selectedId={selectedId}
          onSelect={setSelectedId}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortOptions={SORT_OPTIONS}
          currentSortKey={sortKey}
          currentSortOrder={sortOrder}
          onSortChange={handleSortChange}
          activeRarities={activeRarities}
          onRarityToggle={handleRarityToggle}
        />
      </section>
    </main>
  )
}

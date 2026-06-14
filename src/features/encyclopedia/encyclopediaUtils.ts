import type { EnemyData } from '../../types/game'
import { RARITY_REGISTRY } from '../../types/game'

export type SortKey = 'rarity' | 'name'
export type SortOrder = 'asc' | 'desc'
export type ViewMode = 'grid' | 'list'

export type SortOption = {
  key: SortKey
  order: SortOrder
  label: string
}

export const SORT_OPTIONS: SortOption[] = [
  { key: 'rarity', order: 'desc', label: 'RARITY ↓' },
  { key: 'rarity', order: 'asc', label: 'RARITY ↑' },
  { key: 'name', order: 'asc', label: 'NAME A-Z' },
  { key: 'name', order: 'desc', label: 'NAME Z-A' },
]

type Rarity = keyof typeof RARITY_REGISTRY

/** レア度のsortOrderでソートに使う数値を返す */
function raritySortValue(rarity: string): number {
  const def = RARITY_REGISTRY[rarity as Rarity]
  return def ? def.sortOrder : 0
}

/** ソート関数 */
export function sortEnemies(
  entries: [string, EnemyData][],
  sortKey: SortKey,
  sortOrder: SortOrder,
): [string, EnemyData][] {
  const sorted = [...entries].sort((a, b) => {
    if (sortKey === 'rarity') {
      return raritySortValue(b[1].rarity) - raritySortValue(a[1].rarity)
    }
    return a[1].name.localeCompare(b[1].name)
  })
  if (sortOrder === 'asc' && sortKey === 'rarity') sorted.reverse()
  if (sortOrder === 'desc' && sortKey === 'name') sorted.reverse()
  return sorted
}

/** レア度フィルタ */
export function filterByRarity(
  entries: [string, EnemyData][],
  activeRarities: Set<string>,
): [string, EnemyData][] {
  if (activeRarities.size === 0) return entries
  return entries.filter(([, data]) => activeRarities.has(data.rarity))
}

// ============================================================
// Rarity types and registry
// ============================================================

/**
 * レアリティ表示用のメタ情報。
 * key はコードそのもの、sortOrder が小さいほど低レア。
 */
export type RarityDef = {
  label: string
  color: string
  sortOrder: number
  description: string
}

/**
 * レアリティの source of truth。
 * コード補完はこの key union から得る。
 */
export const RARITY_REGISTRY = {
  C: {
    label: 'Common',
    color: '#9aa0a6',
    sortOrder: 1,
    description: '',
  },
  B: {
    label: 'Uncommon',
    color: '#66bb6a',
    sortOrder: 2,
    description: '',
  },
  A: {
    label: 'Rare',
    color: '#42a5f5',
    sortOrder: 3,
    description: '',
  },
  S: {
    label: 'Super Rare',
    color: '#ab47bc',
    sortOrder: 4,
    description: '',
  },
  X: {
    label: 'Special',
    color: '#ffd54f',
    sortOrder: 5,
    description: '',
  },
} satisfies Record<string, RarityDef>

export type Rarity = keyof typeof RARITY_REGISTRY

export const compareRarity = (left: Rarity, right: Rarity): number => {
  return RARITY_REGISTRY[left].sortOrder - RARITY_REGISTRY[right].sortOrder
}

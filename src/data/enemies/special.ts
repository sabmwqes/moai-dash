import type { EnemyData } from '../../types/game'

// ─────────────────────────────────────────────────────────────────────────────
// Special enemies
// フロアに紐づかない特殊な敵（テスト用・隠しなど）
// ─────────────────────────────────────────────────────────────────────────────

export const SPECIAL_ENEMIES = {
  // Test moai - for testing and demonstration purposes, not meant to be a real enemy
  test_moai: {
    name: 'Test Moai',
    description: 'A moai used for testing and demonstration purposes. Not meant to be a real enemy.',
    icon: {
      layers: [
        { char: '🔧', className: 'char-icon__layer--holding' },
        { char: '🗿' },
      ],
    },
    hp: 100,
    actions: [
      [
        { type: { kind: 'damage', value: 10 } },
        { type: { kind: 'damage', value: 10 } },
        { type: { kind: 'damage', value: 10 } },
      ],
      [
        { type: { kind: 'damage', value: 20 } },
        { type: { kind: 'damage', value: 10 } },
        { type: { kind: 'damage', value: 5 } },
      ],
    ],
    exp: 999,
    gold: 999,
    rarity: 'X',
    kind: 'special',
  },
} satisfies Record<string, EnemyData>

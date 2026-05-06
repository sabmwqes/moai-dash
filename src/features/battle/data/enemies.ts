import type { EnemyData } from '../../../types/game'

// ─────────────────────────────────────────────────────────────────────────────
// Enemy registry
//
// すべての敵定義はこのオブジェクトに集約する。
// 消費者は `ENEMY_REGISTRY['red_moai']` のようにIDで参照するため、
// 敵の種類が増えてもimport文が増殖しない。
//
// ファイルが肥大化してきたら area ごとに分割し、
//   import { FOREST_ENEMIES } from './forest'
//   import { DUNGEON_ENEMIES } from './dungeon'
//   export const ENEMY_REGISTRY = { ...FOREST_ENEMIES, ...DUNGEON_ENEMIES }
// とマージするだけでよい。
// ─────────────────────────────────────────────────────────────────────────────

export const ENEMY_REGISTRY = {
  test_moai:{
    name: 'Test Moai',
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
  },

  red_moai: {
    name: 'Red Moai',
    icon: {
      layers: [{ char: '🗿', className: 'char-icon__layer--red-tint' }],
    },
    hp: 20,
    actions: [
      [
        { type: { kind: 'damage', value: 5 } },
        { type: { kind: 'damage', value: 5 } },
        { type: { kind: 'damage', value: 5 } },
      ],
    ],
    exp: 10,
    gold: 5,
    rarity: 'C',
  },

  blue_moai: {
    name: 'Blue Moai',
    icon: {
      layers: [{ char: '🗿', className: 'char-icon__layer--blue-tint' }],
    },
    hp: 20,
    actions: [
      [
        { type: { kind: 'damage', value: 5 } },
        { type: { kind: 'damage', value: 5 } },
        {
          type: {
            kind: 'damage_status',
            value: 5,
            statusId: 'freeze',
            statusValue: 2,
          },
        },
      ],
    ],
    exp: 15,
    gold: 8,
    rarity: 'C',
  },

} satisfies Record<string, EnemyData>

// EnemyId is automatically derived from the registry keys.
// Adding a new entry here is all that's needed — no manual union to maintain.
export type EnemyId = keyof typeof ENEMY_REGISTRY


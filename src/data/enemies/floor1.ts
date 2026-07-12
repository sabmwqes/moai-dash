import type { EnemyData } from '../../types/game'

// ─────────────────────────────────────────────────────────────────────────────
// Floor 1 enemies
// ─────────────────────────────────────────────────────────────────────────────

export const FLOOR1_ENEMIES = {
  // Red Moai - red-tinted moai
  red_moai: {
    name: 'Red Moai',
    description: 'A red-tinted moai.',
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
    kind: 'normal',
  },
  // Blue Moai - blue-tinted moai
  blue_moai: {
    name: 'Blue Moai',
    description: 'A blue-tinted moai.',
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
    kind: 'normal',
  },
} satisfies Record<string, EnemyData>
